"use client";

import dynamic from "next/dynamic";

const BootExperience = dynamic(
  () =>
    import("@/features/boot-sequence").then((module) => module.BootExperience),
  {
    ssr: false,
    loading: () => (
      <div
        className="fixed inset-0 bg-[#010008]"
        aria-label="Loading command center"
      />
    ),
  },
);

export function BootExperienceClient() {
  return <BootExperience />;
}
