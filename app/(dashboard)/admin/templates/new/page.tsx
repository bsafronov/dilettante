"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CForm } from "@/components/ui/c-form";
import { createTemplate } from "@/actions/template";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CFormField } from "@/components/ui/c-form-field";
import { Input } from "@/components/ui/input";

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
      const { id } = await createTemplate(data);
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
        render={(props) => <Input {...props} />}
      />
    </CForm>
  );
}
