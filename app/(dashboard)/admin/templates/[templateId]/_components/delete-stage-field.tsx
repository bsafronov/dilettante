"use client";

import { deleteProcessTemplateStageField } from "@/actions/template-stage-field";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteStageField = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplateStageField(id);

  return (
    <AlertDialog
      onSubmit={onDelete}
      description="Ссылка на поле шаблона будет удалена!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </AlertDialog>
  );
};
