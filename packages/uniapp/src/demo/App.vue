<template>
  <div class="demo-app">
    <header class="demo-header">
      <h1>PartnerUp Design System Demo</h1>
      <div class="theme-toggle">
        <label>
          <input type="checkbox" @change="toggleTheme" :checked="theme === 'dark'" />
          Dark Mode
        </label>
      </div>
    </header>

    <main class="demo-content">
      <section class="demo-section">
        <h2>Colors</h2>
        <div class="color-grid">
          <div class="color-card" v-for="color in colors" :key="color.name">
            <div class="color-swatch" :style="{ backgroundColor: color.value }"></div>
            <div class="color-info">
              <div class="color-name">{{ color.name }}</div>
              <div class="color-var">{{ color.var }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Buttons</h2>
        <div class="button-grid">
          <PuButton variant="primary" size="small">Primary Small</PuButton>
          <PuButton variant="primary" size="medium">Primary Medium</PuButton>
          <PuButton variant="primary" size="large">Primary Large</PuButton>
          <PuButton variant="secondary" size="medium">Secondary</PuButton>
          <PuButton variant="outlined" size="medium">Outlined</PuButton>
          <PuButton variant="text" size="medium">Text</PuButton>
          <PuButton variant="primary" size="medium" disabled>Disabled</PuButton>
        </div>
      </section>

      <section class="demo-section">
        <h2>Typography</h2>
        <div class="typography-demo">
          <div class="typo-item"
            style="font-size: var(--sys-font-display-large-size); line-height: var(--sys-font-display-large-line-height);">
            Display Large
          </div>
          <div class="typo-item"
            style="font-size: var(--sys-font-headline-large-size); line-height: var(--sys-font-headline-large-line-height);">
            Headline Large
          </div>
          <div class="typo-item"
            style="font-size: var(--sys-font-title-large-size); line-height: var(--sys-font-title-large-line-height);">
            Title Large
          </div>
          <div class="typo-item"
            style="font-size: var(--sys-font-title-medium-size); line-height: var(--sys-font-title-medium-line-height);">
            Title Medium
          </div>
          <div class="typo-item"
            style="font-size: var(--sys-font-body-large-size); line-height: var(--sys-font-body-large-line-height);">
            Body Large
          </div>
          <div class="typo-item"
            style="font-size: var(--sys-font-label-large-size); line-height: var(--sys-font-label-large-line-height);">
            Label Large
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Spacing</h2>
        <div class="spacing-demo">
          <div class="spacing-item">
            <div class="spacing-box" style="width: var(--sys-spacing-xs); height: var(--sys-spacing-xs);"></div>
            <span>XS (4px)</span>
          </div>
          <div class="spacing-item">
            <div class="spacing-box" style="width: var(--sys-spacing-sm); height: var(--sys-spacing-sm);"></div>
            <span>SM (8px)</span>
          </div>
          <div class="spacing-item">
            <div class="spacing-box" style="width: var(--sys-spacing-med); height: var(--sys-spacing-med);"></div>
            <span>MED (16px)</span>
          </div>
          <div class="spacing-item">
            <div class="spacing-box" style="width: var(--sys-spacing-lg); height: var(--sys-spacing-lg);"></div>
            <span>LG (32px)</span>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>Shadows</h2>
        <div class="shadow-grid">
          <div class="shadow-card" style="box-shadow: var(--sys-shadow-1)">Level 1</div>
          <div class="shadow-card" style="box-shadow: var(--sys-shadow-2)">Level 2</div>
          <div class="shadow-card" style="box-shadow: var(--sys-shadow-3)">Level 3</div>
          <div class="shadow-card" style="box-shadow: var(--sys-shadow-4)">Level 4</div>
          <div class="shadow-card" style="box-shadow: var(--sys-shadow-6)">Level 6</div>
          <div class="shadow-card" style="box-shadow: var(--sys-shadow-8)">Level 8</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PuButton from '../components/puButton/puButton.vue'
import { setTheme, getTheme } from '../utils/tokens'

const theme = ref<'light' | 'dark' | 'auto'>('auto')

const colors = [
  { name: 'Primary', var: '--sys-color-primary', value: 'var(--sys-color-primary)' },
  { name: 'Secondary', var: '--sys-color-secondary', value: 'var(--sys-color-secondary)' },
  { name: 'Tertiary', var: '--sys-color-tertiary', value: 'var(--sys-color-tertiary)' },
  { name: 'Error', var: '--sys-color-error', value: 'var(--sys-color-error)' },
  { name: 'Warning', var: '--sys-color-warning', value: 'var(--sys-color-warning)' },
  { name: 'Surface', var: '--sys-color-surface', value: 'var(--sys-color-surface)' },
]

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  setTheme(theme.value)
}

