import { definePreset } from "unocss";

const sysVar = (path: string) => `var(--sys-${path})`;

const colors = {
  primary: sysVar("color-primary"),
  "primary-on": sysVar("color-on-primary"),
  "primary-container": sysVar("color-primary-container"),
  "primary-container-on": sysVar("color-on-primary-container"),
  secondary: sysVar("color-secondary"),
  "secondary-on": sysVar("color-on-secondary"),
  "secondary-container": sysVar("color-secondary-container"),
  "secondary-container-on": sysVar("color-on-secondary-container"),
  tertiary: sysVar("color-tertiary"),
  "tertiary-on": sysVar("color-on-tertiary"),
  "tertiary-container": sysVar("color-tertiary-container"),
  "tertiary-container-on": sysVar("color-on-tertiary-container"),
  error: sysVar("color-error"),
  "error-on": sysVar("color-on-error"),
  "error-container": sysVar("color-error-container"),
  "error-container-on": sysVar("color-on-error-container"),
  warning: sysVar("color-warning"),
  "warning-on": sysVar("color-on-warning"),
  surface: sysVar("color-surface"),
  "surface-on": sysVar("color-on-surface"),
  "surface-on-variant": sysVar("color-on-surface-variant"),
  "surface-container": sysVar("color-surface-container"),
  "surface-container-high": sysVar("color-surface-container-high"),
  "surface-container-highest": sysVar("color-surface-container-highest"),
  "surface-container-low": sysVar("color-surface-container-low"),
  outline: sysVar("color-outline"),
  "outline-variant": sysVar("color-outline-variant"),
  blue: sysVar("color-blue"),
  red: sysVar("color-red"),
  green: sysVar("color-green"),
  yellow: sysVar("color-yellow"),
};

const spacing = {
  xsmall: sysVar("spacing-xsmall"),
  small: sysVar("spacing-small"),
  medium: sysVar("spacing-medium"),
  large: sysVar("spacing-large"),
  xlarge: sysVar("spacing-xlarge"),
};

const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const shadows = {
  0: sysVar("shadow-0"),
  1: sysVar("shadow-1"),
  2: sysVar("shadow-2"),
  3: sysVar("shadow-3"),
  4: sysVar("shadow-4"),
  6: sysVar("shadow-6"),
  8: sysVar("shadow-8"),
  12: sysVar("shadow-12"),
  16: sysVar("shadow-16"),
  24: sysVar("shadow-24"),
};

const borderRadius = {
  none: sysVar("radius-none"),
  xsmall: sysVar("radius-xsmall"),
  small: sysVar("radius-small"),
  medium: sysVar("radius-medium"),
  large: sysVar("radius-large"),
  full: sysVar("radius-full"),
  pill: sysVar("radius-pill"),
};

const typographyKeys = [
  "hero",
  "title",
  "section",
  "body",
  "support",
  "caption",
  "control",
] as const;

const fonts = typographyKeys.reduce(
  (acc, key) => {
    acc[key] = {
      "font-size": sysVar(`typo-${key}-size`),
      "font-weight": sysVar(`typo-${key}-weight`),
      "line-height": sysVar(`typo-${key}-line-height`),
    };
    return acc;
  },
  {} as Record<(typeof typographyKeys)[number], Record<string, string>>,
);

const paddingPropertyMap: Record<string, string[]> = {
  x: ["padding-left", "padding-right"],
  y: ["padding-top", "padding-bottom"],
  lt: ["padding-left", "padding-top"],
  rt: ["padding-right", "padding-top"],
  rb: ["padding-right", "padding-bottom"],
  lb: ["padding-left", "padding-bottom"],
};

const marginPropertyMap: Record<string, string[]> = {
  x: ["margin-left", "margin-right"],
  y: ["margin-top", "margin-bottom"],
  t: ["margin-top"],
  b: ["margin-bottom"],
  r: ["margin-right"],
  l: ["margin-left"],
  lt: ["margin-left", "margin-top"],
  rt: ["margin-right", "margin-top"],
  rb: ["margin-right", "margin-bottom"],
  lb: ["margin-left", "margin-bottom"],
};

