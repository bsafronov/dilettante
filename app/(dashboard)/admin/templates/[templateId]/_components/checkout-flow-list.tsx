"use client";

import { Button } from "@/components/ui/button";
import Dagre from "@dagrejs/dagre";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeTypes,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { CustomNodeFlow } from "./custom-node-flow";

type Props = {
  initialNodes: Node[];
  initialEdges: Edge[];
};

const nodeTypes: NodeTypes = {
  custom: CustomNodeFlow,
};

const g = new Dagre.graphlib.Graph();
g.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: { direction: "TB" | "LR" }
) => {
  g.setGraph({ rankdir: options.direction });

  nodes.forEach((node) =>
    g.setNode(node.id, {
      width: 350,
    })
  );
  edges.forEach((edge) =>
    g.setEdge(edge.source, edge.target, {
      height: 150,
      width: 300,
    })
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const Map = ({ initialEdges, initialNodes }: Props) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onLayout = useCallback(
    (direction: "TB" | "LR") => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges, fitView, setNodes, setEdges]
  );

  useEffect(() => {
    onLayout("TB");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Panel position="top-right">
          <Button onClick={() => onLayout("TB")}>Позиционировать</Button>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </>
  );
};

export const CheckoutFlowMap = ({ initialEdges, initialNodes }: Props) => {
  return (
    <ReactFlowProvider>
      <Map initialEdges={initialEdges} initialNodes={initialNodes} />
    </ReactFlowProvider>
  );
};
