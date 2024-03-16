"use client";

import { deleteProcessTemplateField } from "@/actions/template-field";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  fieldId: number;
};

export const DeleteField = ({ fieldId }: Props) => {
  const onDelete = async () => deleteProcessTemplateField(fieldId);

  return (
    <AlertDialog
      onSubmit={onDelete}
      description="Все поля формы, подписанные на это поле, будут удалены!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </AlertDialog>
  );
};
