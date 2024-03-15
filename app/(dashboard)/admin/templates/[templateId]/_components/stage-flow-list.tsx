import { findManyProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { EmptyState } from "@/components/ui/empty-state";
import { Heading } from "@/components/ui/heading";
import { CreateStageFlow } from "./create-stage-flow";
import { StageFlowItem } from "./stage-flow-item";
import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";

type Props = {
  stageId: ID;
  templateId: ID;
};
export const StageFlowList = async ({ stageId, templateId }: Props) => {
  const flows = await findManyProcessTemplateStageFlow(stageId);
  const stages = await findManyProcessTemplateStage(templateId);
  const stageFields = await findManyProcessTemplateStageField({ stageId });
  return (
    <div>
      <Heading>Условия</Heading>
      <div className="space-y-2">
        <EmptyState hasNode={flows.length > 0} emptyText="Условия отсутствуют">
          {flows.map((flow) => (
            <StageFlowItem
              key={flow.id}
              flow={flow}
              stages={stages}
              stageFields={stageFields}
            />
          ))}
        </EmptyState>
      </div>
      <div className="mt-2">
        <CreateStageFlow stageId={stageId} templateId={templateId} />
      </div>
    </div>
  );
};
