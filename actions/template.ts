"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTemplate = async (
  data: Prisma.ProcessTemplateCreateInput
) => {
  const template = await db.processTemplate.create({
    data,
  });
  revalidatePath("/admin/templates");
  return template;
};

export const getTemplates = async () => {
  return await db.processTemplate.findMany();
};

export const getOneTemplate = async (id: number) => {
  return await db.processTemplate.findUnique({
    where: {
      id,
    },
  });
};
