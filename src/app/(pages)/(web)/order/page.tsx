"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaymentInformation from "@/app/(pages)/(web)/order/components/payment-information";
import { getActiveCartItems } from "@/action/cart.action";
import { getProvinces, getDistricts, getWards } from "@/action/ghn.action";
import { CartItem } from "@/libs/types/cart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

interface Province {
  provinceId: string;
  provinceName: string;
}

interface District {
  districtId: string;
  districtName: string;
}

interface Ward {
  wardCode: string;
  wardName: string;
}

export default function OrderPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingFee] = useState(0);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(undefined);
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
  const [selectedWard, setSelectedWard] = useState<string | undefined>(undefined);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user && session.user._id) {
      getActiveCartItems(session.user._id).then((items) => {
        setCartItems(items);
      });
    }
  }, [session]);

  useEffect(() => {
    getProvinces().then((data) => {
      setProvinces(data);
    });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      getDistricts(selectedProvince).then((data) => {
        setDistricts(data);
        setWards([]);
      });
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      getWards(selectedDistrict).then((data) => {
        setWards(data);
      });
    }
  }, [selectedDistrict]);

  const value = cartItems && cartItems.length > 0
      ? cartItems.reduce((acc, item) => acc + item.promotePrice * item.quantity, 0)
      : 0;

  return (
      <form className="grid grid-cols-5 gap-6 w-full">
        <div className="col-span-3 flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader className="flex justify-between items-center flex-row">
              <span className="font-bold text-2xl">Order information</span>
            </CardHeader>
            <CardContent className="w-full grid grid-cols-12 gap-6">
              <div className="flex gap-2 items-center col-span-6">
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" name="name" className="ml-4" />
              </div>
              <div className="flex gap-2 items-center col-span-6">
                <Label htmlFor="phone">Phone:</Label>
                <Input type="tel" id="phone" name="phone" />
              </div>
              <div className="flex gap-2 items-center col-span-12">
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" className="ml-4" name="email" />
              </div>
              <div className="flex gap-2 items-center col-span-12">
                <Label htmlFor="address">Address:</Label>
                <Input type="text" id="address" name="address" />
              </div>
              <div className="flex gap-2 items-center col-span-3 col-start-2 ml-2">
                <Select
                    name="province"
                    onValueChange={(value) => setSelectedProvince(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {provinces.map((province) => (
                          <SelectItem key={province.provinceId} value={`${province.provinceId}`}>
                            {province.provinceName}
                          </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-center col-span-3 col-start-5">
                <Select
                    name="district"
                    onValueChange={(value) => setSelectedDistrict(value)}
                    disabled={!selectedProvince}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {districts.map((district) => (
                          <SelectItem key={district.districtId} value={`${district.districtId}`}>
                            {district.districtName}
                          </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-center col-span-3 col-start-8">
                <Select
                    name="ward"
                    disabled={!selectedDistrict}
                    onValueChange={(value) => setSelectedWard(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ward" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {wards.map((ward) => (
                          <SelectItem key={ward.wardCode} value={`${ward.wardCode}`}>
                            {ward.wardName}
                          </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 items-start col-span-12">
                <Label htmlFor="note" className="mt-2">Note:</Label>
                <Textarea
                    placeholder="Type your note here."
                    className="w-full ml-4"
                    name="note"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <span className="font-bold text-2xl">Payment information</span>
            </CardHeader>
            <CardContent className="w-full">
              <PaymentInformation />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <span className="font-bold text-2xl">Cart items</span>
            </CardHeader>
            <CardContent>
              {cartItems && cartItems.length > 0 && (
                  <ScrollArea className="w-full rounded-md border p-4 h-[21rem]">
                    {cartItems.map((cartItem) => (
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
                    ))}
                  </ScrollArea>
              )}
              <div className="flex justify-between mt-4">
                <span>Value: </span>
                <span>{value}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping fee: </span>
                <span>{shippingFee}</span>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between">
                <span>Total: </span>
                <span>{value + shippingFee}</span>
              </div>
              <div className="flex gap-4 my-4">
                <Button className="w-full text-lg">Order</Button>
                <Button className="w-full text-lg" variant={"destructive"}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
  );
}
