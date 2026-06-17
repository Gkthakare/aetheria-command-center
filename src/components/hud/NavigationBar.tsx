"use client";

import { ChromeSurface, NeonLink } from "@/design-system/aetheria";
import { useCameraDirectorStore } from "@/camera/stores/camera.director.store";
import { useGalaxyStore } from "@/features/project-galaxy/stores/galaxy.store";
import type { HudConfig } from "@/lib/hud.config";

interface NavigationBarProps {
  navigation: HudConfig["navigation"];
}

export function NavigationBar({ navigation }: NavigationBarProps) {
  const clearProjectSelection = useGalaxyStore(
    (state) => state.clearProjectSelection,
  );
  const setMode = useCameraDirectorStore((state) => state.setMode);

  const handleNavClick = (itemId: string) => {
    switch (itemId) {
      case "command-center":
      case "project-galaxy":
        clearProjectSelection();
        setMode("command-center");
        break;
      case "neural-core":
        clearProjectSelection();
        setMode("neural-core");
        break;
      default:
        if (itemId !== "project-galaxy") {
          clearProjectSelection();
        }
        break;
    }
  };

  return (
    <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-40 p-3 sm:p-4">
      <div className="mx-auto max-w-4xl">
        <ChromeSurface compact subtitle={navigation.heading}>
          <nav className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:justify-center sm:gap-2">
            {navigation.items.map((item) => (
              <NeonLink
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className="pointer-events-auto w-full sm:w-auto"
              >
                {item.label}
              </NeonLink>
            ))}
          </nav>
        </ChromeSurface>
      </div>
    </footer>
  );
}
