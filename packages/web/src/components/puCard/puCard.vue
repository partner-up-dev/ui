<template>
  <component
    :is="rootComponent"
    class="pu-card"
    :class="cardClasses"
    v-bind="rootAttrs"
    :aria-labelledby="cardLabelledBy"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div v-if="hasHero" class="pu-card__hero">
      <slot name="hero" />
    </div>

    <div
      v-if="hasHeader || props.collapsible"
      class="pu-card__header"
      :class="{ 'pu-card__header--toggle-only': !hasHeader }"
    >
      <div v-if="hasHeader" class="pu-card__header-content">
        <slot name="header" />
      </div>
      <div v-else class="pu-card__header-content">
        <h3 v-if="props.title" :id="titleId" class="pu-card__title">
          {{ props.title }}
        </h3>
        <span v-else :id="titleId" class="pu-card__title">
          {{ props.toggleLabel }}
        </span>
        <p v-if="props.subtitle" class="pu-card__subtitle">
          {{ props.subtitle }}
        </p>
      </div>

      <button
        v-if="props.collapsible"
        type="button"
        class="pu-card__toggle"
        :aria-expanded="isExpanded"
        :aria-label="props.toggleLabel"
        @click.stop="toggleExpanded"
      >
        <span
          class="i-mdi-chevron-down pu-card__toggle-icon"
          :class="{ 'is-expanded': isExpanded }"
          aria-hidden="true"
        ></span>
      </button>
    </div>

    <div
      v-if="props.keepContentMounted && hasBody"
      class="pu-card__body pu-card__body--mounted"
      :class="{ 'is-collapsed': bodyCollapsed }"
      :aria-hidden="bodyCollapsed ? 'true' : undefined"
      :inert="bodyCollapsed ? true : undefined"
    >
      <div class="pu-card__body-mounted-inner">
        <div v-if="hasDefault" class="pu-card__content">
          <slot />
        </div>

        <div v-if="hasFooter" class="pu-card__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>

    <Transition v-else name="pu-card-body">
      <div v-if="bodyVisible" class="pu-card__body">
        <div v-if="hasDefault" class="pu-card__content">
          <slot />
        </div>

        <div v-if="hasFooter" class="pu-card__footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </component>
</template>

<script lang="ts">
import { BasicComponentOptions } from "../../utils/vue";

export default {
  name: "PuCard",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { usePuExpandableState, usePuId } from "../../composables";
import type {
  PuAction,
  PuExpandablePolicy,
  PuHrefAction,
  PuRouteAction,
} from "../../types";
import { puCardEmits, puCardProps } from "./puCard";

const props = defineProps(puCardProps);
const emit = defineEmits(puCardEmits);
const slots = useSlots();

const baseId = usePuId("pu-card");
const titleId = computed(() => `${baseId.value}-title`);
const expandablePolicy = computed<PuExpandablePolicy>(() => ({
  expanded: props.expanded,
  defaultExpanded: props.defaultExpanded,
  resetKey: props.expandedResetKey,
  keepContentMounted: props.keepContentMounted,
  toggleLabel: props.toggleLabel,
}));
const { isExpanded, toggleExpanded } = usePuExpandableState({
  expanded: () => expandablePolicy.value.expanded,
  defaultExpanded: () => expandablePolicy.value.defaultExpanded,
  resetKey: () => expandablePolicy.value.resetKey,
  onUpdate: (value) => emit("update:expanded", value),
  onExpand: () => emit("expand"),
  onCollapse: () => emit("collapse"),
});

const hasHero = computed(() => Boolean(slots.hero));
const hasHeader = computed(() => Boolean(slots.header));
const hasDefault = computed(() => Boolean(slots.default));
const hasFooter = computed(() => Boolean(slots.footer));
const hasBody = computed(() => hasDefault.value || hasFooter.value);
const effectiveTone = computed(() => props.theme ?? props.tone);
const isInteractive = computed(() => Boolean(props.action) || props.selectable);
const bodyCollapsed = computed(
  () => hasBody.value && props.collapsible && !isExpanded.value,
);

const bodyVisible = computed(
  () => hasBody.value && (!props.collapsible || isExpanded.value),
);

const cardLabelledBy = computed(() =>
  !hasHeader.value && props.title ? titleId.value : undefined,
);

const cardClasses = computed(() => [
  `pu-card--tone-${effectiveTone.value}`,
  `pu-card--padding-${props.padding}`,
  `pu-card--gap-${props.gap}`,
  {
    "pu-card--collapsible": props.collapsible,
    "pu-card--interactive": isInteractive.value,
    "is-active": props.active,
    "is-disabled": props.disabled,
    "is-expanded": props.collapsible && isExpanded.value,
    "has-hero": hasHero.value,
    "has-header": hasHeader.value,
    "has-footer": hasFooter.value,
  },
]);

const rootComponent = computed(() => {
  if (isRouteAction(props.action)) {
    return "RouterLink";
  }

  if (isHrefAction(props.action)) {
    return "a";
  }

  return props.as;
});

const rootAttrs = computed<Record<string, unknown>>(() => {
  const disabledAttrs = props.disabled
    ? {
        "aria-disabled": "true",
        tabindex: -1,
      }
    : {};

  if (isRouteAction(props.action)) {
    return {
      to: props.action.to,
      "aria-current": props.active ? "page" : undefined,
      ...disabledAttrs,
    };
  }

  if (isHrefAction(props.action)) {
    const target = props.action.target ?? (props.action.external ? "_blank" : undefined);
    const rel =
      props.action.rel ??
      (target === "_blank" ? "noopener noreferrer" : undefined);

    return {
      href: props.action.href,
      target,
      rel,
      "aria-current": props.active ? "page" : undefined,
      ...disabledAttrs,
    };
  }

  if (props.action || props.selectable) {
    return {
      role: "button",
      tabindex: props.disabled ? -1 : 0,
      "aria-disabled": props.disabled ? "true" : undefined,
      "aria-pressed": props.selectable ? String(props.active) : undefined,
    };
  }

  return {};
});

function isHrefAction(
  action: PuAction | undefined,
): action is PuHrefAction {
  return Boolean(action && "href" in action);
}

function isRouteAction(
  action: PuAction | undefined,
): action is PuRouteAction {
  return Boolean(action && "to" in action);
}

function handleClick(event: MouseEvent): void {
  if (!isInteractive.value) {
    return;
  }

  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  emit("click", event);
}

function handleKeydown(event: KeyboardEvent): void {
  if (!isInteractive.value || isHrefAction(props.action) || isRouteAction(props.action)) {
    return;
  }

  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();

  if (props.disabled) {
    return;
  }

  emit("click", event);
}
</script>

<style lang="scss" scoped src="./puCard.scss"></style>
