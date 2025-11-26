<template>
  <view
    class="pu-textarea"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-focused': isFocused,
      [`theme-${theme}`]: true,
    }"
    :style="rootStyle"
  >
    <view class="field">
      <textarea
        class="inner"
        :class="{
          focused: isFocused,
        }"
        placeholder-class="pu-textarea-placeholder"
        :value="textValue"
        :placeholder="placeholder"
        :maxlength="normalizedMaxlength"
        :auto-height="autoHeight"
        :disabled="disabled"
        :focus="focus"
        :confirm-type="confirmType"
        :show-confirm-bar="showConfirmBar"
        :hold-keyboard="holdKeyboard"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjustPosition"
        :fixed="fixed"
        :disable-default-padding="disableDefaultPadding"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @confirm="onConfirm"
        @linechange="onLinechange"
      />

      <!-- 计数器 -->
      <view v-if="showCount && normalizedMaxlength > -1" class="count">
        <text>{{ countText }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { BasicComponentOptions } from "@/utils/vue";
export default {
  name: "PuTextarea",
  options: BasicComponentOptions,
};
</script>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { puTextareaProps, puTextareaEmits } from "./puTextarea";

const props = defineProps(puTextareaProps);
const emit = defineEmits(puTextareaEmits);

const isFocused = ref(false);
const textValue = ref<string>(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  textValue.value = newVal;
});

const normalizedMaxlength = computed(() => {
  const n = Number(props.maxlength);
  return Number.isNaN(n) ? -1 : n;
});

const countText = computed(
  () => `${textValue.value.length}/${normalizedMaxlength.value}`
);

const rootStyle = computed(() => {
  const base: Record<string, string> = {};
  base["--pu-textarea-min-height"] = `${props.height}px`;
  base["--pu-textarea-min-height-focus"] = `${
    props.focusHeight ?? props.height
  }px`;
  if (props.customStyle) base["cssText" as any] = props.customStyle as any;
  return base;
});

function onFocus(e: any) {
  isFocused.value = true;
  emit("focus", e);
}
function onBlur(e: any) {
  isFocused.value = false;
  emit("blur", e);
}
function onInput(e: any) {
  const v = (e?.detail?.value ?? e?.target?.value ?? "") as string;
  textValue.value = v;
  emit("update:modelValue", v);
  emit("input", v);
}
function onConfirm(e: any) {
  emit("confirm", e);
}
function onLinechange(e: any) {
  emit("linechange", e);
}
</script>

<style lang="scss" scoped src="./puTextarea.scss"></style>
