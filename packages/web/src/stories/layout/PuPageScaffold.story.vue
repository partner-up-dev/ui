<script setup lang="ts">
import PuButton from "../../components/puButton/puButton.vue";
import PuCard from "../../components/puCard/puCard.vue";
import PuPageHeader from "../../components/puPageHeader/puPageHeader.vue";
import PuPageScaffold from "../../components/puPageScaffold/puPageScaffold.vue";
import PuTag from "../../components/puTag/puTag.vue";
</script>

<template>
  <Story title="PuPageScaffold" group="layout">
    <Variant title="Document">
      <PuPageScaffold>
        <template #header>
          <PuPageHeader
            title="Events"
            subtitle="Document pages keep content in normal page flow."
          >
            <template #actions>
              <PuButton>New event</PuButton>
            </template>
          </PuPageHeader>
        </template>

        <div class="pu-page-scaffold-story__stack">
          <PuCard title="Planning queue" subtitle="Ordinary page content.">
            <p class="pu-story__text">
              The default scaffold owns safe-area padding, page width, and
              vertical page structure.
            </p>
          </PuCard>

          <PuCard title="Operations" subtitle="Secondary section.">
            <p class="pu-story__text">
              Header, content, and footer are named page regions instead of
              separate scaffold components.
            </p>
          </PuCard>
        </div>
      </PuPageScaffold>
    </Variant>

    <Variant title="Centered Screen">
      <PuPageScaffold viewport="screen" content-placement="center" width="full">
        <div class="pu-page-scaffold-story__centered">
          <PuTag text="Ready" variant="outline" />
          <h2 class="pu-page-scaffold-story__title">Review before publishing</h2>
          <p class="pu-story__text">
            Full-screen centered flows are a viewport mode plus content
            placement, not a separate component.
          </p>
          <div class="pu-page-scaffold-story__actions">
            <PuButton tone="neutral" variant="outline">Back</PuButton>
            <PuButton>Publish</PuButton>
          </div>
        </div>
      </PuPageScaffold>
    </Variant>

    <Variant title="Aside Layout">
      <PuPageScaffold layout="aside" width="wide" sticky-aside>
        <template #header>
          <PuPageHeader
            title="Member profile"
            subtitle="Wide pages can expose a responsive aside region."
          />
        </template>

        <template #aside>
          <PuCard title="Navigation" tone="neutral" variant="outline">
            <div class="pu-page-scaffold-story__nav">
              <span>Overview</span>
              <span>Trust</span>
              <span>Activity</span>
            </div>
          </PuCard>
        </template>

        <div class="pu-page-scaffold-story__stack">
          <PuCard title="Profile summary">
            <p class="pu-story__text">
              On wide screens the aside and main content form a two-column page.
            </p>
          </PuCard>

          <PuCard title="Recent activity">
            <p class="pu-story__text">
              On narrow screens the same topology collapses into a single
              column without switching components.
            </p>
          </PuCard>
        </div>
      </PuPageScaffold>
    </Variant>

    <Variant title="Narrow Container">
      <div class="pu-page-scaffold-story__narrow-frame">
        <PuPageScaffold layout="aside" width="wide" sticky-aside>
          <template #header>
            <PuPageHeader
              title="Container-aware review"
              subtitle="The scaffold aside responds to container width; header action placement is explicit."
              layout="stack"
              show-back
            >
              <template #actions>
                <PuButton tone="neutral" variant="outline">Preview</PuButton>
                <PuButton>Publish</PuButton>
              </template>
            </PuPageHeader>
          </template>

          <template #aside>
            <PuCard title="Aside" tone="neutral" variant="outline">
              <div class="pu-page-scaffold-story__nav">
                <span>Summary</span>
                <span>Checklist</span>
                <span>History</span>
              </div>
            </PuCard>
          </template>

          <div class="pu-page-scaffold-story__stack">
            <PuCard title="Main content">
              <p class="pu-story__text">
                The parent frame is narrow while the viewport may still be wide.
                The scaffold collapses by its own container, not by the browser
                viewport.
              </p>
            </PuCard>
          </div>
        </PuPageScaffold>
      </div>
    </Variant>

    <Variant title="Footer Reveal">
      <PuPageScaffold
        viewport="screen"
        footer-placement="reveal"
        content-placement="center"
      >
        <template #header>
          <PuPageHeader title="Launch checklist" subtitle="First screen content." />
        </template>

        <div class="pu-page-scaffold-story__centered">
          <h2 class="pu-page-scaffold-story__title">Everything is ready</h2>
          <p class="pu-story__text">
            Header and main content occupy the first screen. Footer content
            follows in document flow and is revealed by scrolling.
          </p>
        </div>

        <template #footer>
          <div class="pu-page-scaffold-story__footer">
            <PuButton tone="neutral" variant="outline">Save draft</PuButton>
            <PuButton>Continue</PuButton>
          </div>
        </template>
      </PuPageScaffold>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-page-scaffold-story__stack {
  display: grid;
  gap: 16px;
}

.pu-page-scaffold-story__centered {
  display: grid;
  width: min(100%, 420px);
  justify-items: center;
  gap: 12px;
  text-align: center;
}

.pu-page-scaffold-story__narrow-frame {
  width: min(100%, 28rem);
  border: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface);
}

.pu-page-scaffold-story__title {
  margin: 0;
  color: var(--sys-color-on-surface);
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
}

.pu-page-scaffold-story__actions,
.pu-page-scaffold-story__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.pu-page-scaffold-story__nav {
  display: grid;
  gap: 8px;
  color: var(--sys-color-on-surface-variant);
  font-size: 14px;
  line-height: 20px;
}

.pu-page-scaffold-story__footer {
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  border-top: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface-container);
}
</style>
