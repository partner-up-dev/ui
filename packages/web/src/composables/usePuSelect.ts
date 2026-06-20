import {
  computed,
  isReadonly,
  isRef,
  ref,
  toValue,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";

export type PuUseSelectValue = unknown;
export type PuUseSelectModelValue<T = PuUseSelectValue> =
  | T
  | readonly T[]
  | undefined;
export type PuUseSelectAction =
  | "select"
  | "deselect"
  | "toggle"
  | "clear"
  | "set";

export type PuUseSelectChangeContext<
  T = PuUseSelectValue,
> = {
  action: PuUseSelectAction;
  value?: T;
  event?: Event;
};

export type PuUseSelectOptions<T = PuUseSelectValue> = {
  modelValue?: MaybeRefOrGetter<PuUseSelectModelValue<T>>;
  defaultValue?: MaybeRefOrGetter<PuUseSelectModelValue<T>>;
  multiple?: MaybeRefOrGetter<boolean>;
  disabled?: MaybeRefOrGetter<boolean>;
  disabledValues?: MaybeRefOrGetter<readonly T[]>;
  isOptionDisabled?: (value: T) => boolean;
  compare?: (a: T, b: T) => boolean;
  onUpdate?: (value: PuUseSelectModelValue<T>) => void;
  onChange?: (
    value: PuUseSelectModelValue<T>,
    context: PuUseSelectChangeContext<T>,
  ) => void;
};

const defaultCompare = <T>(a: T, b: T): boolean =>
  Object.is(a, b);

export function usePuSelect<T = PuUseSelectValue>(
  options: PuUseSelectOptions<T> = {},
) {
  const internalValue = ref(toValue(options.defaultValue)) as Ref<
    PuUseSelectModelValue<T>
  >;
  const isControlled = computed(() => options.modelValue !== undefined);
  const modelValue = computed<PuUseSelectModelValue<T>>(() =>
    isControlled.value ? toValue(options.modelValue) : internalValue.value,
  );
  const isMultiple = computed(() => Boolean(toValue(options.multiple)));
  const isGroupDisabled = computed(() => Boolean(toValue(options.disabled)));
  const compare = (a: T, b: T): boolean =>
    options.compare ? options.compare(a, b) : defaultCompare(a, b);

  const selectedValues = computed<readonly T[]>(() => {
    const value = modelValue.value;

    if (Array.isArray(value)) {
      return value as readonly T[];
    }

    if (value === undefined) {
      return [];
    }

    return [value as T];
  });

  function valuesEqual(
    valueA: PuUseSelectModelValue<T>,
    valueB: PuUseSelectModelValue<T>,
  ): boolean {
    if (Array.isArray(valueA) || Array.isArray(valueB)) {
      if (!Array.isArray(valueA) || !Array.isArray(valueB)) {
        return false;
      }

      return (
        valueA.length === valueB.length &&
        valueA.every((item, index) => compare(item, valueB[index]))
      );
    }

    if (valueA === undefined || valueB === undefined) {
      return valueA === valueB;
    }

    return compare(valueA as T, valueB as T);
  }

  function isSelected(value: T): boolean {
    return selectedValues.value.some((selectedValue) =>
      compare(selectedValue, value),
    );
  }

  function isValueDisabled(value: T): boolean {
    const disabledValues = toValue(options.disabledValues) ?? [];

    return (
      isGroupDisabled.value ||
      disabledValues.some((disabledValue) => compare(disabledValue, value)) ||
      Boolean(options.isOptionDisabled?.(value))
    );
  }

  function updateValue(
    nextValue: PuUseSelectModelValue<T>,
    context: PuUseSelectChangeContext<T>,
  ): void {
    if (valuesEqual(nextValue, modelValue.value)) {
      return;
    }

    if (!isControlled.value) {
      internalValue.value = nextValue;
    } else if (isRef(options.modelValue) && !isReadonly(options.modelValue)) {
      (options.modelValue as Ref<PuUseSelectModelValue<T>>).value = nextValue;
    }

    options.onUpdate?.(nextValue);
    options.onChange?.(nextValue, context);
  }

  function select(value: T, event?: Event): void {
    if (isValueDisabled(value)) {
      return;
    }

    const nextValue = isMultiple.value
      ? isSelected(value)
        ? selectedValues.value
        : [...selectedValues.value, value]
      : value;

    updateValue(nextValue, { action: "select", value, event });
  }

  function deselect(value: T, event?: Event): void {
    if (isValueDisabled(value)) {
      return;
    }

    const nextValue = isMultiple.value
      ? selectedValues.value.filter((selectedValue) => !compare(selectedValue, value))
      : isSelected(value)
        ? undefined
        : modelValue.value;

    updateValue(nextValue, { action: "deselect", value, event });
  }

  function toggle(value: T, event?: Event): void {
    if (isValueDisabled(value)) {
      return;
    }

    if (isSelected(value)) {
      deselect(value, event);
      return;
    }

    select(value, event);
  }

  function clear(event?: Event): void {
    if (isGroupDisabled.value) {
      return;
    }

    updateValue(isMultiple.value ? [] : undefined, { action: "clear", event });
  }

  function setValue(value: PuUseSelectModelValue<T>, event?: Event): void {
    if (isGroupDisabled.value) {
      return;
    }

    updateValue(value, { action: "set", event });
  }

  function getOptionState(value: T) {
    return {
      selected: isSelected(value),
      disabled: isValueDisabled(value),
    };
  }

  return {
    modelValue,
    selectedValues,
    isControlled,
    isMultiple,
    isGroupDisabled,
    isSelected,
    isDisabled: isValueDisabled,
    getOptionState,
    select,
    deselect,
    toggle,
    clear,
    setValue,
  };
}
