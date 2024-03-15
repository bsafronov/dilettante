import { findOneProcessTemplate } from "@/actions/template";
import { Heading } from "@/components/ui/heading";
import { notFound } from "next/navigation";
import { UpdateTemplate } from "./update-template";

type Props = {
  templateId: ID;
};

export const TemplateInfo = async ({ templateId }: Props) => {
  const template = await findOneProcessTemplate(templateId);

  if (!template) {
    return notFound();
  }

  return (
    <div>
      <Heading>Общая информация</Heading>
      <div className="flex gap-2">
        <UpdateTemplate {...template} />
        <div>
          <p>
            <span className="text-muted-foreground">Название:</span>{" "}
            {template.name}
          </p>
        </div>
      </div>
    </div>
  );
};
