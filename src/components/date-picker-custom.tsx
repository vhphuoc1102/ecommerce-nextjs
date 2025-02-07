"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/libs/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function DatePickerCustom({id}: {id?: string}) {
  const [date, setDate] = React.useState<Date>()
   return (
       <Popover>
         <PopoverTrigger asChild>
           <Button
               variant={"outline"}
               className={cn(
                   "w-[240px] justify-start text-left font-normal",
                   !date && "text-muted-foreground"
               )}
           >
             <CalendarIcon />
             {date ? format(date, "PPP") : <span>Pick a date</span>}
           </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0" align="start">
           <Calendar
               id={id}
               mode="single"
               selected={date}
               onSelect={setDate}
               initialFocus
           />
         </PopoverContent>
       </Popover>
   )
}