export const partnerUpDesignSafelist = [
  "i-mdi-alert-circle-outline",
  "i-mdi-alert-outline",
  "i-mdi-arrow-left",
  "i-mdi-check-bold",
  "i-mdi-check-circle-outline",
  "i-mdi-chevron-down",
  "i-mdi-chevron-right",
  "i-mdi-close",
  "i-mdi-close-circle",
  "i-mdi-eye",
  "i-mdi-eye-off",
  "i-mdi-file-multiple-outline",
  "i-mdi-file-outline",
  "i-mdi-information-outline",
  "i-mdi-link-variant",
  "i-mdi-loading",
  "i-mdi-tray-arrow-up",
] as const;

export const partnerUpDesignIconSafelist = partnerUpDesignSafelist;

export default definePreset(() => ({
  name: "partner-up-design",
  safelist: [...partnerUpDesignSafelist],
  theme: {
    colors,
    spacing,
    breakpoints,
    "box-shadow": shadows,
    "border-radius": borderRadius,
    fonts,
  },
  rules: [
    [
      /^elevation-(\d+)$/,
      ([, d]) => {
        const elevation = parseInt(d);
        if (elevation in shadows) {
          return { "box-shadow": shadows[elevation as keyof typeof shadows] };
        }
      },
    ],
    [
      /^radius-(none|xsmall|small|medium|large|full|pill)$/,
      ([, size]) => ({
        "border-radius": borderRadius[size as keyof typeof borderRadius],
      }),
    ],
    [
      /^radius-(x|y|lt|rt|rb|lb)-(none|xsmall|small|medium|large|full|pill)$/,
      ([, pos, size]) => {
        const value = borderRadius[size as keyof typeof borderRadius];
        if (pos === "x") {
          return { "border-radius": `${value} 0 0 ${value}` };
        }
        if (pos === "y") {
          return { "border-radius": `0 ${value} ${value} 0` };
        }
        if (pos === "lt") {
          return { "border-radius": `${value} 0 0 0` };
        }
        if (pos === "rt") {
          return { "border-radius": `0 ${value} 0 0` };
        }
        if (pos === "rb") {
          return { "border-radius": `0 0 ${value} 0` };
        }
        if (pos === "lb") {
          return { "border-radius": `0 0 0 ${value}` };
        }
      },
    ],
    [
      /^font-(.+)-mono$/,
      ([, key]) => {
        const font = fonts[key as keyof typeof fonts];
        if (font) {
          return {
            ...font,
            "font-family": "ui-monospace",
          };
        }
      },
    ],
    [
      /^font-(.+)$/,
      ([, key]) => {
        const font = fonts[key as keyof typeof fonts];
        if (font) return font;
      },
    ],
    [
      /^space-p-(xsmall|small|medium|large|xlarge)$/,
      ([, size]) => ({
        padding: spacing[size as keyof typeof spacing],
      }),
    ],
    [
      /^space-m-(xsmall|small|medium|large|xlarge)$/,
      ([, size]) => ({
        margin: spacing[size as keyof typeof spacing],
      }),
    ],
    [
      /^space-g-(xsmall|small|medium|large|xlarge)$/,
      ([, size]) => ({
        gap: spacing[size as keyof typeof spacing],
      }),
    ],
    [
      /^space-p-(x|y|lt|rt|rb|lb)-(xsmall|small|medium|large|xlarge)$/,
      ([, pos, size]) => {
        const properties = paddingPropertyMap[pos];
        if (properties) {
          return properties.reduce(
            (acc, prop) => {
              acc[prop] = spacing[size as keyof typeof spacing];
              return acc;
            },
            {} as Record<string, string>,
          );
        }
      },
    ],
    [
      /^space-m-(x|y|lt|rt|rb|lb|t|r|l|b)-(xsmall|small|medium|large|xlarge)$/,
      ([, pos, size]) => {
        const properties = marginPropertyMap[pos];
        if (properties) {
          return properties.reduce(
            (acc, prop) => {
              acc[prop] = spacing[size as keyof typeof spacing];
              return acc;
            },
            {} as Record<string, string>,
          );
        }
      },
    ],
  ],
}));
