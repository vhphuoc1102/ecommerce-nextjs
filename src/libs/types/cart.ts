export interface CartItem {
  cartItemId: number,
  productId: number,
  skuId?: number,
  stock: number,
  quantity: number
  skuCode?: string,
  attribute?: string,
  name: string,
  title: string,
  subtitle: string,
  image?: string
  price: number,
  promotePrice: number
  activeStatus: boolean,
}
