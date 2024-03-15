type Props = {
  children?: React.ReactNode;
  hasNode: boolean;
  emptyText: string;
};

export const EmptyState = ({ emptyText, hasNode, children }: Props) => {
  if (!hasNode) {
    return <p className="text-muted-foreground">{emptyText}</p>;
  }

  return children;
};
