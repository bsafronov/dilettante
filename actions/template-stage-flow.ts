"use server";

import { db } from "@/lib/db";
import { ProcessTemplateStageFlow } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Create = Pick<
  ProcessTemplateStageFlow,
  "fieldId" | "nextStageId" | "stageId" | "templateId" | "value"
>;
type Update = Pick<
  ProcessTemplateStageFlow,
  "id" | "fieldId" | "nextStageId" | "value"
>;

export const createProcessTemplateStageFlow = async ({
  fieldId,
  nextStageId,
  stageId,
  templateId,
  value,
}: Create) => {
  await db.processTemplateStageFlow.create({
    data: {
      field: fieldId
        ? {
            connect: {
              id: fieldId,
            },
          }
        : undefined,
      template: {
        connect: {
          id: templateId,
        },
      },
      nextStage: {
        connect: {
          id: nextStageId,
        },
      },
      stage: {
        connect: {
          id: stageId,
        },
      },
      value,
    },
  });
  revalidatePath("/admin/templates/[templateId]", "page");
};

export const updateProcessTemplateStageFlow = async ({
  fieldId,
  id,
  nextStageId,
  value,
}: Update) => {
  await db.processTemplateStageFlow.update({
    where: {
      id,
    },
    data: {
      nextStageId,
      // nextStage: {
      //   connect: {
      //     id: nextStageId,
      //   },
      // },
      // field: fieldId
      //   ? {
      //       connect: {
      //         id: fieldId,
      //       },
      //     }
      //   : undefined,
      fieldId,
      value,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const deleteProcessTemplateStageFlow = async (id: ID) => {
  await db.processTemplateStageFlow.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/templates/[templateId]", "page");
};

export const findManyProcessTemplateStageFlow = async (stageId: ID) => {
  return await db.processTemplateStageFlow.findMany({
    where: {
      stageId,
    },
  });
};

export const findOneProcessTemplateStageFlow = async (id: ID) => {
  return await db.processTemplateStageFlow.findUnique({
    where: {
      id,
    },
  });
};
