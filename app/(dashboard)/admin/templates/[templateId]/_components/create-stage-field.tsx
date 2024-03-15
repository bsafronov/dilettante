"use client";

import { Button } from "@/components/ui/button";
import { CDialog } from "@/components/ui/c-dialog";
import { CForm } from "@/components/ui/c-form";
import { CFormField } from "@/components/ui/c-form-field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { SelectProcessTemplateField } from "@/components/select-process-template-field";
import { createProcessTemplateStageField } from "@/actions/template-stage-field";

const schema = z.object({
  fieldId: z.number().nullable(),
  placeholder: z.string(),
  label: z.string(),
  description: z.string(),
});

type Props = {
  templateId: ID;
  stageId: ID;
};

export const CreateStageField = ({ templateId, stageId }: Props) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fieldId: null,
      description: "",
      label: "",
      placeholder: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(
    async ({ fieldId, description, label, placeholder }) => {
      if (!fieldId) return;

      try {
        await createProcessTemplateStageField({
          fieldId,
          description,
          label,
          placeholder,
          stageId,
          templateId,
        });
        toggle();
      } catch {
        toast.error("Возникла ошибка при создании этапа");
      }
    }
  );

  return (
    <CDialog
      open={open}
      onOpenChange={toggle}
      title="Создание поля"
      trigger={<Button>Добавить поле</Button>}
    >
      <CForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isSubmitting}
        submitText="Создать"
      >
        <CFormField
          control={control}
          name="label"
          label="Название"
          required
          description="Отображается над полем ввода"
          render={(props) => <Input {...props} />}
        />
        <CFormField
          control={control}
          name="fieldId"
          label="Поле шаблона"
          required
          render={(props) => (
            <SelectProcessTemplateField templateId={templateId} {...props} />
          )}
        />
        <CFormField
          control={control}
          name="placeholder"
          label="Заполнитель"
          description="Отображается внутри поля ввода до начала набора значения и служит подсказкой к вводу"
          render={(props) => <Input {...props} />}
        />
        <CFormField
          control={control}
          name="description"
          label="Описание"
          description="Отображается под полем ввода"
          render={(props) => <Input {...props} />}
        />
      </CForm>
    </CDialog>
  );
};
