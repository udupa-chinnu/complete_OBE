"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type LeaveRequest = {
  id: string
  name: string
  employeeId: string
  department: string
  leaveType: string
  fromDate: string
  toDate: string
  totalDays: string
  status: string
  submissionDate: string
}

export const columns: ColumnDef<LeaveRequest>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "leaveType",
    header: "Leave Type",
  },
  {
    accessorKey: "fromDate",
    header: "From Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("fromDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "toDate",
    header: "To Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("toDate"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "totalDays",
    header: "Total Days",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Approved" ? "success" : status === "Pending" ? "outline" : "destructive"}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const leaveRequest = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/leave-requests/${leaveRequest.id}`} className="flex items-center">
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
