"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getFakeUsers } from "@/actions/faker";
import { CForm } from "@/components/form";
import { CFormField } from "@/components/form-field";
import { Select } from "@/components/ui/select";

type Props = {
  users: Result<typeof getFakeUsers>;
};

const schema = z.object({
  select: z.number().min(0, "Обязательное поле"),
});

const numberArray = [1, 2, 3];
const stringArray = ["1", "2", "3"];
const recordArray = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
];

export const SelectForm = ({ users }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      select: -1,
    },
  });
  const { control, handleSubmit, getValues } = form;
  console.log(getValues("select"));

  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <CForm form={form} onSubmit={onSubmit}>
      <CFormField
        control={control}
        name="select"
        label="Тест селекта"
        description="Надеюсь, он будет нормально работать"
        required
        render={(props) => <Select options={numberArray} />}
      />
    </CForm>
  );
};
