"use client";

import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { ProcessTemplateStageField } from "@prisma/client";
import { ElementRef, forwardRef, useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Select } from "./ui/select";

type Props = Omit<ControllerRenderProps, "ref"> & {
  templateId: ID;
};
export const SelectProcessTemplateStageField = forwardRef<
  ElementRef<typeof Select>,
  Props
>(({ templateId, ...props }, ref) => {
  const [fields, setFields] = useState<ProcessTemplateStageField[]>([]);

  useEffect(() => {
    const handleSetFields = async () => {
      const fields = await findManyProcessTemplateStageField({ templateId });
      setFields(fields);
    };

    handleSetFields();
  }, [templateId]);

  const options = fields.map((field) => ({
    value: field.id,
    label: field.label,
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

SelectProcessTemplateStageField.displayName = "SelectProcessTemplateStageField";
