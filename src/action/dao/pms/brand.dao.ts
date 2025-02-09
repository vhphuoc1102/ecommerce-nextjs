"use server"
import {prisma} from "@/libs/prisma";
import {PmsBrand} from "@prisma/client";

export const findById = async (brandId: number): Promise<PmsBrand | null> => {
  return prisma.pmsBrand.findUnique({
    where: {
      brandId: brandId
    }
  });
}
