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

export default function ProductInfoForm({attributes, skus} : {attributes: ProductAttribute[], skus: ProductSku[]}) {
  const generateDefaultValues = () => {
    const defaultValues: Record<string, string> = {};
    return defaultValues;
  }
  const form = useForm({
    defaultValues: generateDefaultValues(),
  })
  const formAction = () => {};
  return (
      <>
        <Form {...form}>
          <form action={formAction}>
            {
              attributes.map((attribute) => (
                  <FormField
                      key={attribute.attributeId}
                      name={attribute.attributeName}
                      render={
                        ({field}) => (
                            <FormItem className="mb-2">
                              <FormLabel>{attribute.attributeName}</FormLabel>
                              <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex gap-2 flex-wrap"
                              >
                                {
                                  attribute.attributeValues.map((value,index) => (
                                      <FormLabel key={index} className="[&:has([data-state=checked])>div]:border-primary">
                                        <FormControl>
                                          <RadioGroupItem value={value} className="sr-only"/>
                                        </FormControl>
                                        <Button variant={"outline"}>
                                          {value}
                                        </Button>
                                      </FormLabel>
                                  ))
                                }

                              </RadioGroup>
                            </FormItem>
                        )
                      } />
              ))
            }
          </form>
        </Form>
        {/*<div className="flex items-end gap-2 justify-end">*/}
        {/*  <span className="font-extrabold text-[hsl(var(--destructive))] text-3xl">{productInfo.promotePrice}đ</span>*/}
        {/*  <span className="text-xl font-semibold text-gray-400 line-through">{productInfo.price}đ</span>*/}
        {/*</div>*/}
      </>
  );
}


