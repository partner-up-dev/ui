<template>
  <div class="pu-description-item" :class="rootClasses" :style="rootStyle">
    <dt v-if="shouldRenderLabelRow" class="pu-description-item__label">
      <div class="pu-description-item__label-row">
        <span v-if="hasLabel" class="pu-description-item__label-text">
          <slot name="label">
            {{ props.label }}
          </slot>
        </span>
        <div v-if="hasSuffix && placesAffordanceInLabelRow" class="pu-description-item__suffix">
          <slot name="suffix" />
        </div>
        <div v-if="hasAction && placesAffordanceInLabelRow" class="pu-description-item__action">
          <slot name="action" />
        </div>
      </div>
    </dt>

    <dd class="pu-description-item__content">
      <div v-if="shouldRenderPlainValue" class="pu-description-item__value">
        <slot>
          {{ displayValue }}
        </slot>
      </div>

      <div v-if="shouldRenderAffordanceValue" class="pu-description-item__affordance-value">
        <div v-if="hasSuffix" class="pu-description-item__suffix">
          <slot name="suffix" />
        </div>
        <div v-if="hasAction" class="pu-description-item__action">
          <slot name="action" />
        </div>
      </div>

      <div v-if="hasHint" class="pu-description-item__hint">
        <slot name="hint">
          {{ props.hint }}
        </slot>
      </div>
    </dd>
  </div>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuDescriptionItem",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, inject, useSlots } from "vue";
import {
  puAligns,
  puDensities,
  puLayouts,
  puSpacings,
  type PuAlign,
  type PuDensity,
  type PuLayout,
  type PuSpacing,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puDescriptionListKey, type PuDescriptionLabelAlign } from "../puDescriptionList/context";
import { puDescriptionLabelAligns } from "../puDescriptionList/puDescriptionList";
import { puDescriptionItemProps, type PuDescriptionItemSpan } from "./puDescriptionItem";

type PuDescriptionItemInternalLayout = Extract<PuLayout, "stack" | "inline">;

const props = defineProps(puDescriptionItemProps);
const slots = useSlots();
const listContext = inject(puDescriptionListKey, null);

const listLayout = computed<PuLayout>(() =>
  listContext
    ? listContext.layout.value
    : normalizePuVariant(puLayouts, "stack", "stack"),
);
const itemLayout = computed<PuDescriptionItemInternalLayout>(() =>
  listLayout.value === "stack" ? "stack" : "inline",
);
const density = computed<PuDensity>(() =>
  listContext
    ? listContext.density.value
    : normalizePuVariant(puDensities, "comfortable", "comfortable"),
);
const padding = computed<PuSpacing | undefined>(() =>
  props.padding
    ? normalizePuVariant(puSpacings, props.padding, "md")
    : undefined,
);
const labelAlign = computed<PuDescriptionLabelAlign>(() =>
  listContext
    ? listContext.labelAlign.value
    : normalizePuVariant(puDescriptionLabelAligns, "start", "start"),
);
const valueAlign = computed<PuAlign>(() =>
  normalizePuVariant(
    puAligns,
    props.valueAlign,
    itemLayout.value === "stack" ? "start" : "end",
  ),
);
const span = computed<PuDescriptionItemSpan>(() => (props.span === 2 ? 2 : 1));
const labelWidth = computed(() => listContext?.labelWidth.value ?? "7rem");
const emptyText = computed(() => props.emptyText ?? listContext?.emptyText.value ?? "-");

const hasLabel = computed(() => Boolean(slots.label) || Boolean(props.label));
const hasHint = computed(() => Boolean(slots.hint) || Boolean(props.hint));
const hasSuffix = computed(() => Boolean(slots.suffix));
const hasAction = computed(() => Boolean(slots.action));
const hasValue = computed(
  () =>
    Boolean(slots.default) ||
    (props.value !== null &&
      props.value !== undefined &&
      String(props.value).length > 0),
);
const displayValue = computed(() => (hasValue.value ? props.value : emptyText.value));
const placesAffordanceInLabelRow = computed(
  () => itemLayout.value === "stack",
);
const placesAffordanceInDefinition = computed(
  () => !placesAffordanceInLabelRow.value,
);
const hasAffordance = computed(() => hasSuffix.value || hasAction.value);
const shouldRenderLabelRow = computed(
  () => hasLabel.value || (placesAffordanceInLabelRow.value && hasAffordance.value),
);
const shouldRenderAffordanceValue = computed(
  () => placesAffordanceInDefinition.value && hasAffordance.value,
);
const shouldRenderPlainValue = computed(
  () =>
    !shouldRenderAffordanceValue.value &&
    (hasValue.value || !hasAffordance.value),
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-description-item", "layout", itemLayout.value),
  createPuModifierClass("pu-description-item", "density", density.value),
  createPuModifierClass("pu-description-item", "padding", padding.value),
  createPuModifierClass("pu-description-item", "label-align", labelAlign.value),
  createPuModifierClass("pu-description-item", "value-align", valueAlign.value),
  createPuModifierClass("pu-description-item", "span", span.value),
  createPuStateClass("empty", !hasValue.value && !hasAffordance.value),
  createPuStateClass("has-hint", hasHint.value),
]);

const rootStyle = computed(() => ({
  "--pu-description-item-label-width": labelWidth.value,
}));
</script>

<style lang="scss" scoped src="./puDescriptionItem.scss"></style>
