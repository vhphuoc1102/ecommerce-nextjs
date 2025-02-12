import * as productService from "@/action/service/product.service";
import {ProductListRequest} from "@/action/payload/product.payload";

export const search = async (keyword: string) => {
}

export const getHomeProducts = async () => {
  return await productService.getHomeProductsDraft()
}

export const getProductDetail = async (productId: number) => {
  return await productService.getProductDetail(productId)
}

export const getList = async (request: ProductListRequest)=> {
  return await productService.getList(request)
}
