"use server";

import { db } from "@/lib/db";
import { ProcessTemplateStageField } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Create = Pick<
  ProcessTemplateStageField,
  "description" | "fieldId" | "label" | "placeholder" | "stageId" | "templateId"
>;
type Update = Pick<
  ProcessTemplateStageField,
  "description" | "label" | "fieldId" | "placeholder" | "id"
>;
type FindMany = Partial<
  Pick<ProcessTemplateStageField, "fieldId" | "stageId" | "templateId">
> &
  FindManyCommon;

export const createProcessTemplateStageField = async ({
  description,
  fieldId,
  label,
  placeholder,
  stageId,
  templateId,
}: Create) => {
  await db.processTemplateStageField.create({
    data: {
      description,
      label,
      placeholder,
      field: {
        connect: {
          id: fieldId,
        },
      },
      stage: {
        connect: {
          id: stageId,
        },
      },
      template: {
        connect: {
          id: templateId,
        },
      },
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const updateProcessTemplateStageField = async ({
  description,
  fieldId,
  label,
  placeholder,
  id,
}: Update) => {
  await db.processTemplateStageField.update({
    where: {
      id,
    },
    data: {
      description,
      fieldId,
      label,
      placeholder,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const deleteProcessTemplateStageField = async (id: ID) => {
  await db.processTemplateStageField.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const findOneProcessTemplateStageField = async (id: ID) => {
  return await db.processTemplateStageField.findUnique({
    where: {
      id,
    },
  });
};

export const findManyProcessTemplateStageField = async ({
  fieldId,
  stageId,
  templateId,
  page = 1,
  take = 50,
}: FindMany) => {
  return await db.processTemplateStageField.findMany({
    take,
    skip: page * take - take,
    where: {
      stageId,
      fieldId,
      templateId,
    },
  });
};
