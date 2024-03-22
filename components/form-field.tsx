import { ComponentPropsWithoutRef, ReactNode } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type CFormFieldPlacement = "checkbox";
type CFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<
  ComponentPropsWithoutRef<typeof FormField<TFieldValues, TName>>,
  "control" | "name"
> & {
  label?: string;
  description?: string;
  className?: string;
  placement?: CFormFieldPlacement;
  required?: boolean;
  render: (props: ControllerRenderProps<TFieldValues, TName>) => ReactNode;
};
type CFormFieldPlacementProps = Pick<
  CFormFieldProps,
  "className" | "description" | "label" | "placement" | "required"
> & {
  children?: ReactNode;
};
type CFormFieldPlacementItemProps = Omit<CFormFieldPlacementProps, "placement">;
type CFormFieldPlacementList = Partial<
  Record<
    CFormFieldPlacement,
    (props: CFormFieldPlacementItemProps) => JSX.Element
  >
> & {
  DEFAULT: (props: CFormFieldPlacementItemProps) => JSX.Element;
};

export const CFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  render,
  ...props
}: CFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FieldPlacement {...props}>{render(field)}</FieldPlacement>
      )}
    />
  );
};

const placementList: CFormFieldPlacementList = {
  DEFAULT: ({ children, className, description, label, required }) => (
    <FormItem className={className}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  ),
  checkbox: ({ children, className, description, label, required }) => (
    <FormItem className={cn("flex gap-2", className)}>
      <FormControl>{children}</FormControl>
      <div className="flex flex-col">
        {label && <FormLabel required={required}>{label}</FormLabel>}
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </div>
    </FormItem>
  ),
};

const FieldPlacement = ({ placement, ...props }: CFormFieldPlacementProps) => {
  if (!placement || !placementList[placement]?.(props)) {
    return placementList.DEFAULT(props);
  }
  return placementList[placement]?.(props);
};
