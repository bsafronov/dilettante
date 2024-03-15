import { findManyProcessTemplateField } from "@/actions/template-field";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { FieldList } from "./field-list";

type Props = {
  templateId: number;
};

export const FieldListSection = async ({ templateId }: Props) => {
  const fields = await findManyProcessTemplateField(templateId);
  const stageFields = await findManyProcessTemplateStageField({
    templateId,
  });

  return (
    <FieldList
      fields={fields}
      stageFields={stageFields}
      templateId={templateId}
    />
  );
};
