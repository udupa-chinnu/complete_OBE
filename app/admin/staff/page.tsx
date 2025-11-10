"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react"
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
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for staff
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
    id: 2,
    fullName: "Priya Sharma",
    employeeId: "ST002",
    gender: "Female",
    dateOfBirth: "1990-08-20",
    dateOfJoining: "2015-08-20",
    phoneNumber: "9876543211",
    email: "priya.sharma@college.edu",
    address: "456 Park Avenue, Bangalore",
    staffType: "Teaching",
    department: "Computer Science Engineering",
    staffCategory: "Permanent",
    designation: "Assistant Professor",
    qualifications: "Ph.D. in Computer Science",
    totalExperience: "8",
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
    id: 4,
    fullName: "Anita Desai",
    employeeId: "ST004",
    gender: "Female",
    dateOfBirth: "1988-07-05",
    dateOfJoining: "2018-07-05",
    phoneNumber: "9876543213",
    email: "anita.desai@college.edu",
    address: "101 Hill Road, Bangalore",
    staffType: "Teaching",
    department: "Information Science Engineering",
    staffCategory: "Contractual",
    designation: "Assistant Professor",
    qualifications: "M.Tech in Information Technology",
    totalExperience: "5",
    status: "inactive",
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
  const [staffTypeFilter, setStaffTypeFilter] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentStaff, setCurrentStaff] = useState<any>(null)

  // Filter staff based on search term and filters
  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter ? s.department === departmentFilter : true
    const matchesStaffType = staffTypeFilter ? s.staffType === staffTypeFilter : true

    return matchesSearch && matchesDepartment && matchesStaffType
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

  const staffTypes = ["Teaching", "Non-Teaching"]

  const handleDeleteStaff = (id: number) => {
    setStaff(staff.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "inactive" : "active" } : s)))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
          <p className="text-muted-foreground">Manage teaching and non-teaching staff information and details</p>
        </div>
        <Button asChild>
          <a href="/admin/staff/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Staff
          </a>
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
          <Select value={staffTypeFilter} onValueChange={setStaffTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Staff Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff Types</SelectItem>
              {staffTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setDepartmentFilter("")
              setStaffTypeFilter("")
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
              <TableHead>Staff Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
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
                  <TableCell>{s.staffType}</TableCell>
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
                            setCurrentStaff(s)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/admin/staff/edit/${s.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </a>
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
                    <p>{new Date(currentStaff.dateOfBirth).toLocaleDateString()}</p>
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
                    <Label>Staff Type</Label>
                    <p>{currentStaff.staffType}</p>
                  </div>
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
                    <p>{new Date(currentStaff.dateOfJoining).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Total Experience</Label>
                    <p>{currentStaff.totalExperience} years</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Qualifications</Label>
                    <p>{currentStaff.qualifications}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <p>
                      <Badge variant={currentStaff.status === "active" ? "default" : "secondary"}>
                        {currentStaff.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  No documents have been uploaded for this staff member yet.
                </p>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button asChild>
              <a href={`/admin/staff/edit/${currentStaff?.id}`}>Edit Details</a>
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
