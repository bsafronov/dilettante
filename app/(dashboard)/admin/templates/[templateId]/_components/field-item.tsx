"use client";

import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { ProcessTemplateField } from "@prisma/client";
import { UpdateField } from "./update-field";
import { Check, X } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";

type Props = {
  field: ProcessTemplateField;
  stageLinks: Record<
    ID,
    Result<typeof findManyProcessTemplateStageField> | undefined
  >;
};

export const FieldItem = ({ field, stageLinks }: Props) => {
  const hasLinks = !!stageLinks[field.id]?.length;
  return (
    <div className="grow flex flex-col gap-2 p-4 border rounded-md border-dashed">
      <div className="flex gap-2 items-center justify-between">
        <UpdateField {...field} />
        {hasLinks ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-red-500" />
        )}
      </div>
      <div>
        <p>
          <span className="text-muted-foreground">Название:</span> {field.name}
        </p>
      </div>

      <EmptyState emptyText="Нет привязанных полей" hasNode={hasLinks}>
        <div>
          <span className="text-muted-foreground">Привязанные поля формы</span>
          {stageLinks[field.id]?.map((item) => (
            <div key={item.id} className="border p-2 rounded-md">
              {item.label}
            </div>
          ))}
        </div>
      </EmptyState>
    </div>
  );
};
