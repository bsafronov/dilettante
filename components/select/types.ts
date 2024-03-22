import { ReactNode } from "react";
import { ButtonProps } from "../ui/button";

export type Option = Record<string, unknown>;

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

type SingleValue<Option, By> = By extends keyof Option
  ? Option[By]
  : Option | null;
type MultiValue<Option, By> = By extends keyof Option ? Option[By][] : Option[];

export type Value<Option, Multi, By> = Multi extends true
  ? MultiValue<Option, By>
  : SingleValue<Option, By>;

export type By<T> = T extends unknown
  ? {
      [K in keyof T]: T[K] extends string | number ? K : never;
    }[keyof T]
  : never;

export type SelectProps<
  TOption extends Option,
  TMulti extends boolean = false,
  TBy extends By<TOption> | undefined = undefined
> = {
  options?: TOption[];

  value?: Value<TOption, TMulti, TBy>;

  onChange?: (value: Value<TOption, TMulti, TBy>) => void;

  by?: TBy extends undefined ? By<TOption> : TBy;

  multiple?: TMulti extends boolean ? boolean : TMulti;

  render: FlattenKeys<TOption> | ((props: TOption) => ReactNode);

  renderSelected?: FlattenKeys<TOption>;

  searchBy?: FlattenKeys<TOption> | FlattenKeys<TOption>[];

  placeholder?: string;

  placeholderSearch?: string;

  placeholderEmpty?: string;
} & Pick<ButtonProps, "onBlur" | "disabled" | "name">;
