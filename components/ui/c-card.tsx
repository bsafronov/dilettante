"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

type Props = {
  title?: string;
  description?: string;
  classNameContent?: string;
  footer?: React.ReactNode;
};

export const CCard = forwardRef<
  ElementRef<typeof Card>,
  Props & ComponentPropsWithoutRef<typeof Card>
>(
  (
    { title, description, footer, children, classNameContent, ...props },
    ref
  ) => {
    return (
      <Card ref={ref} {...props}>
        {(title || description) && (
          <CardHeader>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </CardHeader>
        )}
        <CardContent className={classNameContent}>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    );
  }
);

CCard.displayName = "CCard";
