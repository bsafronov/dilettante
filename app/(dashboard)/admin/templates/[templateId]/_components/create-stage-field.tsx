"use client";

import { createProcessTemplateStageField } from "@/actions/template-stage-field";
import { CDialog } from "@/components/dialog";
import { CForm } from "@/components/form";
import { CFormField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prepareDbData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import Select from "react-tailwindcss-select";
import { z } from "zod";
import { ProcessTemplateField } from "@prisma/client";

const schema = z.object({
  fieldId: z.number().min(1, "Обязательное поле"),
  label: z.string().min(1, "Обязательное поле"),
  placeholder: z.string(),
  description: z.string(),
});

type Props = {
  templateId: ID;
  stageId: ID;
  templateFields: ProcessTemplateField[];
};

export const CreateStageField = ({
  templateId,
  stageId,
  templateFields,
}: Props) => {
  const { value: open, toggle } = useBoolean();
  const templateFieldsOptions = templateFields.map((v) => ({
    value: `${v.id}`,
    label: v.name,
  }));

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fieldId: 0,
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

  const onSubmit = handleSubmit(async (data) => {
    const { description, fieldId, label, placeholder } = prepareDbData(data);

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
  });

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
          render={({ value, onChange, ...rest }) => (
            <Select
              primaryColor="slate"
              options={templateFieldsOptions}
              value={
                templateFieldsOptions.find(
                  (v) => v.value === value.toString()
                ) ?? null
              }
              onChange={() => onChange()}
            />
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
