<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import { usePuSelect } from "../../composables/usePuSelect";
import type {
  PuUseSelectChangeContext,
  PuUseSelectModelValue,
} from "../../composables/usePuSelect";
import PuButton from "../../components/puButton/puButton.vue";
import PuCard from "../../components/puCard/puCard.vue";
import PuTag from "../../components/puTag/puTag.vue";

type CardOption = {
  value: string;
  title: string;
  subtitle: string;
  description: string;
  disabled?: boolean;
};

const expanded = ref(true);
const resetKey = ref(0);
const directSelection = ref("venue");
const planSelection = ref("balanced");
const capabilitySelection = ref<string[]>(["messaging"]);
const spacings = ["none", "xs", "sm", "md", "lg"] as const;

const tones = [
  {
    tone: "neutral",
    variant: "soft",
    title: "Surface",
    description: "Default card for grouped content.",
  },
  {
    tone: "neutral",
    variant: "outline",
    title: "Outline",
    description: "Low-emphasis card on the page background.",
  },
  {
    tone: "primary",
    variant: "soft",
    title: "Primary",
    description: "High-emphasis card for key recommendations.",
  },
  {
    tone: "secondary",
    variant: "soft",
    title: "Secondary",
    description: "Supporting card for secondary context.",
  },
  {
    tone: "tertiary",
    variant: "soft",
    title: "Tertiary",
    description: "Accent card for special categories.",
  },
] as const;

const planOptions: readonly CardOption[] = [
  {
    value: "lean",
    title: "Lean launch",
    subtitle: "Smallest useful setup",
    description: "Collect signups, publish schedule details, and keep setup light.",
  },
  {
    value: "balanced",
    title: "Balanced launch",
    subtitle: "Most teams start here",
    description: "Pair event content with member messaging and simple review steps.",
  },
  {
    value: "enterprise",
    title: "Enterprise launch",
    subtitle: "Needs approval",
    description: "Add compliance review, approval routing, and extra onboarding support.",
    disabled: true,
  },
] as const;

const capabilityOptions: readonly CardOption[] = [
  {
    value: "messaging",
    title: "Messaging",
    subtitle: "Member contact",
    description: "Send updates before and after each event.",
  },
  {
    value: "analytics",
    title: "Analytics",
    subtitle: "Program insight",
    description: "Track participation and conversion signals.",
  },
  {
    value: "review",
    title: "Review queue",
    subtitle: "Moderation",
    description: "Approve submissions before they become visible.",
  },
] as const;

const disabledPlanValues = planOptions
  .filter((option) => option.disabled)
  .map((option) => option.value);

const directCardSelect = usePuSelect<string>({
  modelValue: directSelection,
});

const planSelect = usePuSelect<string>({
  modelValue: planSelection,
  disabledValues: disabledPlanValues,
  onChange: handleSelectChange,
});

const capabilitySelect = usePuSelect<string>({
  modelValue: capabilitySelection,
  multiple: true,
  onChange: handleSelectChange,
});

function handleSelectChange(
  value: PuUseSelectModelValue<string>,
  context: PuUseSelectChangeContext<string>,
): void {
  logEvent("change", { value, action: context.action, option: context.value });
}
</script>

