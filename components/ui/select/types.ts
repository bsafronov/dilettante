import { ButtonHTMLAttributes, ReactNode } from "react";
import { useSelect } from "./use-select";

export type SelectProps<
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false
> = {
  options?: Options;
  multiple?: Multi extends false ? boolean : Multi;
  search?: SelectSearch<Options>;
  value?: SelectValue<Options, By, Multi>;
  onChange?: (value: SelectValue<Options, By, Multi>) => void;
  label?: SelectLabel<Options>;
  labelSelected?: SelectLabel<Options>;
} & OptionalSelectBy<Options, By> &
  SelectButtonProps;

type SelectButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onBlur" | "disabled" | "name"
>;

export type UseSelectProps<
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectBy<Options>,
  Multi extends boolean = false
> = ReturnType<typeof useSelect<Options, By, Multi>>;

export type SelectSettings = {
  label: string[];
};

// Select "options"

export type SelectRecord = Record<string | number | symbol, unknown>;
export type SelectOptions = string[] | number[] | SelectRecord[];

// Select "by"
type SelectByRecordKey<T> = T extends unknown
  ? {
      [K in keyof T]: T[K] extends string | number ? K : never;
    }[keyof T]
  : never;

export type SelectBy<Options> = Options extends SelectRecord[]
  ? SelectByRecordKey<Options[number]> | "_all"
  : never;
export type SelectByDefault<Options> = Options extends SelectRecord[]
  ? "_all"
  : never;

type OptionalSelectBy<Options, By> = Options extends SelectRecord[]
  ? { by?: By extends SelectByDefault<Options> ? SelectBy<Options> : By }
  : {};

// Select "search"
type SelectSearch<Options> = Options extends string[] | number[]
  ? boolean
  : Options extends SelectRecord[]
  ?
      | FlattenKeys<Options[number]>
      | FlattenKeys<Options[number]>[]
      | ((props: Options[number]) => string)
      | boolean
  : never;

// Select "label"
export type SelectLabel<Options> = Options extends string[] | number[]
  ? (value: Options[number]) => ReactNode
  : Options extends SelectRecord[]
  ? FlattenKeys<Options[number]> | ((props: Options[number]) => ReactNode)
  : never;

// Select single value
type SelectSingleValueWithSelectRecords<
  Options extends SelectRecord[],
  By
> = By extends undefined
  ? Options[number] | null
  : By extends keyof Options[number]
  ? Options[number][By] | null
  : Options[number] | null;

type SelectSingleValue<Options, By> = Options extends string[] | number[]
  ? Options[number] | null
  : Options extends SelectRecord[]
  ? SelectSingleValueWithSelectRecords<Options, By>
  : never;

// Select multi value
type SelectMultiValueWithSelectRecords<
  Options extends SelectRecord[],
  By
> = By extends keyof Options[number]
  ? Options[number][By][]
  : Options[number][];

type SelectMultiValue<Options, By> = Options extends string[] | number[]
  ? Options[number][]
  : Options extends SelectRecord[]
  ? SelectMultiValueWithSelectRecords<Options, By>
  : never;

// Select single or multi value

export type SelectValue<Options, By, Multi> = Multi extends true
  ? SelectMultiValue<Options, By>
  : SelectSingleValue<Options, By>;

// Utils
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

// Flat types
export type SelectFlatValue =
  | number
  | number[]
  | string
  | string[]
  | SelectRecord[]
  | SelectRecord
  | null;

export type SelectFlatOnChange = (value: SelectFlatValue) => void;
export type SelectFlatMulti = boolean | undefined;
export type SelectFlatBy = string | undefined;
export type SelectFlatSearch = string | string[] | boolean | undefined;
export type SelectFlatLabel =
  | string
  | ((value: SelectOptions[number]) => ReactNode)
  | undefined;
