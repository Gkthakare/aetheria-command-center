import type { ReactNode } from "react";

import {
  AETHERIA_DISPLAY_GLOW,
  AETHERIA_FONT,
  AETHERIA_TYPE_COLOR,
} from "@/design-system/aetheria/typography/tokens";

type TypographyAlign = "left" | "center" | "right";
type TypographyElement = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface BaseTypographyProps {
  children: ReactNode;
  as?: TypographyElement;
  align?: TypographyAlign;
  className?: string;
  gradient?: boolean;
}

function alignClass(align: TypographyAlign) {
  if (align === "center") return "text-center";
  if (align === "right") return "text-right";
  return "text-left";
}

function mergeClasses(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Tier hero — Orbitron display only for major headings. */
export function DisplayXL({
  children,
  as: Tag = "h1",
  align = "left",
  className = "",
  gradient = false,
}: BaseTypographyProps) {
  return (
    <Tag
      className={mergeClasses(
        AETHERIA_FONT.display,
        "text-4xl font-semibold uppercase tracking-[0.08em] sm:text-5xl md:text-6xl lg:text-7xl",
        "text-[#F5F3FF]",
        alignClass(align),
        className,
      )}
      style={gradient ? AETHERIA_DISPLAY_GLOW : undefined}
    >
      {gradient ? (
        <span className="bg-gradient-to-b from-white via-[#EDE9FE] to-[#C4B5FD] bg-clip-text text-transparent">
          {children}
        </span>
      ) : (
        children
      )}
    </Tag>
  );
}

export function DisplayLG({
  children,
  as: Tag = "h2",
  align = "left",
  className = "",
  gradient = false,
}: BaseTypographyProps) {
  return (
    <Tag
      className={mergeClasses(
        AETHERIA_FONT.display,
        "text-2xl font-semibold uppercase tracking-[0.06em] sm:text-3xl md:text-4xl lg:text-5xl",
        "text-[#F5F3FF]",
        alignClass(align),
        className,
      )}
      style={gradient ? AETHERIA_DISPLAY_GLOW : undefined}
    >
      {gradient ? (
        <span className="bg-gradient-to-r from-[#F5F3FF] via-[#DDD6FE] to-[#C4B5FD] bg-clip-text text-transparent">
          {children}
        </span>
      ) : (
        children
      )}
    </Tag>
  );
}

/** Section titles — Space Grotesk, not display font. */
export function Heading({
  children,
  as: Tag = "h3",
  align = "left",
  className = "",
}: Omit<BaseTypographyProps, "gradient">) {
  return (
    <Tag
      className={mergeClasses(
        AETHERIA_FONT.body,
        "text-lg font-semibold tracking-tight text-[#F5F3FF] sm:text-xl md:text-2xl",
        alignClass(align),
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface SubheadingProps extends BaseTypographyProps {
  variant?: "default" | "lead";
}

export function Subheading({
  children,
  as: Tag = "p",
  align = "left",
  className = "",
  variant = "default",
}: SubheadingProps) {
  const variantClass =
    variant === "lead"
      ? "text-base font-medium leading-relaxed text-[#BAE6FD] sm:text-lg md:text-xl"
      : "text-sm font-normal leading-relaxed text-[#DDD6FE]/90 sm:text-base";

  return (
    <Tag
      className={mergeClasses(
        AETHERIA_FONT.body,
        variantClass,
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-prose",
        alignClass(align),
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface LabelProps extends BaseTypographyProps {
  variant?: "default" | "accent" | "signal";
}

/** System labels — JetBrains Mono. */
export function Label({
  children,
  as: Tag = "span",
  align = "left",
  className = "",
  variant = "default",
}: LabelProps) {
  const variantColor = {
    default: AETHERIA_TYPE_COLOR.label,
    accent: "text-[#C4B5FD]/75",
    signal: AETHERIA_TYPE_COLOR.labelAccent,
  }[variant];

  return (
    <Tag
      className={mergeClasses(
        AETHERIA_FONT.terminal,
        "text-[10px] uppercase tracking-[0.24em] sm:text-[11px]",
        variantColor,
        alignClass(align),
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface TerminalTextProps extends BaseTypographyProps {
  variant?: "default" | "muted" | "data";
}

/** Body copy uses Space Grotesk; `data` variant uses JetBrains for telemetry. */
export function TerminalText({
  children,
  as: Tag = "p",
  align = "left",
  className = "",
  variant = "default",
}: TerminalTextProps) {
  const isData = variant === "data";
  const variantClass = {
    default: "text-[#DDD6FE]/85",
    muted: "text-[#A78BFA]/70",
    data: "text-[#60A5FA]/90 tabular-nums",
  }[variant];

  return (
    <Tag
      className={mergeClasses(
        isData ? AETHERIA_FONT.terminal : AETHERIA_FONT.body,
        "text-sm leading-relaxed sm:text-base",
        variantClass,
        align === "center" ? "mx-auto max-w-prose text-center" : "max-w-prose",
        alignClass(align),
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Body alias — Space Grotesk prose. */
export function BodyText({
  children,
  as: Tag = "p",
  align = "left",
  className = "",
  variant = "default",
}: TerminalTextProps) {
  return (
    <TerminalText as={Tag} align={align} className={className} variant={variant}>
      {children}
    </TerminalText>
  );
}
