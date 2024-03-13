"use client";

import { createProcessTemplateField } from "@/actions/template-field";
import { Button } from "@/components/ui/button";
import { CDialog } from "@/components/ui/c-dialog";
import { CForm } from "@/components/ui/c-form";
import { CFormField } from "@/components/ui/c-form-field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
});

type Props = {
  templateId: number;
};

export const CreateFieldDialog = ({ templateId }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(({ name }) => {
    try {
      createProcessTemplateField({
        name,
        templateId,
      });
    } catch {}
  });

  return (
    <CDialog title="Создание поля" trigger={<Button>Создать поле</Button>}>
      <CForm form={form} onSubmit={onSubmit}>
        <CFormField
          control={control}
          name="name"
          label="Название"
          render={(props) => <Input {...props} />}
        />
      </CForm>
    </CDialog>
  );
};
