import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

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
