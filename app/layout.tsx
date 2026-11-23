import { aetheriaFontVariables } from "./fonts";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/features/portfolio/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Gaurav Thakare · AI Engineering Portfolio";
const description =
  "Gaurav Thakare’s engineering portfolio. Explore document RAG, Python LLM agents, and workflow automation projects.";

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: title, template: "%s · Gaurav Thakare" },
  description,
  openGraph: { title, description, type: "website", siteName: "Aetheria Command Center" },
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
      <body>
        {children}
      </body>
    </html>
  );
}
