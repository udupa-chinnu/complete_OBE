"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/admin/button"
import { Input } from "@/components/admin/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/dropdown-menu"
import { Label } from "@/components/admin/label"
import { Badge } from "@/components/admin/badge"
import { DepartmentForm } from "@/components/department-form"
import { departmentsApi } from "@/lib/api"

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentDepartment, setCurrentDepartment] = useState<any>(null)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      setLoading(true)
      const response = await departmentsApi.getAll()
      if (response.success && response.data) {
        setDepartments(response.data)
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter departments based on search term
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.hod_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddDepartment = async (newDepartment: any) => {
    try {
      const response = await departmentsApi.create({
        name: newDepartment.name,
        code: newDepartment.code,
        hodFacultyId: newDepartment.hodFacultyId ? parseInt(newDepartment.hodFacultyId) : null,
        establishmentYear: newDepartment.establishmentYear || null,
        contactEmail: newDepartment.contactEmail || null,
        contactPhone: newDepartment.contactPhone || null,
        website: newDepartment.website || null,
      })
      if (response.success) {
        await fetchDepartments()
        setIsAddDialogOpen(false)
      } else {
        alert(response.message || "Failed to create department")
      }
    } catch (error) {
      console.error("Error creating department:", error)
      alert("Failed to create department. Please try again.")
    }
  }

  const handleEditDepartment = async (updatedDepartment: any) => {
    try {
      const response = await departmentsApi.update(updatedDepartment.id, {
        name: updatedDepartment.name,
        code: updatedDepartment.code,
        hodFacultyId: updatedDepartment.hodFacultyId ? parseInt(updatedDepartment.hodFacultyId) : null,
        establishmentYear: updatedDepartment.establishmentYear || null,
        contactEmail: updatedDepartment.contactEmail || null,
        contactPhone: updatedDepartment.contactPhone || null,
        website: updatedDepartment.website || null,
      })
      if (response.success) {
        await fetchDepartments()
        setIsEditDialogOpen(false)
      } else {
        alert(response.message || "Failed to update department")
      }
    } catch (error) {
      console.error("Error updating department:", error)
      alert("Failed to update department. Please try again.")
    }
  }

  const handleDeleteDepartment = async (id: number) => {
    try {
      const response = await departmentsApi.deactivate(id)
      if (response.success) {
        await fetchDepartments()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to deactivate department")
      }
    } catch (error) {
      console.error("Error deactivating department:", error)
      alert("Failed to deactivate department. Please try again.")
    }
  }

  const handleReactivateDepartment = async (id: number) => {
    try {
      const response = await departmentsApi.reactivate(id)
      if (response.success) {
        await fetchDepartments()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to reactivate department")
      }
    } catch (error) {
      console.error("Error reactivating department:", error)
      alert("Failed to reactivate department. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading departments...</p>
          </div>
        </div>
      </div>
    )
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
                  <TableCell>{department.hod_name || "Not assigned"}</TableCell>
                  <TableCell>{department.establishment_year || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={department.is_active ? "default" : "secondary"}>
                      {department.is_active ? "Active" : "Inactive"}
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
                            setCurrentDepartment({
                              ...department,
                              hodFacultyId: department.hod_faculty_id,
                              establishmentYear: department.establishment_year,
                              contactEmail: department.contact_email,
                              contactPhone: department.contact_phone,
                            })
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
                          {department.is_active ? "Deactivate" : "Activate"}
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
                <div className="col-span-3">{currentDepartment.hod_name || "Not assigned"}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Establishment Year</Label>
                <div className="col-span-3">{currentDepartment.establishment_year || "N/A"}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Contact Email</Label>
                <div className="col-span-3">{currentDepartment.contact_email || "N/A"}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Contact Phone</Label>
                <div className="col-span-3">{currentDepartment.contact_phone || "N/A"}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Website</Label>
                <div className="col-span-3">
                  {currentDepartment.website ? (
                    <a
                      href={currentDepartment.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {currentDepartment.website}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  <Badge variant={currentDepartment.is_active ? "default" : "secondary"}>
                    {currentDepartment.is_active ? "Active" : "Inactive"}
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
            <DialogTitle>{currentDepartment?.is_active ? "Deactivate" : "Activate"} Department</DialogTitle>
            <DialogDescription>
              {currentDepartment?.is_active
                ? "This will deactivate the department. It can be reactivated later."
                : "This will reactivate the department."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentDepartment?.is_active ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">{currentDepartment?.name}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentDepartment?.is_active ? "destructive" : "default"}
              onClick={() => {
                if (currentDepartment?.is_active) {
                  handleDeleteDepartment(currentDepartment?.id)
                } else {
                  handleReactivateDepartment(currentDepartment?.id)
                }
              }}
            >
              {currentDepartment?.is_active ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
