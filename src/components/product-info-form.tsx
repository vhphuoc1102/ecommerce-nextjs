"use client"

import { useEffect, useMemo, useState } from "react";
import { ProductAttribute, ProductSku } from "@/libs/types/productType";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import _ from "lodash";
import { cn } from "@/libs/utils";
import { Input } from "@/components/ui/input";
import { ShoppingCartIcon } from "lucide-react";

export default function ProductInfoForm({
  promotePrice,
  price,
  attributes,
  skus,
  stock,
}: {
  promotePrice: number | undefined;
  price: number | undefined;
  attributes?: ProductAttribute[];
  skus?: ProductSku[];
  stock?: number;
}) {
  const [skuStock, setSkuStock] = useState(0);
  const [skuPrice, setSkuPrice] = useState<number | undefined>(undefined);
  const [skuAttribute, setSkuAttribute] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(0);

  let isDisableAll = false;
  const defaultSku = useMemo(
    () => skus?.filter((sku) => sku.stock && sku.stock > 0)[0],
    [skus]
  );
  const defaultValues = defaultSku?.attribute;
  if (!defaultValues) {
    isDisableAll = true;
  }

  useEffect(() => {
    if (defaultValues) {
      setSkuAttribute(defaultValues);
      setSkuStock(defaultSku.stock || 0);
      setSkuPrice(defaultSku.promotePrice || defaultSku.price);
    }
  }, [defaultSku?.price, defaultSku?.promotePrice, defaultSku?.stock, defaultValues]);

  const handleValueChange = (attributeName: string, value: string) => {
    setSkuAttribute((prevState) => {
      const newSkuAttribute = {
        ...prevState,
        [attributeName]: value,
      };
      const sku = skus?.find((sku) => _.isEqual(sku.attribute, newSkuAttribute));
      if (sku) {
        setSkuStock(sku.stock);
        setSkuPrice(sku.promotePrice || sku.price);
      } else {
        setSkuStock(0);
        setSkuPrice(undefined);
      }
      return newSkuAttribute;
    });
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="mb-8">
      <form>
        {attributes &&
          attributes.length > 0 &&
          skus &&
          skus.length > 0 &&
          attributes.map((attribute) => (
            <div key={attribute.attributeId} className="flex flex-col mb-5">
              <p className="font-semibold text-sm">{attribute.attributeName}</p>
              <RadioGroup
                name={attribute.attributeName}
                onValueChange={(value) => handleValueChange(attribute.attributeName, value)}
                className="flex gap-2 flex-wrap"
                value={skuAttribute[attribute.attributeName]}
              >
                {attribute.attributeValues.map((value, index) => (
                  <div key={index} className="flex items-center">
                    <RadioGroupItem
                      value={value}
                      id={`${attribute.attributeId}-${index}`}
                      className="sr-only peer"
                    />
                    <Button
                      asChild
                      variant={"outline"}
                      className={cn(
                        "peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer",
                        "peer-data-[state=checked]:border-primary",
                        "transition-colors",
                        isDisableAll ? "cursor-not-allowed" : ""
                      )}
                      disabled={isDisableAll}
                    >
                      <label htmlFor={`${attribute.attributeId}-${index}`}>{value}</label>
                    </Button>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        <div className="mb-3 flex items-end gap-4">
          <div className="w-fit">
            <label htmlFor="quantity" className="font-semibold text-sm">
              Quantity
            </label>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              className="max-w-24"
              defaultValue={0}
              min={0}
              max={skuStock ? skuStock : stock}
              onChange={handleQuantityChange}
            />
          </div>
          <p className="mb-1">{skuStock ? skuStock : stock} left</p>
        </div>
        <div className="mb-5">
          <div className="flex items-end gap-2 justify-end">
            {skuPrice ? (
              <>
                <span className="font-extrabold">Price:</span>
                <span className="font-extrabold text-[hsl(var(--destructive))] text-3xl">
                  {skuPrice}đ
                </span>
              </>
            ) : !attributes || attributes.length === 0 || !skus || skus.length === 0 ? (
              <div className="flex items-end gap-2 justify-end">
                <span className="font-extrabold text-[hsl(var(--destructive))] text-3xl">
                  {promotePrice}đ
                </span>
                <span className="text-xl font-semibold text-gray-400 line-through">
                  {price}đ
                </span>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"default"}
            className={cn(
              "size-12 grow",
              (!stock || stock === 0) && (skuStock === 0 || isDisableAll) ? "cursor-not-allowed" : ""
            )}
            disabled={
              ((!stock || stock === 0) && (skuStock === 0 || isDisableAll)) || quantity === 0
            }
          >
            Buy now
          </Button>
          <Button
            variant={"outline"}
            className={cn(
              "size-12 flex-none min-w-[8rem] text-xs border-primary border-2 text-primary font-semibold hover:text-primary",
              (!stock || stock === 0) && (skuStock === 0 || isDisableAll) ? "cursor-not-allowed" : ""
            )}
            disabled={
              ((!stock || stock === 0) && (skuStock === 0 || isDisableAll)) || quantity === 0
            }
          >
            <ShoppingCartIcon size={16} strokeWidth={2} className={"mr-1"} />
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
}
