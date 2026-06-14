import { computed, useAttrs } from "vue";

export type PuNativeAriaInvalidValue =
  | boolean
  | "true"
  | "false"
  | "grammar"
  | "spelling"
  | undefined;

export type PuNativeAriaBooleanishValue =
  | boolean
  | "true"
  | "false"
  | undefined;

export function useNativeControlAttrs() {
  const attrs = useAttrs();

  const rootAttrs = computed(() => ({
    class: attrs.class,
    style: attrs.style,
  }));

  const controlAttrs = computed(() => {
    const { class: _class, style: _style, ...rest } = attrs;
    return rest;
  });

  return {
    rootAttrs,
    controlAttrs,
  };
}
