"use client";

import {
  ChromeSurface,
  Label,
  NeonLink,
  StatusIndicator,
  SystemBadge,
  TerminalText,
} from "@/design-system/aetheria";
import { useSystemClock } from "@/features/aetheria-showcase/hooks/useSystemClock";

export function ShowcaseTopCommandBar() {
  const { time, date } = useSystemClock();

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40 px-3 pt-2 sm:px-4">
      <div className="pointer-events-auto mx-auto max-w-[1600px]">
        <ChromeSurface compact>
          <div className="flex flex-wrap items-center justify-between gap-3 py-0">
            <div className="flex items-center gap-3">
              <SystemBadge variant="primary">Aetheria OS</SystemBadge>
              <Label className="hidden sm:inline">Director v4.2</Label>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="text-right">
                <Label as="p">System Time</Label>
                <TerminalText
                  as="p"
                  variant="data"
                  className="!max-w-none !text-sm !tracking-wide"
                >
                  {time}
                </TerminalText>
                <Label as="p" className="!text-[9px]">
                  {date}
                </Label>
              </div>
              <StatusIndicator label="Network" value="ONLINE" tone="online" compact />
              <NeonLink href="/" variant="ghost" className="!py-1.5">
                Exit
              </NeonLink>
            </div>
          </div>
        </ChromeSurface>
      </div>
    </header>
  );
}

export function ShowcaseAmbientLayers() {
  return null;
}
