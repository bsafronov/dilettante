import {
  ProcessTemplateStage,
  ProcessTemplateStageField,
  ProcessTemplateStageFlow,
} from "@prisma/client";
import { UpdateStageFlow } from "./update-stage-flow";
import { ArrowDown, ArrowRight } from "lucide-react";

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
              Поле&nbsp;
              <span className="border rounded-md px-2 py-0.5 bg-slate-50">
                {stageFields.find((item) => item.id === flow.fieldId)?.label}
              </span>
              &nbsp;=&nbsp;
              <span className="border rounded-md px-2 py-0.5 bg-slate-50">
                {flow.value}
              </span>
            </>
          )}
        </span>
        <ArrowRight className="size-4" />
        <span>
          Следующий этап:&nbsp;
          <span className="border rounded-md px-2 py-0.5 bg-slate-50">
            {stages.find((item) => item.id === flow.nextStageId)?.name}
          </span>
        </span>
      </div>
    </div>
  );
};
