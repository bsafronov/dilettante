import { findManyProcessTemplateStage } from "@/actions/template-stage";
import { findManyProcessTemplateStageFlow } from "@/actions/template-stage-flow";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Edge, Node } from "reactflow";
import { CheckoutFlowList } from "./checkout-flow-list";

type Props = {
  templateId: ID;
};

export const CheckoutFlow = async ({ templateId }: Props) => {
  const stageFlows = await findManyProcessTemplateStageFlow({ templateId });
  const stages = await findManyProcessTemplateStage({ templateId });

  const initialNodes: Node[] = stages.map((item, i) => ({
    id: `${item.id}`,
    position: { x: i * 100, y: i * 100 },
    data: {
      label: item.name,
    },
  }));

  const initialEdges: Edge[] = stageFlows.map((item) => ({
    id: `e${item.stageId}-${item.nextStageId}`,
    source: `${item.stageId}`,
    target: `${item.nextStageId}`,
    label: item.value ?? undefined,
  }));

  return (
    <Dialog
      title="Поток"
      trigger={<Button>Смотреть поток</Button>}
      full
      className="p-0"
    >
      <CheckoutFlowList edges={initialEdges} nodes={initialNodes} />
    </Dialog>
  );
};
