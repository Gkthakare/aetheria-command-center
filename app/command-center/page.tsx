import type { Metadata } from "next";

import { BootExperienceClient } from "../BootExperienceClient";

export const metadata: Metadata = {
  title: "Interactive Command Center",
  description: "Explore the Aetheria project galaxy in 3D.",
};

export default function CommandCenterPage() {
  return (
    <div className="h-dvh w-full overflow-hidden">
      <BootExperienceClient />
    </div>
  );
}
