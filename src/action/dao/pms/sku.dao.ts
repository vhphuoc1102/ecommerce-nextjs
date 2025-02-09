"use server"
import {prisma} from "@/libs/prisma";

export const deleteByIdIn = async(skuIds: number[]) => {
  return prisma.pmsSku.deleteMany({
    where: {
      skuId: {
        in: skuIds
      }
    }
  });
}

export const findById = async (skuId: number, productId: number) => {
  return prisma.pmsSku.findUnique({
    where: {
      skuId_productId: {
        skuId: skuId,
        productId: productId
      }
    }
  });
}
