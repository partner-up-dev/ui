<script setup lang="ts">
import PuCell from "../../components/puCell/puCell.vue";
import PuCellGroup from "../../components/puCellGroup/puCellGroup.vue";
</script>

<template>
  <Story title="PuCellGroup" group="display">
    <Variant title="Plain">
      <div class="pu-story pu-story--narrow">
        <PuCellGroup tone="plain">
          <PuCell title="Account" value="PartnerUp" />
          <PuCell title="Status" value="Active" />
          <PuCell
            as="button"
            title="Details"
            value="Open"
            suffix-icon="i-mdi-chevron-right"
          />
        </PuCellGroup>
      </div>
    </Variant>

    <Variant title="Surface Dividers">
      <div class="pu-story pu-story--narrow">
        <PuCellGroup tone="surface">
          <PuCell title="City" value="Hangzhou" />
          <PuCell title="Seats" value="24" />
          <PuCell title="Visibility" value="Members" />
        </PuCellGroup>
      </div>
    </Variant>

    <Variant title="Header Footer">
      <div class="pu-story pu-story--narrow">
        <PuCellGroup
          tone="outline"
          title="Organizer"
          description="Public profile fields"
        >
          <PuCell title="Name" value="Lina Chen" />
          <PuCell title="Role" value="Host" />
          <PuCell
            as="button"
            title="Public page"
            value="Preview"
            suffix-icon="i-mdi-open-in-new"
          />
          <template #footer>
            Updated fields are visible to members.
          </template>
        </PuCellGroup>
      </div>
    </Variant>

    <Variant title="Compact Inset">
      <div class="pu-story pu-story--narrow">
        <PuCellGroup tone="inset-high" density="compact" inset>
          <PuCell title="Messages" value="3 unread" />
          <PuCell title="Requests" value="2 pending" />
          <PuCell title="Reviews" value="None" />
        </PuCellGroup>
      </div>
    </Variant>

    <Variant title="No Dividers">
      <div class="pu-story pu-story--narrow">
        <PuCellGroup tone="section" :dividers="false">
          <PuCell title="Morning" value="Available" />
          <PuCell title="Afternoon" value="Booked" />
          <PuCell title="Evening" value="Limited" />
        </PuCellGroup>
      </div>
    </Variant>
  </Story>
</template>
