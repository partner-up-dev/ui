export type PuExpansionResetKey = string | number | boolean | null;

export type PuExpandablePolicy = {
  expanded?: boolean;
  defaultExpanded: boolean;
  resetKey: PuExpansionResetKey;
  keepContentMounted: boolean;
  toggleLabel: string;
};
