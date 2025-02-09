"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import React from "react";
import {deleteCartItems, updateQuantity} from "@/action/cart.action";

export default function CartItemModification(
    {
      cartItemId,
      quantity,
      stock,
      onDelete
    }: {
      cartItemId: number,
      quantity: number,
      stock: number,
      onDelete: () => void
    }) {
  const [newQuantity, setNewQuantity] = React.useState(quantity);
  const handleChangeQuantity = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity < 0) {
      return;
    } else {
      setNewQuantity(newQuantity);
      if (newQuantity !== quantity) {
        await updateQuantity(cartItemId, newQuantity);
      }
    }
  }

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deleteCartItems([cartItemId]);
    onDelete();
  }

  return (
    <div className="flex gap-10 items-center">
      <div className="flex items-center">
        <span className="mr-3">Quantity: </span>
        <Input
            type="number"
            name="quantity"
            id={`${cartItemId}`}
            className="max-w-24"
            value={newQuantity}
            min={0}
            max={stock}
            onChange={handleChangeQuantity}
        />
      </div>
      <Button variant="outline" size="icon" onClick={handleDelete}>
        <Trash2 />
      </Button>
    </div>
  )
}
