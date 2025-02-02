import {Card, CardContent} from "@/components/ui/card";

export default function CartPage(){
  return (
    <div className="flex gap-4 w-full">
      <Card className="basis-3/4">
        <CardContent></CardContent>
      </Card>
      <Card className="basis-1/4">
        <CardContent></CardContent>
      </Card>
    </div>
  )
}
