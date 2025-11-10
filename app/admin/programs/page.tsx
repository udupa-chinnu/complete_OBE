"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react"
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
import { ProgramForm } from "@/components/program-form"

// Sample data for programs
const initialPrograms = [
  {
    id: 1,
    level: "UG",
    type: "B.Tech",
    name: "Computer Science Engineering",
    code: "B.Tech-CSE",
    department: "Computer Science Engineering",
    parentalDepartment: "Computer Science Engineering",
    sanctionedIntake: 120,
    commencementYear: 2005,
    aicteApprovalYear: 2005,
    aicteApprovalDoc: "aicte-approval-cse.pdf",
    intakeChanged: "No",
    newIntake: null,
    intakeChangeDoc: null,
    accreditationStatus: "NBA Accredited",
    accreditationFile: "nba-cse.pdf",
    duration: 4,
    totalCredits: 180,
    status: "active",
  },
  {
    id: 2,
    level: "PG",
    type: "M.Tech",
    name: "Computer Science Engineering",
    code: "M.Tech-CSE",
    department: "Computer Science Engineering",
    parentalDepartment: "Computer Science Engineering",
    sanctionedIntake: 30,
    commencementYear: 2010,
    aicteApprovalYear: 2010,
    aicteApprovalDoc: "aicte-approval-mtech-cse.pdf",
    intakeChanged: "No",
    newIntake: null,
    intakeChangeDoc: null,
    accreditationStatus: "NBA Accredited",
    accreditationFile: "nba-mtech-cse.pdf",
    duration: 2,
    totalCredits: 90,
    status: "active",
  },
  {
    id: 3,
    level: "UG",
    type: "B.Tech",
    name: "Information Science Engineering",
    code: "B.Tech-ISE",
    department: "Information Science Engineering",
    parentalDepartment: "Information Science Engineering",
    sanctionedIntake: 60,
    commencementYear: 2008,
    aicteApprovalYear: 2008,
    aicteApprovalDoc: "aicte-approval-ise.pdf",
    intakeChanged: "Yes",
    newIntake: 120,
    intakeChangeDoc: "intake-change-ise.pdf",
    accreditationStatus: "NAAC Accredited",
    accreditationFile: "naac-ise.pdf",
    duration: 4,
    totalCredits: 180,
    status: "active",
  },
  {
    id: 4,
    level: "UG",
    type: "B.Tech",
    name: "Electronics & Communication",
    code: "B.Tech-ECE",
    department: "Electronics & Communication",
    parentalDepartment: "Electronics & Communication",
    sanctionedIntake: 60,
    commencementYear: 2003,
    aicteApprovalYear: 2003,
    aicteApprovalDoc: "aicte-approval-ece.pdf",
    intakeChanged: "No",
    newIntake: null,
    intakeChangeDoc: null,
    accreditationStatus: "NBA Accredited",
    accreditationFile: "nba-ece.pdf",
    duration: 4,
    totalCredits: 180,
    status: "inactive",
  },
]

export default function ProgramsPage() {
  const [programs, setPrograms] = useState(initialPrograms)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProgram, setCurrentProgram] = useState<any>(null)

  // Filter programs based on search term
  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProgram = (newProgram: any) => {
    const programWithId = {
      ...newProgram,
      id: programs.length + 1,
      status: "active",
    }
    setPrograms([...programs, programWithId])
    setIsAddDialogOpen(false)
  }

  const handleEditProgram = (updatedProgram: any) => {
    setPrograms(programs.map((program) => (program.id === updatedProgram.id ? updatedProgram : program)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteProgram = (id: number) => {
    setPrograms(
      programs.map((program) =>
        program.id === id ? { ...program, status: program.status === "active" ? "inactive" : "active" } : program,
      ),
    )
    setIsDeleteDialogOpen(false)
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
                  <TableCell>{program.department}</TableCell>
                  <TableCell>
                    {program.intakeChanged === "Yes" ? (
                      <div>
                        <span className="line-through">{program.sanctionedIntake}</span> → {program.newIntake}
                      </div>
                    ) : (
                      program.sanctionedIntake
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={program.status === "active" ? "default" : "secondary"}>
                      {program.status === "active" ? "Active" : "Inactive"}
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
                            setCurrentProgram(program)
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
                          {program.status === "active" ? "Deactivate" : "Activate"}
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
                      <div>{currentProgram.department}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Parental Department</Label>
                      <div>{currentProgram.parentalDepartment}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Approval & Accreditation</h3>
                  <div className="mt-2 space-y-2">
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Commencement Year</Label>
                      <div>{currentProgram.commencementYear}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">AICTE Approval Year</Label>
                      <div>{currentProgram.aicteApprovalYear}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">AICTE Approval Doc</Label>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {currentProgram.aicteApprovalDoc}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Accreditation Status</Label>
                      <div>{currentProgram.accreditationStatus}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Accreditation File</Label>
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {currentProgram.accreditationFile}
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
                      <div>{currentProgram.sanctionedIntake}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Intake Changed</Label>
                      <div>{currentProgram.intakeChanged}</div>
                    </div>
                    {currentProgram.intakeChanged === "Yes" && (
                      <>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label className="text-right">New Intake</Label>
                          <div>{currentProgram.newIntake}</div>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                          <Label className="text-right">Supporting Document</Label>
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            {currentProgram.intakeChangeDoc}
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
                      <div>{currentProgram.totalCredits}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <div>
                        <Badge variant={currentProgram.status === "active" ? "default" : "secondary"}>
                          {currentProgram.status === "active" ? "Active" : "Inactive"}
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
            <DialogTitle>{currentProgram?.status === "active" ? "Deactivate" : "Activate"} Program</DialogTitle>
            <DialogDescription>
              {currentProgram?.status === "active"
                ? "This will deactivate the program. It can be reactivated later."
                : "This will reactivate the program."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentProgram?.status === "active" ? "deactivate" : "activate"}{" "}
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
              variant={currentProgram?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteProgram(currentProgram?.id)}
            >
              {currentProgram?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
