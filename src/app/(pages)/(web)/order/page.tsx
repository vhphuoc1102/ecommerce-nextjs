import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import PaymentInformation from "@/app/(pages)/(web)/order/components/payment-information";
import React from "react";
import {getActiveCartItems} from "@/action/cart.action";
import {userAuth} from "@/libs/auth";
import {redirect} from "next/navigation";
import {CartItem} from "@/libs/types/cart";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function OrderPage() {
  const session = await userAuth.auth();
  if(!session) {
    redirect("/login");
  }
  let cartItems: CartItem[] = [];
  if(session && session.user && session.user._id) {
    cartItems = await getActiveCartItems(session.user._id);
  }

  return (
    <form className="grid grid-cols-5 gap-6 w-full">
      <div className="col-span-3">
        <Card className="w-full">
          <CardHeader>
            <span className="font-bold text-2xl">Order information</span>
          </CardHeader>
          <CardContent className="w-full grid grid-cols-12 gap-6">
            <div className="flex gap-2 items-center col-span-6">
              <Label htmlFor="name">Name:</Label>
              <Input type="text" id="name" className="ml-4"/>
            </div>
            <div className="flex gap-2 items-center col-span-6">
              <Label htmlFor="phone">Phone:</Label>
              <Input type="tel" id="phone"/>
            </div>
            <div className="flex gap-2 items-center col-span-12">
              <Label htmlFor="email">Email:</Label>
              <Input type="email" id="email" className="ml-4"/>
            </div>
            <div className="flex gap-2 items-center col-span-12">
              <Label htmlFor="address">Address:</Label>
              <Input type="text" id="address"/>
            </div>
            <div className="flex gap-2 items-center col-span-3 col-start-2 ml-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"1"}>Hanoi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center col-span-3 col-start-5">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"1"}>Hanoi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 items-center col-span-3 col-start-8">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ward" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"1"}>Hanoi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <span className="font-bold text-2xl">Cart items</span>
          </CardHeader>
          <CardContent>
            {
                cartItems &&
                cartItems.length > 0 &&
                (
                    <ScrollArea className="w-full rounded-md border"  >
                      {
                        cartItems.map((cartItem) => (
                            <Card key={cartItem.cartItemId}>
                              <CardContent className="p-4 flex items-center h-24">
                                <div className="h-full flex items-start justify-between w-full">
                                  <div className="h-full flex items-start">
                                    <img
                                        src={cartItem.image ? cartItem.image : "/fallback-image.jpg"}
                                        alt={cartItem.name}
                                        className="max-h-full ml-4 object-cover border"
                                    />
                                    <div className="flex flex-col ml-4">
                                      <span className="font-semibold">{cartItem.title}</span>
                                      <span className="text-xs">{cartItem.attribute}</span>
                                      <div className="mt-auto">
                                        <span className="text-xs">Price: </span>
                                        <span className="font-semibold text-[hsl(var(--destructive))]">
                                  {cartItem.promotePrice}đ
                                </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-auto">
                                    <span className="text-sm">Quantity: {cartItem.quantity}</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                        ))
                      }
                    </ScrollArea>
                )
            }
          </CardContent>
        </Card>
      </div>
      <div className="col-span-3">
        <Card className="w-full">
          <CardHeader>
            <span className="font-bold text-2xl">Payment information</span>
          </CardHeader>
          <CardContent className="w-full">
            <PaymentInformation/>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}
