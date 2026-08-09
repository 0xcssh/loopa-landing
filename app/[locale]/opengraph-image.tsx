import { ImageResponse } from "next/og";
import { config } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = config.brand;

// Default OG image for every page under [locale] that doesn't define its
// own (blog articles override this with their own opengraph-image.tsx).
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "linear-gradient(135deg, #4E3A5C 0%, #3a2c46 100%)",
          color: "#FBF7F5",
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            border: "10px solid transparent",
            borderTopColor: "#FFB994",
            borderRightColor: "#F2849A",
            borderBottomColor: "#F2849A",
            marginBottom: 32,
          }}
        />
        <div style={{ fontSize: 30, opacity: 0.75, marginBottom: 12 }}>
          Contraceptive Ring Reminder
        </div>
        <div style={{ fontSize: 64, fontWeight: 800 }}>{config.brand}</div>
      </div>
    ),
    { ...size }
  );
}
