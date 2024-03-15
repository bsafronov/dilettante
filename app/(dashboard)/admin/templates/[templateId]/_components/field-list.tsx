"use client";

import { CCard } from "@/components/ui/c-card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ProcessTemplateField,
  ProcessTemplateStageField,
} from "@prisma/client";
import { useMemo } from "react";
import { CreateField } from "./create-field";
import { FieldItem } from "./field-item";
import { Heading } from "@/components/ui/heading";

type Props = {
  stageFields: ProcessTemplateStageField[];
  fields: ProcessTemplateField[];
  templateId: ID;
};

export const FieldList = ({ fields, stageFields, templateId }: Props) => {
  const stageLinks = useMemo(() => {
    const map: Record<ID, typeof stageFields> = {};

    stageFields.forEach((field) => {
      if (field.fieldId in map) {
        return map[field.fieldId].push(field);
      }

      map[field.fieldId] = [field];
    });

    return map;
  }, [stageFields]);

  return (
    <div>
      <Heading>Поля</Heading>
      <div className="grid grid-cols-4 gap-2">
        <EmptyState hasNode={fields.length > 0} emptyText="Поля отсутствуют">
          {fields.map((field) => (
            <FieldItem key={field.id} field={field} stageLinks={stageLinks} />
          ))}
        </EmptyState>
      </div>
      <div className="mt-2">
        <CreateField templateId={templateId} />
      </div>
    </div>
  );
};
