<!-- @pu-story-covers PuAccordionItem -->

<script setup lang="ts">
import { ref } from "vue";
import PuAccordion from "../../components/puAccordion/puAccordion.vue";
import PuAccordionItem from "../../components/puAccordion/puAccordionItem.vue";
import PuInfoRow from "../../components/puInfoRow/puInfoRow.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";
import PuTag from "../../components/puTag/puTag.vue";

const openPanels = ref(["details"]);
const singlePanel = ref("agenda");
const viewMoreOpen = ref(false);
</script>

<template>
  <Story title="PuAccordion" group="display">
    <Variant title="Multiple">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline" gap="none">
          <PuAccordion v-model="openPanels">
            <PuAccordionItem name="details" title="Event details">
              <div class="pu-accordion-story__body">
                <PuInfoRow label="Time" value="May 12, 19:00" />
                <PuInfoRow label="Location" value="West Lake Cultural Plaza" />
              </div>
            </PuAccordionItem>
            <PuAccordionItem name="capacity" title="Capacity">
              <div class="pu-accordion-story__body">
                <PuInfoRow label="Reserved" value="12 seats" />
                <PuInfoRow label="Available" value="8 seats" />
              </div>
            </PuAccordionItem>
            <PuAccordionItem name="disabled" title="Locked section" disabled>
              <div class="pu-accordion-story__body">
                This section is unavailable for the current role.
              </div>
            </PuAccordionItem>
          </PuAccordion>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Single">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="section" gap="none">
          <PuAccordion v-model="singlePanel" accordion>
            <PuAccordionItem name="agenda" title="Agenda">
              <div class="pu-accordion-story__body">
                Meet at the north entrance, walk the lake route, and finish near
                the plaza.
              </div>
            </PuAccordionItem>
            <PuAccordionItem name="requirements" title="Requirements">
              <div class="pu-accordion-story__body">
                Bring weather-appropriate clothing and arrive ten minutes early.
              </div>
            </PuAccordionItem>
          </PuAccordion>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Custom Title">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="inset-high" gap="none">
          <PuAccordion v-model="openPanels">
            <PuAccordionItem name="review" title="Review">
              <template #title="{ expanded }">
                <div class="pu-accordion-story__title">
                  <span>Review status</span>
                  <PuTag
                    :text="expanded ? 'Open' : 'Ready'"
                    theme="SurfaceOutlined"
                    size="xSmall"
                    rounded
                  />
                </div>
              </template>
              <div class="pu-accordion-story__body">
                The custom title slot receives the current expanded state.
              </div>
            </PuAccordionItem>
          </PuAccordion>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="View More">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <PuAccordion v-model="viewMoreOpen" viewmore :line-num="2">
            PartnerUp hosts can add longer operational notes for a gathering.
            The view more mode keeps the first lines visible, then allows the
            full text to expand when the reader needs the complete context for
            planning, staffing, and guest communication.
          </PuAccordion>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-accordion-story__body {
  display: grid;
  gap: 10px;
  padding: 16px;
}

.pu-accordion-story__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}
</style>
