"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { X } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type Option = {
  value: ID;
  label: React.ReactNode;
};

type Props = Omit<
  ComponentPropsWithoutRef<typeof SelectTrigger>,
  "onChange" | "value"
> & {
  options: Option[];
  value: ID;
  placeholder?: string;
  onChange: (v: ID) => void;
};

export const CSelect = forwardRef<ElementRef<typeof SelectTrigger>, Props>(
  ({ options, value, onChange, placeholder, ...props }, ref) => {
    return (
      <Select
        value={value.toString()}
        onValueChange={(v) => onChange(Number(v))}
      >
        <div className="flex gap-1">
          <SelectTrigger ref={ref} {...props}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={() => onChange(0)}
            type="button"
          >
            <X className="size-4" />
          </Button>
        </div>
        <SelectContent>
          {options.length > 0 &&
            options.map((option, i) => (
              <SelectItem key={i} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          {options.length === 0 && (
            <p className="text-muted-foreground text-sm px-2">
              Ничего не найдено...
            </p>
          )}
        </SelectContent>
      </Select>
    );
  }
);

CSelect.displayName = "CSelect";
