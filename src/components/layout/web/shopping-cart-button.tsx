import {ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {userAuth} from "@/libs/auth";
import {getCartItems} from "@/action/cart.action";

export default async function ShoppingCartButton() {
  const session = await userAuth.auth();
  let cartItemCnt = 0;
  if(session && session.user && session.user._id) {
    cartItemCnt = (await getCartItems(session.user._id)).length;
  }
  return (
      <Link href="/cart" className="relative">
        <Button className="rounded-full w-12 h-12" variant="outline" size="icon">
          <ShoppingCart/>
          {cartItemCnt > 0 && (
              <div className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemCnt}
              </div>
          )}
        </Button>
      </Link>
  );
}
