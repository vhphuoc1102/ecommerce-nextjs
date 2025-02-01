"use server"
import {AmsUser, Prisma} from "@prisma/client";
import {prisma} from "@/libs/prisma";

export const findByEmail = async (email: string): Promise<AmsUser | null> => {
  return prisma.amsUser.findUnique({
    where: {
      email: email
    }
  });
}

export const save = async (user: Prisma.AmsUserCreateInput): Promise<AmsUser> => {
  return prisma.amsUser.create({
    data: user
  })
}
