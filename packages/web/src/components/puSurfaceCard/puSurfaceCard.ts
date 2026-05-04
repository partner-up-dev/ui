import { makeStringProp } from "../../utils/props";

export type PuSurfaceCardTone = "section" | "inset-high" | "outline";
export type PuSurfaceCardGap = "none" | "xs" | "sm" | "md" | "lg";

export const puSurfaceCardProps = {
  as: makeStringProp("section"),
  tone: makeStringProp<PuSurfaceCardTone>("section"),
  gap: makeStringProp<PuSurfaceCardGap>("sm"),
};

