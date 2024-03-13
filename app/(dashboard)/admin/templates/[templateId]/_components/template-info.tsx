import { getOneTemplate } from "@/actions/template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

type Props = {
  templateId: number;
};

export const TemplateInfo = async ({ templateId }: Props) => {
  const template = await getOneTemplate(Number(templateId));

  if (!template) {
    return notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Общая информация</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Название: {template.id}</p>
      </CardContent>
    </Card>
  );
};
