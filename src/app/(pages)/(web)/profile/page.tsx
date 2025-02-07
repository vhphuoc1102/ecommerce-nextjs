"use client"

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import DatePickerCustom from "@/components/date-picker-custom";
import {Button} from "@/components/ui/button";

export default function ProfilePage() {
  return (
      <div className={"flex flex-col items-center gap-6"}>
        <div className="flex flex-col items-center gap-3">
          <Avatar className={"w-16 h-26"}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold text-xl">phuocvu511</span>
        </div>
        <form className="w-full">
          <div className="grid grid-cols-6 gap-4 w-full">
            <div className="col-span-3">
              <label htmlFor="firstName" className="text-sm">Fist name</label>
              <Input placeholder="John" id="firstName" type="text"/>
            </div>
            <div className="col-span-3">
              <label htmlFor="lastName" className="text-sm">Last name</label>
              <Input placeholder="Doe" id="lastName" type="text"/>
            </div>
            <div className="col-span-4">
              <label htmlFor="email" className="text-sm">Email</label>
              <Input placeholder="m@example.com" id="email" type="email" disabled={true}/>
            </div>
            <div className="col-span-2">
              <label htmlFor="phone" className="text-sm">Phone</label>
              <Input placeholder="01234567890" id="phone" type="tel"/>
            </div>
            <div className="col-span-2">
              <label htmlFor="gender" className="text-sm">Gender</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Not set" />
                </SelectTrigger>
                <SelectContent id="gender" className="cursor-pointer">
                  <SelectItem value="NONE">Not set</SelectItem>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex flex-col gap-1">
              <label className="text-sm">Birthday</label>
              <DatePickerCustom id="birthDay"/>
            </div>
            <div className="col-span-2">
              <div className="mt-6 flex items-center gap-4">
                <Button className="w-28">Save</Button>
                <Button className="w-28" variant="outline">Reset</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}