<template>
  <Story title="PuCard" group="display">
    <Variant title="Regions">
      <div class="pu-story pu-story--narrow">
        <PuCard>
          <template #hero>
            <div class="pu-card-story__hero" aria-hidden="true"></div>
          </template>

          <template #header>
            <div class="pu-card-story__header">
              <div>
                <p class="pu-story__label">Weekend plan</p>
                <h3 class="pu-card-story__title">West Lake evening walk</h3>
              </div>
              <PuTag text="Open" variant="outline" />
            </div>
          </template>

          <p class="pu-story__text">
            A card can combine media, heading content, body copy, and actions
            without prescribing the exact markup inside each region.
          </p>

          <template #footer>
            <PuButton tone="neutral" variant="outline" size="sm">Save</PuButton>
            <PuButton size="sm">Review</PuButton>
          </template>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Themes">
      <div class="pu-story">
        <div class="pu-card-story__grid">
          <PuCard
            v-for="item in tones"
            :key="`${item.tone}-${item.variant}`"
            :tone="item.tone"
            :variant="item.variant"
          >
            <template #header>
              <h3 class="pu-card-story__title">{{ item.title }}</h3>
            </template>
            <p class="pu-story__text">{{ item.description }}</p>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Padding">
      <div class="pu-story">
        <div class="pu-card-story__grid">
          <PuCard
            v-for="padding in spacings"
            :key="padding"
            :padding="padding"
            tone="neutral"
            variant="outline"
            :title="`Padding ${padding}`"
          >
            <p class="pu-story__text">
              Shared spacing values can tune card insets without changing
              container treatment.
            </p>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Collapsible">
      <div class="pu-story pu-story--narrow">
        <PuCard
          tone="neutral"
          variant="outline"
          collapsible
          title="Public details"
          subtitle="Visible header with collapsible content."
          :default-expanded="false"
        >
          <p class="pu-story__text">
            The card owns its expansion state when expanded is not provided.
          </p>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Controlled Expansion">
      <div class="pu-story pu-story--narrow">
        <PuCard
          v-model:expanded="expanded"
          tone="secondary"
          variant="soft"
          collapsible
          title="Organizer profile"
          subtitle="Expansion can be controlled by the parent."
        >
          <p class="pu-story__text">
            Parent state can synchronize the card with external controls or
            route state.
          </p>

          <template #footer>
            <PuButton
              tone="neutral"
              variant="outline"
              size="sm"
              @click="expanded = !expanded"
            >
              {{ expanded ? "Collapse" : "Expand" }}
            </PuButton>
          </template>
        </PuCard>
      </div>
    </Variant>

    <Variant title="Action Cards">
      <div class="pu-story">
        <div class="pu-card-story__grid">
          <PuCard
            :action="{ href: 'https://partner-up.dev', external: true }"
            tone="neutral"
            variant="outline"
            title="External event page"
            subtitle="The whole card can navigate when it has no nested controls."
          >
            <p class="pu-story__text">
              Action cards reuse the same PuAction target contract as PuButton.
            </p>
          </PuCard>

          <PuCard
            selectable
            active
            tone="neutral"
            variant="soft"
            title="Selected option"
            subtitle="Selectable cards expose pressed state for button-like choices."
          >
            <p class="pu-story__text">
              Use this form when the card is the direct choice target.
            </p>
          </PuCard>

          <PuCard
            selectable
            disabled
            tone="neutral"
            variant="soft"
            title="Unavailable option"
            subtitle="Disabled cards stop interaction and reduce emphasis."
          >
            <p class="pu-story__text">
              Disabled link and route actions also stop click navigation.
            </p>
          </PuCard>
        </div>
      </div>
    </Variant>

    <Variant title="Selectable State">
      <div class="pu-story">
        <div class="pu-story__stack">
          <div class="pu-card-story__grid">
            <PuCard
              selectable
              :active="directCardSelect.isSelected('venue')"
              tone="neutral"
              variant="soft"
              title="Venue fit"
              subtitle="Direct PuCard state"
              @click="directCardSelect.select('venue', $event)"
            >
              <p class="pu-story__text">
                This option shows parent-controlled active state on PuCard.
              </p>
            </PuCard>

            <PuCard
              selectable
              :active="directCardSelect.isSelected('audience')"
              tone="neutral"
              variant="soft"
              title="Audience fit"
              subtitle="Direct PuCard state"
              @click="directCardSelect.select('audience', $event)"
            >
              <p class="pu-story__text">
                Click changes which low-level card receives active styling.
              </p>
            </PuCard>
          </div>

          <p class="pu-story__label">Selected card: {{ directSelection }}</p>

          <div class="pu-card-story__grid" role="group" aria-label="Launch plan">
            <PuCard
              v-for="option in planOptions"
              :key="option.value"
              selectable
              :active="planSelect.isSelected(option.value)"
              :disabled="planSelect.isDisabled(option.value)"
              tone="neutral"
              variant="soft"
              :title="option.title"
              :subtitle="option.subtitle"
              @click="planSelect.select(option.value, $event)"
            >
              <p class="pu-story__text">{{ option.description }}</p>
            </PuCard>
          </div>

          <p class="pu-story__label">Selected plan: {{ planSelection }}</p>

          <div class="pu-card-story__grid" role="group" aria-label="Capabilities">
            <PuCard
              v-for="option in capabilityOptions"
              :key="option.value"
              selectable
              :active="capabilitySelect.isSelected(option.value)"
              tone="neutral"
              variant="outline"
              :title="option.title"
              :subtitle="option.subtitle"
              @click="capabilitySelect.toggle(option.value, $event)"
            >
              <p class="pu-story__text">{{ option.description }}</p>
              <PuTag
                v-if="capabilitySelect.isSelected(option.value)"
                text="Selected"
                tone="primary"
                variant="soft"
              />
            </PuCard>
          </div>

          <p class="pu-story__label">
            Selected capabilities: {{ capabilitySelection.join(", ") }}
          </p>
        </div>
      </div>
    </Variant>

    <Variant title="Mounted Expansion">
      <div class="pu-story pu-story--narrow">
        <PuCard
          :expanded-reset-key="resetKey"
          tone="neutral"
          variant="outline"
          collapsible
          keep-content-mounted
          title="Retained editor"
          subtitle="Collapsed content remains mounted but hidden."
        >
          <p class="pu-story__text">
            Use keep-content-mounted when collapsed content owns local state
            that should survive expansion changes.
          </p>

          <template #footer>
            <PuButton
              tone="neutral"
              variant="outline"
              size="sm"
              @click="resetKey += 1"
            >
              Reset expansion
            </PuButton>
          </template>
        </PuCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-card-story__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 16px;
}

.pu-card-story__hero {
  aspect-ratio: 16 / 9;
  background:
    linear-gradient(135deg, rgba(150, 217, 69, 0.88), rgba(76, 158, 153, 0.86)),
    radial-gradient(circle at 24% 24%, rgba(255, 255, 255, 0.75), transparent 28%);
}

.pu-card-story__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.pu-card-story__title {
  margin: 0;
  color: inherit;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
}
</style>
