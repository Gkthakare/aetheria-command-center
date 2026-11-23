import { ImageResponse } from "next/og";

export const alt = "Gaurav Thakare · AI Engineering Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      padding: 78,
      color: "#f3f1ff",
      background: "linear-gradient(135deg, #0d0b14, #291b45)",
    }}>
      <span style={{ fontSize: 28, color: "#c8b2ff" }}>Gaurav Thakare</span>
      <strong style={{ fontSize: 74, lineHeight: 1.13, marginTop: 22 }}>
        LLM agents &amp; workflow automation
      </strong>
      <span style={{ fontSize: 28, marginTop: 30, color: "#d2c6e5" }}>
        Aetheria Command Center
      </span>
    </div>,
    size,
  );
}
