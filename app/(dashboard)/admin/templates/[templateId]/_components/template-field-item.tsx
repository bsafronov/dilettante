"use client";

import { Button } from "@/components/ui/button";
import { ProcessTemplateField } from "@prisma/client";
import { Settings, Trash } from "lucide-react";

export const TemplateFieldItem = ({ id, name }: ProcessTemplateField) => {
  return (
    <div className="p-4 border rounded-md flex items-center gap-2">
      <span>{name}</span>
      <Button size={"icon"} variant={"outline"}>
        <Settings />
      </Button>
      <Button size={"icon"} variant={"destructive"}>
        <Trash />
      </Button>
    </div>
  );
};
