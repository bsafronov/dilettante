"use client";

import { updateProcessTemplate } from "@/actions/template";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProcessTemplate } from "@prisma/client";
import { Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";
import { z } from "zod";
import { DeleteTemplate } from "./delete-template";
const schema = z.object({
  name: z.string(),
});

export const UpdateTemplate = ({ name, id }: ProcessTemplate) => {
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
      await updateProcessTemplate({
        id,
        name: data.name,
      });
      toggle();
    } catch {}
  });

  return (
    <Dialog
      open={open}
      onOpenChange={toggle}
      title="Редактирование шаблона"
      trigger={
        <Button size={"icon"} variant={"outline"}>
          <Settings />
        </Button>
      }
      footer={<DeleteTemplate id={id} />}
    >
      <Form form={form} onSubmit={onSubmit} submitText="Сохранить">
        <FormField
          control={control}
          name="name"
          label="Название"
          render={(props) => <Input {...props} />}
        />
      </Form>
    </Dialog>
  );
};
