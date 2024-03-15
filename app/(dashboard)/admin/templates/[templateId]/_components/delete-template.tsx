"use client";

import { deleteProcessTemplate } from "@/actions/template";
import { Button } from "@/components/ui/button";
import { CAlertDialog } from "@/components/ui/c-alert-dialog";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteTemplate = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplate(id);

  return (
    <CAlertDialog
      onSubmit={onDelete}
      description="Все данные шаблона будут удалены!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </CAlertDialog>
  );
};
