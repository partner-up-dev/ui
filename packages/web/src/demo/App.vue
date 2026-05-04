<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const checked = ref(false)
const pickerValue = ref('')
const drawerVisible = ref(false)

const pickerColumns = [
  { label: '杭州', value: 'hangzhou' },
  { label: '上海', value: 'shanghai' },
  { label: '北京', value: 'beijing' }
]
</script>

<template>
  <main class="demo">
    <section class="demo__section">
      <h1>PartnerUp Design Web</h1>
      <p>Vue web implementation using the mvp-HA token/style layer.</p>
    </section>

    <section class="demo__section">
      <PuButton text="Open Drawer" @click="drawerVisible = true" />
      <PuButton text="Surface" theme="Surface" />
      <PuTag text="Tag" rounded />
    </section>

    <section class="demo__section">
      <PuInput v-model="inputValue" label="昵称" placeholder="输入昵称" clearable />
      <PuTextarea v-model="inputValue" placeholder="补充说明" show-count :maxlength="80" />
      <PuCheckbox v-model="checked" label="同意规则" />
      <PuPicker v-model="pickerValue" label="城市" :columns="pickerColumns" clearable />
    </section>

    <section class="demo__section">
      <PuNoticeBar text="这是一条 Web 版 NoticeBar" prefix="information-outline" closeable />
      <PuAccordion v-model="checked" title="Accordion" content="这段内容用于验证折叠组件在 Web 中的基础行为。" />
    </section>

    <PuDrawer v-model:visible="drawerVisible" title="Drawer">
      <p>Drawer content rendered with web DOM.</p>
    </PuDrawer>
  </main>
</template>

<style scoped lang="scss">
.demo {
  width: min(100%, 48rem);
  margin: 0 auto;
  padding: var(--sys-spacing-large);
  color: var(--sys-color-on-surface);
}

.demo__section {
  display: grid;
  gap: var(--sys-spacing-small);
  margin-bottom: var(--sys-spacing-large);
}

h1,
p {
  margin: 0;
}
</style>
