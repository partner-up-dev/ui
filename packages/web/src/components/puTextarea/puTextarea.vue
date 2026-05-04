<template>
  <div
    class="pu-textarea"
    :class="{
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-focused': isFocused,
      [`theme-${theme}`]: true,
    }"
    :style="[rootStyle, props.customStyle]"
  >
    <div class="field">
      <textarea
        ref="textareaRef"
        class="inner"
        :class="{
          focused: isFocused,
        }"
        :value="textValue"
        :placeholder="placeholder"
        :maxlength="normalizedMaxlength"
        :disabled="disabled"
        :readonly="readonly"
        :rows="1"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @keydown.enter="onConfirm"
      />

      <!-- 计数器 -->
      <div v-if="showCount && normalizedMaxlength > -1" class="count">
        <span>{{ countText }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PuTextarea",
};
</script>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { puTextareaProps, puTextareaEmits } from "./puTextarea";

const props = defineProps(puTextareaProps);
const emit = defineEmits(puTextareaEmits);

const isFocused = ref(false);
const textValue = ref<string>(props.modelValue);
const textareaRef = ref<HTMLTextAreaElement>();

watch(() => props.modelValue, (newVal) => {
  textValue.value = newVal;
  nextTick(syncAutoHeight);
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
  syncAutoHeight();
  emit("update:modelValue", v);
  emit("input", v);
}
function onConfirm(e: any) {
  emit("confirm", e);
}

function syncAutoHeight() {
  if (!props.autoHeight || !textareaRef.value) return;
  const target = textareaRef.value;
  target.style.height = "auto";
  target.style.height = `${target.scrollHeight}px`;
  emit("linechange", {
    height: target.scrollHeight,
    heightRpx: target.scrollHeight,
    lineCount: textValue.value.split("\n").length,
  });
}

watch(
  () => props.focus,
  (newVal) => {
    if (newVal) nextTick(() => textareaRef.value?.focus());
    else textareaRef.value?.blur();
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped src="./puTextarea.scss"></style>
