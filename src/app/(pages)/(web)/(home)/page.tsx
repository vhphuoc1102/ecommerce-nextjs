import CategoryPanel from "@/components/category-panel";
import ProductCard from "@/components/product-card";
import {SessionProvider} from "next-auth/react";
import {getHomeProducts} from "@/action/product.action";
import {ProductCardInfo} from "@/libs/types/product";
import {CategoryItem} from "@/libs/types/category";
import { getCategoryTree } from "@/action/category.action";

export default async function HomePage() {
  const productInfos: ProductCardInfo[] = await getHomeProducts();
  const categories: CategoryItem[] = await getCategoryTree();
  return (
      <div className="w-full flex flex-col gap-3">
        <div className="flex gap-3">
          <CategoryPanel categories={categories}/>
          <div className="grow z-0 grid grid-cols-4 grid-rows-3 grid-flow-col w-full gap-4">
            <div className="col-span-3 row-span-3 cursor-pointer">
              <img alt="image" src={"/big-picture.png"} className="w-full h-96"/>
            </div>
            <div className="col-span-1 row-span-1 cursor-pointer">
              <img alt="image" src={"/big-picture.png"} className="h-full w-full"/>
            </div>
            <div className="col-span-1 row-span-1 cursor-pointer">
              <img alt="image" src={"/big-picture.png"} className="h-full w-full"/>
            </div>
            <div className="col-span-1 row-span-1 cursor-pointer">
              <img alt="image" src={"/big-picture.png"} className="h-full w-full"/>
            </div>
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
