"use client";

import { Button } from "@/components/ui/button";
import { CDialog } from "@/components/ui/c-dialog";
import { CForm } from "@/components/ui/c-form";
import { CFormField } from "@/components/ui/c-form-field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBoolean } from "usehooks-ts";
import { toast } from "sonner";
import { createProcessTemplateStage } from "@/actions/template-stage";

const schema = z.object({
  name: z.string(),
});

type Props = {
  templateId: number;
};

export const CreateStage = ({ templateId }: Props) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async ({ name }) => {
    try {
      await createProcessTemplateStage({
        name,
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
      title="Создание этапа"
      trigger={<Button>Создать этап</Button>}
    >
      <CForm
        form={form}
        onSubmit={onSubmit}
        isLoading={isSubmitting}
        submitText="Создать"
      >
        <CFormField
          control={control}
          name="name"
          label="Название"
          required
          render={(props) => <Input {...props} />}
        />
      </CForm>
    </CDialog>
  );
};
