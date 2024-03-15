"use client";

import { findManyProcessTemplateField } from "@/actions/template-field";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { CForm } from "@/components/ui/c-form";
import { CFormField } from "@/components/ui/c-form-field";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateStageField } from "./update-stage-field";

type Props = {
  stageFields: Result<typeof findManyProcessTemplateStageField>;
  templateFields: Result<typeof findManyProcessTemplateField>;
};

const schema = z.object({
  fields: z.array(z.string()),
});

export const StageFieldListDemoForm = ({
  stageFields,
  templateFields,
}: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fields: [""],
    },
  });
  const { control } = form;

  return (
    <Form {...form}>
      {stageFields.map((field) => (
        <div key={field.id} className="border border-dashed rounded-md p-4">
          <div className="flex gap-2 justify-between items-start">
            <UpdateStageField field={field} />

            <div className="border px-2 rounded-md bg-slate-50 flex items-center justify-center">
              {templateFields.find((item) => item.id === field.fieldId)?.name}
            </div>
          </div>
          <CFormField
            control={control}
            name="fields.0"
            label={field.label}
            description={field.description}
            className="mt-4"
            render={(props) => (
              <Input {...props} placeholder={field.placeholder ?? undefined} />
            )}
          />
        </div>
      ))}
    </Form>
  );
};
