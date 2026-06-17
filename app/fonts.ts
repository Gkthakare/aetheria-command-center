import {
  JetBrains_Mono,
  Orbitron,
  Space_Grotesk,
} from "next/font/google";

export const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-aetheria-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-aetheria-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-aetheria-terminal",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

/** Apply to `<html>` alongside existing font variables. */
export const aetheriaFontVariables = [
  orbitron.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
].join(" ");
