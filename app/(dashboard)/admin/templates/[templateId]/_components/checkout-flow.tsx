import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { findManyProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Edge, Node } from "reactflow";
import { CheckoutFlowMap } from "./checkout-flow-list";
import { findManyProcessTemplateStageField } from "@/actions/template-stage-field";
import { ProcessTemplateStageField } from "@prisma/client";

type Props = {
  templateId: ID;
};

export const CheckoutFlow = async ({ templateId }: Props) => {
  const stageFlows = await findManyProcessTemplateStageFlow({ templateId });
  const stages = await findManyProcessTemplateStage({ templateId });
  const stageFields = await findManyProcessTemplateStageField({ templateId });

  const stageFieldMap: Record<ID, ProcessTemplateStageField> = {};

  stageFields.forEach((item) => {
    stageFieldMap[item.id] = item;
  });

  const initialNodes: Node[] = stages.map((item, i) => ({
    id: `${item.id}`,
    position: { x: 0, y: i * 100 },
    type: "custom",
    data: {
      label: item.name,
    },
  }));

  const initialEdges: Edge[] = stageFlows.map((item) => ({
    id: `e${item.stageId}-${item.nextStageId}`,
    source: `${item.stageId}`,
    target: `${item.nextStageId}`,
    label: item.fieldId
      ? `"${stageFieldMap[item.fieldId].label}" = ${item.value}`
      : undefined,
    animated: true,
  }));

  return (
    <Dialog
      title="Поток"
      trigger={<Button variant={"outline"}>Схема</Button>}
      full
      className="p-0"
    >
      <CheckoutFlowMap
        initialEdges={initialEdges}
        initialNodes={initialNodes}
      />
    </Dialog>
  );
};
