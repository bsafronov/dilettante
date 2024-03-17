import { memo } from "react";
import { Handle, Position } from "reactflow";

const Node = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 rounded-md border bg-white max-w-[350px]">
      <span>{data.label}</span>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-slate-300 !w-16 !rounded-sm"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-slate-300 !w-16 !rounded-sm"
      />
    </div>
  );
};

export const CustomNodeFlow = memo(Node);
