"use client";

import { deleteProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteStageFlow = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplateStageFlow(id);

  return (
    <AlertDialog
      onSubmit={onDelete}
      description="Ссылка на следующий этап будет удалена!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </AlertDialog>
  );
};
