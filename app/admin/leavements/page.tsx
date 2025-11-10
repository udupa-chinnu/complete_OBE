"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, Filter, FileDown, Trash2, Edit, Eye, CheckCircle2, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Sample data for leave records
const leaveRecords = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    employeeId: "FAC001",
    department: "Computer Science Engineering",
    designation: "Professor",
    staffType: "Teaching",
    typeOfExit: "Resignation",
    lastWorkingDay: "2023-06-30",
    exitStatus: "Completed",
  },
  {
    id: 2,
    name: "Priya Sharma",
    employeeId: "FAC015",
    department: "Information Science Engineering",
    designation: "Assistant Professor",
    staffType: "Teaching",
    typeOfExit: "End of Contract",
    lastWorkingDay: "2023-07-15",
    exitStatus: "Completed",
  },
  {
    id: 3,
    name: "Suresh Patel",
    employeeId: "STAFF023",
    department: "Administration",
    designation: "Office Superintendent",
    staffType: "Non-Teaching",
    typeOfExit: "Retirement",
    lastWorkingDay: "2023-08-31",
    exitStatus: "Completed",
  },
  {
    id: 4,
    name: "Ananya Desai",
    employeeId: "FAC042",
    department: "Electronics & Communication",
    designation: "Associate Professor",
    staffType: "Teaching",
    typeOfExit: "Resignation",
    lastWorkingDay: "2023-09-15",
    exitStatus: "In Progress",
  },
  {
    id: 5,
    name: "Vikram Singh",
    employeeId: "STAFF018",
    department: "Library",
    designation: "Librarian",
    staffType: "Non-Teaching",
    typeOfExit: "Transfer",
    lastWorkingDay: "2023-10-31",
    exitStatus: "In Progress",
  },
]

export default function LeaveManagementPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined)
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
  const [selectedRecord, setSelectedRecord] = useState<number | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter records based on search term and filters
  const filteredRecords = leaveRecords.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = !typeFilter || typeFilter === "all-types" || record.typeOfExit === typeFilter
    const matchesStatus = !statusFilter || statusFilter === "all-statuses" || record.exitStatus === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleDelete = (id: number) => {
    setSelectedRecord(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real application, you would delete the record from your backend
    console.log(`Deleting record with ID: ${selectedRecord}`)
    setIsDeleteDialogOpen(false)
    // Refresh the data or update the state
  }

  const getStatusBadge = (status: string) => {
    if (status === "Completed") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      )
    } else if (status === "In Progress") {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="mr-1 h-3 w-3" />
          In Progress
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Manage staff exits, resignations, retirements, and transfers</p>
        </div>
        <Button asChild>
          <Link href="/admin/leavements/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Record
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Records</CardTitle>
          <CardDescription>View and manage all staff exit records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, ID, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Exit Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-types">All Types</SelectItem>
                    <SelectItem value="Resignation">Resignation</SelectItem>
                    <SelectItem value="Retirement">Retirement</SelectItem>
                    <SelectItem value="Termination">Termination</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="End of Contract">End of Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-statuses">All Statuses</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon" title="Export to Excel">
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Employee ID</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead className="hidden md:table-cell">Designation</TableHead>
                  <TableHead className="hidden lg:table-cell">Staff Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Exit Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Last Working Day</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{record.employeeId}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.designation}</TableCell>
                      <TableCell className="hidden lg:table-cell">{record.staffType}</TableCell>
                      <TableCell className="hidden lg:table-cell">{record.typeOfExit}</TableCell>
                      <TableCell className="hidden lg:table-cell">{record.lastWorkingDay}</TableCell>
                      <TableCell>{getStatusBadge(record.exitStatus)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/leavements/${record.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/admin/leavements/${record.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(record.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this leave record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
