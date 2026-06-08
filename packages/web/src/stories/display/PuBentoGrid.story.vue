<!-- @pu-story-covers PuBentoGrid PuBentoItem -->

<script setup lang="ts">
import PuBentoGrid from "../../components/puBentoGrid/puBentoGrid.vue";
import PuBentoItem from "../../components/puBentoItem/puBentoItem.vue";
import PuButton from "../../components/puButton/puButton.vue";
import PuCell from "../../components/puCell/puCell.vue";
import PuCellGroup from "../../components/puCellGroup/puCellGroup.vue";
import PuDescriptionItem from "../../components/puDescriptionItem/puDescriptionItem.vue";
import PuDescriptionList from "../../components/puDescriptionList/puDescriptionList.vue";
</script>

<template>
  <Story title="PuBentoGrid" group="display">
    <Variant title="Admin Overview">
      <div class="pu-story pu-bento-story">
        <PuBentoGrid :columns="4" gap="md" auto-rows="112px" collapse-at="md" dense>
          <PuBentoItem
            title="Anchor event"
            description="Core publishing state and review progress."
            :span="2"
            :row-span="2"
          >
            <div class="pu-bento-story__hero">
              <strong>Spring mixer</strong>
              <span>Ready for final review</span>
            </div>
            <template #actions>
              <PuButton size="sm">
                <template #leading>
                  <span class="i-mdi-eye-outline"></span>
                </template>
                Preview
              </PuButton>
            </template>
            <template #footer>
              Updated 12 minutes ago
            </template>
          </PuBentoItem>

          <PuBentoItem title="Applications" description="Open requests">
            <div class="pu-bento-story__metric">
              <strong>24</strong>
              <span>6 need response</span>
            </div>
          </PuBentoItem>

          <PuBentoItem title="Capacity" description="Seats filled">
            <div class="pu-bento-story__meter">
              <span style="width: 72%" />
            </div>
            <div class="pu-bento-story__metric pu-bento-story__metric--inline">
              <strong>72%</strong>
              <span>18 / 25 seats</span>
            </div>
          </PuBentoItem>

          <PuBentoItem title="Risk" description="Pending checks" tone="outline">
            <PuCellGroup tone="plain" density="compact" :dividers="false">
              <PuCell title="Venue" value="Confirmed" />
              <PuCell title="Payment" value="Pending" />
            </PuCellGroup>
          </PuBentoItem>

          <PuBentoItem title="Facts" :span="2">
            <PuDescriptionList layout="grid" :columns="2" density="compact">
              <PuDescriptionItem label="City" value="Hangzhou" />
              <PuDescriptionItem label="Window" value="May 20" />
              <PuDescriptionItem label="Owner" value="Lina" />
              <PuDescriptionItem label="Status" value="Draft" />
            </PuDescriptionList>
          </PuBentoItem>
        </PuBentoGrid>
      </div>
    </Variant>

    <Variant title="Slots And Spans">
      <div class="pu-story pu-bento-story">
        <PuBentoGrid :columns="3" gap="sm" auto-rows="96px" collapse-at="sm">
          <PuBentoItem :span="2" :row-span="2" tone="surface">
            <template #header>
              <div class="pu-bento-story__custom-header">
                <div>
                  <strong>Custom header</strong>
                  <span>Header slot owns the whole top area.</span>
                </div>
                <span class="pu-story__badge">Live</span>
              </div>
            </template>

            <div class="pu-bento-story__chart" aria-hidden="true">
              <span style="height: 36%" />
              <span style="height: 68%" />
              <span style="height: 48%" />
              <span style="height: 86%" />
              <span style="height: 58%" />
            </div>
          </PuBentoItem>

          <PuBentoItem title="Compact" description="Dense tile" density="compact">
            <p class="pu-story__text">
              Compact density keeps tile rhythm tight for admin summary panels.
            </p>
          </PuBentoItem>

          <PuBentoItem title="Full width" span="full" tone="inset-high">
            <div class="pu-bento-story__row">
              <span>Full span works across every configured column count.</span>
              <PuButton size="sm">
                <template #leading>
                  <span class="i-mdi-open-in-new"></span>
                </template>
                Open
              </PuButton>
            </div>
          </PuBentoItem>
        </PuBentoGrid>
      </div>
    </Variant>

    <Variant title="Plain Composition">
      <div class="pu-story pu-bento-story">
        <PuBentoGrid :columns="2" gap="md" collapse-at="md">
          <PuBentoItem title="Plain item" tone="plain">
            <p class="pu-story__text">
              Plain tone keeps the layout metadata while allowing the parent
              page surface to carry the visual container.
            </p>
          </PuBentoItem>

          <PuBentoItem title="Outlined item" tone="outline">
            <p class="pu-story__text">
              Outline tone is useful when the surrounding page already has a
              strong background.
            </p>
          </PuBentoItem>
        </PuBentoGrid>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-bento-story {
  max-width: 920px;
}

.pu-bento-story__hero,
.pu-bento-story__metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pu-bento-story__hero strong,
.pu-bento-story__metric strong {
  color: var(--sys-color-on-surface);
  font-size: 28px;
  font-weight: 600;
  line-height: 34px;
}

.pu-bento-story__hero span,
.pu-bento-story__metric span,
.pu-bento-story__custom-header span,
.pu-bento-story__row {
  color: var(--sys-color-on-surface-variant);
  font-size: 13px;
  line-height: 18px;
}

.pu-bento-story__metric--inline {
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 10px;
}

.pu-bento-story__meter {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--sys-color-surface-container-high);
}

.pu-bento-story__meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--sys-color-primary);
}

.pu-bento-story__custom-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}

.pu-bento-story__custom-header > div {
  display: grid;
  gap: 4px;
}

.pu-bento-story__chart {
  display: flex;
  align-items: end;
  height: 100%;
  min-height: 128px;
  gap: 8px;
}

.pu-bento-story__chart span {
  flex: 1 1 0;
  border-radius: 6px 6px 0 0;
  background: var(--sys-color-primary-container);
}

.pu-bento-story__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>
