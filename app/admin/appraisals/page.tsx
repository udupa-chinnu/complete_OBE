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
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

// Sample data for appraisals
const initialAppraisals = [
  {
    id: 1,
    name: "FACULTY PERFORMANCE MANAGEMENT SYSTEM PART-A",
    type: "COMMON FOR ALL",
    year: "2024-25",
    description:
      "Comprehensive faculty performance evaluation system covering teaching, research, and administrative contributions.",
    createdBy: "Admin User",
    createdDate: "2023-1-15",
    status: "active",
  },
  {
    id: 2,
    name: "PERFORMANCE BASED APPRAISAL SYSTEM FOR ASSISTANT PROFESSOR PART-B",
    type: "Assistant Professor",
    year: "2024-25",
    description:
      "Point-based appraisal system for assistant professors with sections for academic activities, research, and institutional contributions.",
    createdBy: "Admin User",
    createdDate: "2023-06-10",
    status: "active",
  },
]

export default function AppraisalsPage() {
  const [appraisals, setAppraisals] = useState(initialAppraisals)
  const [searchTerm, setSearchTerm] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAppraisal, setCurrentAppraisal] = useState<any>(null)

  // Filter appraisals based on search term
  const filteredAppraisals = appraisals.filter(
    (appraisal) =>
      appraisal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appraisal.year.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteAppraisal = (id: number) => {
    setAppraisals(
      appraisals.map((appraisal) =>
        appraisal.id === id
          ? { ...appraisal, status: appraisal.status === "active" ? "inactive" : "active" }
          : appraisal,
      ),
    )
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appraisal Structure Management</h1>
          <p className="text-muted-foreground">Configure and manage faculty appraisal structures</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search appraisals..."
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
              <TableHead>Appraisal Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppraisals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No appraisals found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAppraisals.map((appraisal) => (
                <TableRow key={appraisal.id}>
                  <TableCell className="font-medium">{appraisal.name}</TableCell>
                  <TableCell>{appraisal.type}</TableCell>
                  <TableCell>{appraisal.year}</TableCell>
                  <TableCell>{appraisal.createdBy}</TableCell>
                  <TableCell>{new Date(appraisal.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={appraisal.status === "active" ? "default" : "secondary"}>
                      {appraisal.status === "active" ? "Active" : "Inactive"}
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
                            setCurrentAppraisal(appraisal)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentAppraisal(appraisal)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentAppraisal(appraisal)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {appraisal.status === "active" ? "Deactivate" : "Activate"}
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

      {/* View Appraisal Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Appraisal Structure Details</DialogTitle>
            <DialogDescription>Detailed information about the appraisal structure.</DialogDescription>
          </DialogHeader>
          {currentAppraisal && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Appraisal Name</Label>
                  <p>{currentAppraisal.name}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Type</Label>
                  <p>{currentAppraisal.type}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Year</Label>
                  <p>{currentAppraisal.year}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Status</Label>
                  <p>
                    <Badge variant={currentAppraisal.status === "active" ? "default" : "secondary"}>
                      {currentAppraisal.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm">{currentAppraisal.description}</p>
              </div>

              {currentAppraisal.id === 1 ? <FacultyPerformancePartA /> : <PerformanceBasedPartB />}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Created By</Label>
                  <p>{currentAppraisal.createdBy}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Created Date</Label>
                  <p>{new Date(currentAppraisal.createdDate).toLocaleDateString()}</p>
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

      {/* Edit Appraisal Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Appraisal Structure</DialogTitle>
            <DialogDescription>Update the appraisal structure details.</DialogDescription>
          </DialogHeader>
          {currentAppraisal && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Appraisal Name
                  </Label>
                  <Input id="name" defaultValue={currentAppraisal.name} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Type
                  </Label>
                  <Input id="type" defaultValue={currentAppraisal.type} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="year" className="text-sm font-medium">
                    Year
                  </Label>
                  <Input id="year" defaultValue={currentAppraisal.year} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Input id="description" defaultValue={currentAppraisal.description} />
                </div>
              </div>

              {currentAppraisal.id === 1 ? (
                <FacultyPerformancePartA isEditable={true} />
              ) : (
                <PerformanceBasedPartB isEditable={true} />
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Appraisal Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentAppraisal?.status === "active" ? "Deactivate" : "Activate"} Appraisal</DialogTitle>
            <DialogDescription>
              {currentAppraisal?.status === "active"
                ? "This will deactivate the appraisal structure. It can be reactivated later."
                : "This will reactivate the appraisal structure."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentAppraisal?.status === "active" ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">{currentAppraisal?.name}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentAppraisal?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteAppraisal(currentAppraisal?.id)}
            >
              {currentAppraisal?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FacultyPerformancePartA({ isEditable = false }: { isEditable?: boolean }) {
  const [sections, setSections] = useState([
    {
      id: "faculty-info",
      title: "Faculty Information",
      fields: [
        { id: "name", label: "Name of the Faculty" },
        { id: "education", label: "Educational Qualification" },
        { id: "department", label: "Department" },
        { id: "designation", label: "Designation" },
        { id: "joining-date", label: "Date of Joining" },
      ],
    },
    {
      id: "subjects-handled",
      title: "I. Subjects Handled by the Faculty Member (Theory/Lab)",
      fields: [
        { id: "semester", label: "Semester" },
        { id: "course-code", label: "Course Code" },
        { id: "theory-lab", label: "Theory/Lab" },
        { id: "course-title", label: "Course Title" },
        { id: "credits", label: "No. of Credits" },
        { id: "hours-allotted", label: "No. of Hours Allotted" },
        { id: "hours-handled", label: "No. of Hours Handled" },
        { id: "hod-remarks-1", label: "HoD's Remarks" },
      ],
    },
    {
      id: "result-analysis",
      title: "II. Result Analysis of the Subjects Handled",
      fields: [
        { id: "sl-no-2", label: "S. No." },
        { id: "course-code-2", label: "Course Code" },
        { id: "total-students", label: "Total No. of Students" },
        { id: "students-passed", label: "No. of Students Passed" },
        { id: "pass-percentage", label: "% Pass" },
        { id: "marks-above-75", label: "No. of Students Passed With % Marks > 75" },
        { id: "marks-60-75", label: "No. of Students Passed With % Marks 60–75" },
        { id: "marks-50-60", label: "No. of Students Passed With % Marks 50–60" },
        { id: "marks-40-50", label: "No. of Students Passed With % Marks 40–50" },
        { id: "hod-remarks-2", label: "HoD's Remarks" },
      ],
    },
    {
      id: "student-projects",
      title: "III. Details of Student Projects Handled",
      fields: [
        { id: "batch", label: "Batch" },
        { id: "no-of-students", label: "No. of Students" },
        { id: "project-title", label: "Project Title" },
        { id: "recognition", label: "Recognition/Awards/Funding" },
      ],
    },
    {
      id: "student-feedback",
      title: "IV. Summary of Student Feedback on Subjects Taught",
      fields: [
        { id: "sl-no-4", label: "S. No." },
        { id: "semester-4", label: "Semester" },
        { id: "course-code-4", label: "Course Code" },
        { id: "theory-lab-4", label: "Theory/Lab" },
        { id: "feedback-1", label: "Feedback (%) 1st" },
        { id: "feedback-2", label: "Feedback (%) 2nd" },
        { id: "average", label: "Average" },
      ],
    },
    {
      id: "learning-resources",
      title: "V. Learning Resources and Materials Developed",
      fields: [
        { id: "sl-no-5", label: "S. No." },
        { id: "subject-code", label: "Subject Code" },
        { id: "course-lab-name", label: "Title of Course/Lab Name" },
        { id: "unit-no", label: "Unit No." },
        { id: "resource-nature", label: "Nature of Resource/Material" },
      ],
    },
    {
      id: "academic-activities",
      title: "VI. Academic Activities Participated or Conducted",
      fields: [
        { id: "sl-no-6", label: "S. No." },
        { id: "event-description", label: "Description of the Event" },
        { id: "venue", label: "Venue" },
        { id: "date", label: "Date" },
        { id: "participated-conducted", label: "Participated/Conducted" },
      ],
    },
    {
      id: "funding",
      title: "VII. Funding for Sponsored Research/Consultancy/Seminars/Workshops",
      fields: [
        { id: "sl-no-7", label: "S. No." },
        { id: "project-description", label: "Description of the Project" },
        { id: "amount", label: "Amount (Rs.)" },
        { id: "funding-agency", label: "Funding Agency" },
        { id: "duration", label: "Duration" },
      ],
    },
    {
      id: "research-publications",
      title: "VIII. Research Publications",
      fields: [
        { id: "sl-no-8", label: "S. No." },
        { id: "journal-conference", label: "Journal/Conference" },
        { id: "publication-details", label: "Publication Details (Citation)" },
        { id: "impact-factor", label: "Impact Factor" },
      ],
    },
    {
      id: "institutional-governance",
      title: "IX. Institutional Governance and Administration Contributions",
      fields: [
        { id: "sl-no-9", label: "S. No." },
        { id: "role", label: "Role" },
        { id: "duration-9", label: "Duration" },
        { id: "achievements", label: "Achievements" },
        { id: "hod-remarks-9", label: "Remarks by HoD" },
      ],
    },
    {
      id: "affiliation-accreditation",
      title: "X. Affiliation and Accreditation Document Submission",
      fields: [
        { id: "sl-no-10", label: "S. No." },
        { id: "relevant-documents", label: "Relevant Documents" },
        { id: "completion-percentage", label: "% of Completion on Time" },
        { id: "hod-remarks-10", label: "Remarks by HoD" },
      ],
    },
    {
      id: "examination-work",
      title: "XI. Examination Work (BoE/Scrutiny/QP Setting/Valuation etc.)",
      fields: [
        { id: "sl-no-11", label: "S. No." },
        { id: "work-nature", label: "Role/Nature of Work Carried out" },
        { id: "relevant-documents-11", label: "Relevant Documents" },
        { id: "work-completion", label: "% of Work Completed on Time" },
        { id: "hod-remarks-11", label: "Remarks by HoD" },
      ],
    },
    {
      id: "student-placement",
      title: "XII. Support/Assistance for Student Placement/Internship",
      fields: [
        { id: "sl-no-12", label: "Sl. No." },
        { id: "student-usn", label: "Student USN" },
        { id: "student-name", label: "Name of Student" },
        { id: "placement-internship", label: "Placement/Internship" },
        { id: "assistance-type", label: "Type of Assistance" },
        { id: "company-contact", label: "Name of Company/Contact Person" },
        { id: "hod-remarks-12", label: "Remarks by HoD" },
      ],
    },
    {
      id: "additional-remarks",
      title: "XIII. Additional Remarks by HoD (if any)",
      fields: [{ id: "hod-additional-remarks", label: "Additional Remarks by HoD" }],
    },
    {
      id: "signatures",
      title: "Signatures",
      fields: [
        { id: "faculty-signature", label: "Signature of the Faculty Member" },
        { id: "faculty-date", label: "Date (Faculty Member)" },
        { id: "hod-signature", label: "Signature of the HoD" },
        { id: "hod-date", label: "Date (HoD)" },
      ],
    },
  ])

  const handleAddField = (sectionId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: [...section.fields, { id: `new-field-${Date.now()}`, label: "New Field" }],
          }
        }
        return section
      }),
    )
  }

  const handleDeleteField = (sectionId: string, fieldId: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.filter((field) => field.id !== fieldId),
          }
        }
        return section
      }),
    )
  }

  const handleEditField = (sectionId: string, fieldId: string, newLabel: string) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            fields: section.fields.map((field) => {
              if (field.id === fieldId) {
                return { ...field, label: newLabel }
              }
              return field
            }),
          }
        }
        return section
      }),
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">FACULTY PERFORMANCE MANAGEMENT SYSTEM PART-A</h2>
      <p className="text-md font-medium">TYPE: COMMON FOR ALL</p>

      {sections.map((section) => (
        <div key={section.id} className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">{section.title}</h3>
          <div className="rounded-md border">
            <Table>
              <TableBody>
                {section.fields.map((field) => (
                  <TableRow key={field.id} className="border-b">
                    <TableCell className="font-medium border-r w-1/2">
                      {isEditable ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={field.label}
                            onChange={(e) => handleEditField(section.id, field.id, e.target.value)}
                            className="min-w-[300px]"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteField(section.id, field.id)}
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        field.label
                      )}
                    </TableCell>
                    <TableCell className="w-1/2">
                      {isEditable ? (
                        <Input disabled placeholder="Value will be entered by user" />
                      ) : (
                        <div className="h-6"></div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {isEditable && (
            <Button variant="outline" size="sm" onClick={() => handleAddField(section.id)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

function PerformanceBasedPartB({ isEditable = false }: { isEditable?: boolean }) {
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  // State for innovative assignments
  const [innovativeAssignments, setInnovativeAssignments] = useState([
    { id: 1, idea: "", assignments: "", details: "" },
  ])

  // State for innovative methodologies
  const [innovativeMethodologies, setInnovativeMethodologies] = useState([
    { id: 1, methodology: "", tools: "", details: "" },
  ])

  // Add row functions
  const addAssignmentRow = () => {
    const newId = innovativeAssignments.length + 1
    setInnovativeAssignments([...innovativeAssignments, { id: newId, idea: "", assignments: "", details: "" }])
  }

  const addMethodologyRow = () => {
    const newId = innovativeMethodologies.length + 1
    setInnovativeMethodologies([...innovativeMethodologies, { id: newId, methodology: "", tools: "", details: "" }])
  }

  // Delete row functions
  const deleteAssignmentRow = (id: number) => {
    if (innovativeAssignments.length > 1) {
      setInnovativeAssignments(innovativeAssignments.filter((row) => row.id !== id))
    }
  }

  const deleteMethodologyRow = (id: number) => {
    if (innovativeMethodologies.length > 1) {
      setInnovativeMethodologies(innovativeMethodologies.filter((row) => row.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">PERFORMANCE BASED APPRAISAL SYSTEM FOR ASSISTANT PROFESSOR PART-B</h2>

      {/* Self Assessment Period */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Self Assessment Report Period</h3>
        <div className="flex gap-4 items-center">
          <div className="space-y-1">
            <Label>From Date</Label>
            <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} disabled={!isEditable} />
          </div>
          <div className="space-y-1">
            <Label>To Date</Label>
            <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} disabled={!isEditable} />
          </div>
        </div>
      </div>

      {/* SECTION A: ACADEMIC ACTIVITIES */}
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead colSpan={5} className="text-center font-bold">
                  SECTION A: ACADEMIC ACTIVITIES (200 Points)
                </TableHead>
              </TableRow>
              <TableRow className="bg-gray-100">
                <TableHead colSpan={5} className="text-center font-bold">
                  A1. EVEN SEMESTER 2024-25 (100 Points)
                </TableHead>
              </TableRow>
              <TableRow className="bg-gray-100">
                <TableHead colSpan={5} className="text-center font-bold">
                  TEACHING WORKLOAD - SUBJECTS AND LABS
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="border-r">No.</TableHead>
                <TableHead className="border-r">Component</TableHead>
                <TableHead className="border-r">Max. Points</TableHead>
                <TableHead className="border-r">Points Earned</TableHead>
                <TableHead>Points by HOD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* SUBJECT 1 */}
              <TableRow>
                <TableCell className="border-r">1.</TableCell>
                <TableCell className="border-r font-bold">SUBJECT 1:</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">a)</TableCell>
                <TableCell className="border-r">Classes Taken: ___ Hrs.</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">b)</TableCell>
                <TableCell className="border-r">Allotted (N*): ___ Hrs.</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r" colSpan={2}>
                  [Points = (No. of classes taken/N*) x 10]
                </TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r">% Results [Points = %Pass x 0.05]</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r">Student Feedback [Points = (% Feedback Score - 50) x 0.2]</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* SUBJECT 2 */}
              <TableRow>
                <TableCell className="border-r">2.</TableCell>
                <TableCell className="border-r font-bold">SUBJECT 2:</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">a)</TableCell>
                <TableCell className="border-r">Classes Taken: ___ Hrs.</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">b)</TableCell>
                <TableCell className="border-r">Allotted (N*): ___ Hrs.</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r" colSpan={2}>
                  [Points = (No. of classes taken/N*) x 10]
                </TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r">% Results [Points = %Pass x 0.05]</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r">Student Feedback [Points = (% Feedback Score - 50) x 0.2]</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* LABORATORY */}
              <TableRow>
                <TableCell className="border-r">3.</TableCell>
                <TableCell className="border-r font-bold">LABORATORY</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r">No. of Hours of labs taken</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r" colSpan={2}>
                  [Points = (No. of Hours of labs taken/N*) x 5]
                </TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r">% Results [Points = %Pass x 0.05]</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r">Student Feedback [Points = (% Feedback Score - 50) x 0.2]</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>

              {/* Other items */}
              <TableRow>
                <TableCell className="border-r">4.</TableCell>
                <TableCell className="border-r">Academic Record Keeping (OBE/NBA/NAAC/VTU/LIC Etc.)</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">5.</TableCell>
                <TableCell className="border-r">
                  Laboratory Established/Lab. Instruction Manuals developed/Introducing Design based Experiments (Case
                  Studies/Data Collections/Analysis for MBA)
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">6.</TableCell>
                <TableCell className="border-r">Innovative Assignments given to Students (Mention below)</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Innovative Assignments Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-r">Sl. No.</TableHead>
                <TableHead className="border-r">Innovative Idea</TableHead>
                <TableHead className="border-r">No of Assignments</TableHead>
                <TableHead className={isEditable ? "border-r" : ""}>Details</TableHead>
                {isEditable && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {innovativeAssignments.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="border-r">{row.id}.</TableCell>
                  <TableCell className="border-r">
                    {isEditable ? (
                      <Input
                        value={row.idea}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, idea: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                      />
                    ) : (
                      row.idea || ""
                    )}
                  </TableCell>
                  <TableCell className="border-r">
                    {isEditable ? (
                      <Input
                        value={row.assignments}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, assignments: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                      />
                    ) : (
                      row.assignments || ""
                    )}
                  </TableCell>
                  <TableCell className={isEditable ? "border-r" : ""}>
                    {isEditable ? (
                      <Input
                        value={row.details}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, details: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                      />
                    ) : (
                      row.details || ""
                    )}
                  </TableCell>
                  {isEditable && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteAssignmentRow(row.id)}
                        disabled={innovativeAssignments.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {isEditable && (
          <Button variant="outline" size="sm" onClick={addAssignmentRow}>
            <Plus className="mr-2 h-4 w-4" />
            Add Assignment Row
          </Button>
        )}

        <div className="rounded-md border">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="border-r">7.</TableCell>
                <TableCell className="border-r">
                  Innovative Teaching Methodologies incorporated (Mention below)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Innovative Teaching Methodologies Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-r">Sl. No.</TableHead>
                <TableHead className="border-r">Innovative Methodology</TableHead>
                <TableHead className="border-r">Tools</TableHead>
                <TableHead className={isEditable ? "border-r" : ""}>Details</TableHead>
                {isEditable && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {innovativeMethodologies.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="border-r">{row.id}.</TableCell>
                  <TableCell className="border-r">
                    {isEditable ? (
                      <Input
                        value={row.methodology}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, methodology: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                      />
                    ) : (
                      row.methodology || ""
                    )}
                  </TableCell>
                  <TableCell className="border-r">
                    {isEditable ? (
                      <Input
                        value={row.tools}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, tools: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                      />
                    ) : (
                      row.tools || ""
                    )}
                  </TableCell>
                  <TableCell className={isEditable ? "border-r" : ""}>
                    {isEditable ? (
                      <Input
                        value={row.details}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, details: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                      />
                    ) : (
                      row.details || ""
                    )}
                  </TableCell>
                  {isEditable && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMethodologyRow(row.id)}
                        disabled={innovativeMethodologies.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {isEditable && (
          <Button variant="outline" size="sm" onClick={addMethodologyRow}>
            <Plus className="mr-2 h-4 w-4" />
            Add Methodology Row
          </Button>
        )}

        <div className="rounded-md border">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="border-r" colSpan={2}>
                  <span className="font-bold">Total</span>
                </TableCell>
                <TableCell className="border-r">100</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm font-medium">Formula</p>
          <p className="text-sm">Average Points Earned = (Points awarded by HoD / Maximum Points) × 100</p>
        </div>
      </div>

      {/* Rest of the sections remain the same but with border-r added to cells */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Section B: Research and Development, Publication Professional Development (200 points)
        </h3>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-r">Sl. No.</TableHead>
                <TableHead className="border-r">Component</TableHead>
                <TableHead className="border-r">Max. Points</TableHead>
                <TableHead className="border-r">Points Earned</TableHead>
                <TableHead>Points by HOD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="font-medium bg-gray-50">
                  Research & Development section (110 Points)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">1</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Research Proposals Submitted</p>
                  <p className="text-sm">1.5 points per proposal submitted to AICTE/DST/SERB/VGST/VTU, etc.</p>
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">2</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Funds/Grants Received</p>
                  <p className="text-sm">₹&lt;1 Lakh → 2 pts</p>
                  <p className="text-sm">₹1–&lt;2 Lakhs → 4 pts</p>
                  <p className="text-sm">₹2–&lt;4 Lakhs → 8 pts</p>
                  <p className="text-sm">₹4–&lt;8 Lakhs → 12 pts</p>
                  <p className="text-sm">₹8–&lt;12 Lakhs → 16 pts</p>
                  <p className="text-sm">₹≥12 Lakhs → 20 pts</p>
                  <p className="text-sm italic">
                    Notes: 100% for PI, 75% for Co-PI, 50% for key contributors with HoD certification.
                  </p>
                </TableCell>
                <TableCell className="border-r">20</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">3</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">New Product Design & Development</p>
                  <p className="text-sm">Based on innovative ideas and product details</p>
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">4</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Patents (Standard only)</p>
                  <p className="text-sm">Granted: 15 pts</p>
                  <p className="text-sm">First Examination Report response filed: 10 pts</p>
                  <p className="text-sm">Published with allotted number: 5 pts</p>
                </TableCell>
                <TableCell className="border-r">15</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Participation in Incubation/Start-ups/LLPs</p>
                  <p className="text-sm">Role & company name to be listed</p>
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">6</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Consultancy Projects</p>
                  <p className="text-sm">₹&lt;1 Lakh → 2 pts</p>
                  <p className="text-sm">₹1–&lt;2 Lakhs → 4 pts</p>
                  <p className="text-sm">₹2–&lt;4 Lakhs → 6 pts</p>
                  <p className="text-sm">₹4–&lt;6 Lakhs → 8 pts</p>
                  <p className="text-sm">≥6 Lakhs → 10 pts</p>
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">7</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Organizing Sponsored FDPs/Workshops/Seminars</p>
                  <p className="text-sm">Must organize at least 2</p>
                  <p className="text-sm">Info needed: Name, date, number of participants</p>
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">8</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">UG/PG Student Projects Guided</p>
                  <p className="text-sm">10 points for every UG project</p>
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">9</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Sponsored Students Projects Guided</p>
                  <p className="text-sm">(KSCST/VTU/Elevate funding/any other)</p>
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Ph.D Related Activities</p>
                  <p className="text-sm">
                    Whether registered for Ph.D. (only for the year in which faculty has registered): 5 points
                  </p>
                  <p className="text-sm">Whether completed comprehensive viva-voce: 10 points</p>
                  <p className="text-sm">Whether thesis submitted/viva completed: 15 points</p>
                  <p className="text-sm">
                    If guiding research scholars, the score will be same as for associate professor
                  </p>
                </TableCell>
                <TableCell className="border-r">15</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">11</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Member of Doctoral Committee/BoE/BoS/LIC</p>
                  <p className="text-sm">In VTU</p>
                  <p className="text-sm">Any other universities</p>
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} className="text-right font-medium border-r">
                  Total
                </TableCell>
                <TableCell className="border-r">110</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={5} className="font-medium bg-gray-50">
                  Publications section (60 points)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">1</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Publication in Journals</p>
                  <p className="text-sm">SCI/Q1/ABDC A*: 20 points</p>
                  <p className="text-sm">SCIE/Q2/Q3/ABDC A: 15 points</p>
                  <p className="text-sm">ESCI/Q4/ABDC B: 10 points</p>
                  <p className="text-sm">Non-indexed (max 5 points): 5 points</p>
                  <p className="text-sm italic">Guidelines:</p>
                  <p className="text-sm">1st author/corresponding author = 100% points</p>
                  <p className="text-sm">remaining author = 50% points</p>
                  <p className="text-sm">all publications with SCEM affiliation only will be considered</p>
                </TableCell>
                <TableCell className="border-r">20</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">2</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">International/National Conference Papers Published</p>
                  <p className="text-sm">Papers presented and proceeding indexed in Scopus: 10 points</p>
                  <p className="text-sm">Papers presented and proceeding not indexed: 5 points</p>
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">3</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Publication of Book Chapters</p>
                  <p className="text-sm">Q1/Q2/Q3 book series: 10 points</p>
                  <p className="text-sm">Scopus indexed: 5 points</p>
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">4</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Publication of Scopus Indexed Book</p>
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">Reviewer for Journal Paper</p>
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">6</TableCell>
                <TableCell className="border-r">
                  <p className="font-medium">
                    Chairing Session on Invitation/Invited Speaker/Keynote Speaker/Resource Person/Session Chair
                  </p>
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} className="text-right font-medium border-r">
                  Total
                </TableCell>
                <TableCell className="border-r">60</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={5} className="font-medium bg-gray-50">
                  Professional Development (30 Points Max)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">1</TableCell>
                <TableCell className="border-r">Membership of Professional body (any TWO)</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">2</TableCell>
                <TableCell className="border-r">
                  Participation in In-house FDPs/Workshops/Seminars (1 point for each day)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">3</TableCell>
                <TableCell className="border-r">
                  Participation in FDPs/ATAL/AICTE outside College (2 points for each day)
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">4</TableCell>
                <TableCell className="border-r">
                  Members of Networking Clubs – Rotary, Lions, JCI, Toastmasters, etc.
                </TableCell>
                <TableCell className="border-r">2</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r">
                  Certification Courses – MOOCs (4 points for 40 hours/3 credits)
                </TableCell>
                <TableCell className="border-r">8</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} className="text-right font-medium border-r">
                  Total
                </TableCell>
                <TableCell className="border-r">30</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* SECTION C: DEPARTMENTAL AND INSTITUTIONAL ACTIVITIES */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          Section C: Departmental and Institutional Activities (100 Points Max)
        </h3>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-r">Sl. No.</TableHead>
                <TableHead className="border-r">Component</TableHead>
                <TableHead className="border-r">Max. Points</TableHead>
                <TableHead className="border-r">Points Earned</TableHead>
                <TableHead>Points by HOD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="font-medium bg-gray-50">
                  Departmental Activities (70 Points Max)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">1</TableCell>
                <TableCell className="border-r">
                  Internship Support (Independently without support of college authorities – 2 points per student)
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">2</TableCell>
                <TableCell className="border-r">
                  Inviting Alumni/HR for Placement activities independently (2 points/company, 1 point/student placed)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">3</TableCell>
                <TableCell className="border-r">
                  Industrial Visits (5 points per visit – mention place, date, and no. of students)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">4</TableCell>
                <TableCell className="border-r">Converting Idea into Product/Process (Details)</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r">SSTH/SIP/Whiz-Quiz Coordinators/Others (Attach the letter)</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">6</TableCell>
                <TableCell className="border-r">
                  Mentoring & Motivating students/participation in events at premier institutes/industries (5
                  points/event)
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">7</TableCell>
                <TableCell className="border-r">
                  Coordinating/Participating in Co-Curricular/Outreach Activities (Relevant to AICTE, VTU, MoE
                  Initiatives)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">8</TableCell>
                <TableCell className="border-r">
                  Coordinating/Participating in Extra and Curricular Activities (Sports/Cultural)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">9</TableCell>
                <TableCell className="border-r">
                  Alumni Interaction and Networking with relevant activity (mention)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r">
                  Coordinators/Coordinating – NIRF/AICTE-CII/ARIIA/NAAC/NBA/etc.
                </TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} className="text-right font-medium border-r">
                  Total
                </TableCell>
                <TableCell className="border-r">70</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={5} className="font-medium bg-gray-50">
                  Institutional Activities (30 Points Max)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">1</TableCell>
                <TableCell className="border-r">Institution Branding in Social Media (with evidence)</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">2</TableCell>
                <TableCell className="border-r">
                  Referring quality students to join SCEM through CET/COMEDK/MGMT/PGCET etc. (Details)
                </TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">3</TableCell>
                <TableCell className="border-r">Admission Process Coordination</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">4</TableCell>
                <TableCell className="border-r">Autonomous level Examination activities</TableCell>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">5</TableCell>
                <TableCell className="border-r">Integrity & Team Work (To be Evaluated by HoD)</TableCell>
                <TableCell className="border-r">10</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} className="text-right font-medium border-r">
                  Total
                </TableCell>
                <TableCell className="border-r">30</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PBAS Evaluation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">PBAS Evaluation (Assistant Professors)</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-r">Sl. No.</TableHead>
                <TableHead className="border-r">Evaluation Parameter</TableHead>
                <TableHead className="border-r">Max. Score</TableHead>
                <TableHead className="border-r">Min. Points to be obtained</TableHead>
                <TableHead className="border-r">Points Scored (As per HoD)</TableHead>
                <TableHead>Assessment Screening Committee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="border-r">1</TableCell>
                <TableCell className="border-r">Academic (Teaching, Learning & Feedback)</TableCell>
                <TableCell className="border-r">200</TableCell>
                <TableCell className="border-r">120</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">2</TableCell>
                <TableCell className="border-r">
                  Research & Development, Publications, Professional Development
                </TableCell>
                <TableCell className="border-r">200</TableCell>
                <TableCell className="border-r">70</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="border-r">3</TableCell>
                <TableCell className="border-r">Departmental and Institutional Activities</TableCell>
                <TableCell className="border-r">100</TableCell>
                <TableCell className="border-r">60</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2} className="text-right font-medium border-r">
                  Total
                </TableCell>
                <TableCell className="border-r">500</TableCell>
                <TableCell className="border-r">250</TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Assessment by Evaluators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Assessment by Evaluators</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evaluator</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Signature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Remarks by HoD</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Remarks by Screening/Evaluation Committee</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Remarks by Principal</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-sm font-medium">Note</p>
        <p className="text-sm">Minimum 50% marks required for regular Annual Increment.</p>
      </div>
    </div>
  )
}
