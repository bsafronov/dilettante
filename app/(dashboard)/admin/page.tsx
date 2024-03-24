import { CCard } from "@/components/card";

import Link from "next/link";

export default async function Page() {
  return (
    <>
      <div className="grid grid-cols-4">
        <Link href={"/admin/templates"}>
          <CCard
            title="Шаблоны процессов"
            description="Поля, этапы и порядок действия следования процессов"
          />
        </Link>
      </div>
    </>
  );
}
