import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FieldListSection } from "./_components/field-list-section";
import { StageList } from "./_components/stage-list";
import { TemplateInfo } from "./_components/template-info";
import { CheckoutFlow } from "./_components/checkout-flow";

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

      <div className="space-y-4">
        <TemplateInfo templateId={id} />
        <FieldListSection templateId={id} />
        <StageList templateId={id} />
        <CheckoutFlow templateId={id} />
      </div>
    </div>
  );
}
