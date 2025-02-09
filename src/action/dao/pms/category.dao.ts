"use server"
import {PmsCategory} from "@prisma/client";
import {prisma} from "@/libs/prisma";

export const findById = async (categoryId: number) : Promise<PmsCategory | null> => {
  return prisma.pmsCategory.findUnique({
    where: {
      categoryId: categoryId
    }
  })
}

export const findCategoryTree = async ()  => {
  return prisma.pmsCategory.findMany({
    select: {
      categoryId: true,
      name: true,
      childCategories: {
        select: {
          categoryId: true,
          name: true,
          childCategories: {
            select: {
              categoryId: true,
              name: true
            }
          }
        }
      }
    },
    where: {
      parentId: null
    }
  })
}
