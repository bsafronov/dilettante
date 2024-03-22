import { getFakeUsers } from "@/actions/faker";
import { CCard } from "@/components/card";
import { SelectForm } from "@/components/select-form";

import Link from "next/link";

export default async function Page() {
  const users = await getFakeUsers();

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
      <div className="mt-4">
        <SelectForm users={users} />
      </div>
    </>
  );
}
