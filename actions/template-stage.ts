"use server";

import { db } from "@/lib/db";
import { ProcessTemplateStage } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Create = Pick<ProcessTemplateStage, "name" | "templateId">;
type Update = Pick<ProcessTemplateStage, "name" | "id">;
type FindMany = Partial<Pick<ProcessTemplateStage, "templateId">>;
export const createProcessTemplateStage = async ({
  name,
  templateId,
}: Create) => {
  await db.processTemplateStage.create({
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

export const updateProcessTemplateStage = async ({ name, id }: Update) => {
  await db.processTemplateStage.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const deleteProcessTemplateStage = async (id: ID) => {
  await db.processTemplateStage.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const findOneProcessTemplateStage = async (id: ID) => {
  return await db.processTemplateStage.findUnique({
    where: {
      id,
    },
  });
};

export const findManyProcessTemplateStage = async ({
  templateId,
}: FindMany) => {
  return await db.processTemplateStage.findMany({
    where: {
      templateId,
    },
  });
};
