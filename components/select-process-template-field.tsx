"use client";

import { findManyProcessTemplateField } from "@/actions/template-field";
import { ProcessTemplateField } from "@prisma/client";
import { ElementRef, forwardRef, useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Select } from "./ui/select";

type Props = Omit<ControllerRenderProps, "ref"> & {
  templateId: ID;
};
export const SelectProcessTemplateField = forwardRef<
  ElementRef<typeof Select>,
  Props
>(({ templateId, ...props }, ref) => {
  const [fields, setFields] = useState<ProcessTemplateField[]>([]);

  useEffect(() => {
    const handleSetFields = async () => {
      const fields = await findManyProcessTemplateField(templateId);
      setFields(fields);
    };

    handleSetFields();
  }, [templateId]);

  const options = fields.map((field) => ({
    value: field.id,
    label: field.name,
  }));

  return (
    <Select
      ref={ref}
      options={options}
      placeholder="Выбрать поле..."
      {...props}
    />
  );
});

SelectProcessTemplateField.displayName = "SelectProcessTemplateField";
