"use server";

import { db } from "@/lib/db";
import { ProcessTemplateField } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Create = Pick<ProcessTemplateField, "name" | "templateId">;
type Update = Pick<ProcessTemplateField, "name" | "id">;

export const createProcessTemplateField = async ({
  name,
  templateId,
}: Create) => {
  await db.processTemplateField.create({
    data: {
      name,
      template: {
        connect: {
          id: templateId,
        },
      },
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const updateProcessTemplateField = async ({ name, id }: Update) => {
  await db.processTemplateField.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const deleteProcessTemplateField = async (fieldId: number) => {
  await db.processTemplateField.delete({
    where: {
      id: fieldId,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const findOneProcessTemplateField = async (templateId: number) => {
  return await db.processTemplateField.findMany({
    where: {
      templateId,
    },
  });
};

export const findManyProcessTemplateField = async (templateId: number) => {
  return await db.processTemplateField.findMany({
    where: {
      templateId,
    },
  });
};
