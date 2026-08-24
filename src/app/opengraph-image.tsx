import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mono =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "36px",
              backgroundColor: "#34d399",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: mono,
              fontSize: "26px",
              letterSpacing: "4px",
              color: "#34d399",
            }}
          >
            ISAACK.DEV
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: mono,
              fontSize: "78px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#ededed",
            }}
          >
            Isaack Joshua
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: mono,
              fontSize: "78px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              color: "#ededed",
            }}
          >
            Lukumay
          </div>

          <div
            style={{
              display: "flex",
              width: "160px",
              height: "3px",
              backgroundColor: "#34d399",
              marginTop: "34px",
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: "30px",
              color: "#a1a1aa",
              marginTop: "30px",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: mono,
            fontSize: "22px",
            color: "#6b6b73",
          }}
        >
          <div style={{ display: "flex" }}>
            ML Engineer &middot; Backend &middot; Cross-platform
          </div>
          <div style={{ display: "flex" }}>Dar es Salaam, TZ</div>
        </div>
      </div>
    ),
    size,
  );
}
