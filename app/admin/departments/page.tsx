"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DepartmentForm } from "@/components/department-form"

// Sample data for departments
const initialDepartments = [
  {
    id: 1,
    name: "Computer Science Engineering",
    code: "CSE",
    hodName: "Dr. Rajesh Kumar",
    establishmentYear: 2005,
    contactEmail: "cse.hod@college.edu",
    contactPhone: "9876543210",
    website: "https://college.edu/cse",
    status: "active",
  },
  {
    id: 2,
    name: "Information Science Engineering",
    code: "ISE",
    hodName: "Dr. Priya Sharma",
    establishmentYear: 2008,
    contactEmail: "ise.hod@college.edu",
    contactPhone: "9876543211",
    website: "https://college.edu/ise",
    status: "active",
  },
  {
    id: 3,
    name: "Electronics & Communication",
    code: "ECE",
    hodName: "Dr. Suresh Patel",
    establishmentYear: 2003,
    contactEmail: "ece.hod@college.edu",
    contactPhone: "9876543212",
    website: "https://college.edu/ece",
    status: "active",
  },
  {
    id: 4,
    name: "Mechanical Engineering",
    code: "MECH",
    hodName: "Dr. Anil Verma",
    establishmentYear: 2001,
    contactEmail: "mech.hod@college.edu",
    contactPhone: "9876543213",
    website: "https://college.edu/mech",
    status: "active",
  },
  {
    id: 5,
    name: "Robotics & Automation",
    code: "RA",
    hodName: "Dr. Meena Iyer",
    establishmentYear: 2015,
    contactEmail: "ra.hod@college.edu",
    contactPhone: "9876543214",
    website: "https://college.edu/ra",
    status: "inactive",
  },
]

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(initialDepartments)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentDepartment, setCurrentDepartment] = useState<any>(null)

  // Filter departments based on search term
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.hodName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddDepartment = (newDepartment: any) => {
    const departmentWithId = {
      ...newDepartment,
      id: departments.length + 1,
      status: "active",
    }
    setDepartments([...departments, departmentWithId])
    setIsAddDialogOpen(false)
  }

  const handleEditDepartment = (updatedDepartment: any) => {
    setDepartments(departments.map((dept) => (dept.id === updatedDepartment.id ? updatedDepartment : dept)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.map((dept) => (dept.id === id ? { ...dept, status: "inactive" } : dept)))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Department Management</h1>
          <p className="text-muted-foreground">Manage college departments, codes, and department heads</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>Fill in the details to add a new department to the college.</DialogDescription>
            </DialogHeader>
            <DepartmentForm onSubmit={handleAddDepartment} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search departments..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Department Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>HOD Name</TableHead>
              <TableHead>Establishment Year</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No departments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredDepartments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">{department.name}</TableCell>
                  <TableCell>{department.code}</TableCell>
                  <TableCell>{department.hodName}</TableCell>
                  <TableCell>{department.establishmentYear}</TableCell>
                  <TableCell>
                    <Badge variant={department.status === "active" ? "default" : "secondary"}>
                      {department.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentDepartment(department)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentDepartment(department)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentDepartment(department)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {department.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Department Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Department Details</DialogTitle>
            <DialogDescription>Detailed information about the department.</DialogDescription>
          </DialogHeader>
          {currentDepartment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Department Name</Label>
                <div className="col-span-3">{currentDepartment.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Department Code</Label>
                <div className="col-span-3">{currentDepartment.code}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">HOD Name</Label>
                <div className="col-span-3">{currentDepartment.hodName}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Establishment Year</Label>
                <div className="col-span-3">{currentDepartment.establishmentYear}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Contact Email</Label>
                <div className="col-span-3">{currentDepartment.contactEmail}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Contact Phone</Label>
                <div className="col-span-3">{currentDepartment.contactPhone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Website</Label>
                <div className="col-span-3">
                  <a
                    href={currentDepartment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    {currentDepartment.website}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  <Badge variant={currentDepartment.status === "active" ? "default" : "secondary"}>
                    {currentDepartment.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Department Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Update the department details.</DialogDescription>
          </DialogHeader>
          {currentDepartment && (
            <DepartmentForm
              department={currentDepartment}
              onSubmit={handleEditDepartment}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Department Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentDepartment?.status === "active" ? "Deactivate" : "Activate"} Department</DialogTitle>
            <DialogDescription>
              {currentDepartment?.status === "active"
                ? "This will deactivate the department. It can be reactivated later."
                : "This will reactivate the department."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentDepartment?.status === "active" ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">{currentDepartment?.name}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentDepartment?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteDepartment(currentDepartment?.id)}
            >
              {currentDepartment?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
