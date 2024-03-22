"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  Ref,
  forwardRef,
} from "react";
import { Button, ButtonProps } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { By, Option, SelectProps } from "./types";
import { useSelect } from "./use-select";

export const SelectWithoutRef = <
  TOption extends Option,
  TMulti extends boolean = false,
  TBy extends By<TOption> | undefined = undefined
>(
  props: SelectProps<TOption, TMulti, TBy>,
  ref: Ref<HTMLButtonElement>
) => {
  const {
    open,
    setOpen,
    isSelected,
    onSelect,
    options,
    value,
    getOptionValue,
    getOptionLabel,
    getOptionSelectedLabel,
    resetValue,
    isRenderNode,
  } = useSelect(props);
  const {
    placeholder = "Выбрать...",
    placeholderSearch = "Поиск...",
    placeholderEmpty = "Ничего не найдено...",
    searchBy,
    disabled,
    onBlur,
    name,
  } = props;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled} onBlur={onBlur} name={name}>
        <Button
          ref={ref}
          variant={"outline"}
          className="w-full py-0 justify-start divide-x items-stretch px-0 font-normal h-auto min-h-10"
        >
          <div className="flex flex-wrap gap-1 grow justify-start pl-3 py-1 items-center">
            <SelectedOptionLabel
              getOptionSelectedLabel={getOptionSelectedLabel}
              resetValue={resetValue}
              value={value}
              placeholder={placeholder}
            />
          </div>
          <div className="flex justify-center items-center px-3">
            <ChevronsUpDown
              className={cn("size-4 text-slate-500", open && "text-slate-800")}
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-full">
        <Command>
          {searchBy && <CommandInput placeholder={placeholderSearch} />}
          <CommandList>
            <CommandEmpty>{placeholderEmpty}</CommandEmpty>
            {options.map((option, i) => (
              <CommandItem
                key={i}
                value={getOptionValue(option, i)}
                onSelect={() => onSelect(option)}
                className="flex justify-between gap-2 w-full"
              >
                <div className="truncate">{getOptionLabel(option)}</div>
                <Check
                  className={cn(
                    "size-4 shrink-0 opacity-0",
                    isSelected(option) && "opacity-100"
                  )}
                />
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// @ts-ignore
export const Select = forwardRef(SelectWithoutRef) as <
  TOption extends Option,
  TMulti extends boolean = false,
  TBy extends By<TOption> | undefined = undefined
>(
  props: SelectProps<TOption, TMulti, TBy> & {
    ref?: Ref<HTMLButtonElement>;
  }
) => ReactNode;

function SelectedOptionLabel<
  TOption extends Option,
  TMulti extends boolean = false,
  TBy extends By<TOption> | undefined = undefined
>({
  getOptionSelectedLabel,
  resetValue,
  value,
  placeholder,
}: Pick<SelectProps<TOption, TMulti, TBy>, "placeholder"> &
  Pick<
    ReturnType<typeof useSelect<TOption, TMulti, TBy>>,
    "getOptionSelectedLabel" | "value" | "resetValue"
  >) {
  if (value === resetValue || (Array.isArray(value) && value.length === 0)) {
    return <p className="text-slate-500">{placeholder}</p>;
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => (
      <div key={index} className="border rounded-md px-2 py-0.5 bg-white">
        {getOptionSelectedLabel(item)}
      </div>
    ));
  }

  return getOptionSelectedLabel(value);
}
