import {
  ProcessTemplateStage,
  ProcessTemplateStageField,
  ProcessTemplateStageFlow,
} from "@prisma/client";
import { UpdateStageFlow } from "./update-stage-flow";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  flow: ProcessTemplateStageFlow;
  stages: ProcessTemplateStage[];
  stageFields: ProcessTemplateStageField[];
};

export const StageFlowItem = ({ flow, stages, stageFields }: Props) => {
  const hasConditions = flow.fieldId && flow.value;

  return (
    <div className="border rounded-md border-dashed p-4 flex gap-4">
      <UpdateStageFlow {...flow} />
      <div className="flex items-center gap-1 flex-wrap text-muted-foreground">
        <span>
          {!hasConditions && <>Условий нет / не выполняются</>}
          {hasConditions && (
            <>
              {/* Поле&nbsp; */}
              <Badge variant={"secondary"}>
                {stageFields.find((item) => item.id === flow.fieldId)?.label}
              </Badge>
              &nbsp;=&nbsp;
              <Badge variant={"secondary"}>{flow.value}</Badge>
            </>
          )}
        </span>
        <ArrowRight className="size-4" />
        <span>
          {/* Следующий этап:&nbsp; */}
          <Badge variant={"secondary"}>
            {stages.find((item) => item.id === flow.nextStageId)?.name}
          </Badge>
        </span>
      </div>
    </div>
  );
};
