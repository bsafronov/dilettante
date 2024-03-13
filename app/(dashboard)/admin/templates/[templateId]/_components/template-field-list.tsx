import { getProcessTemplateFieldList } from "@/actions/template-field";
import { TemplateFieldItem } from "./template-field-item";
import { CCard } from "@/components/ui/c-card";
import { CreateFieldDialog } from "./create-field-dialog";

type Props = {
  templateId: number;
};

export const TemplateFieldList = async ({ templateId }: Props) => {
  const fields = await getProcessTemplateFieldList(templateId);

  return (
    <CCard
      title="Поля шаблона"
      footer={<CreateFieldDialog templateId={templateId} />}
    >
      {fields.map((field) => (
        <TemplateFieldItem key={field.id} {...field} />
      ))}
    </CCard>
  );
};
