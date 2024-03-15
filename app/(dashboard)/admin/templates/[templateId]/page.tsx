import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FieldListSection } from "./_components/field-list-section";
import { StageList } from "./_components/stage-list";
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
      <Link
        href={"/admin/templates"}
        className={cn(buttonVariants({ variant: "outline" }), "gap-1 mb-4")}
      >
        <ArrowLeft className="size-4" />
        Назад
      </Link>

      <div className="space-y-8">
        <TemplateInfo templateId={id} />
        <FieldListSection templateId={id} />
        <StageList templateId={id} />
      </div>
    </div>
  );
}
