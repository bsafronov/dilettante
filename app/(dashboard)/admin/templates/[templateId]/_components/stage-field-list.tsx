import { CCard } from "@/components/ui/c-card";
import { EmptyState } from "@/components/ui/empty-state";
import { CreateStageField } from "./create-stage-field";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { findManyProcessTemplateField } from "@/actions/template-field";
import { StageFieldListDemoForm } from "./stage-field-list-demo-form";
import { Heading } from "@/components/ui/heading";

type Props = {
  stageId: ID;
  templateId: ID;
};
export const StageFieldList = async ({ stageId, templateId }: Props) => {
  const stageFields = await findManyProcessTemplateStageField({ stageId });
  const templateFields = await findManyProcessTemplateField(templateId);

  return (
    <div>
      <Heading>Поля</Heading>
      <div className="grid grid-cols-3 gap-2">
        <EmptyState
          hasNode={stageFields.length > 0}
          emptyText="Поля отсутствуют"
        >
          <StageFieldListDemoForm
            stageFields={stageFields}
            templateFields={templateFields}
          />
        </EmptyState>
      </div>
      <div className="mt-2">
        <CreateStageField stageId={stageId} templateId={templateId} />
      </div>
    </div>
  );
};
