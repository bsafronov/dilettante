"use client";

import { deleteProcessTemplate } from "@/actions/template";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteTemplate = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplate(id);

  return (
    <AlertDialog
      onSubmit={onDelete}
      description="Все данные шаблона будут удалены!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </AlertDialog>
  );
};
