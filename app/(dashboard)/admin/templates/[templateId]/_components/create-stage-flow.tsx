"use client";

import { createProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { SelectProcessTemplateStage } from "@/components/select-process-template-stage";
import { SelectProcessTemplateStageField } from "@/components/select-process-template-stage-field";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { prepareDbData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";

const schema = z.object({
  fieldId: z.number(),
  nextStageId: z.number().min(1, "Обязательное поле"),
  value: z.string(),
});

type Props = {
  templateId: ID;
  stageId: ID;
};

export const CreateStageFlow = ({ templateId, stageId }: Props) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fieldId: 0,
      nextStageId: 0,
      value: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    const { fieldId, nextStageId, value } = prepareDbData(data);

    try {
      await createProcessTemplateStageFlow({
        fieldId,
        nextStageId,
        stageId,
        templateId,
        value,
      });
      toast.success("Условие добавлено!");
      toggle();
    } catch {
      toast.error("Возникла ошибка при создании условия");
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={toggle}
      title="Создание условия"
      trigger={<Button>Добавить условие</Button>}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        isLoading={isSubmitting}
        submitText="Создать"
      >
        <FormField
          control={control}
          name="nextStageId"
          label="Следующий этап"
          required
          render={(props) => (
            <SelectProcessTemplateStage
              templateId={templateId}
              excludeStageId={stageId}
              {...props}
            />
          )}
        />
        <FormField
          control={control}
          name="fieldId"
          label="Поле формы"
          description="Значение какого поля формы отслеживать?"
          render={(props) => (
            <SelectProcessTemplateStageField
              templateId={templateId}
              {...props}
            />
          )}
        />
        <FormField
          control={control}
          name="value"
          label="Значение"
          description="При каком значении перейти на следующий этап?"
          render={(props) => <Input {...props} />}
        />
      </Form>
    </Dialog>
  );
};
