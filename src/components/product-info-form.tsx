"use client"

import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z, ZodRecord} from "zod";
import {ProductInfoSchema} from "@/libs/zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ProductAttribute, ProductSku} from "@/libs/types/productType";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import _ from 'lodash'
import {cn} from "@/libs/utils";

export default function ProductInfoForm({attributes, skus} : {attributes: ProductAttribute[], skus: ProductSku[]}) {
  let isDisableAll = false;
  let isDisableSubmit = false;
  const defaultValues = skus.filter(sku => sku.stock && sku.stock > 0)[0];
  if (!defaultValues) {
      isDisableAll = true;
  }
  const handleValueChange = (attributeId, value) => {

  }
  const formAction = (formData: FormData) => {};
  return (
      <div>
          <form action={formAction}>
            {
              attributes.map((attribute) => (
                  <div key={attribute.attributeId}>
                    <h3>{attribute.attributeName}</h3>
                    <RadioGroup
                        name={attribute.attributeName}
                        onValueChange={(value) => handleValueChange(attribute.attributeId, value)}
                        className="flex gap-2 flex-wrap">
                      {
                          attribute.attributeValues.map((value,index) => (
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
                                          "peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground",
                                          "peer-data-[state=checked]:border-primary",
                                          "transition-colors",
                                      )}
                                  >
                                      <label htmlFor={`${attribute.attributeId}-${index}`}>{value}</label>
                                  </Button>
                              </div>
                          ))
                      }
                    </RadioGroup>
                  </div>
              ))
            }
          </form>
      </div>
  );
}


