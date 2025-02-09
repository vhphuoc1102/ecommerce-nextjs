import {CreateProductRequest, ProductListRequest, UpdateProductRequest} from "@/action/payload/product.payload";
import {Prisma, AttributeType, InputType} from "@prisma/client";
import * as pmsProductDao from "@/action/dao/pms/product.dao"
import * as pmsProductAttributeValueDao from "@/action/dao/pms/attributeValue.dao"
import { runTransaction } from "@/action/dao";
import {getPresignedURL} from "@/libs/s3";
import * as fmsFileDao from "@/action/dao/fms/file.dao";
import {FileKind} from "@prisma/client";
import * as pmsSkuDao from "@/action/dao/pms/sku.dao";
import {ProductCardInfo, ProductSku} from "@/libs/types/product";

export const create = async (request: CreateProductRequest) => {
  const { attributeValues, ...productData } = request;
  const product: Prisma.PmsProductCreateInput = {
    ...productData,
    price: request.price ? new Prisma.Decimal(request.price) : undefined,
    promotionPrice: request.promotionPrice ? new Prisma.Decimal(request.promotionPrice) : undefined,
    originalPrice: request.originalPrice ? new Prisma.Decimal(request.originalPrice) : undefined,
    pmsBrand: {
      connect: {
        brandId: request.brandId
      }
    },
    pmsCategory: {
      connect: {
        categoryId: request.categoryId
      }
    },
    pmsAttributeGroup: {
      connect: {
        attributeGroupId: request.attributeGroupId
      }
    },
    pmsAttributeValue: {
      createMany: {
        data: attributeValues ?? []
      }
    },
    pmsSkus: {
      createMany: {
        data: request.skus ? request.skus.map(sku => {
          return {
            ...sku,
            attribute: JSON.stringify(sku.attribute)
          }
        }): []
      }
    }
  };
  await pmsProductDao.save(product);
}

export const update = async (request: UpdateProductRequest) => {
  const { productId, attributeValues, skus, ...productData } = request;

  const product: Prisma.PmsProductUpdateInput = {
    ...productData,
    pmsBrand: { connect: { brandId: request.brandId } },
    pmsCategory: { connect: { categoryId: request.categoryId } },
    pmsAttributeGroup: { connect: { attributeGroupId: request.attributeGroupId } },
    pmsAttributeValue: { createMany: { data: attributeValues ?? [] } },
    pmsSkus: {
      createMany: {
        data: skus ? skus.map(sku => {
          return {
            ...sku,
            attribute: JSON.stringify(sku.attribute)
          }
        }): []
      }
    }
  };

  const attributeIds = attributeValues?.map(value => value.attributeId) ?? [];
  const skuIds = skus?.map(sku => sku.skuId) ?? [];

  const deleteSkus = pmsSkuDao.deleteByIdIn(skuIds);
  const deleteAttributeValues = pmsProductAttributeValueDao.deleteByProductIdAndAttributeIdIn(productId, attributeIds);
  const updateProducts = pmsProductDao.update(productId, product);

  await runTransaction(
      [
        deleteSkus,
        deleteAttributeValues,
        updateProducts
      ]
  );
}

export const remove = async (productId: number) => {
  await pmsProductDao.remove(productId);
}

export const getProductDetail = async (productId: number) => {
  const productList = await getProductInfos([productId]);
  const product = productList && productList.length > 0 ? productList[0] : null;
  if (!product) {
    return null;
  }
  const [
    specification,
    attributes,
    skus,
    albums
  ] = await Promise.all(
      [
        getProductSpec(productId),
        getProductAttributeParams(productId),
        getProductSkus(productId),
        getProductAlbums(productId)
      ]);

  return {
    ...product,
    specification,
    attributes,
    skus,
    albums
  }
}

export const getProductInfos = async (productIds: number[]): Promise<ProductCardInfo[]> => {
  const pmsProducts = await pmsProductDao.findProductInfos(productIds);
  const fmsFiles = await fmsFileDao.findByFileKindAndResourceIdIn(FileKind.PRODUCT_PIC, productIds);
  const productIdToKeyMap = new Map<number, string | null>(
      await Promise.all(
          fmsFiles.map(fmsFile =>
              getPresignedURL(fmsFile.objectKey).then(url => [fmsFile.resourceId, url] as [number, string | null])
          )
      )
  );
  return pmsProducts.map(product => {
    return {
      ...product,
      tags: product.tag ? product.tag.split(',') : [],
      image: typeof productIdToKeyMap.get(product.productId) === 'string'
          ? (productIdToKeyMap.get(product.productId) as string)
          : undefined,
      commentCnt: product.pmsComments.length ?? 0,
      price: product.price.toNumber(),
      promotePrice: product.promotionPrice.toNumber(),
      promotionPrice: product.promotionPrice.toNumber(),
      originalPrice: product.originalPrice.toNumber(),
      weight: product.originalPrice.toNumber(),
      subtitle: product.subtitle ?? undefined
    }
  })
}

