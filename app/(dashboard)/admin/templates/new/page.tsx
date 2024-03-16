"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { createProcessTemplate } from "@/actions/template";
import { Form, FormField } from "@/components/ui/form";

const schema = z.object({
  name: z.string(),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    try {
      const { id } = await createProcessTemplate(data);
      router.push(`/admin/templates/${id}`);
    } catch (e) {
      toast.error("Ошибка создания шаблона");
    }
  });

  return (
    <Form form={form} onSubmit={onSubmit} submitText="Создать">
      <FormField
        control={control}
        name="name"
        label="Название"
        render={(props) => <Input {...props} />}
      />
    </Form>
  );
}
