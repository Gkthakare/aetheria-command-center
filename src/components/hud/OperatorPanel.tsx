"use client";

import { BodyText, ChromeSurface, Label, Subheading } from "@/design-system/aetheria";
import type { HudOperator } from "@/lib/hud.config";

interface OperatorPanelProps {
  operator: HudOperator;
}

export function OperatorPanel({ operator }: OperatorPanelProps) {
  return (
    <aside className="pointer-events-none absolute left-3 top-20 z-40 w-[min(100%-1.5rem,18rem)] sm:left-4 md:top-1/2 md:-translate-y-1/2 lg:w-72">
      <ChromeSurface subtitle="Operator Profile" title={operator.name}>
        <div className="space-y-4">
          <Label>{operator.role}</Label>
          <div>
            <Label as="p">Engineering focus</Label>
            <Subheading className="mt-1 !max-w-none !text-sm">
              {operator.experience}
            </Subheading>
          </div>
          <div>
            <Label as="p">Current Mission</Label>
            <BodyText className="mt-1 !max-w-none !text-sm">
              {operator.currentMission}
            </BodyText>
          </div>
        </div>
      </ChromeSurface>
    </aside>
  );
}
