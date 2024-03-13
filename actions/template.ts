import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createTemplate = async (
  data: Prisma.ProcessTemplateCreateInput
) => {
  return await db.processTemplate.create({
    data,
  });
};

export const getTemplates = async () => {
  return await db.processTemplate.findMany();
};
