<script setup lang="ts">
import { ref } from "vue";
import { logEvent } from "histoire/client";
import PuButton from "../../components/puButton/puButton.vue";
import PuImgCropper from "../../components/puImgCropper/puImgCropper.vue";
import PuSurfaceCard from "../../components/puSurfaceCard/puSurfaceCard.vue";
import type { PuImgCropperConfirmResult } from "../../components/puImgCropper/puImgCropper";

const squareCropper = ref<InstanceType<typeof PuImgCropper> | null>(null);
const avatarCropper = ref<InstanceType<typeof PuImgCropper> | null>(null);

const squareScale = ref(1);
const squareRotate = ref(0);
const avatarScale = ref(1.12);

const landscapeImage = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e8f3ed" />
        <stop offset="1" stop-color="#f8d7a6" />
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="url(#bg)" />
    <circle cx="590" cy="164" r="72" fill="#efb45b" />
    <path d="M0 450 C140 388 260 430 390 388 C540 340 652 388 800 330 L800 800 L0 800 Z" fill="#719f95" />
    <path d="M110 418 L245 230 L382 418 Z" fill="#3f625b" />
    <path d="M330 420 L488 170 L660 420 Z" fill="#50766c" />
    <path d="M84 555 C218 510 314 578 448 535 C574 494 654 542 724 508" fill="none" stroke="#fff6df" stroke-width="34" stroke-linecap="round" opacity="0.6" />
  </svg>
`);

const avatarImage = svgToDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
    <rect width="800" height="800" fill="#d2e4dc" />
    <circle cx="400" cy="275" r="156" fill="#556b4b" />
    <circle cx="400" cy="310" r="128" fill="#efc3a4" />
    <path d="M214 800 C240 586 304 492 400 492 C496 492 560 586 586 800 Z" fill="#2d4b58" />
    <path d="M270 206 C310 86 490 86 530 206 C480 158 326 158 270 206 Z" fill="#293d35" />
  </svg>
`);

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function logChange(payload: unknown): void {
  logEvent("change", payload);
}

function logConfirm(result: PuImgCropperConfirmResult | null): void {
  if (!result) {
    logEvent("confirm", null);
    return;
  }

  logEvent("confirm", {
    width: result.width,
    height: result.height,
    byteLength: result.tempFilePath.length,
  });
}

async function confirmSquare(): Promise<void> {
  logConfirm(await squareCropper.value?.getCroppedImage() ?? null);
}

async function confirmAvatar(): Promise<void> {
  logConfirm(await avatarCropper.value?.getCroppedImage() ?? null);
}

function resetSquare(): void {
  squareCropper.value?.reset();
}
</script>

<template>
  <Story title="PuImgCropper" group="display">
    <Variant title="Square">
      <div class="pu-story">
        <PuSurfaceCard tone="outline">
          <div class="pu-img-cropper-story__layout">
            <PuImgCropper
              ref="squareCropper"
              v-model:scale="squareScale"
              v-model:rotate="squareRotate"
              :src="landscapeImage"
              :width="300"
              :height="300"
              enable-rotate
              @ready="logEvent('ready', 'square')"
              @change="logChange"
            />
            <div class="pu-story__stack">
              <p class="pu-story__label">Square crop</p>
              <p class="pu-story__text">
                Drag the image, then use the exposed method to emit a cropped
                result.
              </p>
              <div class="pu-story__row">
                <span class="pu-story__badge">
                  Scale {{ squareScale.toFixed(2) }}
                </span>
                <span class="pu-story__badge">
                  Rotate {{ Math.round(squareRotate) }}deg
                </span>
              </div>
              <div class="pu-img-cropper-story__actions">
                <PuButton
                  text="Reset"
                  theme="Surface"
                  size="xSmall"
                  @click="resetSquare"
                />
                <PuButton
                  text="Confirm"
                  size="xSmall"
                  @click="confirmSquare"
                />
              </div>
            </div>
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Round Avatar">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <div class="pu-img-cropper-story__center">
            <PuImgCropper
              ref="avatarCropper"
              v-model:scale="avatarScale"
              :src="avatarImage"
              :width="240"
              :height="240"
              shape="round"
              format="png"
              :show-grid="false"
              @ready="logEvent('ready', 'avatar')"
              @change="logChange"
            />
            <div class="pu-img-cropper-story__actions">
              <PuButton
                text="Export avatar"
                size="xSmall"
                @click="confirmAvatar"
              />
            </div>
          </div>
        </PuSurfaceCard>
      </div>
    </Variant>

    <Variant title="Disabled">
      <div class="pu-story pu-story--narrow">
        <PuSurfaceCard tone="outline">
          <PuImgCropper
            :src="landscapeImage"
            :width="260"
            :height="180"
            :scale="1.24"
            :rotate="8"
            disabled
          />
          <p class="pu-story__text">
            Disabled state keeps the current transform visible and stops
            gesture updates.
          </p>
        </PuSurfaceCard>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.pu-img-cropper-story__layout {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(180px, 1fr);
  align-items: center;
  gap: 20px;
}

.pu-img-cropper-story__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pu-img-cropper-story__center {
  display: grid;
  justify-items: center;
  gap: 16px;
}

@media (max-width: 640px) {
  .pu-img-cropper-story__layout {
    grid-template-columns: 1fr;
  }
}
</style>
