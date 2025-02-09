import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {DataTableViewOptions} from "@/components/table/data-table-view-options";


interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
                                          table,
                                        }: DataTableToolbarProps<TData>) {
  return (
      <div className="flex items-center justify-end gap-4">
        <Button variant={"destructive"}>Delete</Button>
        <DataTableViewOptions table={table} />
      </div>
  )
}
