import { ReactNode, useState } from "react";
import { SelectBy, SelectByDefault, SelectOptions, SelectProps } from "./types";

type LocalOptions =
  | number[]
  | string[]
  | Record<string | number | symbol, unknown>[];

type LocalValue =
  | number
  | number[]
  | string
  | string[]
  | Record<string | number | symbol, unknown>
  | Record<string | number | symbol, unknown>[]
  | null;

export const useSelect = <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false
>(
  props: SelectProps<Options, By, Multi>
) => {
  const [options, setOptions] = useState<LocalOptions>(
    (props.options ?? []) as LocalOptions
  );
  const [value, setValue] = useState<LocalValue>(
    props.value ??
      getNullValue({
        options,
        nullValue: "nullValue" in props ? props.nullValue : undefined,
        multiple: props.multiple,
        by: props.by,
      })
  );

  const hasValue = (): boolean => {
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

  const isSelected = (option: LocalOptions[number], index: number): boolean => {
    if (!hasValue()) {
      return false;
    }

    if (isRecordArray(value) && isRecord(option)) {
      return value.includes(option);
    }

    if (isStringArray(value) && isString(option)) {
      return value.includes(option);
    }

    if (isNumberArray(value) && isNumber(option)) {
      return value.includes(option);
    }

    return value === option;
  };

  const onSelect = (option: LocalOptions[number], index: number): void => {
    if (isSelected(option, index)) {
      return onDelete(option, index);
    }

    return onAdd(option, index);
  };

  const onAdd = (option: LocalOptions[number], index: number): void => {
    const by = props.by as string | undefined;
    const multiple = props.multiple as boolean | undefined;
    const onChange = props.onChange as (value: LocalValue) => void;

    if (!multiple && !Array.isArray(value)) {
      if (props.by === "index") {
        return onChange(index);
      }
    }
  };

  const onDelete = (option: LocalOptions[number], index: number): void => {};

  const getOptionValue = (
    option: LocalOptions[number],
    index: number
  ): string => {
    return "";
  };

  const getOptionLabel = (option: LocalOptions[number]): ReactNode => {
    return "";
  };

  return {};
};

const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

const isRecord = (
  value: unknown
): value is Record<string | number | symbol, unknown> => {
  return typeof value === "object" && value !== null;
};

const isRecordArray = (
  value: unknown
): value is Record<string | number | symbol, unknown>[] => {
  return Array.isArray(value) && value.length > 0 && isRecord(value[0]);
};

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.length > 0 && isString(value[0]);
};

const isNumberArray = (value: unknown): value is number[] => {
  return Array.isArray(value) && value.length > 0 && isNumber(value[0]);
};

const getNullValue = ({
  options,
  nullValue,
  multiple,
  by,
}: {
  options: LocalOptions;
  nullValue?: unknown;
  multiple?: boolean;
  by?: string;
}): LocalValue => {
  if (multiple) {
    return [];
  }

  if (nullValue) {
    return nullValue as LocalValue;
  }

  if (options.length === 0) {
    return null;
  }

  if (isNumberArray(options)) {
    return 0;
  }

  if (isStringArray(options)) {
    if (!by || by === "value") {
      return "";
    }

    return 0;
  }

  if (isRecordArray(options)) {
    if (!by) {
      return null;
    }

    if (by in options[0]) {
      if (typeof options[0][by] === "string") {
        return "";
      }
      return 0;
    }
    return null;
  }

  return null;
};
