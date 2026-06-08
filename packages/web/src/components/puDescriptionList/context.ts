import type { ComputedRef, InjectionKey } from "vue";
import type {
  PuAlign,
  PuDensity,
  PuLayout,
  PuSurfaceLevel,
} from "../../types";

export type PuDescriptionLabelAlign = Extract<PuAlign, "start" | "end">;

export type PuDescriptionListContext = {
  layout: ComputedRef<PuLayout>;
  density: ComputedRef<PuDensity>;
  surfaceLevel: ComputedRef<PuSurfaceLevel>;
  dividers: ComputedRef<boolean>;
  labelWidth: ComputedRef<string>;
  labelAlign: ComputedRef<PuDescriptionLabelAlign>;
  columns: ComputedRef<1 | 2>;
  collapseOnMobile: ComputedRef<boolean>;
  emptyText: ComputedRef<string>;
};

export const puDescriptionListKey: InjectionKey<PuDescriptionListContext> =
  Symbol("PuDescriptionList");
