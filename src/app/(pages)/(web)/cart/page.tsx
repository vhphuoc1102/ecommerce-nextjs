"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { CartItem } from "@/libs/types/productType";
import {Checkbox} from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {Trash2} from "lucide-react";
import React, { useState } from "react";
import CartItemModification from "@/components/cart-item-modification";

export default function CartPage(){
  const cartItems: CartItem[] = [
    {
      cartItemId: 1,
      productId: 101,
      skuId: 1001,
      quantity: 2,
      skuCode: "SKU001",
      attribute: "Color: Red, Size: M",
      name: "Red T-Shirt",
      title: "Stylish Red T-Shirt",
      subtitle: "Comfortable and trendy",
      image: "",
      price: 200,
      promotePrice: 150,
      activeStatus: true,
      stock: 100
    },
    {
      cartItemId: 2,
      productId: 102,
      skuId: 1002,
      quantity: 1,
      skuCode: "SKU002",
      attribute: "Color: Blue, Size: L",
      name: "Blue Jeans",
      title: "Classic Blue Jeans",
      subtitle: "Durable and stylish",
      image: "",
      price: 500,
      promotePrice: 450,
      activeStatus: true,
      stock: 100
    },
    {
      cartItemId: 3,
      productId: 103,
      skuId: 1003,
      quantity: 3,
      skuCode: "SKU003",
      attribute: "Color: Black, Size: S",
      name: "Black Jacket",
      title: "Elegant Black Jacket",
      subtitle: "Warm and fashionable",
      image: "",
      price: 1000,
      promotePrice: 900,
      activeStatus: true,
      stock: 100
    },
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(cartItems.map(item => item.cartItemId));
    } else {
      setSelectedItems([]);
    }
  };

  const handleCheckboxChange = (cartItemId: number) => {
    if (selectedItems.includes(cartItemId)) {
      setSelectedItems(selectedItems.filter(id => id !== cartItemId));
    } else {
      setSelectedItems([...selectedItems, cartItemId]);
    }
  };

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
            <Button variant="outline" size="icon" className="mr-4">
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
