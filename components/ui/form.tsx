import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "./label";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  ReactNode,
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";

const _Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const _FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={className} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    required?: boolean;
  }
>(({ className, required, children, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <Label ref={ref} className={cn(className)} htmlFor={formItemId} {...props}>
      {children}&nbsp;
      {required ? <span className="text-destructive">*</span> : null}
    </Label>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

type FormFieldPlacement = "checkbox";
type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Pick<
  ComponentPropsWithoutRef<typeof _FormField<TFieldValues, TName>>,
  "control" | "name"
> & {
  label?: string | null;
  description?: string | null;
  className?: string;
  placement?: FormFieldPlacement;
  required?: boolean;
  render: (props: ControllerRenderProps<TFieldValues, TName>) => ReactNode;
};
type FormFieldPlacementProps = Pick<
  FormFieldProps,
  "className" | "description" | "label" | "placement" | "required"
> & {
  children?: ReactNode;
};
type FormFieldPlacementItemProps = Omit<FormFieldPlacementProps, "placement">;
type FormFieldPlacementList = Partial<
  Record<
    FormFieldPlacement,
    (props: FormFieldPlacementItemProps) => JSX.Element
  >
> & {
  DEFAULT: (props: FormFieldPlacementItemProps) => JSX.Element;
};

const FieldPlacement = ({ placement, ...props }: FormFieldPlacementProps) => {
  if (!placement || !placementList[placement]?.(props)) {
    return placementList.DEFAULT(props);
  }
  return placementList[placement]?.(props);
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  render,
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <_FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FieldPlacement {...props}>{render(field)}</FieldPlacement>
      )}
    />
  );
};

const placementList: FormFieldPlacementList = {
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

type Props<T extends FieldValues> = {
  form: UseFormReturn<T, unknown, undefined>;
  onSubmit?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
  className?: string;
  cancelText?: string;
  submitText?: string;
  isLoading?: boolean;
  hasCancel?: boolean;
};

const Form = <T extends FieldValues>({
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
    <_Form {...form}>
      <form onSubmit={onSubmit}>
        <div className={cn("space-y-2", className)}>{children}</div>
        <div className="flex justify-end mt-4 gap-4">
          {hasCancel && (
            <Button variant={"outline"} onClick={handleCancel}>
              {cancelText}
            </Button>
          )}

          {onSubmit && (
            <Button disabled={isLoading} className="gap-2">
              {isLoading && (
                <Loader2 className="text-primary-foreground animate-spin" />
              )}
              {submitText}
            </Button>
          )}
        </div>
      </form>
    </_Form>
  );
};

export { Form, FormField };
