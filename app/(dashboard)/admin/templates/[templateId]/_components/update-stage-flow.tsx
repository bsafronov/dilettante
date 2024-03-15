"use client";

import { updateProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { SelectProcessTemplateStage } from "@/components/select-process-template-stage";
import { SelectProcessTemplateStageField } from "@/components/select-process-template-stage-field";
import { Button } from "@/components/ui/button";
import { CDialog } from "@/components/ui/c-dialog";
import { CForm } from "@/components/ui/c-form";
import { CFormField } from "@/components/ui/c-form-field";
import { Input } from "@/components/ui/input";
import { prepareDbData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProcessTemplateStageFlow } from "@prisma/client";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { DeleteStageFlow } from "./delete-stage-flow";
const schema = z
  .object({
    fieldId: z.number(),
    nextStageId: z.number().min(1, "Обязательное поле"),
    value: z.string(),
  })
  .superRefine(({ fieldId, value }, ctx) => {
    if (fieldId > 0 && value === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите значение",
        path: ["value"],
      });
    }

    if (value !== "" && fieldId === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Выберите поле",
        path: ["fieldId"],
      });
    }
  });

export const UpdateStageFlow = ({
  id,
  fieldId,
  nextStageId,
  stageId,
  templateId,
  value,
}: ProcessTemplateStageFlow) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nextStageId,
      value: value ?? "",
      fieldId: fieldId ?? 0,
    },
  });
  const { control, handleSubmit, getValues } = form;

  const values = getValues();
  console.log(values);

  const onSubmit = handleSubmit(async (data) => {
    const { fieldId, nextStageId, value } = prepareDbData(data);
    try {
      await updateProcessTemplateStageFlow({
        id,
        fieldId,
        nextStageId,
        value,
      });
      toggle();
      toast.success("Данные обновлены!");
    } catch {
      toast.error("Возникла ошибка обновления!");
    }
  });

  return (
    <CDialog
      open={open}
      onOpenChange={toggle}
      title="Редактирование"
      trigger={
        <Button size={"icon"} variant={"outline"}>
          <Settings />
        </Button>
      }
      footer={<DeleteStageFlow id={id} />}
    >
      <CForm form={form} onSubmit={onSubmit} submitText="Сохранить">
        <CFormField
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
        <CFormField
          control={control}
          name="fieldId"
          label="Поле формы"
          description="Значение какого поля формы отслеживать?"
          required={getValues("value") !== ""}
          render={(props) => (
            <SelectProcessTemplateStageField
              templateId={templateId}
              {...props}
            />
          )}
        />
        <CFormField
          control={control}
          name="value"
          label="Значение"
          required={getValues("fieldId") !== 0}
          description="При каком значении перейти на следующий этап?"
          render={(props) => <Input {...props} />}
        />
      </CForm>
    </CDialog>
  );
};
