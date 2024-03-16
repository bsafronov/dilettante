import { findManyProcessTemplate } from "@/actions/template";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import Link from "next/link";

export default async function Page() {
  const templates = await findManyProcessTemplate();
  return (
    <div>
      <Link href={"/admin/templates/new"} className={buttonVariants()}>
        Создать шаблон
      </Link>

      <div className="mt-4 grid grid-cols-4 gap-4">
        {templates.map((template) => (
          <Link key={template.id} href={`/admin/templates/${template.id}`}>
            <Card key={template.id} title={template.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}
