"use client";

import ReactFlow, { Background, Controls, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";

type Props = {
  nodes: Node[];
  edges: Edge[];
};
export const CheckoutFlowList = ({ nodes, edges }: Props) => {
  return (
    <>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
};