onMounted(() => {
  theme.value = getTheme()
})
</script>

<style lang="scss" scoped>
.demo-app {
  min-height: 100vh;
  background-color: fn.sys-var(color, surface);
  color: fn.sys-var(color, on-surface);
}

.demo-header {
  background-color: fn.sys-var(color, primary);
  color: fn.sys-var(color, on-primary);
  padding: fn.sys-var(spacing, med) fn.sys-var(spacing, lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.demo-header h1 {
  margin: 0;
  font-size: fn.sys-var(font, headline-large, size);
  line-height: fn.sys-var(font, headline-large, line-height);
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: fn.sys-var(spacing, sm);
}

.theme-toggle label {
  display: flex;
  align-items: center;
  gap: fn.sys-var(spacing, xs);
  cursor: pointer;
}

.demo-content {
  padding: fn.sys-var(spacing, lg);
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: fn.sys-var(spacing, lg);
  padding: fn.sys-var(spacing, med);
  background-color: fn.sys-var(color, surface-container);
  border-radius: fn.sys-var(radius, med);
}

.demo-section h2 {
  margin: 0 0 fn.sys-var(spacing, med) 0;
  font-size: fn.sys-var(font, title-large, size);
  line-height: fn.sys-var(font, title-large, line-height);
  color: fn.sys-var(color, primary);
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: fn.sys-var(spacing, med);
}

.color-card {
  display: flex;
  align-items: center;
  gap: fn.sys-var(spacing, sm);
  padding: fn.sys-var(spacing, sm);
  background-color: fn.sys-var(color, surface);
  border-radius: fn.sys-var(radius, sm);
  border: 1px solid fn.sys-var(color, outline-variant);
}

.color-swatch {
  width: 48px;
  height: 48px;
  border-radius: fn.sys-var(radius, sm);
  border: 1px solid fn.sys-var(color, outline-variant);
}

.color-info {
  flex: 1;
}

.color-name {
  font-weight: 600;
  font-size: fn.sys-var(font, label-large, size);
}

.color-var {
  font-size: fn.sys-var(font, label-small, size);
  color: fn.sys-var(color, on-surface-variant);
  font-family: monospace;
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: fn.sys-var(spacing, sm);
}

.typography-demo {
  display: flex;
  flex-direction: column;
  gap: fn.sys-var(spacing, sm);
}

.typo-item {
  padding: fn.sys-var(spacing, xs) 0;
  border-bottom: 1px solid fn.sys-var(color, outline-variant);
}

.spacing-demo {
  display: flex;
  gap: fn.sys-var(spacing, lg);
  align-items: flex-end;
}

.spacing-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: fn.sys-var(spacing, xs);
}

.spacing-box {
  background-color: fn.sys-var(color, primary);
}

.shadow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: fn.sys-var(spacing, lg);
}

.shadow-card {
  padding: fn.sys-var(spacing, med);
  background-color: fn.sys-var(color, surface);
  border-radius: fn.sys-var(radius, med);
  text-align: center;
  font-weight: 600;
}
</style>
