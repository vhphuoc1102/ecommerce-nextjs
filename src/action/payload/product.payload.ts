import {PageRequest} from "@/action/payload/common";

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PublishStatus {
  PUBLISH = 'PUBLISH',
  DRAFT = 'DRAFT',
}

export enum NewStatus {
  NEW = 'NEW',
  LIKE_NEW = 'LIKE_NEW',
  USED = 'USED',
}

export enum VerifyStatus {
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

export interface ProductRequest {
  brandId: number;
  categoryId: number;
  attributeGroupId: number;
  name: string;
  title: string;
  subtitle?: string;
  serialNumber: string;
  description: string;
  sortOrder?: number;
  quantity?: number;
  note?: string;
  stock?: number;
  lowStock?: number;
  weight?: number;
  keyword?: string;
  price?: number;
  originalPrice?: number;
  promotionPrice?: number;
  rate?: number;
  soldCnt?: number;
  tag?: string;
  giftPoint?: number;
  growthPoint?: number;
  status?: Status;
  publishStatus?: PublishStatus;
  newStatus?: NewStatus;
  verifyStatus?: VerifyStatus;
  attributeValues?: Array<AttributeValue>;
  skus?: Array<Sku>;
}

export interface AttributeValue {
  attributeId: number
  value: string
}

export interface Sku {
  skuId: number
  skuCode: string
  attribute: Record<string, string>
  skuName: string
  promotePrice ?: number
  originalPrice : number
  price: number
  stock: number
  lowStock: number
  quantity: number
}

export type CreateProductRequest = ProductRequest

export interface UpdateProductRequest extends ProductRequest{
  productId: number
}

export interface ProductListRequest extends PageRequest {
  keyword?: string
  brandId?: number
  categoryId?: number
  publishStatus?: PublishStatus
  verifyStatus?: VerifyStatus
}
