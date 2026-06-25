<script setup lang="ts">
import PuButton from "../../components/puButton/puButton.vue";
import PuCard from "../../components/puCard/puCard.vue";
import PuHeader from "../../components/puHeader/puHeader.vue";
import PuPageScaffold from "../../components/puPageScaffold/puPageScaffold.vue";
import PuTag from "../../components/puTag/puTag.vue";
</script>

<template>
  <Story title="PuPageScaffold" group="layout">
    <Variant title="Document">
      <PuPageScaffold>
        <template #pageHeader>
          <PuHeader
            title="Events"
            subtitle="Document pages keep content in normal page flow."
            title-as="h1"
          >
            <template #actions>
              <PuButton>New event</PuButton>
            </template>
          </PuHeader>
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

        <template #footer>
          <div class="pu-page-scaffold-story__footer">
            <PuButton tone="neutral" variant="outline">Archive</PuButton>
            <PuButton>Continue</PuButton>
          </div>
        </template>
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

    <Variant title="No Padding">
      <div class="pu-page-scaffold-story__edge-frame">
        <PuPageScaffold width="full" padding="none">
          <template #pageHeader>
            <PuHeader
              title="Activity stream"
              subtitle="The standard page header keeps its default inset while main content can bleed edge to edge."
              title-as="h1"
            >
              <template #actions>
                <PuButton tone="neutral" variant="outline">Refresh</PuButton>
              </template>
            </PuHeader>
          </template>

          <section class="pu-page-scaffold-story__bleed">
            <div class="pu-page-scaffold-story__bleed-hero" aria-hidden="true"></div>
            <div class="pu-page-scaffold-story__bleed-copy">
              <p class="pu-story__text">
                The color band touches the frame edge because scaffold content
                padding is gone. The text block below owns its own local inset.
              </p>
            </div>
          </section>
        </PuPageScaffold>
      </div>
    </Variant>

    <Variant title="Custom Header Slot">
      <div class="pu-page-scaffold-story__edge-frame">
        <PuPageScaffold width="full" padding="none">
          <template #header>
            <div class="pu-page-scaffold-story__custom-header">
              <div class="pu-page-scaffold-story__custom-header-copy">
                <p class="pu-story__label">Raw header slot</p>
                <h2 class="pu-page-scaffold-story__custom-header-title">
                  Consumer-owned page chrome
                </h2>
              </div>

              <PuButton tone="neutral" variant="ghost" size="sm">
                Help
              </PuButton>
            </div>
          </template>

          <div class="pu-page-scaffold-story__bleed-copy">
            <p class="pu-story__text">
              Custom header content does not receive scaffold-owned page-header
              inset. Any spacing around it belongs to the consumer.
            </p>
          </div>
        </PuPageScaffold>
      </div>
    </Variant>

    <Variant title="Aside Layout">
      <PuPageScaffold layout="aside" width="wide" sticky-aside>
        <template #pageHeader>
          <PuHeader
            title="Member profile"
            subtitle="Wide pages can expose a responsive aside region."
            title-as="h1"
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
          <template #pageHeader>
            <PuHeader
              title="Container-aware review"
              subtitle="The scaffold aside responds to container width while the header keeps its fixed inline action structure."
              title-as="h1"
            >
              <template #leading>
                <PuButton tone="neutral" variant="ghost" size="sm">Back</PuButton>
              </template>

              <template #actions>
                <PuButton tone="neutral" variant="outline">Preview</PuButton>
                <PuButton>Publish</PuButton>
              </template>
            </PuHeader>
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
        <template #pageHeader>
          <PuHeader
            title="Launch checklist"
            subtitle="First screen content."
            title-as="h1"
          />
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

.pu-page-scaffold-story__edge-frame {
  width: min(100%, 34rem);
  border: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface);
}

.pu-page-scaffold-story__bleed {
  overflow: hidden;
  background: var(--sys-color-surface-container);
}

.pu-page-scaffold-story__bleed-hero {
  min-height: 8rem;
  background:
    linear-gradient(135deg, rgb(209 230 255 / 100%), rgb(176 214 255 / 100%)),
    var(--sys-color-surface-container-high);
}

.pu-page-scaffold-story__bleed-copy {
  padding: 24px;
}

.pu-page-scaffold-story__custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface-container);
}

.pu-page-scaffold-story__custom-header-copy {
  min-width: 0;
}

.pu-page-scaffold-story__custom-header-title {
  margin: 0;
  color: var(--sys-color-on-surface);
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
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
