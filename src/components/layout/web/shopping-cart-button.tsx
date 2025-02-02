import {ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function ShoppingCartButton() {

  return (
      <Link href="/cart">
        <Button className="rounded-full w-12 h-12" variant="outline" size="icon">
          <ShoppingCart/>
        </Button>
      </Link>
  );
}
