"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { ReactNode } from "react";
import { useBoolean } from "usehooks-ts";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Option<TOption> = {
  [Key in keyof TOption]: TOption[Key];
};

type FlattenKeys<
  T extends Record<string, unknown>,
  Key = keyof T
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${FlattenKeys<T[Key]>}`
    : T[Key] extends Array<infer U>
    ? U extends Record<string, unknown>
      ? `${Key}.${number}.${FlattenKeys<U>}`
      : never
    : `${Key}`
  : never;

type Value<TOption, TMulti> = TMulti extends true ? TOption[] : TOption | null;

type Render<TOption extends Option<TOption>> =
  | FlattenKeys<TOption>
  | ((props: TOption) => ReactNode);

type Props<TOption extends Option<TOption>, TMulti extends boolean = false> = {
  options: TOption[];
  value: Value<TOption, TMulti>;
  onChange: (value: Value<TOption, TMulti>) => void;
  isMulti?: TMulti;
  render: Render<TOption>;
  renderSelected?: Render<TOption>;
  searchBy?: FlattenKeys<TOption> | FlattenKeys<TOption>[];
  className?: string;
  placeholder?: string;
  placeholderSearch?: string;
  placeholderEmpty?: string;
};

export const CSelect = <
  TOption extends Option<TOption>,
  TMulti extends boolean = false
>(
  props: Props<TOption, TMulti>
) => {
  const { value: open, toggle } = useBoolean();

  const {
    getOptionLabel,
    getOptionSelectedLabel,
    getOptionValue,
    onSelect,
    isOptionSelected,
  } = useSelect(props);
  const {
    searchBy,
    value,
    className,
    placeholder = "Выбрать...",
    placeholderSearch = "Поиск...",
    placeholderEmpty = "Ничего не найдено...",
    options,
  } = props;

  return (
    <Popover open={open} onOpenChange={toggle}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full font-normal justify-start py-0 pl-3 pr-0 min-h-10 h-auto divide-x items-stretch hover:bg-slate-50",
            className
          )}
        >
          <div className="flex items-center grow">
            <div className="flex flex-wrap gap-1 py-1">
              <SelectedOptionLabel
                value={value}
                placeholder={placeholder}
                getOptionSelectedLabel={getOptionSelectedLabel}
              />
            </div>
          </div>
          <div className="flex items-center justify-center px-2">
            <ChevronsUpDown
              className={cn("size-4 text-slate-500", open && "text-black")}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full" align="start">
        <Command>
          {searchBy && <CommandInput placeholder={placeholderSearch} />}
          <CommandList>
            <CommandEmpty>{placeholderEmpty}</CommandEmpty>
            <CommandGroup>
              {options.map((option, i) => (
                <CommandItem
                  key={i}
                  value={getOptionValue(option, i)}
                  onSelect={() => onSelect(option)}
                  className="flex justify-between"
                >
                  {getOptionLabel(option)}
                  {isOptionSelected(option) && <Check className="size-4" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

type SelectedOptionLabelProps<
  TOption extends Option<TOption>,
  TMulti extends boolean = false
> = Pick<Props<TOption, TMulti>, "value" | "placeholder"> &
  Pick<ReturnType<typeof useSelect<TOption, TMulti>>, "getOptionSelectedLabel">;

const SelectedOptionLabel = <
  TOption extends Option<TOption>,
  TMulti extends boolean = false
>({
  value,
  getOptionSelectedLabel,
  placeholder,
}: SelectedOptionLabelProps<TOption, TMulti>) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return <p className="text-slate-500">{placeholder}</p>;
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <div key={index} className="border rounded-md px-2 py-0.5 bg-white">
        {getOptionSelectedLabel(item)}
      </div>
    ));
  }

  return getOptionSelectedLabel(value as TOption);
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

const useSelect = <
  TOption extends Option<TOption>,
  TMulti extends boolean = false
>({
  render,
  onChange,
  searchBy,
  value,
  isMulti,
  renderSelected,
}: Props<TOption, TMulti>) => {
  const onSelect = (option: TOption): void => {
    if (isOptionSelected(option)) {
      return unselect(option);
    }

    return select(option);
  };

  const select = (option: TOption): void => {
    if (isMulti) {
      const onChangeMulti = onChange as Props<TOption, true>["onChange"];
      const prevValue = value as TOption[];
      const newValue = [...prevValue, option];
      return onChangeMulti(newValue);
    }

    const onChangeSingle = onChange as Props<TOption, false>["onChange"];
    return onChangeSingle(option);
  };

  const unselect = (option: TOption): void => {
    if (isMulti) {
      const onChangeMulti = onChange as Props<TOption, true>["onChange"];
      const prevValue = value as TOption[];
      const newValue = prevValue.filter((item) => item !== option);
      return onChangeMulti(newValue);
    }

    const onChangeSingle = onChange as Props<TOption, false>["onChange"];
    return onChangeSingle(null);
  };

  const getOptionValue = (option: TOption, index: number): string => {
    if (!searchBy) {
      return index.toString();
    }

    if (Array.isArray(searchBy)) {
      const value = searchBy
        .map((key) => getNestedOptionProperty(option, key))
        .join(" ");
      return `${index} ${value}`;
    }

    return `${index} ${getNestedOptionProperty(option, searchBy)}`;
  };

  const getOptionLabel = (option: TOption): ReactNode => {
    if (typeof render === "function") {
      return render(option);
    }

    return `${getNestedOptionProperty(option, render)}`;
  };

  const getOptionSelectedLabel = (option: TOption): ReactNode => {
    if (!renderSelected) {
      return getOptionLabel(option);
    }

    if (typeof renderSelected === "function") {
      return renderSelected(option);
    }

    return `${getNestedOptionProperty(option, renderSelected)}`;
  };

  const isOptionSelected = (option: TOption): boolean => {
    console.log("value", value);
    console.log("option", option);

    if (isMulti) {
      return (value as TOption[]).includes(option);
    }

    return (value as TOption) === option;
  };

  return {
    onSelect,
    getOptionValue,
    getOptionLabel,
    getOptionSelectedLabel,
    isOptionSelected,
  };
};
