import { notFound } from "next/navigation";
import { findOneProcessTemplateStage } from "@/actions/template-stage";
import { UpdateStage } from "./update-stage";

type Props = {
  stageId: number;
};

export const StageInfo = async ({ stageId }: Props) => {
  const stage = await findOneProcessTemplateStage(stageId);

  if (!stage) {
    return notFound();
  }

  return (
    <div>
      <UpdateStage {...stage} />
    </div>
  );
};
