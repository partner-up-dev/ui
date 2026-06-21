import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

const storyTreePaths: Record<string, string[]> = {
  PuButton: ["PuButton"],

  PuInput: ["Fields", "PuInput"],
  PuTextarea: ["Fields", "PuTextarea"],
  PuNumberInput: ["Fields", "PuNumberInput"],
  PuChipInput: ["Fields", "PuChipInput"],
  PuChipsEditor: ["Fields", "PuChipsEditor"],
  PuCheckbox: ["Selection", "PuCheckbox"],
  PuSelect: ["Selection", "PuSelect"],
  PuPicker: ["Selection", "PuPicker"],
  PuWheelPicker: ["Selection", "PuWheelPicker"],
  PuToggleSwitch: ["Selection", "PuToggleSwitch"],
  PuMultiStopToggle: ["Selection", "PuMultiStopToggle"],
  PuFileUpload: ["Other", "PuFileUpload"],
  PuFilesUpload: ["Other", "PuFilesUpload"],
  PuImgCropper: ["Other", "PuImgCropper"],
  PuForm: ["Meta", "PuForm"],

  PuCard: ["PuCard"],
  PuCell: ["Content", "PuCell"],
  PuDescriptionList: ["Content", "PuDescriptionList"],
  PuImg: ["Content", "PuImg"],
  PuAnnouncementBar: ["Status", "PuAnnouncementBar"],
  PuInlineNotice: ["Status", "PuInlineNotice"],
  PuEmptyState: ["Status", "PuEmptyState"],
  PuLoadingState: ["Status", "PuLoadingState"],
  PuSkeleton: ["Status", "PuSkeleton"],
  PuSpinner: ["Status", "PuSpinner"],
  PuTabs: ["Navigation", "PuTabs"],
  PuSegmented: ["Navigation", "PuSegmented"],
  PuChip: ["Tags", "PuChip"],
  PuTag: ["Tags", "PuTag"],

  PuPageHeader: ["PuPageHeader"],
  PuPageScaffold: ["PuPageScaffold"],
  PuScrollView: ["PuScrollView"],
  PuCellGroup: ["Groups", "PuCellGroup"],
  PuBentoGrid: ["Groups", "PuBentoGrid"],
  PuAccordion: ["Groups", "PuAccordion"],

  PuDialog: ["Dialogs", "PuDialog"],
  PuModal: ["Dialogs", "PuModal"],
  PuFloatPanel: ["Panels", "PuFloatPanel"],
  PuDrawer: ["PuDrawer"],
  PuSnackbar: ["PuSnackbar"],
};

export default defineConfig({
  plugins: [HstVue()],
  outDir: ".histoire/dist",
  storyMatch: ["src/stories/**/*.story.vue"],
  setupFile: "src/stories/histoire.setup.ts",
  setupCode: [
    `
export function setupVue3() {}
export function setupVanilla() {}
`,
  ],
  tree: {
    file: (file) => storyTreePaths[file.title] ?? [file.title],
    groups: [
      {
        id: "actions",
        title: "Actions",
      },
      {
        id: "display",
        title: "Display",
      },
      {
        id: "forms",
        title: "Forms",
      },
      {
        id: "layout",
        title: "Layout",
      },
      {
        id: "overlay",
        title: "Overlay",
      },
    ],
  },
  theme: {
    title: "PartnerUp Design Web",
    defaultColorScheme: "light",
  },
  backgroundPresets: [
    {
      label: "Surface",
      color: "#f8f6f1",
      contrastColor: "#1f1b16",
    },
    {
      label: "Container",
      color: "#efede7",
      contrastColor: "#1f1b16",
    },
    {
      label: "Dark",
      color: "#1f1b16",
      contrastColor: "#f8f6f1",
    },
  ],
  responsivePresets: [
    {
      label: "Mobile",
      width: 390,
      height: 844,
    },
    {
      label: "Tablet",
      width: 768,
      height: 1024,
    },
    {
      label: "Desktop",
      width: 1200,
      height: 900,
    },
  ],
});
