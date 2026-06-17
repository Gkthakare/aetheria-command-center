import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aetheria — World Showcase",
  description: "Explore the Aetheria sci-fantasy universe",
};

export default function AetheriaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-dvh w-full overflow-hidden">{children}</div>;
}
