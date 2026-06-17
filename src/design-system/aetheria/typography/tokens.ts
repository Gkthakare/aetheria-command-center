export const AETHERIA_FONT = {
  display: "font-[family-name:var(--font-aetheria-display)]",
  body: "font-[family-name:var(--font-aetheria-body)]",
  terminal: "font-[family-name:var(--font-aetheria-terminal)]",
} as const;

export const AETHERIA_TYPE_COLOR = {
  display: "text-[#F5F3FF]",
  displayMuted: "text-[#DDD6FE]",
  body: "text-[#DDD6FE]/80",
  bodyMuted: "text-[#C4B5FD]/70",
  label: "text-[#A855F7]/65",
  labelAccent: "text-[#60A5FA]/80",
  terminal: "text-[#EDE9FE]/85",
  terminalMuted: "text-[#A78BFA]/75",
} as const;

export const AETHERIA_DISPLAY_GLOW = {
  textShadow:
    "0 0 24px rgba(168, 85, 247, 0.21), 0 0 48px rgba(96, 165, 250, 0.07)",
} as const;
