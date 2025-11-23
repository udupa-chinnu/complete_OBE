"use client"

import { useState, useEffect } from "react"
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
import Link from "next/link"
import { facultiesApi } from "@/lib/api"
import { FacultyEditForm } from "@/components/faculty-edit-form"

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [designationFilter, setDesignationFilter] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentFaculty, setCurrentFaculty] = useState<any>(null)

  useEffect(() => {
    fetchFaculties()
  }, [])

  const fetchFaculties = async () => {
    try {
      setLoading(true)
      const response = await facultiesApi.getAll()
      if (response.success && response.data && Array.isArray(response.data)) {
        setFaculty(response.data)
      } else {
        setFaculty([])
      }
    } catch (error) {
      console.error("Error fetching faculties:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter faculty based on search term and filters
  const filteredFaculty = faculty.filter((f) => {
    const fullName = `${f.first_name || ''} ${f.last_name || ''}`.toLowerCase()
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      f.official_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.parent_department?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter && departmentFilter !== "all" ? f.parent_department === departmentFilter : true
    const matchesDesignation = designationFilter && designationFilter !== "all" ? f.designation === designationFilter : true

    return matchesSearch && matchesDepartment && matchesDesignation
  })

  const departments = Array.from(new Set(faculty.map(f => f.parent_department).filter(Boolean)))
  const designations = Array.from(new Set(faculty.map(f => f.designation).filter(Boolean)))

  const handleDeleteFaculty = async (id: number) => {
    try {
      const response = await facultiesApi.deactivate(id)
      if (response.success) {
        await fetchFaculties()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to deactivate faculty")
      }
    } catch (error) {
      console.error("Error deactivating faculty:", error)
      alert("Failed to deactivate faculty. Please try again.")
    }
  }

  const handleReactivateFaculty = async (id: number) => {
    try {
      const response = await facultiesApi.reactivate(id)
      if (response.success) {
        await fetchFaculties()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to reactivate faculty")
      }
    } catch (error) {
      console.error("Error reactivating faculty:", error)
      alert("Failed to reactivate faculty. Please try again.")
    }
  }

  const handleEditFaculty = async (updatedFaculty: any) => {
    try {
      const formData = new FormData()
      Object.keys(updatedFaculty).forEach((key) => {
        if (updatedFaculty[key] !== null && updatedFaculty[key] !== undefined) {
          if (key === 'profilePhoto' && updatedFaculty[key] instanceof File) {
            formData.append('profilePhoto', updatedFaculty[key])
          } else {
            formData.append(key, updatedFaculty[key])
          }
        }
      })

      const response = await facultiesApi.update(currentFaculty.id, formData)
      if (response.success) {
        await fetchFaculties()
        setIsEditDialogOpen(false)
      } else {
        alert(response.message || "Failed to update faculty")
      }
    } catch (error) {
      console.error("Error updating faculty:", error)
      alert("Failed to update faculty. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading faculties...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground">Manage faculty information, qualifications, and details</p>
        </div>
        <Button asChild>
          <Link href="/admin/faculty/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Faculty
          </Link>
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
              setDepartmentFilter("all")
              setDesignationFilter("all")
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
                        <AvatarImage src={f.profile_photo_path || `/placeholder.svg?height=40&width=40`} alt={`${f.first_name} ${f.last_name}`} />
                        <AvatarFallback>
                          {f.first_name?.[0] || ''}
                          {f.last_name?.[0] || ''}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {f.title} {f.first_name} {f.last_name}
                        </div>
                        {/* <div className="text-sm text-muted-foreground">
                          {f.qualifications?.[0]?.degree || 'No qualification listed'}
                        </div> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{f.designation}</TableCell>
                  <TableCell>{f.parent_department}</TableCell>
                  <TableCell>{f.official_email}</TableCell>
                  <TableCell>
                    <Badge variant={f.is_active ? "default" : "secondary"}>
                      {f.is_active ? "Active" : "Inactive"}
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
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentFaculty(f)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentFaculty(f)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {f.is_active ? "Deactivate" : "Activate"}
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
                      src={currentFaculty.profile_photo_path || `/placeholder.svg?height=80&width=80`}
                      alt={`${currentFaculty.first_name} ${currentFaculty.last_name}`}
                    />
                    <AvatarFallback className="text-xl">
                      {currentFaculty.first_name?.[0] || ''}
                      {currentFaculty.last_name?.[0] || ''}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">
                      {currentFaculty.title} {currentFaculty.first_name} {currentFaculty.last_name}
                    </h3>
                    <p className="text-muted-foreground">{currentFaculty.designation}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Department</Label>
                    <p>{currentFaculty.parent_department}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Email</Label>
                    <p>{currentFaculty.official_email}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Phone</Label>
                    <p>{currentFaculty.residence_number || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Joining Date</Label>
                    <p>{currentFaculty.joining_date ? new Date(currentFaculty.joining_date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <Label>Status</Label>
                    <p>
                      <Badge variant={currentFaculty.is_active ? "default" : "secondary"}>
                        {currentFaculty.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="qualification" className="space-y-4 pt-4">
                <div className="space-y-4">
                  {currentFaculty.qualifications && currentFaculty.qualifications.length > 0 ? (
                    currentFaculty.qualifications.map((qual: any, index: number) => (
                      <div key={index} className="rounded-md border p-4">
                        <h3 className="font-semibold">{qual.degree}</h3>
                        <p className="text-sm text-muted-foreground">Specialization: {qual.specialization || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">University: {qual.university || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Year: {qual.year_of_completion || 'N/A'}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No qualifications listed.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="professional" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="font-semibold">{currentFaculty.designation}</h3>
                    <p className="text-sm text-muted-foreground">Department: {currentFaculty.parent_department}</p>
                    <p className="text-sm text-muted-foreground">
                      Joined on: {currentFaculty.joining_date ? new Date(currentFaculty.joining_date).toLocaleDateString() : 'N/A'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Academic Experience: {currentFaculty.academic_experience || 0} years
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Research Experience: {currentFaculty.research_experience || 0} years
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Industry Experience: {currentFaculty.industry_experience || 0} years
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button asChild>
              <Link href={`/admin/faculty/edit/${currentFaculty?.id}`}>Edit Details</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Faculty Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Faculty</DialogTitle>
            <DialogDescription>Update the faculty member's information.</DialogDescription>
          </DialogHeader>
          {currentFaculty && (
            <FacultyEditForm
              faculty={currentFaculty}
              onSubmit={handleEditFaculty}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Faculty Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentFaculty?.is_active ? "Deactivate" : "Activate"} Faculty</DialogTitle>
            <DialogDescription>
              {currentFaculty?.is_active
                ? "This will deactivate the faculty member. They can be reactivated later."
                : "This will reactivate the faculty member."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentFaculty?.is_active ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">
                {currentFaculty?.title} {currentFaculty?.first_name} {currentFaculty?.last_name}
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentFaculty?.is_active ? "destructive" : "default"}
              onClick={() => {
                if (currentFaculty?.is_active) {
                  handleDeleteFaculty(currentFaculty?.id)
                } else {
                  handleReactivateFaculty(currentFaculty?.id)
                }
              }}
            >
              {currentFaculty?.is_active ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
