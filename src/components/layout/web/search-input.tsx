import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchInput() {
  return (
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 cursor-pointer" />
        <Input type="search" placeholder="Search..." className="pl-8 w-96" />
      </div>
  )
}
