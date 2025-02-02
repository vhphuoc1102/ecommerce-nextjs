export interface ProductCardInfo {
  userId?: number,
  productId: number,
  image: string,
  title: string,
  subtitle?: string,
  promotePrice?: number,
  price: number,
  rate: number,
  tags: string[],
  soldCnt?: number,
  commentCnt?: number
  favorite?: boolean
}

export interface AttributeGroup {
  groupId: number,
  groupName: number,
}

export interface Specification {
  specification: Map<string, string>,
  document?: string
}

export interface ProductInfo extends ProductCardInfo {
  description: string,
  albums: AlbumInfo[]
}

export interface ProductSku {
  skuId: number,
  skuName: string,
  price: number,
  stock: number,
}

export interface AlbumInfo {
  albumId: number,
  items: AlbumItem[]
}

export interface AlbumItem {
  albumItemId: number
  image: string
}
