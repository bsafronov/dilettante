import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { findManyProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { CreateStageFlow } from "./create-stage-flow";
import { StageFlowItem } from "./stage-flow-item";

type Props = {
  stageId: ID;
  templateId: ID;
};
export const StageFlowList = async ({ stageId, templateId }: Props) => {
  const flows = await findManyProcessTemplateStageFlow({ stageId });
  const stages = await findManyProcessTemplateStage({ templateId });
  const stageFields = await findManyProcessTemplateStageField({ stageId });
  return (
    <Card
      title="Условия этапа"
      classNameContent="space-y-2"
      footer={<CreateStageFlow stageId={stageId} templateId={templateId} />}
    >
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
    </Card>
  );
};
