import { findManyProcessTemplateField } from "@/actions/template-field";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { CreateStageField } from "./create-stage-field";
import { StageFieldListDemoForm } from "./stage-field-list-demo-form";

type Props = {
  stageId: ID;
  templateId: ID;
};
export const StageFieldList = async ({ stageId, templateId }: Props) => {
  const stageFields = await findManyProcessTemplateStageField({ stageId });
  const templateFields = await findManyProcessTemplateField(templateId);

  return (
    <Card
      title="Поля"
      classNameContent="grid grid-cols-3 gap-2"
      footer={<CreateStageField stageId={stageId} templateId={templateId} />}
    >
      <EmptyState hasNode={stageFields.length > 0} emptyText="Поля отсутствуют">
        <StageFieldListDemoForm
          stageFields={stageFields}
          templateFields={templateFields}
        />
      </EmptyState>
    </Card>
  );
};
