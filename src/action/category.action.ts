import * as categoryService from "@/action/service/category.service";

export const getCategoryTree = async () => {
  return await categoryService.getCategoryTree()
}
