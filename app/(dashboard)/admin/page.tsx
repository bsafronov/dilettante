import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid grid-cols-4">
      <Link href={"/admin/templates"}>
        <Card>
          <CardHeader>
            <CardTitle>Шаблоны процессов</CardTitle>
            <CardDescription>
              Поля, этапы и порядок действия следования процессов
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
}
