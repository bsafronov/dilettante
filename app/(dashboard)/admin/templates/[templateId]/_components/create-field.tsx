"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useBoolean } from "usehooks-ts";
import { toast } from "sonner";
import { createProcessTemplateField } from "@/actions/template-field";
import { Dialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";

const schema = z.object({
  name: z.string(),
});

type Props = {
  templateId: number;
};

export const CreateField = ({ templateId }: Props) => {
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
      await createProcessTemplateField({
        name,
        templateId,
      });
      toggle();
    } catch {
      toast.error("Возникла ошибка при создании этапа");
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={toggle}
      title="Создание поля"
      trigger={<Button>Создать поле</Button>}
    >
      <Form
        form={form}
        onSubmit={onSubmit}
        isLoading={isSubmitting}
        submitText="Создать"
      >
        <FormField
          control={control}
          name="name"
          label="Название"
          required
          render={(props) => <Input {...props} />}
        />
      </Form>
    </Dialog>
  );
};
