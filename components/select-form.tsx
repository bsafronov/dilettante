"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CForm } from "./form";
import { CFormField } from "./form-field";
import { Select } from "./select";
import { getFakeUsers } from "@/actions/faker";

type Props = {
  users: Result<typeof getFakeUsers>;
};

const schema = z.object({
  select: z.number().min(0, "Обязательное поле"),
});

export const SelectForm = ({ users }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      select: 0,
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
        render={(props) => (
          <Select
            render={"name"}
            options={users}
            by="id"

            // {...props}
            // {...props}
            // by={"id"}
            // options={users}
            // render={"name"}
            // searchBy={["name"]}

            // value={value}
            // onChange={onChange}
          />
        )}
      />
    </CForm>
  );
};

const SelectItem = ({
  name,
  internet: { email, ip, username },
}: Props["users"][number]) => {
  return (
    <div className="flex flex-col truncate">
      <span>{name}</span>
      <span className="text-slate-500 text-xs truncate">{email}</span>
      <span className="text-rose-500 text-xs truncate">{username}</span>
      <span className="text-green-500 text-xs truncate">{ip}</span>
    </div>
  );
};
