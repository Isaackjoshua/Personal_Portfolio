"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  MESSAGE_MAX_LENGTH,
  type ContactInput,
} from "@/lib/validation";

type Status = "idle" | "success" | "error";

const labelClass =
  "block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint";

const controlClass =
  "mt-2 w-full rounded-lg border bg-bg-soft px-3.5 py-2.5 font-sans text-sm text-fg " +
  "placeholder:text-faint transition-colors duration-200 " +
  "focus:border-accent/60 disabled:opacity-60";

const errorClass = "mt-1.5 font-mono text-xs text-red-400";

function fieldClass(invalid: boolean, extra?: string) {
  return cn(
    controlClass,
    invalid ? "border-red-500/60" : "border-line hover:border-line",
    extra,
  );
}

export function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  // The counter is tracked locally rather than through `watch()`, so the whole
  // form does not re-render on every keystroke.
  const [messageLength, setMessageLength] = useState(0);
  const messageField = register("message");

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok) {
        setErrorMessage(
          payload?.error ??
            "The message did not go through. Try again, or email me directly.",
        );
        setStatus("error");
        return;
      }

      reset();
      setMessageLength(0);
      setStatus("success");
    } catch {
      setErrorMessage(
        "No connection to the server. Check your network and try again.",
      );
      setStatus("error");
    }
  });

  function startOver() {
    setStatus("idle");
    setErrorMessage("");
    setMessageLength(0);
    reset();
  }

  const announcement = isSubmitting
    ? "Sending your message."
    : status === "success"
      ? "Message sent. A reply is on its way."
      : "";

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-surface-hi px-5 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        </span>
        <span className="ml-1 truncate font-mono text-[0.6875rem] tracking-wide text-faint">
          new-message.txt
        </span>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {status === "success" ? (
        <div className="px-5 py-12 text-center sm:px-8">
          <span className="mx-auto grid size-12 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            <Check className="size-6" strokeWidth={2} aria-hidden />
          </span>
          <h3 className="mt-5 text-lg text-fg">Message sent</h3>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
            It landed in my inbox. I read everything that comes through here and
            you&apos;ll get a reply at the address you gave me.
          </p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-7"
            onClick={startOver}
          >
            Send another
          </Button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={onSubmit}
          className="relative p-5 sm:p-7"
          aria-busy={isSubmitting}
        >
          {/* Honeypot. Off-screen rather than display:none so the input stays
              registered and reachable to the bots that fill every field. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
          >
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                autoComplete="name"
                placeholder="Ada Lovelace"
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className={fieldClass(Boolean(errors.name))}
                disabled={isSubmitting}
                {...register("name")}
              />
              {errors.name && (
                <p id="contact-name-error" className={errorClass}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? "contact-email-error" : undefined
                }
                className={fieldClass(Boolean(errors.email))}
                disabled={isSubmitting}
                {...register("email")}
              />
              {errors.email && (
                <p id="contact-email-error" className={errorClass}>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="contact-subject" className={labelClass}>
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              autoComplete="off"
              placeholder="Offline inference for a clinical tool"
              aria-invalid={errors.subject ? true : undefined}
              aria-describedby={
                errors.subject ? "contact-subject-error" : undefined
              }
              className={fieldClass(Boolean(errors.subject))}
              disabled={isSubmitting}
              {...register("subject")}
            />
            {errors.subject && (
              <p id="contact-subject-error" className={errorClass}>
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor="contact-message" className={labelClass}>
                Message
              </label>
              <span
                className="font-mono text-[0.6875rem] text-faint tabular-nums"
                aria-hidden
              >
                {messageLength}/{MESSAGE_MAX_LENGTH}
              </span>
            </div>
            <textarea
              id="contact-message"
              rows={6}
              placeholder="What are you building, and where do you need a hand?"
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              className={fieldClass(Boolean(errors.message), "resize-y")}
              disabled={isSubmitting}
              {...messageField}
              onChange={(event) => {
                void messageField.onChange(event);
                setMessageLength(event.target.value.length);
              }}
            />
            {errors.message && (
              <p id="contact-message-error" className={errorClass}>
                {errors.message.message}
              </p>
            )}
          </div>

          {status === "error" && errorMessage && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-500/8 px-4 py-3"
            >
              <CircleAlert
                className="mt-0.5 size-4 shrink-0 text-red-400"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="font-mono text-xs leading-relaxed text-red-300">
                {errorMessage}
              </p>
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    className="size-4 animate-spin"
                    strokeWidth={2}
                    aria-hidden
                  />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" strokeWidth={1.75} aria-hidden />
                  Send message
                </>
              )}
            </Button>
            <p className="font-mono text-[0.6875rem] leading-relaxed text-faint">
              Goes straight to my inbox. Nothing else is stored.
            </p>
          </div>
        </form>
      )}
    </Card>
  );
}
