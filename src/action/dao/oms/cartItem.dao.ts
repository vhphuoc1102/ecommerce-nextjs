"use server"
import {prisma} from "@/libs/prisma";
import {Prisma} from "@prisma/client";

export const save = async (cartItem: Prisma.OmsCartItemCreateInput) => {
  return prisma.omsCartItem.create({
    data: cartItem
  })
}

export const updateQuantity = async (cartItemId: number, quantity: number) => {
  if(quantity <= 0) {
    return prisma.omsCartItem.delete({
      where: {
        cartItemId: cartItemId
      }
    })
  }

  return prisma.omsCartItem.update({
    where: {
      cartItemId: cartItemId
    },
    data: {
      quantity: quantity
    }
  })
}

export const deleteById = async (cartItemId: number) => {
  return prisma.omsCartItem.delete({
    where: {
      cartItemId: cartItemId
    }
  })
}

export const deleteByIdIn = async (cartItemIds: number[]) => {
  return prisma.omsCartItem.deleteMany({
    where: {
      cartItemId: {
        in: cartItemIds
      }
    }
  })
}

export const findByUserId = async (userId: number) => {
  return prisma.omsCartItem.findMany({
    where: {
      userId: userId
    }
  })
}

export async function updateStatus(cartItemIds: number[], status: boolean) {
  return prisma.omsCartItem.updateMany({
    where: {
      cartItemId: {
        in: cartItemIds
      }
    },
    data: {
      status: status ? 'ACTIVE' : 'INACTIVE'
    }
  })
}
