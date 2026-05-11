export const puCommonTones = [
  "surface",
  "outline",
  "primary",
  "secondary",
  "tertiary",
] as const;

export type PuTone = (typeof puCommonTones)[number];

export const puStatusTones = ["info", "success", "warning", "error"] as const;

export type PuStatusTone = (typeof puStatusTones)[number];

export const puSurfaceTones = [
  "plain",
  "surface",
  "section",
  "inset-high",
  "outline",
] as const;

export type PuSurfaceTone = (typeof puSurfaceTones)[number];

export const puSizes = ["sm", "md", "lg"] as const;

export type PuSize = (typeof puSizes)[number];

export const puExtendedSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export type PuExtendedSize = (typeof puExtendedSizes)[number];

export const puDensities = ["compact", "comfortable"] as const;

export type PuDensity = (typeof puDensities)[number];

export const puAligns = ["start", "center", "end"] as const;

export type PuAlign = (typeof puAligns)[number];

export const puLayouts = ["stack", "inline", "grid"] as const;

export type PuLayout = (typeof puLayouts)[number];

export const puGaps = ["none", "xs", "sm", "md", "lg"] as const;

export type PuGap = (typeof puGaps)[number];

export const puOrientations = ["horizontal", "vertical"] as const;

export type PuOrientation = (typeof puOrientations)[number];

export type PuVariantValue =
  | PuTone
  | PuStatusTone
  | PuSurfaceTone
  | PuSize
  | PuExtendedSize
  | PuDensity
  | PuAlign
  | PuLayout
  | PuGap
  | PuOrientation;

