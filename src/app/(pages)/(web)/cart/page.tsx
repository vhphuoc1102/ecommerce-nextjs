"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { CartItem } from "@/libs/types/cart";
import {Checkbox} from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {Trash2} from "lucide-react";
import React, {useEffect, useState } from "react";
import CartItemModification from "@/components/cart-item-modification";
import {useSession} from "next-auth/react";
import {getCartItems, deleteCartItems, updateStatus} from "@/action/cart.action";

export default function CartPage(){
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    if (session && session.user && session.user._id) {
      getCartItems(session.user._id).then((items) => {
        setCartItems(items);
        setSelectedItems(
            items
                .filter(item => item.activeStatus)
                .map(item => item.cartItemId));
      });
    }
  }, [session]);

  const handleSelectAll = async () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(cartItems.map(item => item.cartItemId));
      await updateStatus(cartItems.map(item => item.cartItemId), true);
    } else {
      await updateStatus(selectedItems, false);
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = async (cartItemId: number) => {
    if (selectedItems.includes(cartItemId)) {
      setSelectedItems(selectedItems.filter(id => id !== cartItemId));
      await updateStatus([cartItemId], false);
    } else {
      setSelectedItems([...selectedItems, cartItemId]);
      await updateStatus([cartItemId], true);
    }
  };

  const deleteAll = async () => {
    await deleteCartItems(selectedItems);
    setSelectedItems([]);
  }

  const handleDeleteItem = (cartItemId: number) => {
    setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
  }

  return (
    <div className="flex justify-center w-full">
      <Card className="w-full">
        <CardHeader>
          <span className="font-semibold text-xl">Cart items</span>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2 items-center ml-4">
              <Checkbox id="selectAll" checked={selectAll} onCheckedChange={handleSelectAll}/>
              <label
                  htmlFor="selectAll"
                  className="text-sm font-medium leading-none">
                Select All
              </label>
            </div>
            <Button
                variant="outline" size="icon" className="mr-4"
                onClick={deleteAll}
            >
              <Trash2 />
            </Button>
          </div>
          <form className="flex flex-col gap-6">
            {
              cartItems &&
                cartItems.length > 0 &&
              cartItems.map(
                  (cartItem) => (
                      <Card key={cartItem.cartItemId}>
                        <CardContent className="p-4 flex items-center h-24">
                          <Checkbox
                            id={`${cartItem.cartItemId}`}
                            checked={selectedItems.includes(cartItem.cartItemId)}
                            onCheckedChange={() => handleCheckboxChange(cartItem.cartItemId)}
                          />
                          <div className="h-full flex items-start ">
                            <img
                                src={cartItem.image ? cartItem.image : "/fallback-image.jpg"}
                                alt={cartItem.name}
                                className="max-h-full ml-4 object-cover border"
                            />
                            <div className="flex flex-col ml-4">
                              <div className="flex gap-2 items-center">
                                <span className="font-semibold">{cartItem.title}</span>
                                <span>-</span>
                                <span className="text-sm">{cartItem.subtitle}</span>
                              </div>
                              <span className="text-xs">{cartItem.attribute}</span>
                              <div className="mt-auto">
                                <span className="text-xs">Price: </span>
                                <span className="font-semibold text-[hsl(var(--destructive))]">
                                  {cartItem.promotePrice}đ
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="ml-auto">
                            <CartItemModification
                                onDelete={() => handleDeleteItem(cartItem.cartItemId)}
                                cartItemId={cartItem.cartItemId}
                                quantity={cartItem.quantity}
                                stock={cartItem.stock}
                            />
                          </div>
                        </CardContent>
                      </Card>
                  )
              )
            }
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
