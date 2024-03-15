import { CCard } from "@/components/ui/c-card";
import { EmptyState } from "@/components/ui/empty-state";
import { StageItem } from "./stage-item";
import { CreateStage } from "./create-stage";
import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { Heading } from "@/components/ui/heading";

type Props = {
  templateId: number;
};
export const StageList = async ({ templateId }: Props) => {
  const stages = await findManyProcessTemplateStage(templateId);

  return (
    <div>
      <Heading>Этапы</Heading>
      <div className="grid grid-cols-4 gap-2">
        <EmptyState hasNode={stages.length > 0} emptyText="Поля отсутствуют">
          {stages.map((stage) => (
            <StageItem key={stage.id} {...stage} />
          ))}
        </EmptyState>
      </div>

      <div className="mt-2">
        <CreateStage templateId={templateId} />
      </div>
    </div>
  );
};
