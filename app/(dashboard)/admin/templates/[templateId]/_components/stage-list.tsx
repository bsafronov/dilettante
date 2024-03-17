import { findManyProcessTemplateStage } from "@/actions/template-stage";

import { EmptyState } from "@/components/ui/empty-state";
import { CreateStage } from "./create-stage";
import { StageItem } from "./stage-item";
import { Card } from "@/components/ui/card";
import { CheckoutFlow } from "./checkout-flow";

type Props = {
  templateId: number;
};
export const StageList = async ({ templateId }: Props) => {
  const stages = await findManyProcessTemplateStage({ templateId });

  return (
    <Card
      title="Этапы шаблона"
      classNameContent="flex flex-wrap gap-2"
      footer={
        <div className="flex gap-2">
          <CreateStage templateId={templateId} />
          <CheckoutFlow templateId={templateId} />
        </div>
      }
    >
      <EmptyState hasNode={stages.length > 0} emptyText="Поля отсутствуют">
        {stages.map((stage) => (
          <StageItem key={stage.id} {...stage} />
        ))}
      </EmptyState>
    </Card>
  );
};
