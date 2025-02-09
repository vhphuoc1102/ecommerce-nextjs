"use client"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export default function PaymentInformation() {
  const handleValueChange = (value: string) => {}
  return (
    <div className="w-full">
      <RadioGroup
          name="payment"
          onValueChange={(value) => handleValueChange(value)}
          value={"CASH"}
          className="flex flex-col gap-6"
      >
        <div className="flex items-center gap-4 w-full border-2 rounded-lg p-4">
          <RadioGroupItem value="CASH"/>
          <Label className="font-semibold">CASH</Label>
        </div>
        <div className="flex items-center gap-4 w-full border-2 rounded-lg p-4">
          <RadioGroupItem value="MOMO"/>
          <Label className="font-semibold">MOMO</Label>
        </div>
        <div className="flex items-center gap-4 w-full border-2 rounded-lg p-4">
          <RadioGroupItem value="ZALOPAY"/>
          <Label className="font-semibold">ZALOPAY</Label>
        </div>
        <div className="flex items-center gap-4 w-full border-2 rounded-lg p-4">
          <RadioGroupItem value="VNPAY"/>
          <Label className="font-semibold">VNPAY</Label>
        </div>

      </RadioGroup>
    </div>
  )
}
