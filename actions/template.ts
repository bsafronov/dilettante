"use server";

import { db } from "@/lib/db";
import { ProcessTemplate } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Create = Pick<ProcessTemplate, "name">;
type Update = Pick<ProcessTemplate, "id" | "name">;

export const createProcessTemplate = async ({ name }: Create) => {
  const template = await db.processTemplate.create({
    data: {
      name,
    },
  });
  revalidatePath("/admin/templates");
  return template;
};

export const updateProcessTemplate = async ({ id, name }: Update) => {
  await db.processTemplate.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  revalidatePath("/admin/templates");
};

export const deleteProcessTemplate = async (id: ID) => {
  await db.processTemplate.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/templates");
};

export const findManyProcessTemplate = async () => {
  return await db.processTemplate.findMany();
};

export const findOneProcessTemplate = async (id: number) => {
  return await db.processTemplate.findUnique({
    where: {
      id,
    },
  });
};
