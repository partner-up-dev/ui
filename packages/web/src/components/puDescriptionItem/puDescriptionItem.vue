<template>
  <div class="pu-description-item" :class="rootClasses" :style="rootStyle">
    <dt v-if="hasLabel" class="pu-description-item__label">
      <div class="pu-description-item__label-row">
        <span class="pu-description-item__label-text">
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
      <div v-if="shouldRenderValueRow" class="pu-description-item__value-row">
        <div v-if="shouldRenderValue" class="pu-description-item__value">
          <slot>
            {{ displayValue }}
          </slot>
        </div>
        <div v-if="hasSuffix && placesAffordanceInValueRow" class="pu-description-item__suffix">
          <slot name="suffix" />
        </div>
        <div v-if="hasAction && placesAffordanceInValueRow" class="pu-description-item__action">
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
  type PuAlign,
  type PuDensity,
  type PuLayout,
} from "../../types";
import {
  createPuModifierClass,
  createPuStateClass,
  normalizePuVariant,
} from "../../utils";
import { puDescriptionListKey, type PuDescriptionLabelAlign } from "../puDescriptionList/context";
import { puDescriptionLabelAligns } from "../puDescriptionList/puDescriptionList";
import { puDescriptionItemProps, type PuDescriptionItemSpan } from "./puDescriptionItem";

const props = defineProps(puDescriptionItemProps);
const slots = useSlots();
const listContext = inject(puDescriptionListKey, null);

const layout = computed<PuLayout>(() =>
  listContext
    ? listContext.layout.value
    : normalizePuVariant(puLayouts, "stack", "stack"),
);
const density = computed<PuDensity>(() =>
  listContext
    ? listContext.density.value
    : normalizePuVariant(puDensities, "comfortable", "comfortable"),
);
const labelAlign = computed<PuDescriptionLabelAlign>(() =>
  listContext
    ? listContext.labelAlign.value
    : normalizePuVariant(puDescriptionLabelAligns, "start", "start"),
);
const valueAlign = computed<PuAlign>(() =>
  normalizePuVariant(puAligns, props.valueAlign, "start"),
);
const span = computed<PuDescriptionItemSpan>(() => (props.span === 2 ? 2 : 1));
const labelWidth = computed(() => listContext?.labelWidth.value ?? "7rem");
const collapseOnMobile = computed(
  () => listContext?.collapseOnMobile.value ?? true,
);
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
const shouldRenderValue = computed(() => hasValue.value || !hasAction.value);
const placesAffordanceInLabelRow = computed(
  () => layout.value === "stack" && hasLabel.value,
);
const placesAffordanceInValueRow = computed(
  () => !placesAffordanceInLabelRow.value,
);
const hasValueRowAffordance = computed(
  () => placesAffordanceInValueRow.value && (hasSuffix.value || hasAction.value),
);
const shouldRenderValueRow = computed(
  () => shouldRenderValue.value || hasValueRowAffordance.value,
);

const rootClasses = computed(() => [
  createPuModifierClass("pu-description-item", "layout", layout.value),
  createPuModifierClass("pu-description-item", "density", density.value),
  createPuModifierClass("pu-description-item", "label-align", labelAlign.value),
  createPuModifierClass("pu-description-item", "value-align", valueAlign.value),
  createPuModifierClass("pu-description-item", "span", span.value),
  createPuStateClass("collapse-on-mobile", collapseOnMobile.value),
  createPuStateClass("empty", !hasValue.value),
]);

const rootStyle = computed(() => ({
  "--pu-description-item-label-width": labelWidth.value,
}));
</script>

<style lang="scss" scoped src="./puDescriptionItem.scss"></style>
