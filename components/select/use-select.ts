import { ReactNode, useMemo, useState } from "react";
import { By, Option, SelectProps } from "./types";

type SBy = string | undefined;
type SOption = Record<string, unknown>;
type SMultiNullValue = [];
type SSingleNullValue = number | string | null;
type SNullValue = SMultiNullValue | SSingleNullValue;

type SMultiValue = string[] | number[] | SOption[];
type SSingleValue = string | number | SOption | null;
type SValue = SMultiValue | SSingleValue;

export function useSelect<
  TOption extends Option,
  TMulti extends boolean = false,
  TBy extends By<TOption> | undefined = undefined
>(props: SelectProps<TOption, TMulti, TBy>) {
  const [open, setOpen] = useState(false);

  const isRecord = (value: unknown): value is SOption => {
    return typeof value === "object" && value !== null;
  };

  const isArrayOfRecords = (value: unknown[]): value is SOption[] => {
    const firstInstance = value[0];

    return isRecord(firstInstance);
  };

  const isArrayOfNumbers = (value: unknown[]): value is number[] => {
    const firstInstance = value[0];
    return typeof firstInstance === "number";
  };

  const isArrayOfStrings = (value: unknown[]): value is string[] => {
    const firstInstance = value[0];
    return typeof firstInstance === "number";
  };

  const nullValue = (): SNullValue => {
    if (props.multiple) {
      return [];
    }

    return nullSingleValue();
  };

  const nullSingleValue = (): SSingleNullValue => {
    const by = props.by as SBy;

    if (!by) {
      return null;
    }

    if (typeof by === "string") {
      return "";
    }

    if (typeof by === "number") {
      return 0;
    }

    return null;
  };

  const [value, setValue] = useState<SValue>(props.value ?? nullValue());
  const [options, setOptions] = useState<SOption[]>(props.options ?? []);
  const optionsByKey = useMemo(() => {
    const by = props.by as string | undefined;

    if (!by) {
      return null;
    }

    const map: Record<string, SOption> = {};
    options.forEach((option) => {
      map[by] = option;
    });

    return map;
  }, [options, props.by]);

  const onSelect = (option: SOption): void => {
    if (isSelected(option)) {
      return onDelete(option);
    }

    return onAdd(option);
  };

  const onAdd = (option: SOption): void => {
    const by = props.by as string | undefined;
    const multiple = props.multiple as boolean | undefined;
    const onChange = props.onChange as (value: SValue) => void;
    if (!multiple && !Array.isArray(value)) {
      if (isRecord(value)) {
        setValue(option);
        onChange(option);
      }

      if (!by) {
        return;
      }

      const property = option[by] as string | number;

      onChange(property);
      onChange(property);
      setOpen(false);
    }
  };

  const onDelete = (option: SOption): void => {};

  const hasValue = () => {
    if (
      !value ||
      value === 0 ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return false;
    }

    return true;
  };

  const isSelected = (option: SOption): boolean => {
    const by = props.by as SBy;

    if (!hasValue()) {
      return false;
    }

    if (Array.isArray(value)) {
      if (isArrayOfRecords(value)) {
        return value.includes(option);
      }

      if (!by) {
        return false;
      }

      const property = option[by] as number | string;

      if (isArrayOfNumbers(value) && typeof property === "number") {
        return value.includes(property);
      }

      if (isArrayOfStrings(value) && typeof property === "string") {
        return value.includes(property);
      }
    }

    return value === option;
  };

  const getOptionValue = (option: SOption, index: number): string => {
    const searchBy = props.searchBy as string | string[] | undefined;

    if (!searchBy) {
      return `${index}`;
    }

    if (Array.isArray(searchBy)) {
      const value = searchBy
        .map((key) => getNestedOptionProperty(option, key))
        .join(" ");
      return `${index}.${value}`;
    }

    return `${getNestedOptionProperty(option, searchBy)}`;
  };

  const getOptionLabel = (option: SOption): ReactNode => {
    const render = props.render as string | ((value: SOption) => ReactNode);

    if (typeof render === "function") {
      return render(option);
    }

    return getNestedOptionProperty(option, render);
  };

  const getOptionByValue = (value: SSingleValue) => {
    if (!value) {
      return null;
    }
    if (isRecord(value)) {
      return value;
    }

    if (!optionsByKey) {
      return null;
    }
    return optionsByKey[value];
  };

  const getOptionSelectedLabel = (value: SSingleValue): ReactNode => {
    const renderSelected = props.renderSelected as string | undefined;
    const option = getOptionByValue(value);

    if (!option) {
      return null;
    }

    if (!renderSelected) {
      return getOptionLabel(option);
    }

    return `${getNestedOptionProperty(option, renderSelected)}`;
  };
}

const getNestedOptionProperty = (
  option: Record<string, unknown>,
  key: string
): string => {
  const keysArr = key.split(".");
  let value = option;

  keysArr.forEach((key) => {
    value = value[key] as Record<string, unknown>;
  });

  return value as unknown as string;
};
