<template>
  <div
    :class="`pu-accordion-item ${disabled ? 'is-disabled' : ''}`"
  >
    <button
      :id="triggerId"
      type="button"
      :class="`pu-accordion-item__header ${expanded ? 'is-expanded' : ''} ${
        isFirst ? 'pu-accordion-item__header-first' : ''
      } ${$slots.title ? 'is-custom' : ''}`"
      :disabled="disabled"
      :aria-expanded="expanded"
      :aria-controls="contentId"
      @click="handleClick"
    >
      <slot
        name="title"
        :expanded="expanded"
        :disabled="disabled"
        :isFirst="isFirst"
      >
        <span class="pu-accordion-item__title">{{ title }}</span>
        <span
          :class="`pu-accordion-item__arrow ${
            expanded ? 'is-retract' : ''
          } i-mdi-chevron-down`"
        />
      </slot>
    </button>
    <div
      class="pu-accordion-item__wrapper"
      :style="contentStyle"
      @transitionend="handleTransitionEnd"
    >
      <div
        ref="bodyRef"
        :id="contentId"
        class="pu-accordion-item__body"
        :class="customBodyClass"
        :style="customBodyStyle"
        role="region"
        :aria-labelledby="triggerId"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PuAccordionItem",
};
</script>

<script setup lang="ts">
import { computed, inject, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { usePuId } from "../../composables";
import {
  puAccordionItemProps,
  puAccordionItemEmits,
  type PuAccordionItemExpose,
} from "./puAccordionItem";
import { PUACCORDION_KEY } from "./puAccordion";

const props = defineProps(puAccordionItemProps);
const emit = defineEmits(puAccordionItemEmits);

const accordion = inject(PUACCORDION_KEY, null);
const baseId = usePuId("pu-accordion-item");
const triggerId = computed(() => `${baseId.value}-trigger`);
const contentId = computed(() => `${baseId.value}-content`);

const height = ref<string | number>("");
const inited = ref<boolean>(false);
const expanded = ref<boolean>(false);
const index = ref<number>(0);
const bodyRef = ref<HTMLElement>();
let unregister: (() => void) | undefined;

const isFirst = computed(() => {
  return index.value === 0;
});

const contentStyle = computed(() => {
  const styles: Record<string, string> = {};
  if (inited.value) {
    styles.transition = "height 0.3s ease-in-out";
  }
  if (!expanded.value) {
    styles.height = "0px";
  } else if (height.value) {
    styles.height =
      typeof height.value === "number" ? `${height.value}px` : height.value;
  }
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
});

const isSelected = computed(() => {
  const modelValue = accordion ? accordion.props.modelValue || [] : [];
  const { name } = props;
  return (
    (typeof modelValue === "string" && modelValue === name) ||
    (Array.isArray(modelValue) && modelValue.indexOf(name as string) >= 0)
  );
});

watch(
  () => isSelected.value,
  (newVal) => {
    updateExpand(newVal);
  }
);

onMounted(() => {
  if (accordion?.register) {
    unregister = accordion.register({
      name: props.name,
      disabled: props.disabled,
      getExpanded,
    });
  }
  updateExpand(isSelected.value);
});

onBeforeUnmount(() => {
  unregister?.();
});

async function updateExpand(useBeforeExpand: boolean = true) {
  try {
    if (useBeforeExpand) {
      await handleBeforeExpand();
    }
    initRect();
  } catch (error) {
    /* empty */
  }
}

function initRect() {
  nextTick(() => {
    const nextExpanded = isSelected.value;
    if (bodyRef.value) {
      height.value = `${bodyRef.value.scrollHeight}px`;
    }
    expanded.value = nextExpanded;
    if (!inited.value) {
      inited.value = true;
    }
  });
}

function handleTransitionEnd() {
  if (expanded.value) {
    height.value = "";
  }
}

async function handleClick() {
  if (props.disabled) return;
  try {
    await updateExpand();
    const { name } = props;
    accordion && accordion.toggle(name, !expanded.value);
  } catch (error) {
    /* empty */
  }
}

function handleBeforeExpand() {
  return new Promise<void>((resolve, reject) => {
    const { name } = props;
    const nextExpanded = !expanded.value;
    if (nextExpanded && props.beforeExpand) {
      const response = props.beforeExpand(name);
      if (!response) {
        reject();
      }
      if (response instanceof Promise) {
        response.then(() => resolve()).catch(reject);
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}

function getExpanded() {
  return expanded.value;
}

defineExpose<PuAccordionItemExpose>({ getExpanded, updateExpand });
</script>

<style lang="scss" scoped src="./puAccordionItem.scss"></style>
