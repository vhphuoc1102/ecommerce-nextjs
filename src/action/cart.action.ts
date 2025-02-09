"use server"
import * as cartService from '@/action/service/cart.service'
import {revalidatePath} from "next/cache";
import {updateCartQuantity} from "@/action/service/cart.service";

export const add = async (
    productId: number,
    skuId: number | undefined,
    quantity: number,
    userId: number
) => {
  await cartService.addToCart(productId, skuId, quantity, userId)
  revalidatePath('/(pages)/(web)', 'layout')
}

export const getCartItems = async (userId: number) => {
  return await cartService.getCartItems(userId)
}

export const deleteCartItems = async (cartItemId: number[]) => {
  if(cartItemId.length === 0) {
    return
  }
  await cartService.deleteCartItems(cartItemId)
  revalidatePath('/(pages)/(web)', 'layout')
}

export const updateQuantity = async (cartItemId: number, quantity: number) => {
  await cartService.updateCartQuantity(cartItemId, quantity)
  revalidatePath('/(pages)/(web)', 'layout')
}

export const updateStatus = async (cartItemIds: number[], status: boolean) => {
  if(cartItemIds.length === 0) {
    return
  }
  await cartService.updateStatus(cartItemIds, status)
}

export const getActiveCartItems = async (userId: number) => {
  const cartItems = await cartService.getCartItems(userId)
  return cartItems.filter(cartItem => cartItem.activeStatus)
}
