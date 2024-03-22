"use client";

import { createProcessTemplate } from "@/actions/template";
import { CForm } from "@/components/form";
import { CFormField } from "@/components/form-field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  someId: z.number(),
});

export const CreateTemplateForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const { id } = await createProcessTemplate(data);
      router.push(`/admin/templates/${id}`);
    } catch (e) {
      toast.error("Ошибка создания шаблона");
    }
  });

  return (
    <CForm form={form} onSubmit={onSubmit} submitText="Создать">
      <CFormField
        control={control}
        name="name"
        label="Название"
        required
        render={(props) => <Input {...props} />}
      />
    </CForm>
  );
};
