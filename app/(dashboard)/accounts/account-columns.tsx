"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { InferResponseType } from "hono"
import { client } from "@/lib/hono"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { Actions } from "./actions"

// Infer the structure of a single account from the API response
export type ResponseType = InferResponseType<typeof client.api.accounts.$get, 200>["data"][0];

// Column definitions for the account table
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
    // This column is for rendering the account name
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
    // This column is for rendering the account actions (edit/delete)
    id: "actions",
    cell: ({ row }) => {
      return <Actions id={row.original.id}/>
    }
  },
]
