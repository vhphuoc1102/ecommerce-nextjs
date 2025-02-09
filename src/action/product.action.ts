import * as productService from "@/action/service/product.service";

export const search = async (keyword: string) => {
}

export const getHomeProducts = async () => {
  return await productService.getHomeProductsDraft()
}

export const getProductDetail = async (productId: number) => {
  return await productService.getProductDetail(productId)
}
