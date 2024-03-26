"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Ref, forwardRef } from "react";
import { Button } from "../button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { SelectBy, SelectByDefault, SelectOptions, SelectProps } from "./types";
import { useSelect } from "./use-select";

const SelectComponent = <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false
>(
  props: SelectProps<Options, By, Multi>,
  ref?: Ref<HTMLButtonElement>
) => {
  const {
    open,
    setOpen,
    options,
    value,
    getOptionLabel,
    getLabelSelected,
    isCustomLabelSelected,
    getOptionValue,
    onSelect,
    isSelected,
    hasSearch,
    hasValue,
    onDelete,
  } = useSelect(props);
  const { disabled, onBlur, name } = props;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          disabled={disabled}
          onBlur={onBlur}
          name={name}
          variant={"outline"}
          className={cn(
            "flex p-0 w-full font-normal text-sm h-auto min-h-10 divide-x items-stretch group hover:bg-slate-50"
          )}
          type="button"
        >
          <div
            className={cn(
              "pl-3 flex items-center justify-start grow gap-1 py-1 flex-wrap",
              isCustomLabelSelected() ||
                (Array.isArray(value) && hasValue() && "pl-1")
            )}
          >
            {!hasValue() && <p className="text-slate-500">Выбрать...</p>}
            {hasValue() &&
              Array.isArray(value) &&
              value.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    !isCustomLabelSelected() &&
                      "flex items-stretch border rounded-md bg-white divide-x overflow-hidden"
                  )}
                >
                  <div className="px-2 py-0.5">{getLabelSelected(item)}</div>
                  <div
                    className="flex justify-center items-center px-1 hover:text-red-500 hover:bg-red-100 text-slate-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item);
                    }}
                  >
                    <X className="size-4" />
                  </div>
                </div>
              ))}
            {hasValue() && !Array.isArray(value) && (
              <div>{getLabelSelected(value!)}</div>
            )}
          </div>
          <div
            className={cn(
              "flex px-3 items-center text-slate-500 group-hover:text-slate-900",
              open && "text-slate-900"
            )}
          >
            <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full min-w-40" align="start">
        <Command>
          {hasSearch() && <CommandInput placeholder="Поиск..." />}
          <CommandList>
            <CommandEmpty>Ничего не найдено...</CommandEmpty>
            {options.map((option, i) => (
              <CommandItem
                key={i}
                value={getOptionValue(option, i)}
                onSelect={() => onSelect(option)}
                className="flex justify-between gap-2"
              >
                {getOptionLabel(option)}
                <Check
                  className={cn(
                    "size-4 opacity-0",
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
export const Select = forwardRef(SelectComponent) as <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false
>(
  props: SelectProps<Options, By, Multi> & { ref?: Ref<HTMLButtonElement> }
) => JSX.Element;
