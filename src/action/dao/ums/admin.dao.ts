import {prisma} from "@/libs/prisma";
import {Prisma} from "@prisma/client";

export const save = async (admin: Prisma.UmsAdminCreateInput) => {
  return prisma.umsAdmin.create({
    data: admin
  })
}
