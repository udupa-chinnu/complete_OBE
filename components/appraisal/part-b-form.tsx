"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"

interface InnovativeRow {
  id: string
  idea: string
  assignments: string
  details: string
}

interface MethodologyRow {
  id: string
  methodology: string
  tools: string
  details: string
}

interface AcademicRow {
  id: string
  component: string
  maxPoints: string
  pointsEarned: string
  pointsByHod: string
}

// Helper to create a unique ID for new subjects
const generateId = () => Math.random().toString(36).substr(2, 9)

export default function PartBForm() {
  // --- State for Fixed Input Fields (Section A) ---
  const [formData, setFormData] = useState<Record<string, string>>({})

  // --- State for Dynamic Subjects (Section A) ---
  const [subjects, setSubjects] = useState<{ id: string }[]>([{ id: "sub_1" }])

  // --- State for Dynamic Tables (Section A: Innovative Assignments & Methodologies) ---
  const [innovativeAssignments, setInnovativeAssignments] = useState<InnovativeRow[]>([
    { id: "1", idea: "", assignments: "", details: "" },
  ])

  const [innovativeMethodologies, setInnovativeMethodologies] = useState<MethodologyRow[]>([
    { id: "1", methodology: "", tools: "", details: "" },
  ])

  // --- Section B, C & Others (from second file) ---

  const [research, setResearch] = useState<AcademicRow[]>([
    {
      id: "1",
      component: "Research Proposals Applied for Funding",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
    {
      id: "2",
      component:
        "Funds/Grants Received (Amount < 1 Lakhs: 2 pts, >=1 Lakhs & <2 Lakhs: 4 pts, >=2 Lakhs & <4 Lakhs: 8 pts, etc.)",
      maxPoints: "20",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "3",
      component: "New Product Design & Development",
      maxPoints: "10",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "4",
      component: "Patents (Indian/International - Granted: 15 pts, FER Filed: 10 pts, Published: 5 pts)",
      maxPoints: "15",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "5",
      component: "Participation in Incubation/Start-ups/LLPs",
      maxPoints: "5",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "6",
      component: "Consultancy Projects (Amount thresholds apply)",
      maxPoints: "10",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "7",
      component: "Organizing Sponsored FDP/Workshop/Seminar (At least Two)",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "8",
      component: "Student Academic Projects Guided UG/PG (2 marks for UG, 3 marks for PG)",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
    {
      id: "9",
      component: "Sponsored Students Projects Guided (KSCST/VTU/Elevate Funding/Any Other)",
      maxPoints: "5",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "10",
      component: "Ph. D Related activities (Registered: 5 pts, Viva Complete: 15 pts)",
      maxPoints: "15",
      pointsEarned: "15",
      pointsByHod: "",
    },
    {
      id: "11",
      component: "Member of Doctoral Committee/BOE/BOS/LIC in VTU or Any other Universities",
      maxPoints: "5",
      pointsEarned: "-",
      pointsByHod: "",
    },
  ])

  const [publications, setPublications] = useState<AcademicRow[]>([
    {
      id: "1",
      component:
        "Publications in Journals (SCI/Q1/ABDC-A*: 20, SCIE/Q2/Q3/ABDC-A: 15, ESCI/Q4/ABDC-B: 10, Non-indexed: 5)",
      maxPoints: "20",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "2",
      component: "International/National Conference Papers (Scopus indexed: 10, Not indexed: 5)",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
    {
      id: "3",
      component: "Publication of Book Chapters (Q1/Q2/Q3 Book series: 10, Scopus indexed: 5)",
      maxPoints: "10",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "4",
      component: "Publication of Scopus indexed Book",
      maxPoints: "10",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "5",
      component: "Reviewer for Journal Papers",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "6",
      component: "Chairing session/invited speaker/key Note Speaker/resource person/session chair",
      maxPoints: "5",
      pointsEarned: "-",
      pointsByHod: "",
    },
  ])

  const [professional, setProfessional] = useState<AcademicRow[]>([
    {
      id: "1",
      component: "Membership of Professional body (any TWO)",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "2",
      component: "Participation in In-House FDPs/Workshops/Seminars (One Point for each day)",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "3",
      component: "Participation in FDPs/ATAL/AICTE outside College (Two Points for each day)",
      maxPoints: "10",
      pointsEarned: "6",
      pointsByHod: "",
    },
    {
      id: "4",
      component: "Members of Networking Clubs – Rotary, Lions, JC, Toast masters etc",
      maxPoints: "2",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "5",
      component: "Certification Courses – MOOCs (4 Points For 40 Hours/3 credits)",
      maxPoints: "8",
      pointsEarned: "-",
      pointsByHod: "",
    },
  ])

  const [departmental, setDepartmental] = useState<AcademicRow[]>([
    {
      id: "1",
      component: "Internship Support (Independently without college authorities – 2 Points for Each Student)",
      maxPoints: "10",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "2",
      component: "Inviting Alumni/HR for Placement activities independently",
      maxPoints: "5",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "3",
      component: "Industrial Visits (5 points Per visit)",
      maxPoints: "5",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "4",
      component: "Converting Idea into Product/Process",
      maxPoints: "10",
      pointsEarned: "-",
      pointsByHod: "",
    },
    {
      id: "5",
      component: "SSTH/SIP/Whiz-Quiz Coordinators/Others",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "6",
      component: "Mentoring & Motivating students/participation in events (5 per event)",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
    {
      id: "7",
      component: "Coordinating/Participating in Co-Curricular/Outreach Activities",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "8",
      component: "Coordinating/Participating in Extra and Curricular Activities (Sports/Cultural)",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "9",
      component: "Alumni Interaction and Networking with relevant activity",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "10",
      component: "Coordinators – NIRF/AICTE-CII/ARIIA/NAAC/NBA/etc.",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
  ])

  const [institutional, setInstitutional] = useState<AcademicRow[]>([
    {
      id: "1",
      component: "Institution Branding in Social Media (with evidence)",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "2",
      component: "Referring quality students to join through CET/COMEDK/MGMT/PGCET etc.",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "3",
      component: "Admission Process Coordination",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "4",
      component: "Autonomous level Examination activities",
      maxPoints: "5",
      pointsEarned: "5",
      pointsByHod: "",
    },
    {
      id: "5",
      component: "Integrity & Team Work (To be Evaluated by HoD)",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
  ])

  const isEditable = true

  // --- Handlers for Section A ---

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const addSubject = () => {
    setSubjects((prev) => [...prev, { id: generateId() }])
  }

  const removeSubject = (id: string) => {
    setSubjects((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev))
  }

  // Helper to render "Points Earned" input (editable)
  const renderScoreInput = (key: string) => (
    <Input
      className="h-8 w-full text-center min-w-[60px]"
      value={formData[key] || ""}
      onChange={(e) => handleInputChange(key, e.target.value)}
      disabled={!isEditable}
    />
  )

  // Helper to render "Points by HOD" (non-editable & blank)
  const renderHodInput = () => (
    <Input
      className="h-8 w-full text-center bg-gray-100 text-gray-500 cursor-not-allowed min-w-[60px]"
      value=""
      disabled
      placeholder=""
    />
  )

  // --- Section C Handlers (Innovative Assignments / Methodologies inside Section A) ---
  const addAssignmentRow = () => {
    const newId = (innovativeAssignments.length + 1).toString()
    setInnovativeAssignments([...innovativeAssignments, { id: newId, idea: "", assignments: "", details: "" }])
  }

  const deleteAssignmentRow = (id: string) => {
    setInnovativeAssignments(innovativeAssignments.filter((row) => row.id !== id))
  }

  const addMethodologyRow = () => {
    const newId = (innovativeMethodologies.length + 1).toString()
    setInnovativeMethodologies([
      ...innovativeMethodologies,
      { id: newId, methodology: "", tools: "", details: "" },
    ])
  }

  const deleteMethodologyRow = (id: string) => {
    setInnovativeMethodologies(innovativeMethodologies.filter((row) => row.id !== id))
  }

  // --- Generic Row Updater (for Section B/C tables) ---
  const updateRow = (data: AcademicRow[], setData: any, id: string, field: keyof AcademicRow, value: string) => {
    setData((prev: AcademicRow[]) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addRow = (data: any[], setData: any, template: any) => {
    const newId = (Math.max(...data.map((d) => Number.parseInt(d.id) || 0), 0) + 1).toString()
    setData((prev: any[]) => [...prev, { ...template, id: newId }])
  }

  // --- Helpers for totals ---

  const toNum = (v: string | undefined) => {
    const n = Number.parseFloat(v ?? "")
    return Number.isNaN(n) ? 0 : n
  }

  // Total for SECTION A (Academic) based on all Points Earned fields
  const calculateAcademicSectionTotal = () => {
    let total = 0

    // For each subject: teaching, results, feedback
    subjects.forEach((subject) => {
      total += toNum(formData[`${subject.id}_teaching_score`])
      total += toNum(formData[`${subject.id}_results_score`])
      total += toNum(formData[`${subject.id}_feedback_score`])
    })

    // Lab related
    total += toNum(formData["lab_hours_score"])
    total += toNum(formData["lab_results_score"])
    total += toNum(formData["lab_feedback_score"])

    // Other academic items
    total += toNum(formData["academic_record_score"])
    total += toNum(formData["lab_established_score"])
    total += toNum(formData["innovative_assign_score"])
    total += toNum(formData["innovative_method_score"])

    return total
  }

  const academicSectionTotal = calculateAcademicSectionTotal()

  const researchTotal = research.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
  const publicationsTotal = publications.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
  const professionalTotal = professional.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
  const departmentalTotal = departmental.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
  const institutionalTotal = institutional.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)

  const sectionBTotal = researchTotal + publicationsTotal + professionalTotal
  const sectionCTotal = departmentalTotal + institutionalTotal
  const grandTotal = academicSectionTotal + sectionBTotal + sectionCTotal

  return (
    <div className="space-y-6">
      {/* SECTION A: ACADEMIC ACTIVITIES (from first snippet, wrapped in Card) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SECTION A: Academic Activities (200 Points)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead colSpan={5} className="text-center font-bold text-blue-700 border-b">
                    A1. EVEN SEMESTER 2024-25 (100 Points)
                  </TableHead>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableHead colSpan={5} className="text-center font-bold text-black border-b">
                    TEACHING WORKLOAD - SUBJECTS AND LABS
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="border-r w-[50px] whitespace-nowrap">No.</TableHead>
                  <TableHead className="border-r min-w-[300px]">Component</TableHead>
                  <TableHead className="border-r w-[100px] text-center whitespace-nowrap">Max. Points</TableHead>
                  <TableHead className="border-r w-[120px] text-center whitespace-nowrap">Points Earned</TableHead>
                  <TableHead className="w-[120px] text-center whitespace-nowrap">Points by HOD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
  {/* DYNAMIC SUBJECTS */}
{subjects.map((subject, index) => {
  const taken = Number(formData[`${subject.id}_taken`] || 0)
  const allotted = Number(formData[`${subject.id}_allotted`] || 0)

  // Auto calculate score
  const calculatedScore =
    allotted > 0 ? ((taken / allotted) * 10).toFixed(1) : ""

  // Sync into formData (non-editable)
  if (formData[`${subject.id}_teaching_score`] !== calculatedScore) {
    setFormData((prev) => ({
      ...prev,
      [`${subject.id}_teaching_score`]: calculatedScore,
    }))
  }

  return (
    <>
      <TableRow key={`${subject.id}-header`} className="bg-gray-50/50">
        {/* No. column */}
        <TableCell className="border-r font-medium align-top pt-3">
          {index + 1}.
        </TableCell>

        {/* Component column */}
        <TableCell className="border-r font-bold">
          <div className="flex items-center justify-between gap-2">
            <span>SUBJECT {index + 1}:</span>

            {/* Subject Name Input */}
            <Input
              className="h-7 w-56"
              placeholder="Enter subject name"
              value={formData[`${subject.id}_name`] || ""}
              onChange={(e) =>
                handleInputChange(`${subject.id}_name`, e.target.value)
              }
            />

            {/* Remove button */}
            {subjects.length > 1 && isEditable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={() => removeSubject(subject.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TableCell>

        <TableCell className="border-r" />
        <TableCell className="border-r" />
        <TableCell />
      </TableRow>

      {/* a) Classes Taken */}
      <TableRow key={`${subject.id}-classes`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">a)</span>
            <span>Classes Taken:</span>
            <Input
              className="h-7 w-20 inline-block"
              value={formData[`${subject.id}_taken`] || ""}
              onChange={(e) =>
                handleInputChange(`${subject.id}_taken`, e.target.value)
              }
            />
            <span>Hrs.</span>
          </div>
        </TableCell>
        <TableCell className="border-r text-center">10</TableCell>

        {/* Auto calculated, non-editable */}
        <TableCell className="border-r">
          <Input
            className="h-8 w-full text-center bg-gray-100 text-gray-700 font-semibold"
            value={calculatedScore}
            disabled
          />
        </TableCell>

        <TableCell>{renderHodInput()}</TableCell>
      </TableRow>

      {/* b) Allotted */}
      <TableRow key={`${subject.id}-allotted`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">b)</span>
            <span>Allotted (N*):</span>
            <Input
              className="h-7 w-20 inline-block"
              value={formData[`${subject.id}_allotted`] || ""}
              onChange={(e) =>
                handleInputChange(`${subject.id}_allotted`, e.target.value)
              }
            />
            <span>Hrs.</span>
          </div>
        </TableCell>
        <TableCell className="border-r" />
        <TableCell className="border-r" />
        <TableCell />
      </TableRow>

      {/* Formula */}
      <TableRow key={`${subject.id}-formula`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          <span className="text-xs text-muted-foreground italic ml-6">
            [Points = (No. of classes taken / N*) × 10]
          </span>
        </TableCell>
        <TableCell className="border-r" />
        <TableCell className="border-r" />
        <TableCell />
      </TableRow>

      {/* % Results */}
      <TableRow key={`${subject.id}-results`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          % Results [Points = %Pass × 0.05]
        </TableCell>
        <TableCell className="border-r text-center">5</TableCell>
        <TableCell className="border-r">
          {renderScoreInput(`${subject.id}_results_score`)}
        </TableCell>
        <TableCell>{renderHodInput()}</TableCell>
      </TableRow>

      {/* Student Feedback */}
      <TableRow key={`${subject.id}-feedback`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          Student Feedback [Points = (% Feedback Score - 50) × 0.2]
        </TableCell>
        <TableCell className="border-r text-center">10</TableCell>
        <TableCell className="border-r">
          {renderScoreInput(`${subject.id}_feedback_score`)}
        </TableCell>
        <TableCell>{renderHodInput()}</TableCell>
      </TableRow>
    </>
  )
})}

{/* Add Subject Button Row */}
<TableRow>
  <TableCell colSpan={5} className="p-2">
    <Button
      variant="outline"
      size="sm"
      onClick={addSubject}
      className="w-full border-dashed bg-blue-100 text-blue-700 hover:bg-blue-200"
    >
      <Plus className="mr-2 h-4 w-4" /> Add Subject
    </Button>
  </TableCell>
</TableRow>

                {/* OTHER ITEMS (Renumbered dynamically) */}
                <TableRow>
                  <TableCell className="border-r font-medium">{subjects.length + 1}.</TableCell>
                  <TableCell className="border-r">
                    Academic Record Keeping (OBE/NBA/NAAC/VTU/LIC Etc.)
                  </TableCell>
                  <TableCell className="border-r text-center">5</TableCell>
                  <TableCell className="border-r">
                    {renderScoreInput("academic_record_score")}
                  </TableCell>
                  <TableCell>{renderHodInput()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r font-medium">{subjects.length + 2}.</TableCell>
                  <TableCell className="border-r">
                    Laboratory Established/Lab. Instruction Manuals developed/Introducing Design based Experiments
                    {/* (Case Studies/Data Collections/Analysis for MBA) */}
                  </TableCell>
                  <TableCell className="border-r text-center">10</TableCell>
                  <TableCell className="border-r">
                    {renderScoreInput("lab_established_score")}
                  </TableCell>
                  <TableCell>{renderHodInput()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r font-medium">{subjects.length + 3}.</TableCell>
                  <TableCell className="border-r">
                    Innovative Assignments given to Students (Mention below)
                  </TableCell>
                  <TableCell className="border-r text-center">10</TableCell>
                  <TableCell className="border-r">
                    {renderScoreInput("innovative_assign_score")}
                  </TableCell>
                  <TableCell>{renderHodInput()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Innovative Assignments Table */}
          <div className="rounded-md border bg-blue-50/30 overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r w-[60px]">Sl. No.</TableHead>
                  <TableHead className="border-r min-w-[200px]">Innovative Idea</TableHead>
                  <TableHead className="border-r w-[150px]">No of Assignments</TableHead>
                  <TableHead className={isEditable ? "border-r min-w-[200px]" : "min-w-[200px]"}>
                    Details
                  </TableHead>
                  {isEditable && <TableHead className="w-[50px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {innovativeAssignments.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell className="border-r text-center">{idx + 1}.</TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.idea}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, idea: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Enter idea..."
                      />
                    </TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.assignments}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, assignments: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0 text-center"
                      />
                    </TableCell>
                    <TableCell className={isEditable ? "border-r" : ""}>
                      <Input
                        value={row.details}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, details: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Details..."
                      />
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
            {isEditable && (
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" onClick={addAssignmentRow} className="text-blue-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Assignment Row
                </Button>
              </div>
            )}
          </div>

          {/* Innovative Teaching Methodologies header row (with score) */}
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow>
                  <TableCell className="border-r font-medium w-[50px]">{subjects.length + 4}.</TableCell>
                  <TableCell className="border-r min-w-[300px]">
                    Innovative Teaching Methodologies incorporated (Mention below)
                  </TableCell>
                  <TableCell className="border-r w-[100px] text-center">5</TableCell>
                  <TableCell className="border-r w-[120px]">
                    {renderScoreInput("innovative_method_score")}
                  </TableCell>
                  <TableCell className="w-[120px]">
                    {renderHodInput()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Innovative Teaching Methodologies Table */}
          <div className="rounded-md border bg-green-50/30 overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r w-[60px]">Sl. No.</TableHead>
                  <TableHead className="border-r min-w-[200px]">Innovative Methodology</TableHead>
                  <TableHead className="border-r w-[150px]">Tools</TableHead>
                  <TableHead className={isEditable ? "border-r min-w-[200px]" : "min-w-[200px]"}>
                    Details
                  </TableHead>
                  {isEditable && <TableHead className="w-[50px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {innovativeMethodologies.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell className="border-r text-center">{idx + 1}.</TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.methodology}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, methodology: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Methodology..."
                      />
                    </TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.tools}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, tools: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Tools used..."
                      />
                    </TableCell>
                    <TableCell className={isEditable ? "border-r" : ""}>
                      <Input
                        value={row.details}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, details: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Details..."
                      />
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
            {isEditable && (
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" onClick={addMethodologyRow} className="text-green-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Methodology Row
                </Button>
              </div>
            )}
          </div>

          {/* Section A total row */}
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow className="bg-gray-100 font-bold">
                  <TableCell className="border-r text-right min-w-[350px]" colSpan={2}>
                    Total
                  </TableCell>
                  <TableCell className="border-r w-[100px] text-center">100</TableCell>
                  <TableCell className="border-r w-[120px] text-center">
                    {academicSectionTotal.toFixed(1)}
                  </TableCell>
                  <TableCell className="w-[120px]"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

        </CardContent>

{/* A2 ODD SEMESTER */}

<CardContent className="space-y-4">
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead colSpan={5} className="text-center font-bold text-blue-700 border-b">
                    A2. ODD SEMESTER 2024-25 (100 Points)
                  </TableHead>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableHead colSpan={5} className="text-center font-bold text-black border-b">
                    TEACHING WORKLOAD - SUBJECTS AND LABS
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="border-r w-[50px] whitespace-nowrap">No.</TableHead>
                  <TableHead className="border-r min-w-[300px]">Component</TableHead>
                  <TableHead className="border-r w-[100px] text-center whitespace-nowrap">Max. Points</TableHead>
                  <TableHead className="border-r w-[120px] text-center whitespace-nowrap">Points Earned</TableHead>
                  <TableHead className="w-[120px] text-center whitespace-nowrap">Points by HOD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
  {/* DYNAMIC SUBJECTS */}
{subjects.map((subject, index) => {
  const taken = Number(formData[`${subject.id}_taken`] || 0)
  const allotted = Number(formData[`${subject.id}_allotted`] || 0)

  // Auto calculate score
  const calculatedScore =
    allotted > 0 ? ((taken / allotted) * 10).toFixed(1) : ""

  // Sync into formData (non-editable)
  if (formData[`${subject.id}_teaching_score`] !== calculatedScore) {
    setFormData((prev) => ({
      ...prev,
      [`${subject.id}_teaching_score`]: calculatedScore,
    }))
  }

  return (
    <>
      <TableRow key={`${subject.id}-header`} className="bg-gray-50/50">
        {/* No. column */}
        <TableCell className="border-r font-medium align-top pt-3">
          {index + 1}.
        </TableCell>

        {/* Component column */}
        <TableCell className="border-r font-bold">
          <div className="flex items-center justify-between gap-2">
            <span>SUBJECT {index + 1}:</span>

            {/* Subject Name Input */}
            <Input
              className="h-7 w-56"
              placeholder="Enter subject name"
              value={formData[`${subject.id}_name`] || ""}
              onChange={(e) =>
                handleInputChange(`${subject.id}_name`, e.target.value)
              }
            />

            {/* Remove button */}
            {subjects.length > 1 && isEditable && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={() => removeSubject(subject.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </TableCell>

        <TableCell className="border-r" />
        <TableCell className="border-r" />
        <TableCell />
      </TableRow>

      {/* a) Classes Taken */}
      <TableRow key={`${subject.id}-classes`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">a)</span>
            <span>Classes Taken:</span>
            <Input
              className="h-7 w-20 inline-block"
              value={formData[`${subject.id}_taken`] || ""}
              onChange={(e) =>
                handleInputChange(`${subject.id}_taken`, e.target.value)
              }
            />
            <span>Hrs.</span>
          </div>
        </TableCell>
        <TableCell className="border-r text-center">10</TableCell>

        {/* Auto calculated, non-editable */}
        <TableCell className="border-r">
          <Input
            className="h-8 w-full text-center bg-gray-100 text-gray-700 font-semibold"
            value={calculatedScore}
            disabled
          />
        </TableCell>

        <TableCell>{renderHodInput()}</TableCell>
      </TableRow>

      {/* b) Allotted */}
      <TableRow key={`${subject.id}-allotted`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">b)</span>
            <span>Allotted (N*):</span>
            <Input
              className="h-7 w-20 inline-block"
              value={formData[`${subject.id}_allotted`] || ""}
              onChange={(e) =>
                handleInputChange(`${subject.id}_allotted`, e.target.value)
              }
            />
            <span>Hrs.</span>
          </div>
        </TableCell>
        <TableCell className="border-r" />
        <TableCell className="border-r" />
        <TableCell />
      </TableRow>

      {/* Formula */}
      <TableRow key={`${subject.id}-formula`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          <span className="text-xs text-muted-foreground italic ml-6">
            [Points = (No. of classes taken / N*) × 10]
          </span>
        </TableCell>
        <TableCell className="border-r" />
        <TableCell className="border-r" />
        <TableCell />
      </TableRow>

      {/* % Results */}
      <TableRow key={`${subject.id}-results`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          % Results [Points = %Pass × 0.05]
        </TableCell>
        <TableCell className="border-r text-center">5</TableCell>
        <TableCell className="border-r">
          {renderScoreInput(`${subject.id}_results_score`)}
        </TableCell>
        <TableCell>{renderHodInput()}</TableCell>
      </TableRow>

      {/* Student Feedback */}
      <TableRow key={`${subject.id}-feedback`}>
        <TableCell className="border-r" />
        <TableCell className="border-r">
          Student Feedback [Points = (% Feedback Score - 50) × 0.2]
        </TableCell>
        <TableCell className="border-r text-center">10</TableCell>
        <TableCell className="border-r">
          {renderScoreInput(`${subject.id}_feedback_score`)}
        </TableCell>
        <TableCell>{renderHodInput()}</TableCell>
      </TableRow>
    </>
  )
})}

{/* Add Subject Button Row */}
<TableRow>
  <TableCell colSpan={5} className="p-2">
    <Button
      variant="outline"
      size="sm"
      onClick={addSubject}
      className="w-full border-dashed bg-blue-100 text-blue-700 hover:bg-blue-200"
    >
      <Plus className="mr-2 h-4 w-4" /> Add Subject
    </Button>
  </TableCell>
</TableRow>

                {/* OTHER ITEMS (Renumbered dynamically) */}
                <TableRow>
                  <TableCell className="border-r font-medium">{subjects.length + 1}.</TableCell>
                  <TableCell className="border-r">
                    Academic Record Keeping (OBE/NBA/NAAC/VTU/LIC Etc.)
                  </TableCell>
                  <TableCell className="border-r text-center">5</TableCell>
                  <TableCell className="border-r">
                    {renderScoreInput("academic_record_score")}
                  </TableCell>
                  <TableCell>{renderHodInput()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r font-medium">{subjects.length + 2}.</TableCell>
                  <TableCell className="border-r">
                    Laboratory Established/Lab. Instruction Manuals developed/Introducing Design based Experiments
                    {/* (Case Studies/Data Collections/Analysis for MBA) */}
                  </TableCell>
                  <TableCell className="border-r text-center">10</TableCell>
                  <TableCell className="border-r">
                    {renderScoreInput("lab_established_score")}
                  </TableCell>
                  <TableCell>{renderHodInput()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r font-medium">{subjects.length + 3}.</TableCell>
                  <TableCell className="border-r">
                    Innovative Assignments given to Students (Mention below)
                  </TableCell>
                  <TableCell className="border-r text-center">10</TableCell>
                  <TableCell className="border-r">
                    {renderScoreInput("innovative_assign_score")}
                  </TableCell>
                  <TableCell>{renderHodInput()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Innovative Assignments Table */}
          <div className="rounded-md border bg-blue-50/30 overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r w-[60px]">Sl. No.</TableHead>
                  <TableHead className="border-r min-w-[200px]">Innovative Idea</TableHead>
                  <TableHead className="border-r w-[150px]">No of Assignments</TableHead>
                  <TableHead className={isEditable ? "border-r min-w-[200px]" : "min-w-[200px]"}>
                    Details
                  </TableHead>
                  {isEditable && <TableHead className="w-[50px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {innovativeAssignments.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell className="border-r text-center">{idx + 1}.</TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.idea}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, idea: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Enter idea..."
                      />
                    </TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.assignments}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, assignments: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0 text-center"
                      />
                    </TableCell>
                    <TableCell className={isEditable ? "border-r" : ""}>
                      <Input
                        value={row.details}
                        onChange={(e) => {
                          const updated = innovativeAssignments.map((item) =>
                            item.id === row.id ? { ...item, details: e.target.value } : item,
                          )
                          setInnovativeAssignments(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Details..."
                      />
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
            {isEditable && (
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" onClick={addAssignmentRow} className="text-blue-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Assignment Row
                </Button>
              </div>
            )}
          </div>

          {/* Innovative Teaching Methodologies header row (with score) */}
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow>
                  <TableCell className="border-r font-medium w-[50px]">{subjects.length + 4}.</TableCell>
                  <TableCell className="border-r min-w-[300px]">
                    Innovative Teaching Methodologies incorporated (Mention below)
                  </TableCell>
                  <TableCell className="border-r w-[100px] text-center">5</TableCell>
                  <TableCell className="border-r w-[120px]">
                    {renderScoreInput("innovative_method_score")}
                  </TableCell>
                  <TableCell className="w-[120px]">
                    {renderHodInput()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Innovative Teaching Methodologies Table */}
          <div className="rounded-md border bg-green-50/30 overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r w-[60px]">Sl. No.</TableHead>
                  <TableHead className="border-r min-w-[200px]">Innovative Methodology</TableHead>
                  <TableHead className="border-r w-[150px]">Tools</TableHead>
                  <TableHead className={isEditable ? "border-r min-w-[200px]" : "min-w-[200px]"}>
                    Details
                  </TableHead>
                  {isEditable && <TableHead className="w-[50px]">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {innovativeMethodologies.map((row, idx) => (
                  <TableRow key={row.id}>
                    <TableCell className="border-r text-center">{idx + 1}.</TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.methodology}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, methodology: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Methodology..."
                      />
                    </TableCell>
                    <TableCell className="border-r">
                      <Input
                        value={row.tools}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, tools: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Tools used..."
                      />
                    </TableCell>
                    <TableCell className={isEditable ? "border-r" : ""}>
                      <Input
                        value={row.details}
                        onChange={(e) => {
                          const updated = innovativeMethodologies.map((item) =>
                            item.id === row.id ? { ...item, details: e.target.value } : item,
                          )
                          setInnovativeMethodologies(updated)
                        }}
                        className="h-8 border-0 bg-transparent focus-visible:ring-0"
                        placeholder="Details..."
                      />
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
            {isEditable && (
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" onClick={addMethodologyRow} className="text-green-600">
                  <Plus className="mr-2 h-4 w-4" /> Add Methodology Row
                </Button>
              </div>
            )}
          </div>

          {/* Section A total row */}
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableBody>
                <TableRow className="bg-gray-100 font-bold">
                  <TableCell className="border-r text-right min-w-[350px]" colSpan={2}>
                    Total
                  </TableCell>
                  <TableCell className="border-r w-[100px] text-center">100</TableCell>
                  <TableCell className="border-r w-[120px] text-center">
                    {academicSectionTotal.toFixed(1)}
                  </TableCell>
                  <TableCell className="w-[120px]"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

        </CardContent>


      </Card>

      {/* SECTION B: Research & Development, Publications, Professional Development */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            SECTION B: Research & Development, Publications, Professional Development (200 Points)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Research & Development */}
          <div>
            <h3 className="font-bold text-base mb-3 text-green-700">Research & Development (110 Points)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-2 text-left">S. No.</th>
                    <th className="border px-2 py-2 text-left">Component</th>
                    <th className="border px-2 py-2 text-center">Max. Points</th>
                    <th className="border px-2 py-2 text-center">Points Earned</th>
                    <th className="border px-2 py-2 text-center">Points by HOD</th>
                  </tr>
                </thead>
                <tbody>
                  {research.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border px-2 py-2">
                        <Textarea
                          value={row.component}
                          onChange={(e) => updateRow(research, setResearch, row.id, "component", e.target.value)}
                          className="text-s "
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          className="h-8 text-center text-xs"
                          disabled
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          onChange={(e) => updateRow(research, setResearch, row.id, "pointsEarned", e.target.value)}
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-center text-xs">
                        -
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={2} className="border px-2 py-2 text-center">
                      Total
                    </td>
                    <td className="border px-2 py-2 text-center">110</td>
                    <td className="border px-2 py-2 text-center">
                      {researchTotal.toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Publications */}
          <div className="pt-6 border-t">
            <h3 className="font-bold text-base mb-3 text-purple-700">Publications (60 Points)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-2 text-left">S. No.</th>
                    <th className="border px-2 py-2 text-left">Component</th>
                    <th className="border px-2 py-2 text-center">Max. Points</th>
                    <th className="border px-2 py-2 text-center">Points Earned</th>
                    <th className="border px-2 py-2 text-center">Points by HOD</th>
                  </tr>
                </thead>
                <tbody>
                  {publications.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border px-2 py-2">
                        <Textarea
                          value={row.component}
                          onChange={(e) =>
                            updateRow(publications, setPublications, row.id, "component", e.target.value)
                          }
                          className="text-s "
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          onChange={(e) =>
                            updateRow(publications, setPublications, row.id, "pointsEarned", e.target.value)
                          }
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-center text-xs">
                        -
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={2} className="border px-2 py-2 text-center">
                      Total
                    </td>
                    <td className="border px-2 py-2 text-center">60</td>
                    <td className="border px-2 py-2 text-center">
                      {publicationsTotal.toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Professional Development */}
          <div className="pt-6 border-t">
            <h3 className="font-bold text-base mb-3 text-orange-700">Professional Development (30 Points)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-2 text-left">S. No.</th>
                    <th className="border px-2 py-2 text-left">Component</th>
                    <th className="border px-2 py-2 text-center">Max. Points</th>
                    <th className="border px-2 py-2 text-center">Points Earned</th>
                    <th className="border px-2 py-2 text-center">Points by HOD</th>
                  </tr>
                </thead>
                <tbody>
                  {professional.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border px-2 py-2">
                        <Textarea
                          value={row.component}
                          onChange={(e) =>
                            updateRow(professional, setProfessional, row.id, "component", e.target.value)
                          }
                          className="text-s"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          onChange={(e) =>
                            updateRow(professional, setProfessional, row.id, "pointsEarned", e.target.value)
                          }
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-center text-xs">
                        -
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={2} className="border px-2 py-2 text-center">
                      Total
                    </td>
                    <td className="border px-2 py-2 text-center">30</td>
                    <td className="border px-2 py-2 text-center">
                      {professionalTotal.toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION C: Departmental and Institutional Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SECTION C: Departmental and Institutional Activities (100 Points)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Departmental Activities */}
          <div>
            <h3 className="font-bold text-base mb-3 text-red-700">Departmental Activities (70 Points)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-2 text-left">S. No.</th>
                    <th className="border px-2 py-2 text-left">Component</th>
                    <th className="border px-2 py-2 text-center">Max. Points</th>
                    <th className="border px-2 py-2 text-center">Points Earned</th>
                    <th className="border px-2 py-2 text-center">Points by HOD</th>
                  </tr>
                </thead>
                <tbody>
                  {departmental.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border px-2 py-2">
                        <Textarea
                          value={row.component}
                          onChange={(e) =>
                            updateRow(departmental, setDepartmental, row.id, "component", e.target.value)
                          }
                          className="text-s"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          onChange={(e) =>
                            updateRow(departmental, setDepartmental, row.id, "pointsEarned", e.target.value)
                          }
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-center text-xs">
                        -
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={2} className="border px-2 py-2 text-center">
                      Total
                    </td>
                    <td className="border px-2 py-2 text-center">70</td>
                    <td className="border px-2 py-2 text-center">
                      {departmentalTotal.toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Institutional Activities */}
          <div className="pt-6 border-t">
            <h3 className="font-bold text-base mb-3 text-indigo-700">Institutional Activities (30 Points)</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-2 py-2 text-left">S. No.</th>
                    <th className="border px-2 py-2 text-left">Component</th>
                    <th className="border px-2 py-2 text-center">Max. Points</th>
                    <th className="border px-2 py-2 text-center">Points Earned</th>
                    <th className="border px-2 py-2 text-center">Points by HOD</th>
                  </tr>
                </thead>
                <tbody>
                  {institutional.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border px-2 py-2">
                        <Textarea
                          value={row.component}
                          onChange={(e) =>
                            updateRow(institutional, setInstitutional, row.id, "component", e.target.value)
                          }
                          className="text-s"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          disabled
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-center text-xs">
                        -
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold">
                    <td colSpan={2} className="border px-2 py-2 text-center">
                      Total
                    </td>
                    <td className="border px-2 py-2 text-center">30</td>
                    <td className="border px-2 py-2 text-center">
                      {institutionalTotal.toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PBAS EVALUATION SUMMARY */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">PBAS Evaluation Summary (Assistant Professors)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-2 text-left">S. No.</th>
                  <th className="border px-2 py-2 text-left">Evaluation Parameter</th>
                  <th className="border px-2 py-2 text-center">Max. Score</th>
                  <th className="border px-2 py-2 text-center">Min. Points</th>
                  <th className="border px-2 py-2 text-center">Points Scored</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-2">1.</td>
                  <td className="border px-2 py-2">Academic (Teaching, Learning & Feedback)</td>
                  <td className="border px-2 py-2 text-center font-bold">200</td>
                  <td className="border px-2 py-2 text-center">120</td>
                  <td className="border px-2 py-2 text-center">
                    {academicSectionTotal.toFixed(1)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-2">2.</td>
                  <td className="border px-2 py-2">Research & Development, Publications, Professional Development</td>
                  <td className="border px-2 py-2 text-center font-bold">200</td>
                  <td className="border px-2 py-2 text-center">70</td>
                  <td className="border px-2 py-2 text-center">
                    {(sectionBTotal).toFixed(1)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-2">3.</td>
                  <td className="border px-2 py-2">Departmental and Institutional Activities</td>
                  <td className="border px-2 py-2 text-center font-bold">100</td>
                  <td className="border px-2 py-2 text-center">60</td>
                  <td className="border px-2 py-2 text-center">
                    {(sectionCTotal).toFixed(1)}
                  </td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td colSpan={2} className="border px-2 py-2 text-right">
                    TOTAL
                  </td>
                  <td className="border px-2 py-2 text-center">500</td>
                  <td className="border px-2 py-2 text-center">250</td>
                  <td className="border px-2 py-2 text-center text-blue-700">
                    {grandTotal.toFixed(1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Evaluation Criteria */}
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="font-bold text-sm text-yellow-800">EVALUATION CRITERIA:</p>
            <ul className="text-xs text-yellow-700 mt-2 space-y-1">
              <li>✓ Minimum 50% (250/500) marks required for regular Annual increment</li>
              <li>✓ {">"} 60% up to 80% are eligible for the incentive - I</li>
              <li>✓ {">"} 80% are eligible for the incentive - II</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Assessment by Evaluators */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assessment by Evaluators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks by HoD</label>
            <Textarea placeholder="HoD remarks will be added after evaluation" disabled className="min-h-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
