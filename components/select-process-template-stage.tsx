"use client";

import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { ProcessTemplateStage } from "@prisma/client";
import { ElementRef, forwardRef, useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { CSelect } from "./ui/c-select";

type Props = Omit<ControllerRenderProps, "ref"> & {
  templateId: ID;
  excludeStageId?: ID;
};
export const SelectProcessTemplateStage = forwardRef<
  ElementRef<typeof CSelect>,
  Props
>(({ templateId, excludeStageId, ...props }, ref) => {
  const [fields, setFields] = useState<ProcessTemplateStage[]>([]);

  useEffect(() => {
    const handleSetFields = async () => {
      const fields = await findManyProcessTemplateStage(templateId);
      setFields(fields);
    };

    handleSetFields();
  }, [templateId]);

  const options = fields
    .filter((item) => item.id !== excludeStageId)
    .map((field) => ({
      value: field.id,
      label: field.name,
    }));

  return (
    <CSelect
      ref={ref}
      options={options}
      placeholder="Выбрать поле..."
      {...props}
    />
  );
});

SelectProcessTemplateStage.displayName = "SelectProcessTemplateStage";
