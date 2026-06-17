"use client";

import dynamic from "next/dynamic";

const AetheriaShowcase = dynamic(
  () =>
    import("@/features/aetheria-showcase").then(
      (module) => module.AetheriaShowcase,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 bg-[#050510]"
        aria-label="Loading Aetheria showcase"
      />
    ),
  },
);

export function AetheriaShowcaseClient() {
  return <AetheriaShowcase />;
}
