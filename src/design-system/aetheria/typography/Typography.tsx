import type { ReactNode } from "react";

import {
  BodyText,
  DisplayLG,
  DisplayXL,
  Heading,
  Label,
  Subheading,
  TerminalText,
} from "@/design-system/aetheria/typography/AetheriaTypography";

/** @deprecated Use DisplayXL, DisplayLG, or Heading */
interface DisplayHeadingProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "hero" | "section" | "panel";
  align?: "left" | "center";
  className?: string;
}

export function DisplayHeading({
  children,
  as = "h2",
  size = "section",
  align = "left",
  className = "",
}: DisplayHeadingProps) {
  if (size === "hero") {
    return (
      <DisplayXL as={as} align={align} className={className}>
        {children}
      </DisplayXL>
    );
  }

  if (size === "panel") {
    return (
      <Heading as={as} align={align} className={className}>
        {children}
      </Heading>
    );
  }

  return (
    <DisplayLG as={as} align={align} className={className}>
      {children}
    </DisplayLG>
  );
}

/** @deprecated Use Label */
export function SystemLabel({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "signal";
  className?: string;
}) {
  return (
    <Label as="p" variant={variant} className={className}>
      {children}
    </Label>
  );
}

/** @deprecated Use Subheading or BodyText */
export function BodyTransmission({
  children,
  variant = "body",
  align = "left",
  className = "",
}: {
  children: ReactNode;
  variant?: "lead" | "body";
  align?: "left" | "center";
  className?: string;
}) {
  if (variant === "lead") {
    return (
      <Subheading as="p" variant="lead" align={align} className={className}>
        {children}
      </Subheading>
    );
  }

  return (
    <BodyText as="p" align={align} className={className}>
      {children}
    </BodyText>
  );
}

export {
  DisplayLG,
  DisplayXL,
  Heading,
  Label,
  Subheading,
  TerminalText,
  BodyText,
} from "@/design-system/aetheria/typography/AetheriaTypography";

export {
  AETHERIA_DISPLAY_GLOW,
  AETHERIA_FONT,
  AETHERIA_TYPE_COLOR,
} from "@/design-system/aetheria/typography/tokens";
