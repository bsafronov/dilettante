"use client";

import { deleteProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { Button } from "@/components/ui/button";
import { CAlertDialog } from "@/components/ui/c-alert-dialog";
import { Trash } from "lucide-react";

type Props = {
  id: ID;
};

export const DeleteStageFlow = ({ id }: Props) => {
  const onDelete = async () => deleteProcessTemplateStageFlow(id);

  return (
    <CAlertDialog
      onSubmit={onDelete}
      description="Ссылка на следующий этап будет удалена!"
    >
      <Button variant={"destructive"} size={"icon"}>
        <Trash />
      </Button>
    </CAlertDialog>
  );
};
