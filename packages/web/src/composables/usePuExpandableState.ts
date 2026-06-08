import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";
import type { PuExpansionResetKey } from "../types";

export type PuExpandableStateOptions = {
  expanded: MaybeRefOrGetter<boolean | undefined>;
  defaultExpanded: MaybeRefOrGetter<boolean>;
  resetKey: MaybeRefOrGetter<PuExpansionResetKey>;
  onUpdate?: (value: boolean) => void;
  onExpand?: () => void;
  onCollapse?: () => void;
};

export function usePuExpandableState(options: PuExpandableStateOptions) {
  const internalExpanded = ref(toValue(options.defaultExpanded));
  const isControlled = computed(() => toValue(options.expanded) !== undefined);
  const isExpanded = computed(() =>
    isControlled.value ? Boolean(toValue(options.expanded)) : internalExpanded.value,
  );

  watch(
    () => toValue(options.defaultExpanded),
    (value) => {
      if (!isControlled.value) {
        internalExpanded.value = value;
      }
    },
  );

  watch(
    () => toValue(options.resetKey),
    () => {
      if (!isControlled.value) {
        internalExpanded.value = toValue(options.defaultExpanded);
      }
    },
  );

  function setExpanded(value: boolean): void {
    if (!isControlled.value) {
      internalExpanded.value = value;
    }

    options.onUpdate?.(value);
    if (value) {
      options.onExpand?.();
    } else {
      options.onCollapse?.();
    }
  }

  function toggleExpanded(): void {
    setExpanded(!isExpanded.value);
  }

  return {
    isControlled,
    isExpanded,
    setExpanded,
    toggleExpanded,
  };
}
