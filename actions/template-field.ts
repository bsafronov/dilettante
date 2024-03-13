"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getProcessTemplateFieldList = async (templateId: number) => {
  return await db.processTemplateField.findMany({
    where: {
      templateId,
    },
  });
};

export const createProcessTemplateField = async ({
  name,
  templateId,
}: {
  name: string;
  templateId: number;
}) => {
  const field = await db.processTemplateField.create({
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
