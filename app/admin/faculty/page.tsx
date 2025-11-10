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

// Sample data for faculty
const initialFaculty = [
  {
    id: 1,
    title: "Dr.",
    firstName: "Rajesh",
    lastName: "Kumar",
    designation: "Professor",
    department: "Computer Science Engineering",
    email: "rajesh.kumar@college.edu",
    phone: "9876543210",
    qualification: "Ph.D. in Computer Science",
    specialization: "Artificial Intelligence",
    joiningDate: "2010-06-15",
    status: "active",
  },
  {
    id: 2,
    title: "Prof.",
    firstName: "Priya",
    lastName: "Sharma",
    designation: "Associate Professor",
    department: "Information Science Engineering",
    email: "priya.sharma@college.edu",
    phone: "9876543211",
    qualification: "Ph.D. in Information Technology",
    specialization: "Data Science",
    joiningDate: "2012-08-20",
    status: "active",
  },
  {
    id: 3,
    title: "Dr.",
    firstName: "Suresh",
    lastName: "Patel",
    designation: "Assistant Professor",
    department: "Electronics & Communication",
    email: "suresh.patel@college.edu",
    phone: "9876543212",
    qualification: "Ph.D. in Electronics",
    specialization: "VLSI Design",
    joiningDate: "2015-03-10",
    status: "active",
  },
  {
    id: 4,
    title: "Mrs.",
    firstName: "Anita",
    lastName: "Desai",
    designation: "Assistant Professor",
    department: "Computer Science Engineering",
    email: "anita.desai@college.edu",
    phone: "9876543213",
    qualification: "M.Tech in Computer Science",
    specialization: "Software Engineering",
    joiningDate: "2018-07-05",
    status: "inactive",
  },
]

export default function FacultyPage() {
  const [faculty, setFaculty] = useState(initialFaculty)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [designationFilter, setDesignationFilter] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentFaculty, setCurrentFaculty] = useState<any>(null)

  // Filter faculty based on search term and filters
  const filteredFaculty = faculty.filter((f) => {
    const matchesSearch =
      f.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter ? f.department === departmentFilter : true
    const matchesDesignation = designationFilter ? f.designation === designationFilter : true

    return matchesSearch && matchesDepartment && matchesDesignation
  })

  const departments = [
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Robotics & Automation",
  ]

  const designations = ["Professor", "Associate Professor", "Assistant Professor"]

  const handleDeleteFaculty = (id: number) => {
    setFaculty(faculty.map((f) => (f.id === id ? { ...f, status: f.status === "active" ? "inactive" : "active" } : f)))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculty information, qualifications, and details</p>
        </div>
        <Button asChild>
          <a href="/admin/faculty/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Faculty
          </a>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search faculty..."
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
          <Select value={designationFilter} onValueChange={setDesignationFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Designations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Designations</SelectItem>
              {designations.map((desig) => (
                <SelectItem key={desig} value={desig}>
                  {desig}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setDepartmentFilter("")
              setDesignationFilter("")
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
              <TableHead>Designation</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaculty.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No faculty found.
                </TableCell>
              </TableRow>
            ) : (
              filteredFaculty.map((f) => (
                <TableRow key={f.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`${f.firstName} ${f.lastName}`} />
                        <AvatarFallback>
                          {f.firstName[0]}
                          {f.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {f.title} {f.firstName} {f.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">{f.qualification}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{f.designation}</TableCell>
                  <TableCell>{f.department}</TableCell>
                  <TableCell>{f.email}</TableCell>
                  <TableCell>
                    <Badge variant={f.status === "active" ? "default" : "secondary"}>
                      {f.status === "active" ? "Active" : "Inactive"}
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
                            setCurrentFaculty(f)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={`/admin/faculty/edit/${f.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentFaculty(f)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {f.status === "active" ? "Deactivate" : "Activate"}
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

      {/* View Faculty Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Faculty Details</DialogTitle>
            <DialogDescription>Detailed information about the faculty member.</DialogDescription>
          </DialogHeader>
          {currentFaculty && (
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="qualification">Qualifications</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={`/placeholder.svg?height=80&width=80`}
                      alt={`${currentFaculty.firstName} ${currentFaculty.lastName}`}
                    />
                    <AvatarFallback className="text-xl">
                      {currentFaculty.firstName[0]}
                      {currentFaculty.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">
                      {currentFaculty.title} {currentFaculty.firstName} {currentFaculty.lastName}
                    </h3>
                    <p className="text-muted-foreground">{currentFaculty.designation}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Department</Label>
                    <p>{currentFaculty.department}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <p>{currentFaculty.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <p>{currentFaculty.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Joining Date</Label>
                    <p>{new Date(currentFaculty.joiningDate).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <p>
                      <Badge variant={currentFaculty.status === "active" ? "default" : "secondary"}>
                        {currentFaculty.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="qualification" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold">{currentFaculty.qualification}</h3>
                    <p className="text-sm text-muted-foreground">Specialization: {currentFaculty.specialization}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Note: Detailed qualification records are available in the edit view.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="professional" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold">{currentFaculty.designation}</h3>
                    <p className="text-sm text-muted-foreground">Department: {currentFaculty.department}</p>
                    <p className="text-sm text-muted-foreground">
                      Joined on: {new Date(currentFaculty.joiningDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Note: Detailed professional records are available in the edit view.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button asChild>
              <a href={`/admin/faculty/edit/${currentFaculty?.id}`}>Edit Details</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Faculty Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentFaculty?.status === "active" ? "Deactivate" : "Activate"} Faculty</DialogTitle>
            <DialogDescription>
              {currentFaculty?.status === "active"
                ? "This will deactivate the faculty member. They can be reactivated later."
                : "This will reactivate the faculty member."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentFaculty?.status === "active" ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">
                {currentFaculty?.title} {currentFaculty?.firstName} {currentFaculty?.lastName}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentFaculty?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteFaculty(currentFaculty?.id)}
            >
              {currentFaculty?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
