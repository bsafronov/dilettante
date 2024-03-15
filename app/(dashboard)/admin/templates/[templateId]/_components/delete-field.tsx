"use client";

import { deleteProcessTemplateField } from "@/actions/template-field";
import { Button } from "@/components/ui/button";
import { CAlertDialog } from "@/components/ui/c-alert-dialog";
import { Trash } from "lucide-react";

type Props = {
  fieldId: number;
};

export const DeleteField = ({ fieldId }: Props) => {
  const onDelete = async () => deleteProcessTemplateField(fieldId);

  return (
    <CAlertDialog
      onSubmit={onDelete}
      description="Все поля формы, подписанные на это поле, будут удалены!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </CAlertDialog>
  );
};
