import { ReactNode, useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { selectSettings } from "./settings";
import {
  SelectBy,
  SelectByDefault,
  SelectFlatLabel,
  SelectFlatOnChange,
  SelectFlatSearch,
  SelectFlatValue,
  SelectOptions,
  SelectProps,
  SelectRecord,
} from "./types";

export const useSelect = <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false
>(
  props: SelectProps<Options, By, Multi>
) => {
  const [open, setOpen] = useState<boolean>(false);
  const options = useMemo(() => {
    return (props.options as SelectOptions) ?? [];
  }, [props.options]);

  const by =
    "by" in props && typeof props["by"] === "string"
      ? (props["by"] as string)
      : undefined;

  const getOptionByProp = (option: SelectOptions[number]) => {
    if (by && isRecord(option) && by in option) {
      const prop = option[by];

      if (typeof prop === "string" || typeof prop === "number") {
        return prop;
      }
    }
  };

  const optionsBy = useMemo(() => {
    if (!by || !isRecordArray(options)) return null;

    const map: Record<string | number, SelectRecord> = {};
    options.forEach((option) => {
      const prop = getOptionByProp(option);
      if (!prop) return;

      map[prop] = option;
    });

    return map;

    // eslint-disable-next-line
  }, [by, options]);

  const [value, setValue] = useState<SelectFlatValue>(null);

  useEffect(() => {
    const getInitialValue = (): SelectFlatValue => {
      const multiple = props.multiple as boolean | undefined;
      const value = props.value as SelectFlatValue | undefined;

      if (value) {
        return value;
      }

      if (multiple) {
        return [] as SelectFlatValue;
      }

      return null;
    };
    setValue(getInitialValue());
  }, [props.value, props.multiple, options, optionsBy]);

  const onChange = (option: SelectFlatValue) => {
    const onChange = props.onChange as SelectFlatOnChange | undefined;

    onChange?.(option);
    setValue(option);

    if (!isMultiple()) {
      setOpen(false);
    }
  };

  const hasSearch = () => {
    return !!props.search;
  };

  const hasValue = (): boolean => {
    if (
      value === undefined ||
      value === null ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return false;
    }

    return true;
  };

  const isMultiple = (): boolean => {
    const multiple = props.multiple as boolean | undefined;

    return !!multiple || Array.isArray(value);
  };

  const isSelected = (option: SelectOptions[number]): boolean => {
    const prop = getOptionByProp(option);

    if (!hasValue()) {
      return false;
    }

    // For single option
    if (!Array.isArray(value) && !prop) {
      return value === option;
    }

    if (!Array.isArray(value) && prop) {
      return value === prop;
    }

    // For multi
    if (isRecordArray(value) && isRecord(option)) {
      return value.includes(option);
    }

    if (isStringArray(value) && typeof option === "string") {
      return value.includes(option);
    }

    if (isNumberArray(value) && typeof option === "number") {
      return value.includes(option);
    }

    if (typeof prop === "string" && isStringArray(value) && isRecord(option)) {
      return value.includes(prop);
    }

    if (typeof prop === "number" && isNumberArray(value) && isRecord(option)) {
      return value.includes(prop);
    }

    return false;
  };

  const getDefaultObjectValue = (option?: SelectRecord) => {
    if (!option) {
      return "";
    }

    for (const key in selectSettings.label) {
      const label = selectSettings.label[key];

      if (label in option) {
        return `${option[label]}`;
      }
    }

    const objKeys = Object.keys(option);

    for (const key in objKeys) {
      const label = objKeys[key];

      if (
        typeof option[label] === "string" ||
        typeof option[label] === "number"
      ) {
        return `${option[label]}`;
      }
    }

    return "";
  };

  const getOptionValue = (
    option: SelectOptions[number],
    index: number
  ): string => {
    const search = props.search as SelectFlatSearch;
    const label = props.label as SelectFlatLabel;

    // If no search passed => return index as value for string|number|object values
    if (!search) {
      return `${index}`;
    }

    // If option number|string => check if custom label passed or return value
    if (typeof option === "string" || typeof option === "number") {
      if (typeof label === "function") {
        return `${label(option)}`;
      }

      return `${option}`;
    }

    // NEXT LINES FOR OBJECT

    // search={true} => value depends on: label="key" | label={(value) => Node} | !label
    if (search === true) {
      if (!label) {
        return getDefaultObjectValue(option);
      }

      if (typeof label === "string") {
        return getNestedOptionProperty(option, label);
      }

      if (typeof label === "function") {
        const node = label(option);
        const string = renderToString(node);
        return string.replace(/<[^>]+>/g, "");
      }
    }

    // search = {["key1", "key2"]} => value = "obj[key1] obj[key2]"
    if (Array.isArray(search)) {
      return search
        .map((key) => getNestedOptionProperty(option, key))
        .join(" ");
    }

    // search={["key"]} => value = "obj[key]"
    if (typeof search === "string" && search in option) {
      return `${getNestedOptionProperty(option, search)}`;
    }

    // default value
    return `${index}`;
  };

  const getLabel = (
    option: SelectOptions[number],
    label: SelectFlatLabel
  ): ReactNode => {
    if (typeof label === "function") {
      return label(option);
    }

    if (typeof option === "string" || typeof option === "number") {
      return option;
    }

    if (typeof label === "string") {
      return getNestedOptionProperty(option, label);
    }

    return getDefaultObjectValue(option);
  };

  const getLabelWithBy = (
    option: SelectOptions[number],
    label: SelectFlatLabel
  ) => {
    if (isRecordArray(options) && !isRecord(option) && optionsBy) {
      const object = optionsBy[option];
      return getLabel(object, label);
    }

    return getLabel(option, label);
  };

  const getOptionLabel = (option: SelectOptions[number]): ReactNode => {
    const label = props.label as SelectFlatLabel;
    return getLabelWithBy(option, label);
  };

  const isCustomLabelSelected = () => {
    return typeof props.labelSelected === "function";
  };

  const getLabelSelected = (option: SelectOptions[number]): ReactNode => {
    const labelSelected = props.labelSelected as SelectFlatLabel;

    if (labelSelected) {
      return getLabelWithBy(option, labelSelected);
    }

    return getOptionLabel(option);
  };

  const onSelect = (option: SelectOptions[number]): void => {
    if (isSelected(option)) {
      return onDelete(option);
    }

    return onAdd(option);
  };

  const onAdd = (option: SelectOptions[number]): void => {
    if (!Array.isArray(value)) {
      if (isRecord(option) && by && by in option) {
        const prop = option[by];
        if (typeof prop === "number" || typeof prop === "string") {
          return onChange(prop);
        }
      }
      return onChange(option);
    }

    if (typeof option === "string") {
      const stringValue = value as string[];
      const updated = [...stringValue, option];
      return onChange(updated);
    }

    if (typeof option === "number") {
      const numberValue = value as number[];
      const updated = [...numberValue, option];
      return onChange(updated);
    }

    if (isRecord(option) && !by) {
      const recordValue = value as SelectRecord[];
      const updated = [...recordValue, option];
      return onChange(updated);
    }

    if (isRecord(option) && typeof by === "string" && by in option) {
      const prop = option[by];

      if (typeof prop === "number") {
        const numberValue = value as number[];

        const updated = [...numberValue, prop];
        return onChange(updated);
      }

      if (typeof prop === "string") {
        const stringValue = value as string[];
        const updated = [...stringValue, prop];
        return onChange(updated);
      }
    }
  };

  const onDelete = (option: SelectOptions[number]): void => {
    // For single
    if (!Array.isArray(value)) {
      return onChange(null);
    }

    // NEXT LINES FOR MULTI

    if (isStringArray(value) && typeof option === "string") {
      const updated = value.filter((v) => v !== option);
      return onChange(updated);
    }

    if (isNumberArray(value) && typeof option === "number") {
      const updated = value.filter((v) => v !== option);
      return onChange(updated);
    }

    if (isRecordArray(value) && isRecord(option)) {
      const updated = value.filter((v) => v !== option);
      return onChange(updated);
    }

    const prop = getOptionByProp(option);

    if (typeof prop === "number" && isNumberArray(value)) {
      const updated = value.filter((v) => v !== prop);
      return onChange(updated);
    }

    if (typeof prop === "string" && isStringArray(value)) {
      const updated = value.filter((v) => v !== prop);
      return onChange(updated);
    }
  };

  return {
    open,
    setOpen,
    options,
    value,
    hasValue,
    hasSearch,
    isSelected,
    isCustomLabelSelected,
    getOptionValue,
    getOptionLabel,
    getLabelSelected,
    onSelect,
    onDelete,
  };
};

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

const isRecord = (value: unknown): value is SelectRecord => {
  return typeof value === "object" && value !== null;
};
const isRecordArray = (value: unknown): value is SelectRecord[] => {
  return Array.isArray(value) && value.length > 0 && isRecord(value[0]);
};
const isStringArray = (value: unknown): value is string[] => {
  return (
    Array.isArray(value) && value.length > 0 && typeof value[0] === "string"
  );
};
const isNumberArray = (value: unknown): value is number[] => {
  return (
    Array.isArray(value) && value.length > 0 && typeof value[0] === "number"
  );
};
