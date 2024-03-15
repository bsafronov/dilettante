"use client";

import { deleteProcessTemplateStageField } from "@/actions/template-stage-field";
import { Button } from "@/components/ui/button";
import { CAlertDialog } from "@/components/ui/c-alert-dialog";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteStageField = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplateStageField(id);

  return (
    <CAlertDialog
      onSubmit={onDelete}
      description="Ссылка на поле шаблона будет удалена!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </CAlertDialog>
  );
};
