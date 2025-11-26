<template>
  <view
    :class="`pu-accordion ${viewmore ? 'is-viewmore' : ''} ${customClass}`"
    :style="customStyle"
  >
    <!-- 普通或手风琴模式 -->
    <block v-if="!viewmore">
      <slot></slot>
    </block>
    <!-- 查看更多模式 -->
    <view v-else>
      <view
        :class="`pu-accordion__content ${!modelValue ? 'is-retract' : ''}`"
        :style="`-webkit-line-clamp: ${contentLineNum}; -webkit-box-orient: vertical`"
      >
        <slot></slot>
      </view>
      <view class="pu-accordion__more" @click="handleMore">
        <!-- 自定义展开按钮 -->
        <view v-if="useMoreSlot" :class="customMoreSlotClass">
          <slot name="more"></slot>
        </view>
        <!-- 显示展开或折叠按钮 -->
        <block v-else>
          <text class="pu-accordion__more-txt">
            {{ !modelValue ? "展开" : "收起" }}
          </text>
          <view :class="`pu-accordion__arrow ${modelValue ? 'is-retract' : ''}`">
            <text class="i-mdi-chevron-down"></text>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { BasicComponentOptions } from "@/utils/vue";

export default {
  name: "PuAccordion",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { onBeforeMount, provide, ref, watch } from "vue";
import {
  puAccordionProps,
  puAccordionEmits,
  PUACCORDION_KEY,
  type AccordionToggleAllOptions,
  type PuAccordionExpose,
} from "./puAccordion";

const props = defineProps(puAccordionProps);
const emit = defineEmits(puAccordionEmits);

const contentLineNum = ref<number>(0);
const children = ref<any[]>([]);

// 提供上下文给子组件
provide(PUACCORDION_KEY, {
  props,
  toggle,
});

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (newVal) => {
    const { viewmore, accordion } = props;
    if (accordion && typeof newVal !== "string") {
      console.error("[PuAccordion] accordion modelValue must be string");
    } else if (!accordion && !viewmore && !Array.isArray(newVal)) {
      console.error("[PuAccordion] modelValue must be Array in normal mode");
    }
  },
  { deep: true }
);

// 监听 lineNum 变化
watch(
  () => props.lineNum,
  (newVal) => {
    if (newVal <= 0) {
      console.error("[PuAccordion] lineNum must be greater than 0");
    }
  },
  { deep: true, immediate: true }
);

onBeforeMount(() => {
  const { lineNum, viewmore, modelValue } = props;
  contentLineNum.value = viewmore && !modelValue ? lineNum : 0;
});

function updateChange(activeNames: string | string[] | boolean) {
  emit("update:modelValue", activeNames);
  emit("change", {
    value: activeNames,
  });
}

function toggle(name: string, expanded: boolean) {
  const { accordion, modelValue } = props;
  if (accordion) {
    updateChange(name === modelValue ? "" : name);
  } else if (expanded) {
    updateChange((modelValue as string[]).concat(name));
  } else {
    updateChange(
      (modelValue as string[]).filter((activeName) => activeName !== name)
    );
  }
}

const toggleAll = (options: AccordionToggleAllOptions = {}) => {
  if (props.accordion) {
    console.warn("[PuAccordion] toggleAll is not supported in accordion mode");
    return;
  }

  if (typeof options === "boolean") {
    options = { expanded: options };
  }

  const { expanded, skipDisabled } = options;
  const names: string[] = [];

  children.value.forEach((item, index) => {
    if (item.disabled && skipDisabled) {
      if (item.getExpanded && item.getExpanded()) {
        names.push(item.name || index.toString());
      }
    } else if (
      expanded !== undefined
        ? expanded
        : !(item.getExpanded && item.getExpanded())
    ) {
      names.push(item.name || index.toString());
    }
  });

  updateChange(names);
};

function handleMore() {
  emit("update:modelValue", !props.modelValue);
  emit("change", {
    value: !props.modelValue,
  });
}

defineExpose<PuAccordionExpose>({
  toggleAll,
});
</script>

<style lang="scss" scoped src="./puAccordion.scss"></style>
