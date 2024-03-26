"use client";

import { getFakeUsers } from "@/actions/faker";
import { Select } from "@/components/ui/select";
import { useState } from "react";

type Props = {
  users: Result<typeof getFakeUsers>;
};

export const SelectShowcase = ({ users }: Props) => {
  const [value, setValue] = useState<number[]>([]);
  console.log("value:", value);

  return (
    <Select
      options={users}
      value={value}
      onChange={setValue}
      label={SelectItem}
      labelSelected={"name"}
      search
      multiple
      by="id"
    />
  );
};

const SelectItem = ({ name, internet }: Props["users"][number]) => {
  return (
    <div className="flex flex-col">
      <span>{name}</span>
      <span className="text-slate-500 text-xs">{internet.email}</span>
      <span className="text-green-500 text-xs">{internet.ip}</span>
    </div>
  );
};
