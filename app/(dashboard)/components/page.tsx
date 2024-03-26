import { getFakeUsers } from "@/actions/faker";
import { CCard } from "@/components/card";
import { SelectShowcase } from "./_components/select-showcase";

const Page = async () => {
  const users = await getFakeUsers();

  return (
    <div>
      <CCard>
        {/* <SelectForm users={users} /> */}
        <SelectShowcase users={users} />
      </CCard>
    </div>
  );
};

export default Page;
