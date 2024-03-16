import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { StageInfo } from "./stage-info";
import { StageFieldList } from "./stage-field-list";
import { findOneProcessTemplateStage } from "@/actions/template-stage";
import { DeleteStage } from "./delete-stage";
import { StageFlowList } from "./stage-flow-list";
import { Dialog } from "@/components/ui/dialog";

export const StageSettings = ({
  id,
  templateId,
}: Result<typeof findOneProcessTemplateStage>) => {
  return (
    <Dialog
      title="Настройка этапа"
      trigger={
        <Button variant={"outline"} size={"icon"}>
          <Settings />
        </Button>
      }
      footer={<DeleteStage id={id} />}
      full
    >
      <div className="flex flex-col gap-4">
        <StageInfo stageId={id} />
        <StageFieldList stageId={id} templateId={templateId} />
        <StageFlowList stageId={id} templateId={templateId} />
      </div>
    </Dialog>
  );
};
