"use client";

import { SelectBy, SelectByDefault, SelectOptions, SelectProps } from "./types";
import { useSelect } from "./use-select";

export const Select = <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false
>(
  props: SelectProps<Options, By, Multi>
) => {
  const {} = useSelect(props);
  return <div>Select</div>;
};
