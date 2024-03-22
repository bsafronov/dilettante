"use client";

import { Loader2 } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Form } from "./ui/form";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, unknown, undefined>;
  onSubmit: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  className?: string;
  cancelText?: string;
  submitText?: string;
  isLoading?: boolean;
  hasCancel?: boolean;
};

export const CForm = <T extends FieldValues>({
  form,
  onSubmit,
  onCancel,
  children,
  className,
  submitText = "Отправить",
  cancelText = "Отмена",
  hasCancel,
  isLoading,
}: Props<T>) => {
  const handleCancel = () => onCancel?.() ?? form.reset();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <div className={cn("space-y-2", className)}>{children}</div>
        <div className="flex justify-end mt-4 gap-4">
          {hasCancel && (
            <Button variant={"outline"} onClick={handleCancel}>
              {cancelText}
            </Button>
          )}
          <Button disabled={isLoading} className="gap-2">
            {isLoading && (
              <Loader2 className="text-primary-foreground animate-spin" />
            )}
            {submitText}
          </Button>
        </div>
      </form>
    </Form>
  );
};
