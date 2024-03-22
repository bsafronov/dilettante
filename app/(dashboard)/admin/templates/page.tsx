import { findManyProcessTemplate } from "@/actions/template";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreateTemplateForm } from "./_components/create-template-form";
import { CDialog } from "@/components/dialog";
import Link from "next/link";

export default async function Page() {
  const templates = await findManyProcessTemplate();
  return (
    <div>
      <CDialog
        title="Создание шаблона"
        trigger={<Button>Создать шаблон</Button>}
        children={<CreateTemplateForm />}
      />

      <div className="mt-4 grid grid-cols-4 gap-4">
        {templates.map((template) => (
          <Link key={template.id} href={`/admin/templates/${template.id}`}>
            <Card
              key={template.id}
              title={template.name}
              className="hover:shadow-md"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
