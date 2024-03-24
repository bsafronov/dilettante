import { ReactNode } from "react";

export type SelectProps<
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false
> = {
  options?: Options;
  by?: By extends SelectByDefault<Options> ? SelectBy<Options> : By;
  multiple?: Multi extends false ? boolean : Multi;
  search?: SelectSearch<Options>;
  value?: SelectValue<Options, By, Multi>;
  onChange?: (value: SelectValue<Options, By, Multi>) => void;
  label?: SelectLabel<Options>;
  labelSelected?: SelectLabel<Options>;
} & SelectOptionalNullValue<Options, Multi, By>;

// Select "options"
export type SelectOptions =
  | string[]
  | number[]
  | Record<string | number | symbol, unknown>[];

// Select "by"
type SelectByRecordKey<T> = T extends unknown
  ? {
      [K in keyof T]: T[K] extends string | number ? K : never;
    }[keyof T]
  : never;

export type SelectBy<Options> = Options extends string[] | number[]
  ? "index" | "value"
  : Options extends Record<string | number | symbol, unknown>[]
  ? SelectByRecordKey<Options[number]> | "_all"
  : never;

export type SelectByDefault<Options> = Options extends string[] | number[]
  ? "value"
  : Options extends Record<string | number | symbol, unknown>[]
  ? "_all"
  : never;

// Select "search"
type SelectSearch<Options> = Options extends string[] | number[]
  ? boolean
  : Options extends Record<string | number | symbol, unknown>[]
  ?
      | FlattenKeys<Options[number]>
      | FlattenKeys<Options[number]>[]
      | ((props: Options[number]) => string)
  : never;

// Select "label"
type SelectLabel<Options> = Options extends string[] | number[]
  ? (value: Options[number]) => ReactNode
  : Options extends Record<string | number | symbol, unknown>[]
  ? FlattenKeys<Options[number]> | ((props: Options[number]) => ReactNode)
  : never;

// Select single value
type SelectSingleValueWithPrimitiveOptions<
  Options extends string[] | number[],
  By
> = By extends "index" ? number : Options[number];

type SelectSingleValueWithRecordOptions<
  Options extends Record<string | number | symbol, unknown>[],
  By
> = By extends "_all"
  ? Options[number]
  : By extends keyof Options[number]
  ? Options[number][By]
  : never;

type SelectSingleValue<Options, By> = Options extends string[] | number[]
  ? SelectSingleValueWithPrimitiveOptions<Options, By>
  : Options extends Record<string | number | symbol, unknown>[]
  ? SelectSingleValueWithRecordOptions<Options, By>
  : never;

// Select multi value
type SelectMultiValueWithPrimitiveOptions<
  Options extends string[] | number[],
  By
> = By extends "index" ? number[] : Options[number][];

type SelectMultiValueWithRecordOptions<
  Options extends Record<string | number | symbol, unknown>[],
  By
> = By extends "_all"
  ? Options[number][]
  : By extends keyof Options[number]
  ? Options[number][By][]
  : never;

type SelectMultiValue<Options, By> = Options extends string[] | number[]
  ? SelectMultiValueWithPrimitiveOptions<Options, By>
  : Options extends Record<string | number | symbol, unknown>[]
  ? SelectMultiValueWithRecordOptions<Options, By>
  : never;

// Select single or multi value
export type SelectValue<Options, By, Multi> = Multi extends true
  ? SelectMultiValue<Options, By>
  : SelectSingleValue<Options, By>;

// Select "nullValue"
type SelectOptionalNullValue<Options, Multi, By> = Multi extends false
  ? Options extends Record<string | number | symbol, unknown>[]
    ? By extends "_all"
      ? {}
      : By extends keyof Options[number]
      ? { nullValue?: SelectNullValue<Options, By> }
      : {}
    : { nullValue?: SelectNullValue<Options, By> }
  : {};

export type SelectNullValue<Options, By> = Options extends string[] | number[]
  ? Options[number]
  : Options extends Record<string | number | symbol, unknown>[]
  ? By extends keyof Options[number]
    ? Options[number][By]
    : never
  : never;

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
