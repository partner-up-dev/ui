import type { ComputedRef, InjectionKey, Ref } from "vue";
import type {
  PuControlVariant,
  PuDensity,
  PuOrientation,
  PuSize,
  PuTone,
} from "../../types";
import type {
  PuSegmentedActivation,
  PuSegmentedSemantics,
  PuSegmentedValue,
} from "./puSegmented";

export type PuSegmentedItemRegistration = {
  id: string;
  value: ComputedRef<PuSegmentedValue>;
  disabled: ComputedRef<boolean>;
  element: Ref<HTMLButtonElement | null>;
};

export type PuSegmentedContext = {
  selectedValue: ComputedRef<PuSegmentedValue | undefined>;
  semantics: ComputedRef<PuSegmentedSemantics>;
  activation: ComputedRef<PuSegmentedActivation>;
  disabled: ComputedRef<boolean>;
  orientation: ComputedRef<PuOrientation>;
  size: ComputedRef<PuSize>;
  density: ComputedRef<PuDensity>;
  tone: ComputedRef<PuTone>;
  variant: ComputedRef<PuControlVariant>;
  registerItem: (item: PuSegmentedItemRegistration) => void;
  unregisterItem: (id: string) => void;
  isSelected: (value: PuSegmentedValue) => boolean;
  getItemTabIndex: (value: PuSegmentedValue, disabled: boolean) => number;
  selectValue: (value: PuSegmentedValue) => void;
  handleItemKeydown: (value: PuSegmentedValue, event: KeyboardEvent) => void;
};

export const puSegmentedKey: InjectionKey<PuSegmentedContext> =
  Symbol("PuSegmented");
