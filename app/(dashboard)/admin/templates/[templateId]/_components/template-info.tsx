import { findOneProcessTemplate } from "@/actions/template";
import { notFound } from "next/navigation";
import { UpdateTemplate } from "./update-template";
import { Card } from "@/components/ui/card";

type Props = {
  templateId: ID;
};

export const TemplateInfo = async ({ templateId }: Props) => {
  const template = await findOneProcessTemplate(templateId);

  if (!template) {
    return notFound();
  }

  return (
    <Card title="Общая информация">
      <UpdateTemplate {...template} />
      <div>
        <p>
          <span className="text-muted-foreground">Название:</span>{" "}
          {template.name}
        </p>
      </div>
    </Card>
  );
};
