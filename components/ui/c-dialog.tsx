"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

type Props = React.ComponentPropsWithoutRef<typeof Dialog> & {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  full?: boolean;
};

export const CDialog = ({
  children,
  trigger,
  title,
  description,
  footer,
  className,
  full,
  ...props
}: Props) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn(full && "h-[90%] max-w-[90%]")}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className={cn("p-6 grow overflow-y-auto", className)}>
          {children}
        </div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
