"use server"
import {Prisma, AttributeType} from "@prisma/client";
import {prisma} from "@/libs/prisma";

export const save = async (product: Prisma.PmsProductCreateInput)=> {
  return prisma.pmsProduct.create({
    data: product
  });
}

export const update = async (productId: number, product: Prisma.PmsProductUpdateInput)=> {
  return prisma.pmsProduct.update({
    where: {
      productId: productId
    },
    data: product
  });
}

export const remove = async (productId: number)=> {
  prisma.pmsProduct.delete({
    where: {
      productId: productId
    }
  })
}

export const findById = async (productId: number)=> {
  return prisma.pmsProduct.findUnique({
    where: {
      productId: productId
    }
  })
}

export const findByIdWithAttributeGroup = async (productId: number, attributeType: AttributeType)=> {
  return prisma.pmsProduct.findUnique({
    include:{
      pmsAttributeGroup: {
        select: {
          pmsAttributes: {
            include: {
              pmsAttributeValues: true
            },
            where: {
              attributeType: attributeType
            }
          }
        }
      }
    },
    where: {
      productId: productId
    }
  })
}

export const findByIdWithSku = async (productId: number)=> {
  return prisma.pmsProduct.findUnique({
    include:{
      pmsSkus: true
    },
    where: {
      productId: productId
    }
  })
}

export const findProductInfos = async (productIds: number[])=> {
  return prisma.pmsProduct.findMany({
    include: {
      pmsComments: true
    },
    where: {
      productId: {
        in: productIds
      },
    }
  })
}

export const findByIdWithAlbum = async (productId: number) => {
  return prisma.pmsProduct.findUnique({
    include: {
      pmsAlbums: {
        include: {
          pmsAlbumItems: true
        }
      }
    },
    where: {
      productId: productId
    }
  })
};

export const findAllIds = async () => {
  return prisma.pmsProduct.findMany({
    select: {
      productId: true
    },
    orderBy: {
      createTs: 'desc'
    }
  })
}

export const findByIdWithBrandAndCategory = async (productId: number) => {
  return prisma.pmsProduct.findUnique({
    include: {
      pmsBrand: true,
      pmsCategory: true
    },
    where: {
      productId: productId
    }
  })
}

export const findWithConditions = async (conditions: Prisma.PmsProductFindManyArgs) => {
  return prisma.pmsProduct.findMany(conditions);
};
