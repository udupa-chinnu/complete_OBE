"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"

interface AcademicRow {
  id: string
  component: string
  maxPoints: string
  pointsEarned: string
  pointsByHod: string
}

interface InnovativeRow {
  id: string
  slNo: string
  idea: string
  numAssignments: string
  details: string
}

interface MethodologyRow {
  id: string
  slNo: string
  methodology: string
  tools: string
  details: string
}

export default function PartBForm() {
  const [academicEven, setAcademicEven] = useState<AcademicRow[]>([
    {
      id: "1",
      component:
        "SUBJECT 1: Web Technology and Application (4A) - Classes Taken: 40 Hrs. [Points = (No. of classes taken/N*) × 10]",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
    {
      id: "2",
      component: "% Results [Points = %Pass × 0.05]",
      maxPoints: "5",
      pointsEarned: "4.7",
      pointsByHod: "",
    },
    {
      id: "3",
      component: "Student Feedback [Points = (% Feedback Score – 50) × 0.2]",
      maxPoints: "10",
      pointsEarned: "4.5",
      pointsByHod: "",
    },
  ])

  const [innovativeAssignments, setInnovativeAssignments] = useState<InnovativeRow[]>([
    {
      id: "1",
      slNo: "1.",
      idea: "A case study on the working of the IRCTC Tatkal ticket booking",
      numAssignments: "1",
      details:
        "Students were made to do a partial booking of train ticket and explained how race condition would affect the real time booking processes",
    },
  ])

  const [innovativeMethodology, setInnovativeMethodology] = useState<MethodologyRow[]>([
    {
      id: "1",
      slNo: "1.",
      methodology:
        "Illustration of real time examples of Bank, Restaurants, Remote & Shell examples for delivering the key concepts of processes, deadlocks etc.",
      tools: "Videos",
      details: "Video links shared to the students for understanding the key concepts",
    },
  ])

  const [academicOdd, setAcademicOdd] = useState<AcademicRow[]>([
    {
      id: "1",
      component:
        "SUBJECT 1: Database Management Systems (5A) - Classes Taken: 40 Hrs. [Points = (No. of classes taken/N*) × 10]",
      maxPoints: "10",
      pointsEarned: "10",
      pointsByHod: "",
    },
    {
      id: "2",
      component: "% Results [Points = %Pass × 0.05]",
      maxPoints: "5",
      pointsEarned: "4.8",
      pointsByHod: "",
    },
    {
      id: "3",
      component: "Student Feedback [Points = (% Feedback Score – 50) × 0.2]",
      maxPoints: "10",
      pointsEarned: "6.5",
      pointsByHod: "",
    },
  ])

  const [research, setResearch] = useState<AcademicRow[]>([
    {
      id: "1",
      component: "Research Proposals Applied for Funding - 2 Proposals submitted to KSCST",
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

  const updateRow = (data: any[], setData: any, id: string, field: string, value: string) => {
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addRow = (data: any[], setData: any, template: any) => {
    const newId = (Math.max(...data.map((d) => Number.parseInt(d.id) || 0), 0) + 1).toString()
    setData((prev) => [...prev, { ...template, id: newId }])
  }

  return (
    <div className="space-y-6">
      {/* SECTION A: ACADEMIC ACTIVITIES */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SECTION A: ACADEMIC ACTIVITIES (200 Points)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* A1. EVEN SEMESTER */}
          <div>
            <h3 className="font-bold text-base mb-3 text-blue-700">A1. EVEN SEMESTER 2023-24 (100 Points)</h3>
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
                  {academicEven.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border px-2 py-2">
                        <Textarea
                          value={row.component}
                          onChange={(e) =>
                            updateRow(academicEven, setAcademicEven, row.id, "component", e.target.value)
                          }
                          className="text-xs min-h-8"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          className="h-8 text-center text-xs"
                          disabled={true}
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          onChange={(e) =>
                            updateRow(academicEven, setAcademicEven, row.id, "pointsEarned", e.target.value)
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
                    <td className="border px-2 py-2 text-center">100</td>
                    <td className="border px-2 py-2 text-center">
                      {academicEven
                        .reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                        .toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Innovative Assignments */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <h4 className="font-bold text-sm mb-2">Innovative Assignments Given to Students</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border px-2 py-1 text-left">S. No</th>
                      <th className="border px-2 py-1 text-left">Innovative Idea</th>
                      <th className="border px-2 py-1 text-left">No. of Assignments</th>
                      <th className="border px-2 py-1 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {innovativeAssignments.map((row) => (
                      <tr key={row.id} className="hover:bg-white">
                        <td className="border px-2 py-1 text-xs">{row.slNo}</td>
                        <td className="border px-2 py-1">
                          <Input
                            value={row.idea}
                            onChange={(e) =>
                              setInnovativeAssignments(
                                innovativeAssignments.map((r) =>
                                  r.id === row.id ? { ...r, idea: e.target.value } : r,
                                ),
                              )
                            }
                            className="h-6 text-xs"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <Input
                            value={row.numAssignments}
                            onChange={(e) =>
                              setInnovativeAssignments(
                                innovativeAssignments.map((r) =>
                                  r.id === row.id ? { ...r, numAssignments: e.target.value } : r,
                                ),
                              )
                            }
                            className="h-6 text-xs text-center"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <Input
                            value={row.details}
                            onChange={(e) =>
                              setInnovativeAssignments(
                                innovativeAssignments.map((r) =>
                                  r.id === row.id ? { ...r, details: e.target.value } : r,
                                ),
                              )
                            }
                            className="h-6 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button
                onClick={() =>
                  addRow(innovativeAssignments, setInnovativeAssignments, {
                    slNo: "",
                    idea: "",
                    numAssignments: "",
                    details: "",
                  })
                }
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 mt-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Assignment
              </Button>
            </div>

            {/* Innovative Methodology */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <h4 className="font-bold text-sm mb-2">Innovative Teaching Methodologies</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border px-2 py-1 text-left">S. No</th>
                      <th className="border px-2 py-1 text-left">Innovative Methodology</th>
                      <th className="border px-2 py-1 text-left">Tools</th>
                      <th className="border px-2 py-1 text-left">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {innovativeMethodology.map((row) => (
                      <tr key={row.id} className="hover:bg-white">
                        <td className="border px-2 py-1 text-xs">{row.slNo}</td>
                        <td className="border px-2 py-1">
                          <Input
                            value={row.methodology}
                            onChange={(e) =>
                              setInnovativeMethodology(
                                innovativeMethodology.map((r) =>
                                  r.id === row.id ? { ...r, methodology: e.target.value } : r,
                                ),
                              )
                            }
                            className="h-6 text-xs"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <Input
                            value={row.tools}
                            onChange={(e) =>
                              setInnovativeMethodology(
                                innovativeMethodology.map((r) =>
                                  r.id === row.id ? { ...r, tools: e.target.value } : r,
                                ),
                              )
                            }
                            className="h-6 text-xs"
                          />
                        </td>
                        <td className="border px-2 py-1">
                          <Input
                            value={row.details}
                            onChange={(e) =>
                              setInnovativeMethodology(
                                innovativeMethodology.map((r) =>
                                  r.id === row.id ? { ...r, details: e.target.value } : r,
                                ),
                              )
                            }
                            className="h-6 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button
                onClick={() =>
                  addRow(innovativeMethodology, setInnovativeMethodology, {
                    slNo: "",
                    methodology: "",
                    tools: "",
                    details: "",
                  })
                }
                size="sm"
                className="bg-green-600 hover:bg-green-700 mt-2"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Methodology
              </Button>
            </div>

            <Button
              onClick={() =>
                addRow(academicEven, setAcademicEven, {
                  component: "",
                  maxPoints: "",
                  pointsEarned: "",
                  pointsByHod: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 mt-4"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Component
            </Button>
          </div>

          {/* A2. ODD SEMESTER */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-bold text-base mb-3 text-blue-700">A2. ODD SEMESTER 2024-25 (100 Points)</h3>
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
                  {academicOdd.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-2 text-center text-xs">{idx + 1}</td>
                      <td className="border px-2 py-2">
                        <Textarea
                          value={row.component}
                          onChange={(e) => updateRow(academicOdd, setAcademicOdd, row.id, "component", e.target.value)}
                          className="text-xs min-h-8"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          //onChange={(e) => updateRow(academicOdd, setAcademicOdd, row.id, "maxPoints", e.target.value)}
                          className="h-8 text-center text-xs"
                          disabled={true}
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          onChange={(e) =>
                            updateRow(academicOdd, setAcademicOdd, row.id, "pointsEarned", e.target.value)
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
                    <td className="border px-2 py-2 text-center">100</td>
                    <td className="border px-2 py-2 text-center">
                      {academicOdd.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0).toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button
              onClick={() =>
                addRow(academicOdd, setAcademicOdd, { component: "", maxPoints: "", pointsEarned: "", pointsByHod: "" })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 mt-3"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Component
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SECTION B: RESEARCH, PUBLICATIONS, PROFESSIONAL DEVELOPMENT */}
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
                          className="text-xs min-h-8"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          //onChange={(e) => updateRow(research, setResearch, row.id, "maxPoints", e.target.value)}
                          className="h-8 text-center text-xs"
                          disabled={true}
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
                      {research.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0).toFixed(1)}
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
                          className="text-xs min-h-8"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled={true}
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
                      {publications
                        .reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                        .toFixed(1)}
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
                          className="text-xs min-h-8"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled={true}
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
                      {professional
                        .reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                        .toFixed(1)}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SECTION C: DEPARTMENTAL AND INSTITUTIONAL ACTIVITIES */}
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
                          className="text-xs min-h-8"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled={true}
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
                      {departmental
                        .reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                        .toFixed(1)}
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
                          className="text-xs min-h-8"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.maxPoints}
                          disabled={true}
                          className="h-8 text-center text-xs"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <Input
                          value={row.pointsEarned}
                          disabled={true}
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
                      {institutional
                        .reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                        .toFixed(1)}
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
                    {(
                      academicEven.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      academicOdd.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                    ).toFixed(1)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-2">2.</td>
                  <td className="border px-2 py-2">Research & Development, Publications, Professional Development</td>
                  <td className="border px-2 py-2 text-center font-bold">200</td>
                  <td className="border px-2 py-2 text-center">70</td>
                  <td className="border px-2 py-2 text-center">
                    {(
                      research.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      publications.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      professional.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                    ).toFixed(1)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-2">3.</td>
                  <td className="border px-2 py-2">Departmental and Institutional Activities</td>
                  <td className="border px-2 py-2 text-center font-bold">100</td>
                  <td className="border px-2 py-2 text-center">60</td>
                  <td className="border px-2 py-2 text-center">
                    {(
                      departmental.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      institutional.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                    ).toFixed(1)}
                  </td>
                </tr>
                <tr className="bg-blue-100 font-bold">
                  <td colSpan={2} className="border px-2 py-2 text-right">
                    TOTAL
                  </td>
                  <td className="border px-2 py-2 text-center">500</td>
                  <td className="border px-2 py-2 text-center">250</td>
                  <td className="border px-2 py-2 text-center text-blue-700">
                    {(
                      academicEven.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      academicOdd.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      research.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      publications.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      professional.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      departmental.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0) +
                      institutional.reduce((sum, row) => sum + (Number.parseFloat(row.pointsEarned) || 0), 0)
                    ).toFixed(1)}
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