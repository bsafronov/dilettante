"use client";

import { updateProcessTemplateStageField } from "@/actions/template-stage-field";
import { SelectProcessTemplateField } from "@/components/select-process-template-field";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProcessTemplateStageField } from "@prisma/client";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { DeleteStageField } from "./delete-stage-field";

const schema = z.object({
  fieldId: z.number().nullable(),
  placeholder: z.string(),
  label: z.string(),
  description: z.string(),
});

type Props = {
  field: ProcessTemplateStageField;
};
export const UpdateStageField = ({ field }: Props) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: field.description ?? "",
      label: field.label ?? "",
      placeholder: field.placeholder ?? "",
      fieldId: field.fieldId,
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(
    async ({ description, fieldId, label, placeholder }) => {
      if (!fieldId) return;

      try {
        await updateProcessTemplateStageField({
          id: field.id,
          description,
          fieldId,
          label,
          placeholder,
        });
        toggle();
      } catch {}
    }
  );

  return (
    <Dialog
      open={open}
      onOpenChange={toggle}
      title="Редактирование поля этапа"
      trigger={
        <Button size={"icon"} variant={"secondaryOutline"}>
          <Settings />
        </Button>
      }
      footer={<DeleteStageField id={field.id} />}
    >
      <Form form={form} onSubmit={onSubmit} submitText="Сохранить">
        <FormField
          control={control}
          name="label"
          label="Название"
          description="Отображается над полем ввода"
          render={(props) => <Input {...props} />}
        />
        <FormField
          control={control}
          name="placeholder"
          label="Заполнитель"
          description="Отображается внутри поля ввода до начала набора значения и служит подсказкой к вводу"
          render={(props) => <Input {...props} />}
        />
        <FormField
          control={control}
          name="description"
          label="Описание"
          description="Отображается под полем ввода"
          render={(props) => <Input {...props} />}
        />

        <FormField
          control={control}
          name="fieldId"
          label="Поле шаблона"
          render={(props) => (
            <SelectProcessTemplateField
              templateId={field.templateId}
              {...props}
            />
          )}
        />
      </Form>
    </Dialog>
  );
};
