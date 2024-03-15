"use client";

import { deleteProcessTemplateStage } from "@/actions/template-stage";
import { Button } from "@/components/ui/button";
import { CAlertDialog } from "@/components/ui/c-alert-dialog";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteStage = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplateStage(id);

  return (
    <CAlertDialog
      onSubmit={onDelete}
      description="Все поля формы будут удалены!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </CAlertDialog>
  );
};
