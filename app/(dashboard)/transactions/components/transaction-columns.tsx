"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { format } from "date-fns"
import { formatCurrency } from "@/lib/utils"

import { InferResponseType } from "hono"
import { client } from "@/lib/hono"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

import { Actions } from "./actions"
import { AccountColumn } from "./account-column"
import { CategoryColumn } from "./category-column"

// Infer the response type of a single transaction from the API
export type ResponseType = InferResponseType<typeof client.api.transactions.$get, 200>["data"][0];

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
    // Date column with sorting
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue("date") as Date;

      return (
        <span>
          {format(date, "MMMM dd, yyyy")}
        </span>
      )
    },
  },
  {
    // Category column with sorting with fallback for missing/uncategorized categories
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {

      return (
        <CategoryColumn 
          id={row.original.id}
          category={row.original.category}
          categoryId={row.original.categoryId}
        />
      )
    },
  },
  {
    // Payee column with sorting
    accessorKey: "payee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    // Amount column with sorting
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      return (
        <Badge 
        variant={amount < 0 ? "destructive" : "primary"}
        className="text-xs font-medium px-3.5 py-3.5"
        >
          {formatCurrency(amount)}  
        </Badge>
      )
    },
  },
  {
    // Account column with sorting
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {

      return (
        <AccountColumn
          account={row.original.account}
          accountId={row.original.accountId}
        />
      )
    },
  },
  {
    // This column is for rendering the transaction actions (edit/delete)
    id: "actions",
    cell: ({ row }) => {
      return <Actions id={row.original.id}/>
    }
  },
]
