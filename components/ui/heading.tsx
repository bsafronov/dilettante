import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";

export const Heading = forwardRef<
  HTMLHeadingElement,
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h5
      ref={ref}
      {...props}
      className={cn(
        "font-semibold text-muted-foreground mb-1 text-lg",
        className
      )}
    />
  );
});

Heading.displayName = "Heading";
