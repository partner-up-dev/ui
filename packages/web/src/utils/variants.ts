import { kebabCase } from "./string";

export type PuVariantClassValue = string | number | boolean | null | undefined;

export function isPuVariantValue<T extends readonly string[]>(
  values: T,
  value: unknown,
): value is T[number] {
  return typeof value === "string" && values.includes(value);
}

export function normalizePuVariant<T extends readonly string[]>(
  values: T,
  value: unknown,
  fallback: T[number],
): T[number] {
  return isPuVariantValue(values, value) ? value : fallback;
}

export function createPuModifierClass(
  block: string,
  modifier: string,
  value: PuVariantClassValue,
): string | undefined {
  if (value === null || value === undefined || value === false) {
    return undefined;
  }

  if (value === true) {
    return `${block}--${kebabCase(modifier)}`;
  }

  return `${block}--${kebabCase(modifier)}-${kebabCase(String(value))}`;
}

export function createPuStateClass(
  state: string,
  active: boolean | null | undefined,
): string | undefined {
  return active ? `is-${kebabCase(state)}` : undefined;
}

export function createPuPartClass(block: string, part: string): string {
  return `${block}__${kebabCase(part)}`;
}

