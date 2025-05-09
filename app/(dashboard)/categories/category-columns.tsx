"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { InferResponseType } from "hono"
import { client } from "@/lib/hono"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Actions } from "./actions"

export type ResponseType = InferResponseType<typeof client.api.categories.$get, 200>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    // This column is for rendering a checkbox
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    // This column is for rendering the category name
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    // This column is for rendering the category actions (edit/delete)
    id: "actions",
    cell: ({ row }) => {
      return <Actions id={row.original.id}/>
    }
  },
]
