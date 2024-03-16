"use client";

import { findManyProcessTemplateField } from "@/actions/template-field";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateStageField } from "./update-stage-field";
import { Badge } from "@/components/ui/badge";

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
    <Form form={form} className="flex gap-4 flex-wrap items-center space-y-0">
      {stageFields.map((field) => (
        <div key={field.id} className="border border-dashed rounded-md p-4">
          <div className="flex gap-2 justify-between items-start">
            <UpdateStageField field={field} />

            <Badge variant={"outline"}>
              {templateFields.find((item) => item.id === field.fieldId)?.name}
            </Badge>
          </div>
          <FormField
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
