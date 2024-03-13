import { TemplateFieldList } from "./_components/template-field-list";
import { TemplateInfo } from "./_components/template-info";

type Props = {
  params: {
    templateId: string;
  };
};

export default function Page({ params: { templateId } }: Props) {
  const id = Number(templateId);
  return (
    <div>
      <TemplateInfo templateId={id} />
      <TemplateFieldList templateId={id} />
    </div>
  );
}
