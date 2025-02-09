"use server"
import {prisma} from "@/libs/prisma";
import {SearchType} from "@prisma/client";

export const deleteByProductId = async (productId: number) => {
  return prisma.pmsAttributeValue.deleteMany({
    where: {
      productId: productId
    }
  });
}

export const deleteByIdIn = async (ids: Array<number>) => {
  return prisma.pmsAttributeValue.deleteMany({
    where: {
      attributeValueId: {
        in: [...ids]
      }
    }
  });
}

export const deleteByProductIdAndAttributeIdIn = async (productId: number, attributeIds: Array<number>) => {
  return prisma.pmsAttributeValue.deleteMany({
    where: {
      AND: [
        {productId: productId},
        {
          attributeId: {
            in: [...attributeIds]
          }
        }
      ],
    }
  });
}

export const getSpecifications = async (productId: number) => {
  return prisma.pmsAttributeValue.findMany({
    include: {
      pmsAttribute: {
        select: {
          name: true,
          searchType: true
        }
      }
    },
    where: {
      AND: [
        {
          productId: productId
        },
        {
          pmsAttribute: {
            searchType: SearchType.NO_SEARCH
          }
        }
      ]
    }
  })
}
