"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "./ui/button";

type Props = Omit<ComponentPropsWithoutRef<typeof AlertDialog>, "children"> & {
  title?: string;
  trigger: ReactNode;
  description?: string;
  cancelText?: string;
  submitText?: string;
  onSubmit: () => void;
};

export const CAlertDialog = ({
  onSubmit,
  trigger,
  cancelText = "Отмена",
  submitText = "Подтвердить",
  title = "Вы уверены?",
  description = "Это действие нельзя будет отменить.",
  ...props
}: Props) => {
  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button>{cancelText}</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild onClick={onSubmit}>
            <Button>{submitText}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
