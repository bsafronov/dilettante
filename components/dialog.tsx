import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type Props = ComponentPropsWithoutRef<typeof Dialog> & {
  title: string;
  trigger: ReactNode;
  description?: string;
  footer?: ReactNode;
  className?: string;
  classNameContent?: string;
  classNameFooter?: string;
  full?: boolean;
};

export const CDialog = ({
  title,
  trigger,
  children,
  description,
  footer,
  className,
  classNameFooter,
  classNameContent,
  full,
  ...props
}: Props) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(full && "w-[90%] h-[90%]", classNameContent)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        {footer && (
          <DialogFooter className={classNameFooter}>{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
