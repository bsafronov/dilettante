import { ReactNode } from "react";

type Props = {
  emptyText?: string;
  hasNode?: boolean;
  children?: ReactNode;
};

export const CEmptyState = ({
  emptyText = "Здесь ничего нет...",
  hasNode,
  children,
}: Props) => {
  if (!hasNode) {
    return <p className="text-slate-500">{emptyText}</p>;
  }

  return children;
};
