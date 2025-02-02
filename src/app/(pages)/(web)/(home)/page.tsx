import CategoryPanel from "@/components/category-panel";
import {ProductCardInfo} from "@/libs/types/productType";
import ProductCard from "@/components/product-card";
import {SessionProvider} from "next-auth/react";

export default function HomePage() {
  const productInfos: ProductCardInfo[] = [
    {
      userId: 1,
      productId: 1,
      image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png",
      title: "Xiaomi Redmi Note 14 6GB 128GB",
      subtitle: "Xiaomi Redmi Note 14 6GB 128GB",
      promotePrice: 1000000,
      price: 1000000,
      rate: 5,
      tags: ["-50%", "Free ship"],
      soldCnt: 1,
      commentCnt: 100,
      favorite: false
    },
    {
      userId: 1,
      productId: 1,
      image: "https://cdn.tgdd.vn/Products/Images/42/321058/samsung-galaxy-s23-fe-tim-thumbnew-600x600.jpg",
      title: "Xiaomi Redmi Note 14 6GB 128GB",
      subtitle: "Xiaomi Redmi Note 14 6GB 128GB",
      promotePrice: 1000000,
      price: 1000000,
      rate: 5,
      tags: ["-50%", "Free ship"],
      soldCnt: 1,
      commentCnt: 100,
      favorite: false
    },
    {
      userId: 1,
      productId: 1,
      image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png",
      title: "Xiaomi Redmi Note 14 6GB 128GB",
      subtitle: "Xiaomi Redmi Note 14 6GB 128GB",
      promotePrice: 1000000,
      price: 1000000,
      rate: 5,
      tags: ["-50%", "Free ship"],
      soldCnt: 1,
      commentCnt: 100,
      favorite: false
    },
    {
      userId: 1,
      productId: 1,
      image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png",
      title: "Xiaomi Redmi Note 14 6GB 128GB",
      subtitle: "Xiaomi Redmi Note 14 6GB 128GB",
      promotePrice: 1000000,
      price: 1000000,
      rate: 5,
      tags: ["-50%", "Free ship"],
      soldCnt: 1,
      commentCnt: 100,
      favorite: false
    },
    {
      userId: 1,
      productId: 1,
      image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png",
      title: "Xiaomi Redmi Note 14 6GB 128GB",
      subtitle: "Xiaomi Redmi Note 14 6GB 128GB",
      promotePrice: 1000000,
      price: 1000000,
      rate: 5,
      tags: ["-50%", "Free ship"],
      soldCnt: 1,
      commentCnt: 100,
      favorite: false
    },
    {
      userId: 1,
      productId: 1,
      image: "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png",
      title: "Xiaomi Redmi Note 14 6GB 128GB",
      subtitle: "Xiaomi Redmi Note 14 6GB 128GB",
      promotePrice: 1000000,
      price: 1000000,
      rate: 4.5,
      tags: ["-50%", "Free ship"],
      soldCnt: 1,
      commentCnt: 100,
      favorite: false
    }
  ];
  return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex gap-3">
          <CategoryPanel />
          <div className="grow z-0">
            TEST
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          <SessionProvider>
            {
              productInfos &&
              productInfos.length > 0 &&
                productInfos.map((productInfo, index) => (
                    <ProductCard key={index} {...productInfo}/>
                ))
            }
          </SessionProvider>
        </div>
      </div>
  );
}
