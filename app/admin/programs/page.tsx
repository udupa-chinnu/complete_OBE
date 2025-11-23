"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react"
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
import { ProgramForm } from "@/components/program-form"
import { programsApi, departmentsApi } from "@/lib/api"

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProgram, setCurrentProgram] = useState<any>(null)

  useEffect(() => {
    fetchPrograms()
    fetchDepartments()
  }, [])

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await programsApi.getAll()
      if (response.success && response.data) {
        setPrograms(response.data)
      }
    } catch (error) {
      console.error("Error fetching programs:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await departmentsApi.getAll()
      if (response.success && response.data) {
        setDepartments(response.data)
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }

  // Filter programs based on search term
  const filteredPrograms = programs.filter(
    (program) =>
      program.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.type?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProgram = async (newProgram: any) => {
    try {
      const formData = new FormData()
      formData.append('level', newProgram.level)
      formData.append('type', newProgram.type)
      if (newProgram.otherType) formData.append('otherType', newProgram.otherType)
      formData.append('name', newProgram.name)
      formData.append('code', newProgram.code)
      
      const dept = departments.find(d => d.name === newProgram.department)
      if (dept) formData.append('departmentId', dept.id.toString())
      
      if (newProgram.parentalDepartment) formData.append('parentalDepartment', newProgram.parentalDepartment)
      formData.append('sanctionedIntake', newProgram.sanctionedIntake.toString())
      formData.append('commencementYear', newProgram.commencementYear || '')
      if (newProgram.aicteApprovalYear) formData.append('aicteApprovalYear', newProgram.aicteApprovalYear)
      if (newProgram.aicteApprovalDoc instanceof File) {
        formData.append('aicteApprovalDoc', newProgram.aicteApprovalDoc)
      }
      formData.append('intakeChanged', newProgram.intakeChanged || 'No')
      if (newProgram.intakeChanged === 'Yes' && newProgram.newIntake) {
        formData.append('newIntake', newProgram.newIntake.toString())
      }
      if (newProgram.intakeChangeDoc instanceof File) {
        formData.append('intakeChangeDoc', newProgram.intakeChangeDoc)
      }
      if (newProgram.accreditationStatus) formData.append('accreditationStatus', newProgram.accreditationStatus)
      if (newProgram.accreditationFile instanceof File) {
        formData.append('accreditationFile', newProgram.accreditationFile)
      }
      formData.append('duration', newProgram.duration.toString())
      if (newProgram.totalCredits) formData.append('totalCredits', newProgram.totalCredits.toString())

      const response = await programsApi.create(formData)
      if (response.success) {
        await fetchPrograms()
        setIsAddDialogOpen(false)
      } else {
        alert(response.message || "Failed to create program")
      }
    } catch (error) {
      console.error("Error creating program:", error)
      alert("Failed to create program. Please try again.")
    }
  }

  const handleEditProgram = async (updatedProgram: any) => {
    try {
      const formData = new FormData()
      formData.append('level', updatedProgram.level)
      formData.append('type', updatedProgram.type)
      if (updatedProgram.otherType) formData.append('otherType', updatedProgram.otherType)
      formData.append('name', updatedProgram.name)
      formData.append('code', updatedProgram.code)
      
      const dept = departments.find(d => d.name === updatedProgram.department)
      if (dept) formData.append('departmentId', dept.id.toString())
      
      if (updatedProgram.parentalDepartment) formData.append('parentalDepartment', updatedProgram.parentalDepartment)
      formData.append('sanctionedIntake', updatedProgram.sanctionedIntake.toString())
      formData.append('commencementYear', updatedProgram.commencementYear || '')
      if (updatedProgram.aicteApprovalYear) formData.append('aicteApprovalYear', updatedProgram.aicteApprovalYear)
      if (updatedProgram.aicteApprovalDoc instanceof File) {
        formData.append('aicteApprovalDoc', updatedProgram.aicteApprovalDoc)
      }
      formData.append('intakeChanged', updatedProgram.intakeChanged || 'No')
      if (updatedProgram.intakeChanged === 'Yes' && updatedProgram.newIntake) {
        formData.append('newIntake', updatedProgram.newIntake.toString())
      }
      if (updatedProgram.intakeChangeDoc instanceof File) {
        formData.append('intakeChangeDoc', updatedProgram.intakeChangeDoc)
      }
      if (updatedProgram.accreditationStatus) formData.append('accreditationStatus', updatedProgram.accreditationStatus)
      if (updatedProgram.accreditationFile instanceof File) {
        formData.append('accreditationFile', updatedProgram.accreditationFile)
      }
      formData.append('duration', updatedProgram.duration.toString())
      if (updatedProgram.totalCredits) formData.append('totalCredits', updatedProgram.totalCredits.toString())

      const response = await programsApi.update(currentProgram.id, formData)
      if (response.success) {
        await fetchPrograms()
        setIsEditDialogOpen(false)
      } else {
        alert(response.message || "Failed to update program")
      }
    } catch (error) {
      console.error("Error updating program:", error)
      alert("Failed to update program. Please try again.")
    }
  }

  const handleDeleteProgram = async (id: number) => {
    try {
      const response = await programsApi.deactivate(id)
      if (response.success) {
        await fetchPrograms()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to deactivate program")
      }
    } catch (error) {
      console.error("Error deactivating program:", error)
      alert("Failed to deactivate program. Please try again.")
    }
  }

  const handleReactivateProgram = async (id: number) => {
    try {
      const response = await programsApi.reactivate(id)
      if (response.success) {
        await fetchPrograms()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to reactivate program")
      }
    } catch (error) {
      console.error("Error reactivating program:", error)
      alert("Failed to reactivate program. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading programs...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Management</h1>
          <p className="text-muted-foreground">Manage academic programs, codes, and accreditation status</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add New Program</DialogTitle>
              <DialogDescription>Fill in the details to add a new academic program.</DialogDescription>
            </DialogHeader>
            <ProgramForm onSubmit={handleAddProgram} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search programs..."
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
              <TableHead>Program Level</TableHead>
              <TableHead>Program Type</TableHead>
              <TableHead>Program Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Intake</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPrograms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No programs found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPrograms.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>{program.level}</TableCell>
                  <TableCell>{program.type}</TableCell>
                  <TableCell className="font-medium">{program.name}</TableCell>
                  <TableCell>{program.department_name}</TableCell>
                  <TableCell>
                    {program.intake_changed === "Yes" ? (
                      <div>
                        <span className="line-through">{program.sanctioned_intake}</span> → {program.new_intake}
                      </div>
                    ) : (
                      program.sanctioned_intake
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={program.is_active ? "default" : "secondary"}>
                      {program.is_active ? "Active" : "Inactive"}
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
                            setCurrentProgram(program)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProgram({
                              ...program,
                              department: program.department_name,
                              parentalDepartment: program.parental_department,
                              sanctionedIntake: program.sanctioned_intake,
                              commencementYear: program.commencement_year?.toString(),
                              aicteApprovalYear: program.aicte_approval_year?.toString(),
                              aicteApprovalDoc: program.aicte_approval_doc_path,
                              intakeChanged: program.intake_changed,
                              newIntake: program.new_intake,
                              intakeChangeDoc: program.intake_change_doc_path,
                              accreditationStatus: program.accreditation_status,
                              accreditationFile: program.accreditation_file_path,
                              totalCredits: program.total_credits?.toString(),
                            })
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProgram(program)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {program.is_active ? "Deactivate" : "Activate"}
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

      {/* View Program Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Program Details</DialogTitle>
            <DialogDescription>Detailed information about the program.</DialogDescription>
          </DialogHeader>
          {currentProgram && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Program Level</Label>
                      <div>{currentProgram.level}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Program Type</Label>
                      <div>{currentProgram.type}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Program Name</Label>
                      <div>{currentProgram.name}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Program Code</Label>
                      <div>{currentProgram.code}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Department</Label>
                      <div>{currentProgram.department_name}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Parental Department</Label>
                      <div>{currentProgram.parental_department || "N/A"}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Approval & Accreditation</h3>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Commencement Year</Label>
                      <div>{currentProgram.commencement_year || "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">AICTE Approval Year</Label>
                      <div>{currentProgram.aicte_approval_year || "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">AICTE Approval Doc</Label>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {currentProgram.aicte_approval_doc_path ? currentProgram.aicte_approval_doc_path.split('/').pop() : "N/A"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Accreditation Status</Label>
                      <div>{currentProgram.accreditation_status || "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Accreditation File</Label>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {currentProgram.accreditation_file_path ? currentProgram.accreditation_file_path.split('/').pop() : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Intake Information</h3>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Sanctioned Intake</Label>
                      <div>{currentProgram.sanctioned_intake}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Intake Changed</Label>
                      <div>{currentProgram.intake_changed}</div>
                    </div>
                    {currentProgram.intake_changed === "Yes" && (
                      <>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label className="text-right">New Intake</Label>
                          <div>{currentProgram.new_intake}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label className="text-right">Supporting Document</Label>
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            {currentProgram.intake_change_doc_path ? currentProgram.intake_change_doc_path.split('/').pop() : "N/A"}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Program Structure</h3>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Program Duration</Label>
                      <div>{currentProgram.duration} years</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Total Credits</Label>
                      <div>{currentProgram.total_credits || "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div>
                        <Badge variant={currentProgram.is_active ? "default" : "secondary"}>
                          {currentProgram.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
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

      {/* Edit Program Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
            <DialogDescription>Update the program details.</DialogDescription>
          </DialogHeader>
          {currentProgram && (
            <ProgramForm
              program={currentProgram}
              onSubmit={handleEditProgram}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Program Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentProgram?.is_active ? "Deactivate" : "Activate"} Program</DialogTitle>
            <DialogDescription>
              {currentProgram?.is_active
                ? "This will deactivate the program. It can be reactivated later."
                : "This will reactivate the program."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentProgram?.is_active ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">
                {currentProgram?.name} ({currentProgram?.code})
              </span>
              ?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentProgram?.is_active ? "destructive" : "default"}
              onClick={() => {
                if (currentProgram?.is_active) {
                  handleDeleteProgram(currentProgram?.id)
                } else {
                  handleReactivateProgram(currentProgram?.id)
                }
              }}
            >
              {currentProgram?.is_active ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
