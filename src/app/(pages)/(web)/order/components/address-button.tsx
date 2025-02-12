import {BookUser} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";

export default function AddressButton() {
  const handleClickAddress = () => {
    console.log("Address");
  }
  return (
      <Button className="w-8 h-8" size="icon" onClick={() => handleClickAddress}>
        <BookUser/>
      </Button>
  )
}
