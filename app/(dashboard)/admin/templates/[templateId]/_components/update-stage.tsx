"use client";

import { updateProcessTemplateStage } from "@/actions/template-stage";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProcessTemplateStage } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const schema = z.object({
  name: z.string(),
});

export const UpdateStage = ({ name, id }: ProcessTemplateStage) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name,
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProcessTemplateStage({
        id,
        name: data.name,
      });
      toast.success("Данные обновлены!");
    } catch {
      toast.error("Возникла ошибка изменения этапа");
    }
  });

  return (
    <Form form={form} onSubmit={onSubmit} submitText="Сохранить">
      <FormField
        control={control}
        name="name"
        label="Название"
        render={(props) => <Input {...props} />}
      />
    </Form>
  );
};
