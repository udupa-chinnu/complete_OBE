"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react"
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
} from "@/components/admin/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/dropdown-menu"
import { Label } from "@/components/admin/label"
import { Badge } from "@/components/admin/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/select"
import { StaffForm } from "@/components/staff-form" // Importing the form component

// Sample data for staff (Non-Teaching only)
const initialStaff = [
  {
    id: 1,
    fullName: "Rajesh Kumar",
    employeeId: "ST001",
    gender: "Male",
    dateOfBirth: "1985-06-15",
    dateOfJoining: "2010-06-15",
    phoneNumber: "9876543210",
    email: "rajesh.kumar@college.edu",
    address: "123 Main Street, Bangalore",
    staffType: "Non-Teaching",
    department: "Administration",
    staffCategory: "Permanent",
    designation: "Office Superintendent",
    qualifications: "M.Com",
    totalExperience: "15",
    status: "active",
  },
  {
    id: 3,
    fullName: "Suresh Patel",
    employeeId: "ST003",
    gender: "Male",
    dateOfBirth: "1982-03-10",
    dateOfJoining: "2012-03-10",
    phoneNumber: "9876543212",
    email: "suresh.patel@college.edu",
    address: "789 Lake View, Bangalore",
    staffType: "Non-Teaching",
    department: "Library",
    staffCategory: "Permanent",
    designation: "Librarian",
    qualifications: "M.Lib",
    totalExperience: "12",
    status: "active",
  },
  {
    id: 5,
    fullName: "Mohan Rao",
    employeeId: "ST005",
    gender: "Male",
    dateOfBirth: "1975-11-15",
    dateOfJoining: "2008-11-15",
    phoneNumber: "9876543214",
    email: "mohan.rao@college.edu",
    address: "202 Valley View, Bangalore",
    staffType: "Non-Teaching",
    department: "Accounts",
    staffCategory: "Permanent",
    designation: "Accounts Officer",
    qualifications: "M.Com, CA",
    totalExperience: "18",
    status: "active",
  },
]

export default function StaffPage() {
  const [staff, setStaff] = useState(initialStaff)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  
  // State for Dialogs
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false) // Shared for Add and Edit
  
  const [currentStaff, setCurrentStaff] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Filter staff based on search term and filters
  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter ? s.department === departmentFilter : true

    return matchesSearch && matchesDepartment
  })

  const departments = [
    "Administration",
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Library",
    "Accounts",
  ]

  // --- Actions ---

  const handleAddStaff = () => {
    setCurrentStaff(null)
    setIsEditing(false)
    setIsFormDialogOpen(true)
  }

  const handleEditStaff = (staffMember: any) => {
    setCurrentStaff(staffMember)
    setIsEditing(true)
    setIsFormDialogOpen(true)
  }

  const handleFormSubmit = (formData: any) => {
    if (isEditing) {
      // Update existing staff
      setStaff((prev) =>
        prev.map((s) => (s.id === formData.id ? { ...s, ...formData } : s))
      )
    } else {
      // Create new staff
      const newId = Math.max(...staff.map((s) => s.id), 0) + 1
      const newStaff = {
        ...formData,
        id: newId,
        // If status wasn't set in form, default to active
        status: formData.status || "active" 
      }
      setStaff((prev) => [...prev, newStaff])
    }
    setIsFormDialogOpen(false)
  }

  const handleDeleteStaff = (id: number) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Manage non-teaching staff information and details</p>
        </div>
        <Button onClick={handleAddStaff}>
          <Plus className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search staff..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setDepartmentFilter("")
              setSearchTerm("")
            }}
            title="Clear filters"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Employee ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No staff found.
                </TableCell>
              </TableRow>
            ) : (
              filteredStaff.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={s.fullName} />
                        <AvatarFallback>
                          {s.fullName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{s.fullName}</div>
                    </div>
                  </TableCell>
                  <TableCell>{s.employeeId}</TableCell>
                  <TableCell>{s.department}</TableCell>
                  <TableCell>{s.designation}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === "active" ? "default" : "secondary"}>
                      {s.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <Edit className="h-4 w-4" /> {/* Replaced SVG with Lucide Icon for consistency */}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentStaff(s)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEditStaff(s)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentStaff(s)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {s.status === "active" ? "Deactivate" : "Activate"}
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

      {/* Add / Edit Staff Form Dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the details of the staff member below." 
                : "Enter the details for the new staff member."}
            </DialogDescription>
          </DialogHeader>
          
          {/* Embed the StaffForm Component */}
          <StaffForm 
            staff={currentStaff} // Pass current data for editing, null for adding
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      {/* View Staff Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Staff Details</DialogTitle>
            <DialogDescription>Detailed information about the staff member.</DialogDescription>
          </DialogHeader>
          {currentStaff && (
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={`/placeholder.svg?height=80&width=80`} alt={currentStaff.fullName} />
                    <AvatarFallback className="text-xl">
                      {currentStaff.fullName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{currentStaff.fullName}</h3>
                    <p className="text-muted-foreground">{currentStaff.designation}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Employee ID</Label>
                    <p>{currentStaff.employeeId}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Gender</Label>
                    <p>{currentStaff.gender}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Date of Birth</Label>
                    <p>{currentStaff.dateOfBirth}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <p>{currentStaff.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <p>{currentStaff.phoneNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Address</Label>
                    <p>{currentStaff.address}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="professional" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Department</Label>
                    <p>{currentStaff.department}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Designation</Label>
                    <p>{currentStaff.designation}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Staff Category</Label>
                    <p>{currentStaff.staffCategory}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Date of Joining</Label>
                    <p>{currentStaff.dateOfJoining}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Total Experience</Label>
                    <p>{currentStaff.totalExperience} years</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <p>
                      <Badge variant={currentStaff.status === "active" ? "default" : "secondary"}>
                        {currentStaff.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label>Bank Name</Label>
                    <p>{currentStaff.bankName || "-"}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>IFSC Code</Label>
                    <p>{currentStaff.ifscCode || "-"}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4 pt-4">
                <div className="grid gap-4 md:grid-cols-2">
                   <div className="p-4 border rounded bg-muted/10">
                      <Label className="mb-2 block font-semibold">Aadhar Card</Label>
                      {currentStaff.aadharCard ? (
                        <span className="text-sm text-blue-600 underline cursor-pointer">View Document</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not Uploaded</span>
                      )}
                   </div>
                   <div className="p-4 border rounded bg-muted/10">
                      <Label className="mb-2 block font-semibold">PAN Card</Label>
                      {currentStaff.panCard ? (
                        <span className="text-sm text-blue-600 underline cursor-pointer">View Document</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not Uploaded</span>
                      )}
                   </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
                setIsViewDialogOpen(false);
                handleEditStaff(currentStaff);
            }}>
              Edit Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Staff Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentStaff?.status === "active" ? "Deactivate" : "Activate"} Staff</DialogTitle>
            <DialogDescription>
              {currentStaff?.status === "active"
                ? "This will deactivate the staff member. They can be reactivated later."
                : "This will reactivate the staff member."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentStaff?.status === "active" ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">{currentStaff?.fullName}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentStaff?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteStaff(currentStaff?.id)}
            >
              {currentStaff?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}