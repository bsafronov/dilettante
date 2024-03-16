import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-cols-4">
      <Link href={"/admin/templates"}>
        <Card
          title="Шаблоны процессов"
          description="Поля, этапы и порядок действия следования процессов"
        />
      </Link>
    </div>
  );
}
