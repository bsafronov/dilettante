import { getFakeUsers } from "@/actions/faker";
import { SelectForm } from "./_components/select-form";
import { CCard } from "@/components/card";

const Page = async () => {
  const users = await getFakeUsers();

  return (
    <div>
      <CCard>
        <SelectForm users={users} />
      </CCard>
    </div>
  );
};

export default Page;
