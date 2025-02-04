"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import React from "react";

export default function CartItemModification({cartItemId, quantity, stock}: { cartItemId: number, quantity: number, stock: number }) {
  const [newQuantity, setNewQuantity] = React.useState(quantity);
  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity < 0) {
      return;
    } else {
      setNewQuantity(newQuantity);
      if (newQuantity !== quantity) {
        // dispatch update quantity action
      }
    }
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  return (
    <div className="flex gap-10">
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
      <Button variant="outline" size="icon" onClick={handleDelete}>
        <Trash2 />
      </Button>
    </div>
  )
}
