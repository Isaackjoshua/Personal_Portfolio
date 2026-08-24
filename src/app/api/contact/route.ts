import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";
const DEFAULT_TO = "isaackjoshua23@gmail.com";

/**
 * Timestamps of recent submissions, keyed by client IP.
 *
 * This Map lives inside one server instance: it resets on every deploy, is not
 * shared between serverless invocations in different regions, and is trivially
 * defeated by a rotating IP. It exists to stop casual flooding from a single
 * source. The production upgrade is a durable store — Upstash Redis or Vercel
 * KV — keyed exactly the same way, so only `rateLimit` below has to change.
 */
const submissionLog = new Map<string, number[]>();

type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

function rateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Prune expired entries on every call so the Map cannot grow without bound.
  for (const [ip, stamps] of submissionLog) {
    const fresh = stamps.filter((stamp) => stamp > cutoff);
    if (fresh.length > 0) {
      submissionLog.set(ip, fresh);
    } else {
      submissionLog.delete(ip);
    }
  }

  const recent = submissionLog.get(key) ?? [];

  if (recent.length >= RATE_LIMIT_MAX) {
    const retryAfterMs = recent[0] + RATE_LIMIT_WINDOW_MS - now;
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  submissionLog.set(key, [...recent, now]);
  return { allowed: true };
}

/** First hop in `x-forwarded-for` is the client; fall back to a shared bucket. */
function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "That request body was not valid JSON." },
      { status: 400 },
    );
  }

  // Honeypot. A filled hidden field means a bot, so answer exactly like a
  // successful send — no error, no hint that the message was dropped.
  if (
    isRecord(payload) &&
    typeof payload.website === "string" &&
    payload.website.length > 0
  ) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return NextResponse.json(
      {
        error:
          "That is three messages in ten minutes. Give it a few minutes before sending another.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Some fields need another look.",
        issues: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  const body = [
    `From:    ${data.name} <${data.email}>`,
    `Subject: ${data.subject}`,
    `Sent:    ${new Date().toISOString()}`,
    "",
    data.message,
  ].join("\n");

  // No key configured yet: record the submission in the server logs and answer
  // as a success. The visitor should never see the site's wiring state.
  if (!apiKey) {
    console.info(
      "[contact] RESEND_API_KEY is not set — logging this submission instead of sending it.\n" +
        body,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    // Instantiated per request: a module-scope client would need the key at
    // import time and break the build wherever the env var is absent.
    const resend = new Resend(apiKey);

    const { data: sent, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM,
      to: process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      text: body,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        {
          error:
            "The message could not be delivered just now. Email me directly and it will get through.",
        },
        { status: 502 },
      );
    }

    console.info("[contact] Delivered message", sent?.id ?? "(no id returned)");
    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] Unexpected failure while sending:", error);
    return NextResponse.json(
      {
        error:
          "Something broke on my side. Try again in a moment, or email me directly.",
      },
      { status: 500 },
    );
  }
}
