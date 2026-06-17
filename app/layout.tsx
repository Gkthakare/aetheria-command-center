import { aetheriaFontVariables } from "./fonts";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aetheria Command Center",
  description: "Director interface for the Aetheria universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${aetheriaFontVariables} h-full antialiased`}
    >
      <body className="m-0 h-dvh w-full overflow-hidden font-[family-name:var(--font-aetheria-body)]">
        {children}
      </body>
    </html>
  );
}
