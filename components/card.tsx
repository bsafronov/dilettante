import { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = ComponentPropsWithoutRef<typeof Card> & {
  title?: string;
  description?: string;
  footer?: ReactNode;
  classNameContent?: string;
  classNameFooter?: string;
};

export const CCard = ({
  title,
  description,
  footer,
  children,
  className,
  classNameContent,
  classNameFooter,
}: Props) => {
  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      <CardContent className={classNameContent}>{children}</CardContent>
      {footer && <CardFooter className={classNameFooter}>{footer}</CardFooter>}
    </Card>
  );
};
