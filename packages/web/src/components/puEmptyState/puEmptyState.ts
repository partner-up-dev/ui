import type { PropType } from "vue";
import { puSurfaceTones, type PuAlign, type PuSurfaceTone } from "../../types";
import { makeBooleanProp, makeStringProp } from "../../utils/props";

export const puEmptyStateAligns = ["start", "center"] as const;

export type PuEmptyStateAlign = Extract<PuAlign, "start" | "center">;
export type PuEmptyStateTone = PuSurfaceTone;

export const puEmptyStateProps = {
  as: makeStringProp("section"),
  title: makeStringProp<string | undefined>(undefined),
  description: makeStringProp<string | undefined>(undefined),
  icon: makeStringProp<string | undefined>(undefined),
  compact: makeBooleanProp(false),
  align: {
    type: String as PropType<PuEmptyStateAlign>,
    default: "center",
    validator: (value: string) => puEmptyStateAligns.includes(value as PuEmptyStateAlign),
  },
  tone: {
    type: String as PropType<PuEmptyStateTone>,
    default: "section",
    validator: (value: string) => puSurfaceTones.includes(value as PuSurfaceTone),
  },
};
