"use client";

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { AETHERIA_FONT } from "@/design-system/aetheria/typography/tokens";

type NeonButtonVariant = "primary" | "ghost" | "signal";

interface NeonButtonBaseProps {
  children: ReactNode;
  variant?: NeonButtonVariant;
  active?: boolean;
  className?: string;
}

const variantStyles: Record<NeonButtonVariant, string> = {
  primary:
    "border-[#6D28D9]/40 bg-[#6D28D9]/12 text-[#EDE9FE] hover:border-[#A855F7]/45 hover:bg-[#6D28D9]/18",
  ghost:
    "border-transparent bg-transparent text-[#C4B5FD]/65 hover:border-[#A855F7]/20 hover:bg-[#0B0B1F]/50 hover:text-[#EDE9FE]",
  signal:
    "border-[#60A5FA]/30 bg-[#60A5FA]/8 text-[#BAE6FD] hover:border-[#60A5FA]/45 hover:bg-[#60A5FA]/12",
};

const activeStyles =
  "border-[#A855F7]/50 bg-[#6D28D9]/22 text-white";

function baseClassName(
  variant: NeonButtonVariant,
  active: boolean,
  className: string,
) {
  return `group relative inline-flex items-center justify-center gap-2 rounded-md border px-2.5 py-2 ${AETHERIA_FONT.terminal} text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 sm:text-[11px] ${
    active ? activeStyles : variantStyles[variant]
  } ${className}`;
}

function NeonButtonInner({ children }: { children: ReactNode }) {
  return (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  );
}

type ButtonProps = NeonButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = NeonButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function NeonButton({
  children,
  variant = "ghost",
  active = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={baseClassName(variant, active, className)}
      {...props}
    >
      <NeonButtonInner>{children}</NeonButtonInner>
    </button>
  );
}

export function NeonLink({
  children,
  variant = "ghost",
  active = false,
  className = "",
  href,
  ...props
}: LinkProps) {
  return (
    <a
      href={href}
      className={baseClassName(variant, active, className)}
      {...props}
    >
      <NeonButtonInner>{children}</NeonButtonInner>
    </a>
  );
}
