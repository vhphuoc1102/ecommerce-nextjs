export interface ProductCardInfo {
  userId?: number,
  productId: number,
  image?: string,
  title: string,
  subtitle?: string,
  promotePrice?: number,
  price?: number,
  rate?: number,
  tags?: string[],
  soldCnt?: number,
  commentCnt?: number
  favorite?: boolean
}

export interface Specification {
  detail: Map<string, string>,
  document?: string
}

export interface ProductInfo extends ProductCardInfo {
  description?: string,
  specification?: Specification,
  albums?: AlbumInfo[]
  skus?: ProductSku[]
  attributes?: ProductAttribute[]
}

export interface ProductSku {
  skuId: number,
  attribute: Record<string, string>
  skuName?: string,
  promotePrice?: number,
  price?: number,
  stock: number,
  lowStock?: number
}

export interface ProductAttribute {
  attributeId: number,
  attributeName: string,
  attributeValues: string[]
}

export interface AlbumInfo {
  albumId: number,
  items: AlbumItem[]
}

export interface AlbumItem {
  albumItemId: number
  image: string
}
