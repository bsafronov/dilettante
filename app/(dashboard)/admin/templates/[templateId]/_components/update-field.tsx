"use client";

import { updateProcessTemplateField } from "@/actions/template-field";
import { Button } from "@/components/ui/button";
import { CDialog } from "@/components/ui/c-dialog";
import { CForm } from "@/components/ui/c-form";
import { CFormField } from "@/components/ui/c-form-field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProcessTemplateField } from "@prisma/client";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { DeleteField } from "./delete-field";
const schema = z.object({
  name: z.string(),
});

export const UpdateField = ({ name, id }: ProcessTemplateField) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProcessTemplateField({
        id,
        name: data.name,
      });
      toggle();
    } catch {}
  });

  return (
    <CDialog
      open={open}
      onOpenChange={toggle}
      title="Редактирование поля шаблона"
      trigger={
        <Button size={"icon"} variant={"outline"}>
          <Settings />
        </Button>
      }
      footer={<DeleteField fieldId={id} />}
    >
      <CForm form={form} onSubmit={onSubmit} submitText="Сохранить">
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