export const getList = async (request: ProductListRequest) => {
  return [];
}

const getProductSpec = async (productId: number) => {
  const fmsFiles = await fmsFileDao.findByFileKindAndResourceIdIn(FileKind.PRODUCT_DOC, [productId]);
  const specificationDetails = new Map(
      (await pmsProductAttributeValueDao.getSpecifications(productId))
          .map(
              spec => [spec.pmsAttribute.name, spec.value]
          )
  );
  return {
    detail: specificationDetails,
    documents: fmsFiles.map(fmsFile => fmsFile.objectKey)
  }
}

const getProductAttributeParams = async (productId: number)=> {
  const pmsProduct = await pmsProductDao.findByIdWithAttributeGroup(productId, AttributeType.SPECIFICATION);
  if(!pmsProduct) {
    return [];
  }

  return pmsProduct.pmsAttributeGroup.pmsAttributes.map(pmsAttribute => {
    let attributeValues: string[] = [];
    const pmsAttributeValues = pmsAttribute.pmsAttributeValues;
    if(pmsAttribute.inputType === InputType.LIST) {
      attributeValues = pmsAttribute.inputList && pmsAttribute.inputList.length > 0 ?
          pmsAttribute.inputList.split(',') : [];
    } else {
      attributeValues = pmsAttributeValues && pmsAttributeValues.length > 0 ?
          pmsAttributeValues.map(attributeValue => attributeValue.value) : [];
    }

    return {
      attributeId: pmsAttribute.attributeId,
      attributeName: pmsAttribute.name,
      attributeValues: attributeValues
    }
  })
}

const getProductSkus = async (productId: number) : Promise<ProductSku[]> => {
  const pmsProduct = await pmsProductDao.findByIdWithSku(productId);
  if (!pmsProduct) {
    return [];
  }
  return pmsProduct.pmsSkus.map(sku => {
    return {
      ...sku,
      attribute: JSON.parse(sku.attribute),
      price: sku.price.toNumber(),
      originalPrice: sku.originalPrice.toNumber(),
      promotePrice: sku.promotionPrice ? sku.promotionPrice.toNumber() : undefined,
    }
  });
}

const getProductAlbums = async (productId: number) => {
  const pmsProduct = await pmsProductDao.findByIdWithAlbum(productId);

  if(!pmsProduct) {
    return [];
  }

  const pmsAlbums = pmsProduct.pmsAlbums;
  const albums = [];
  for(const album of pmsAlbums) {
    const pmsAlbumItemIds = album.pmsAlbumItems.map(albumItem => albumItem.albumItemId);
    const pmsAlbumItems = album.pmsAlbumItems.map(albumItem => {
      return {
        albumItemId: albumItem.albumItemId,
        name: albumItem.name
      }
    });
    const fmsFiles = await fmsFileDao.findByFileKindAndResourceIdIn(FileKind.ALBUM_ITEM, pmsAlbumItemIds);
    const resourceIdToKeyMap = new Map<number, string | null>(
        await Promise.all(
            fmsFiles.map(fmsFile =>
                getPresignedURL(fmsFile.objectKey).then(url => [fmsFile.resourceId, url] as [number, string | null])
            )
        )
    );
    const items = pmsAlbumItems.map(pmsAlbumItem => {
      return {
        ...pmsAlbumItem,
        image: typeof resourceIdToKeyMap.get(pmsAlbumItem.albumItemId) === 'string'
            ? (resourceIdToKeyMap.get(pmsAlbumItem.albumItemId) as string)
            : undefined
      }
    })
    albums.push({
      albumId: album.albumId,
      items: items
    })
  }
  return albums;
}

export const getHomeProductsDraft = async () => { //TODO: Change later
  const products = await pmsProductDao.findAllIds();
  return getProductInfos(products.map(product => product.productId));
}
