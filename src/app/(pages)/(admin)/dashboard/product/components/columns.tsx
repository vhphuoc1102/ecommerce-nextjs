"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableRowActions } from "@/components/table/data-table-row-actions"

export interface ProductRecord {
  id: number,
  image: string,
  title: string,
  brandName: string,
  categoryName: string,
  price: string,
  productSn: string,
  name: string,
  quantity: number,
  sold: number
}

export const columns: ColumnDef<ProductRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
        <Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
        />
    ),
    cell: ({ row }) => (
        <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
        />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
        <a href={`product/${row.getValue("id")}`} className="w-min-8 text-primary hover:underline">{row.getValue("id")}</a>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) => (
            <img className="w-16 h-16" src={row.getValue("image")} alt="image"/>
        ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => <div className="w-36 text-wrap">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
        <div className="w-32 flex flex-col gap-2 justify-center items-start text-xs text-wrap">
          <p>
            <strong>Price: </strong> {row.getValue("price")}
          </p>
          <p>
            <strong>Brand: </strong> {row.getValue("brandName")}
          </p>
          <p>
            <strong>Category: </strong> {row.getValue("categoryName")}
          </p>
        </div>
    ),
  },
  {
    accessorKey: "brandName",
    header: () => (<div></div>),
    cell: () => <div></div>,
  },
  {
    accessorKey: "categoryName",
    header: () => (<div></div>),
    cell: () => <div></div>,
  },
  {
    accessorKey: "productSn",
    header: () => (<div></div>),
    cell: () => <div></div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
        <div className="w-48 flex flex-col gap-2 justify-center items-start text-xs">
          <p>
            <strong>Name: </strong> {row.getValue("name")}
          </p>
          <p>
            <strong>Serial number: </strong> {row.getValue("productSn")}
          </p>
        </div>
        ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "sold",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sold" />
    ),
    cell: ({ row }) => <div>{row.getValue("sold")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
