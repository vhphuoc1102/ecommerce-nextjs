"use server"
import {AmsAdmin, Prisma} from "@prisma/client";
import {prisma} from "@/libs/prisma";

export const findByEmail = async (email: string): Promise<AmsAdmin | null> => {
  return prisma.amsAdmin.findUnique({
    where: {
      email: email
    }
  });
}

export const save = async (user: Prisma.AmsAdminCreateInput): Promise<AmsAdmin> => {
  return prisma.amsAdmin.create({
    data: user
  })
}
