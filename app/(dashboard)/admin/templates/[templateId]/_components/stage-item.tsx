import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { StageSettings } from "./stage-settings";

export const StageItem = (
  props: Result<typeof findManyProcessTemplateStage>[number]
) => {
  return (
    <div className="grow border rounded-md border-dashed p-4">
      <StageSettings {...props} />
      <div className="mt-4">
        <span>{props.name}</span>
      </div>
    </div>
  );
};
