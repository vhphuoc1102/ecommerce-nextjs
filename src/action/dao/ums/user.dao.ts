import {prisma} from "@/libs/prisma";

export const findById = async (userId: number) => {
  return prisma.umsUser.findUnique({
    where: {
      userId: userId
    }
  })
}
