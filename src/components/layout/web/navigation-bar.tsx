import {GalleryVerticalEnd, UserRound} from "lucide-react";
import Link from "next/link";
import SearchInput from "@/components/layout/web/search-input";
import {Button} from "@/components/ui/button";
import ShoppingCartButton from "@/components/layout/web/shopping-cart-button";
import {Bars3Icon} from "@heroicons/react/24/outline";
import {userAuth} from "@/libs/auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default async function NavigationBar() {
  const session = await userAuth.auth();
  return (
      <div className="max-w-full flex justify-center">
        <div className="flex h-16 items-center justify-between w-[76rem]">
          <div className="flex gap-24">
            <Link href="/" className="flex items-center gap-2 font-medium">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-5" />
              </div>
              E-Market
            </Link>
            <div className="flex items-center gap-2 font-medium cursor-pointer">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Bars3Icon className="size-6" />
              </div>
            </div>
          </div>
          <SearchInput/>
          <div className="flex items-center gap-6">
            <ShoppingCartButton/>
            {
              session ? (
                  <Link href="/profile">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
              ) : (
                  <Link href="/login">
                    <Button className="rounded-full w-12 h-12" variant="outline" size="icon">
                      <UserRound/>
                    </Button>
                  </Link>
              )
            }
          </div>
        </div>
      </div>
  );
}
