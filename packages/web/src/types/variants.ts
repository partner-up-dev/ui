export const puTones = [
  "neutral",
  "primary",
  "secondary",
  "tertiary",
  "danger",
] as const;

/**
 * Semantic color role for a component.
 *
 * Tone answers "what product intent does this UI express?". It must not encode
 * visual treatment such as outline, ghost, dashed, or surface depth. Use
 * `PuStatusTone` for informational lifecycle states and `PuControlVariant` or
 * `PuContainerVariant` for rendering treatment.
 */
export type PuTone = (typeof puTones)[number];

export const puStatusTones = ["info", "success", "warning", "error"] as const;

/**
 * Semantic status role for system feedback.
 *
 * Status tone is for stateful messages such as validation, process result, or
 * alert feedback. Use `PuTone` "danger" for destructive or risky actions; use
 * `PuStatusTone` "error" for an error state that already happened.
 */
export type PuStatusTone = (typeof puStatusTones)[number];

export const puSurfaceLevels = [
  "plain",
  "surface",
  "section",
  "inset-high",
] as const;

/**
 * Neutral surface depth for page and content structure.
 *
 * Surface level answers "where does this container sit in the page stack?" and
 * is intentionally neutral. It should not change semantic color intent. If a
 * component also supports primary/secondary emphasis, model that through
 * `PuTone` and keep surface depth separate.
 */
export type PuSurfaceLevel = (typeof puSurfaceLevels)[number];

export const puContainerVariants = [
  "plain",
  "soft",
  "outline",
  "solid",
] as const;

/**
 * Visual treatment for content containers.
 *
 * Container variant answers "how strong is this surface treatment?". It can be
 * combined with `PuTone` when a component owns both semantic emphasis and
 * container rendering. Use `PuSurfaceLevel` for neutral page depth instead.
 */
export type PuContainerVariant = (typeof puContainerVariants)[number];

export const puSizes = ["sm", "md", "lg"] as const;

export type PuSize = (typeof puSizes)[number];

export const puShapes = ["rect", "pill", "circle"] as const;

/**
 * Geometry shape for bounded controls and media.
 *
 * `rect` uses the component's normal radius, `pill` uses a capsule-like radius
 * that preserves the component's natural width, and `circle` is reserved for
 * square icon/avatar surfaces that intentionally become round.
 */
export type PuShape = (typeof puShapes)[number];

export const puControlVariants = [
  "solid",
  "soft",
  "outline",
  "ghost",
  "dashed",
] as const;

/**
 * Visual treatment for interactive controls.
 *
 * Control variant answers "how is the control rendered?". Values such as
 * outline, ghost, and dashed belong here, not in `PuTone`.
 */
export type PuControlVariant = (typeof puControlVariants)[number];

export const puFieldVariants = ["line", "borderless", "outline"] as const;

/**
 * Visual treatment for form field controls.
 *
 * Field variant answers "how is this input shell drawn?". It is separate from
 * container and action variants because field controls have a distinct baseline:
 * underline-only, no visible frame, or a bounded outline shell.
 */
export type PuFieldVariant = (typeof puFieldVariants)[number];

export const puExtendedSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export type PuExtendedSize = (typeof puExtendedSizes)[number];

export const puDensities = ["compact", "comfortable"] as const;

export type PuDensity = (typeof puDensities)[number];

export const puAligns = ["start", "center", "end"] as const;

export type PuAlign = (typeof puAligns)[number];

export const puLayouts = ["stack", "inline", "grid"] as const;

export type PuLayout = (typeof puLayouts)[number];

export const puSpacings = ["none", "xs", "sm", "md", "lg"] as const;

/**
 * Shared spacing scale for component-owned layout properties.
 *
 * Use concrete prop names such as `padding` or `gap`; `PuSpacing` only names
 * the scale values those props share.
 */
export type PuSpacing = (typeof puSpacings)[number];

export const puGaps = puSpacings;

export type PuGap = (typeof puGaps)[number];

export const puBreakpoints = ["sm", "md", "lg", "xl", "2xl"] as const;

export type PuBreakpoint = (typeof puBreakpoints)[number];

export const puBreakpointValues: Record<PuBreakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const puOrientations = ["horizontal", "vertical"] as const;

export type PuOrientation = (typeof puOrientations)[number];

export type PuVariantValue =
  | PuTone
  | PuStatusTone
  | PuSize
  | PuShape
  | PuControlVariant
  | PuFieldVariant
  | PuContainerVariant
  | PuSurfaceLevel
  | PuExtendedSize
  | PuDensity
  | PuAlign
  | PuLayout
  | PuSpacing
  | PuGap
  | PuBreakpoint
  | PuOrientation;
