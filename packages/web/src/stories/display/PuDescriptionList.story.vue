<!-- @pu-story-covers PuDescriptionList PuDescriptionItem -->

<script setup lang="ts">
import PuButton from "../../components/puButton/puButton.vue";
import PuDescriptionItem from "../../components/puDescriptionItem/puDescriptionItem.vue";
import PuDescriptionList from "../../components/puDescriptionList/puDescriptionList.vue";

const eventFacts = [
  ["Time", "May 12, 19:00"],
  ["Location", "West Lake Cultural Plaza"],
  ["Capacity", "12 / 20"],
  ["Host", "PartnerUp Hangzhou"],
] as const;
</script>

<template>
  <Story title="PuDescriptionList" group="display">
    <Variant title="Stack">
      <div class="pu-story pu-story--narrow">
        <PuDescriptionList
          title="Event facts"
          description="Compact facts for review and confirmation screens."
        >
          <PuDescriptionItem
            v-for="[label, value] in eventFacts"
            :key="label"
            :label="label"
            :value="value"
          />
        </PuDescriptionList>
      </div>
    </Variant>

    <Variant title="Inline Surface">
      <div class="pu-story pu-story--narrow">
        <PuDescriptionList
          title="Order summary"
          layout="inline" surface-level="surface" variant="soft"
          bordered
        >
          <PuDescriptionItem label="Plan" value="Team annual" />
          <PuDescriptionItem label="Seats" value="24" />
          <PuDescriptionItem label="Renewal" value="2026-06-01" />
          <PuDescriptionItem label="Status">
            <template #suffix>
              <span class="pu-story__badge">Active</span>
            </template>
          </PuDescriptionItem>
        </PuDescriptionList>
      </div>
    </Variant>

    <Variant title="Grid">
      <div class="pu-story">
        <PuDescriptionList
          title="Profile details"
          layout="grid" surface-level="plain" variant="outline"
          :columns="2"
          label-width="6rem"
        >
          <PuDescriptionItem label="Name" value="Lina Chen" />
          <PuDescriptionItem label="Role" value="Organizer" />
          <PuDescriptionItem label="City" value="Hangzhou" />
          <PuDescriptionItem label="Member since" value="2024" />
          <PuDescriptionItem label="Notes" :span="2">
            <template #default>
              Values can contain longer prose, inline badges, or formatted
              content without losing the description-list relationship.
            </template>
            <template #hint>
              Hints stay visually attached to the value.
            </template>
          </PuDescriptionItem>
        </PuDescriptionList>
      </div>
    </Variant>

    <Variant title="Narrow Container">
      <div class="pu-description-list-story__narrow-frame">
        <PuDescriptionList
          title="Embedded profile"
          description="The two-column grid collapses by list container width."
          layout="grid" surface-level="plain" variant="outline"
          :columns="2"
          dividers
        >
          <PuDescriptionItem label="Name" value="Lina Chen" />
          <PuDescriptionItem label="Role" value="Organizer" />
          <PuDescriptionItem label="City" value="Hangzhou" />
          <PuDescriptionItem label="Member since" value="2024" />
        </PuDescriptionList>
      </div>
    </Variant>

    <Variant title="Slots And Empty">
      <div class="pu-story pu-story--narrow">
        <PuDescriptionList layout="inline" density="compact" empty-text="Pending">
          <template #header>
            <div class="pu-story__row">
              <strong>Custom header</strong>
              <span class="pu-story__badge">Draft</span>
            </div>
          </template>

          <PuDescriptionItem value="Assigned">
            <template #label>
              Owner
            </template>
          </PuDescriptionItem>
          <PuDescriptionItem label="Reviewer" />
          <PuDescriptionItem label="Window">
            <time datetime="2026-05-12T19:00:00+08:00">Tonight, 19:00</time>
          </PuDescriptionItem>

          <template #footer>
            Last refreshed from the canonical story fixture.
          </template>
        </PuDescriptionList>
      </div>
    </Variant>

    <Variant title="Trailing Actions">
      <div class="pu-story pu-story--narrow">
        <PuDescriptionList
          title="Interactive facts"
          layout="inline" surface-level="surface" variant="soft"
          bordered
        >
          <PuDescriptionItem label="Status">
            <template #suffix>
              <span class="pu-story__badge">Active</span>
            </template>
          </PuDescriptionItem>

          <PuDescriptionItem label="Route">
            <template #action>
              <PuButton
                tone="secondary"
                variant="ghost"
                size="sm"
                shape="pill"
                aria-label="View route map"
              >
                View map
                <template #trailing>
                  <span class="i-mdi-chevron-right" />
                </template>
              </PuButton>
            </template>
          </PuDescriptionItem>

          <PuDescriptionItem label="Invite code">
            <template #action>
              <PuButton
                tone="secondary"
                variant="ghost"
                size="sm"
                shape="pill"
                aria-label="Copy invite code APR-2048"
              >
                APR-2048
                <template #trailing>
                  <span class="i-mdi-content-copy" />
                </template>
              </PuButton>
            </template>
          </PuDescriptionItem>
        </PuDescriptionList>
      </div>
    </Variant>

    <Variant title="Stack Affordances">
      <div class="pu-story pu-story--narrow">
        <PuDescriptionList
          title="Stacked facts"
          layout="stack" surface-level="surface" variant="soft"
          bordered
        >
          <PuDescriptionItem label="Status">
            <template #suffix>
              <span class="pu-story__badge">Queued</span>
            </template>
            Draft itinerary waits for confirmation.
          </PuDescriptionItem>

          <PuDescriptionItem value="Route details available">
            <template #action>
              <PuButton
                tone="secondary"
                variant="ghost"
                size="sm"
                shape="pill"
                aria-label="Open route details"
              >
                Open details
                <template #trailing>
                  <span class="i-mdi-chevron-right" />
                </template>
              </PuButton>
            </template>
          </PuDescriptionItem>
        </PuDescriptionList>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-description-list-story__narrow-frame {
  width: min(100%, 21rem);
  border: 1px solid var(--sys-color-outline-variant);
  background: var(--sys-color-surface);
}
</style>
