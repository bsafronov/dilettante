import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { StageSettings } from "./stage-settings";

export const StageItem = (
  props: Result<typeof findManyProcessTemplateStage>[number]
) => {
  return (
    <div className="flex items-center gap-2 border rounded-md border-dashed p-4">
      <StageSettings {...props} />
      <span>{props.name}</span>
    </div>
  );
};
