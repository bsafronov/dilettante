"use client";

import { deleteProcessTemplateStage } from "@/actions/template-stage";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteStage = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplateStage(id);

  return (
    <AlertDialog
      onSubmit={onDelete}
      description="Все поля формы будут удалены!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </AlertDialog>
  );
};
