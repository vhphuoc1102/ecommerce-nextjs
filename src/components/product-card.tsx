"use client"
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Heart, Star, StarHalf} from "lucide-react";
import {ProductCardInfo} from "@/libs/types/productType";
import {useRouter} from "next/navigation";
import { useSession } from "next-auth/react"

export default function ProductCard(info: ProductCardInfo) {
  const { data: session } = useSession();

  const router = useRouter()

  const getRate = () => {
    const rate = info.rate;
    return rate ? rate : 5;
  }
  const calculateFilledStar = () => {
    return Math.floor(getRate());
  }

  const calculateHalfStar = () => {
    return Math.ceil(getRate()) - Math.floor(getRate());
  }

  const onClickHeart = () => {
    if (!session) {
      router.push("/login");
    }
  }

  return (
    <Card className="cursor-pointer group">
      <CardContent className="flex flex-col p-0 h-[25rem]" onClick={() => router.push(`/${info.productId}`)}>
        <div className="h-[16rem] py-4 px-2 flex items-center">
          <img src={info.image} alt="product" className="w-full object-cover max-h-[16rem] transition-transform duration-300 ease-in-out transform hover:-translate-y-2"/>
        </div>
        <div className="flex flex-col px-2 pt-2">
          <p className="mb-1 text-base group-hover:text-primary font-semibold">{info.title}</p>
          <p className="text-gray-500 text-xs italic mb-1">Sold {info.soldCnt}</p>
          <span className="font-extrabold text-[hsl(var(--destructive))] text-xl">{info.promotePrice}đ</span>
          <span className="text-sm text-gray-500 line-through">{info.price}đ</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center px-2 pb-2">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
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
                  Array.from({length: calculateFilledStar()}, (_, i) => (
                      <Star key={i} size={20} strokeWidth={0.5} fill="#ffdf20"/>
                  ))
                }
                {
                  Array.from({length: calculateHalfStar()}, (_, i) => (
                      <StarHalf key={i} size={20} strokeWidth={0.5} fill="#ffdf20"/>
                  ))
                }
              </div>
            </div>
            <div className="text-xs hover:underline hover:underline-offset-2 cursor-pointer">({info.commentCnt} reviews)</div>
          </div>
          <Heart size={20} strokeWidth={1.5} fill={info.favorite ? "#7f1d1d" : "none"} className="cursor-pointer" onClick={onClickHeart}/>
        </div>
      </CardFooter>
    </Card>
  )
}
