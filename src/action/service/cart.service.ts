import * as omsCartItemDao from '@/action/dao/oms/cartItem.dao'
import * as pmsProductDao from '@/action/dao/pms/product.dao'
import * as umsUserDao from '@/action/dao/ums/user.dao'
import * as pmsSkuDao from '@/action/dao/pms/sku.dao'
import * as fmsFileDao from "@/action/dao/fms/file.dao";
import {FileKind, Prisma} from '@prisma/client'
import {getPresignedURL} from "@/libs/s3";

export const updateStatus = async (cartItemIds: number[], status: boolean) => {
  return omsCartItemDao.updateStatus(cartItemIds, status);
};


export const deleteCartItems = async (cartItemIds: number[]) => {
   if (cartItemIds.length === 0) {
     return
   }
   return omsCartItemDao.deleteByIdIn(cartItemIds);
};


export const getCartItems = async (userId: number) => {
  const omsCartItems = await omsCartItemDao.findByUserId(userId);
  const productIds = omsCartItems.map(cartItem => cartItem.productId);
  const fmsFiles = await fmsFileDao.findByFileKindAndResourceIdIn(FileKind.PRODUCT_PIC, productIds);
  const productIdToKeyMap = new Map<number, string | null>(
      await Promise.all(
          fmsFiles.map(fmsFile =>
              getPresignedURL(fmsFile.objectKey).then(url => [fmsFile.resourceId, url] as [number, string | null])
          )
      )
  );
  return omsCartItems.map((cartItem) => {
    return {
      cartItemId: cartItem.cartItemId,
      productId: cartItem.productId,
      skuId: cartItem.skuId ?? undefined,
      stock: 100, // TODO: Change later
      quantity: cartItem.quantity,
      skuCode: cartItem.productSkuCode ?? "",
      attribute: cartItem.attribute ?? "",
      name: cartItem.productName,
      title: cartItem.productTitle,
      subtitle: cartItem.productSubTitle ?? "",
      price: cartItem.price.toNumber(), // TODO: Change later
      promotePrice: cartItem.price.toNumber(),
      image: typeof productIdToKeyMap.get(cartItem.productId) === 'string'
          ? (productIdToKeyMap.get(cartItem.productId) as string)
          : undefined,
      activeStatus: cartItem.status === 'ACTIVE',
    }
  })
};


export const addToCart = async (
    productId: number,
    skuId: number | undefined,
    quantity: number,
    userId: number
) => {
  const savedProduct = await pmsProductDao.findByIdWithBrandAndCategory(productId);
  if(!savedProduct) {
    throw new Error('Product not found');
  }
  const savedUser = await umsUserDao.findById(userId);
  if(!savedUser) {
    throw new Error('User not found');
  }
  let savedSku;
  if(skuId) {
    savedSku = await pmsSkuDao.findById(skuId, productId);
    if(!savedSku) {
      throw new Error('Sku not found');
    }
  }

  const cartItem: Prisma.OmsCartItemCreateInput = {
    productId: productId,
    categoryId: savedProduct.categoryId,
    brandId: savedProduct.brandId,
    skuId: skuId,
    userId: userId,
    username: savedUser.username,
    quantity: quantity,
    price: skuId ? (savedSku?.promotionPrice ?? savedSku?.price ?? 0) : (savedProduct.promotionPrice ?? savedProduct.price ?? 0),
    attribute: skuId ? savedSku?.attribute : '',
    productName: savedProduct.name,
    brandName: savedProduct.pmsBrand.name,
    productSn: savedProduct.serialNumber,
    productTitle: savedProduct.title,
    productSubTitle: savedProduct.subtitle ?? '',
    productSkuCode: skuId ? savedSku?.skuCode : '',
  };

  return await omsCartItemDao.save(cartItem);
}

export const updateCartQuantity = async (cartItemId: number, quantity: number) => {
  return await omsCartItemDao.updateQuantity(cartItemId, quantity);
}
