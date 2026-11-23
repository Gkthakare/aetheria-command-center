import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      background: "#171025",
      borderRadius: 14,
    }}>
      <div style={{
        display: "flex",
        width: 31,
        height: 31,
        border: "4px solid #c8b2ff",
        borderRadius: "50%",
      }} />
    </div>,
    size,
  );
}
