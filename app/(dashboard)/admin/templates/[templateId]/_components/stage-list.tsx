import { findManyProcessTemplateStage } from "@/actions/template-stage";

import { EmptyState } from "@/components/ui/empty-state";
import { CreateStage } from "./create-stage";
import { StageItem } from "./stage-item";
import { Card } from "@/components/ui/card";

type Props = {
  templateId: number;
};
export const StageList = async ({ templateId }: Props) => {
  const stages = await findManyProcessTemplateStage({ templateId });

  return (
    <Card
      title="Этапы шаблона"
      classNameContent="flex flex-wrap gap-2"
      footer={<CreateStage templateId={templateId} />}
    >
      <EmptyState hasNode={stages.length > 0} emptyText="Поля отсутствуют">
        {stages.map((stage) => (
          <StageItem key={stage.id} {...stage} />
        ))}
      </EmptyState>
    </Card>
  );
};
