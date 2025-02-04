import {Card, CardContent, CardHeader} from "@/components/ui/card";
import AlbumCarousel from "@/components/album-carousel";
import {ProductInfo} from "@/libs/types/productType";
import {Heart, Star, StarHalf} from "lucide-react";
import ProductSpecificationTable from "@/components/product-specification-table";
import FacebookButton from "@/components/facebook-button";
import ProductInfoForm from "@/components/product-info-form";

export default function ProductPage() {
  const productSpecs = new Map<string, string>([
    ["Brand", "TechCorp"],
    ["Model", "X1000"],
    ["Color", "Midnight Black"],
    ["Screen Size", "15.6 inches"],
    ["Processor", "Intel Core i7"],
    ["RAM", "16GB"],
    ["Storage", "512GB SSD"],
    ["Battery Life", "Up to 10 hours"],
    ["Weight", "1.8 kg"],
  ]);

  const productInfo : ProductInfo = {
    productId: 1,
    title: "Product Title Product TitleProduct TitleProduct TitleProduct TitleProduct Title",
    subtitle: "Product Subtitle Product SubtitleProduct SubtitleProduct SubtitleProduct SubtitleProduct Subtitle",
    price: 100000,
    promotePrice: 80000,
    rate: 4.5,
    soldCnt: 100,
    image: "https://avatars.githubusercontent.com/u/124599?v=4",
    description: "Product Description",
    tags: ["tag1", "tag2"],
    favorite: true,
    commentCnt: 100,
    stock: 100,
    lowStock: 10,
    albums: [
      {
        albumId: 1,
        items: [
          {
            albumItemId: 1,
            image: "https://avatars.githubusercontent.com/u/124599?v=4",
          },
          {
            albumItemId: 2,
            image: "",
          }
        ]
      },
      {
        albumId: 2,
        items: [
          {
            albumItemId: 1,
            image: "",
          },
          {
            albumItemId: 2,
            image: "",
          },
          {
            albumItemId: 3,
            image: "",
          },
          {
            albumItemId: 4,
            image: "",
          },
          {
            albumItemId: 5,
            image: "",
          }
        ]
      },
      {
        albumId: 3,
        items: [
          {
            albumItemId: 1,
            image: "",
          },
          {
            albumItemId: 2,
            image: "",
          },
          {
            albumItemId: 3,
            image: "",
          },
          {
            albumItemId: 4,
            image: "",
          },
          {
            albumItemId: 5,
            image: "",
          }
        ]
      },{
        albumId: 4,
        items: [
          {
            albumItemId: 1,
            image: "",
          },
          {
            albumItemId: 2,
            image: "",
          },
          {
            albumItemId: 3,
            image: "",
          },
          {
            albumItemId: 4,
            image: "",
          },
          {
            albumItemId: 5,
            image: "",
          }
        ]
      },
      {
        albumId: 5,
        items: [
          {
            albumItemId: 1,
            image: "",
          },
          {
            albumItemId: 2,
            image: "",
          },
          {
            albumItemId: 3,
            image: "",
          },
          {
            albumItemId: 4,
            image: "",
          },
          {
            albumItemId: 5,
            image: "",
          }
        ]
      },
      {
        albumId: 6,
        items: [
          {
            albumItemId: 1,
            image: "",
          },
          {
            albumItemId: 2,
            image: "",
          },
          {
            albumItemId: 3,
            image: "",
          },
          {
            albumItemId: 4,
            image: "",
          },
          {
            albumItemId: 5,
            image: "",
          }
        ]
      },
    ],
    skus: [
    ],
    attributes: [{
      attributeId: 1,
      attributeName: "Color",
      attributeValues: ["Black", "White", "Red"]
    },{
      attributeId: 2,
      attributeName: "Size",
      attributeValues: ["S", "M", "L"]
    }]
  }

  const filledStars = productInfo.rate ? Math.floor(productInfo.rate) : 5;
  const halfStars = productInfo.rate ? (productInfo.rate - filledStars) : 0;
  return (
      <>
        {
          productInfo ? (
              <div className="grid grid-cols-3 gap-4 w-full">
                <Card className="min-h-[28rem] col-span-3">
                  <CardContent className="flex flex-row h-full p-0">
                    <div className="basis-3/5 py-4 px-12 flex justify-center">
                      <AlbumCarousel albums={productInfo.albums}/>
                    </div>
                    <div className="basis-2/5 pr-12 py-4 flex flex-col">
                      <p className="font-semibold text-xl mb-1">{productInfo.title}</p>
                      {
                        productInfo.subtitle &&
                          (
                              <p className="text-base">{productInfo.subtitle}</p>
                          )
                      }
                      {
                        productInfo.soldCnt &&
                          (
                              <p className="text-gray-500 text-sm italic mb-1">Sold {productInfo.soldCnt}</p>
                          )
                      }
                      <div className="flex items-center gap-2 mb-10 justify-end">
                        <div className="relative">
                          <div className="flex items-center">
                            {
                              Array.from({ length: 5 }, (_, index) => (
                                  <Star fill="none" key={index} size={20} strokeWidth={0.5} />
                              ))
                            }
                          </div>
                          <div className="flex items-center absolute top-0">
                            {
                              Array.from({length: filledStars}, (_, i) => (
                                  <Star key={i} size={20} strokeWidth={0.5} fill="#ffdf20"/>
                              ))
                            }
                            {
                              Array.from({length: halfStars}, (_, i) => (
                                  <StarHalf key={i} size={20} strokeWidth={0.5} fill="#ffdf20"/>
                              ))
                            }
                          </div>
                        </div>
                        <div className="text-xs hover:underline hover:underline-offset-2 cursor-pointer">({productInfo.commentCnt} reviews)</div>
                      </div>
                      {
                        (productInfo.attributes &&
                            productInfo.skus &&
                            productInfo.attributes.length > 0 &&
                            productInfo.skus.length > 0
                        ) ||
                          (productInfo.stock) &&
                          (
                              <ProductInfoForm
                                  promotePrice={productInfo.promotePrice}
                                  price={productInfo.price}
                                  attributes={productInfo.attributes}
                                  skus={productInfo.skus}
                                  stock={productInfo.stock ?? 0}
                              />
                          )
                      }
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="flex items-center gap-2">
                          <Heart size={24} strokeWidth={2} fill={productInfo.favorite ? "#EF4444" : "none"} className="cursor-pointer"/>
                          <span className="text-sm">Liked</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FacebookButton url={`${process.env.BASE_URL}/${productInfo.productId}`} description={productInfo.description ?? ""}/>
                          <span className="text-sm">Share facebook</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="col-span-2 flex flex-col gap-4">
                  {
                      productInfo.description &&
                      (
                          <Card >
                            <CardHeader>
                              <h1 className="text-2xl font-semibold">Product Description</h1>
                            </CardHeader>
                            <CardContent>
                              {productInfo.description}
                            </CardContent>
                          </Card>
                      )
                  }
                  <Card>
                    <CardHeader>
                      <h1 className="text-2xl font-semibold">Reviews</h1>
                    </CardHeader>
                  </Card>
                </div>
                <Card className="col-span-1 overflow-hidden">
                  <CardHeader>
                    <h1 className="text-2xl font-semibold">Product Specifications</h1>
                  </CardHeader>
                  <CardContent className="px-2">
                    <ProductSpecificationTable detail={productSpecs}/>
                  </CardContent>
                </Card>
              </div>
          ) : (<div/>)
        }
      </>
  )
}
