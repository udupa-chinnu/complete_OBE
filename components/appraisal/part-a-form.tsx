"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface SubjectRow {
  id: string
  sem: string
  courseCode: string
  type: string
  title: string
  credits: string
  hours: string
  hodRemarks: string
}

export default function PartAForm() {
  const [subjects, setSubjects] = useState<SubjectRow[]>([
    {
      id: "1",
      sem: "IV",
      courseCode: "CS42211C",
      type: "IPCC",
      title: "Web Technology and Applications (4A)",
      credits: "4",
      hours: "40",
      hodRemarks: "",
    },
    {
      id: "2",
      sem: "IV",
      courseCode: "CS42211C",
      type: "IPCC",
      title: "Web Technology and Applications (4B)",
      credits: "4",
      hours: "40",
      hodRemarks: "",
    },
    {
      id: "3",
      sem: "IV",
      courseCode: "CS42212C",
      type: "IPCC",
      title: "Operating Systems (4DS)",
      credits: "4",
      hours: "40",
      hodRemarks: "",
    },
    {
      id: "4",
      sem: "IV",
      courseCode: "CS42211C",
      type: "IPCC",
      title: "Web Technology and Applications (Summer Semester)",
      credits: "4",
      hours: "20",
      hodRemarks: "",
    },
    {
      id: "5",
      sem: "V",
      courseCode: "CS52214C",
      type: "Theory",
      title: "Database Management Systems (5A)",
      credits: "3",
      hours: "40",
      hodRemarks: "",
    },
    {
      id: "6",
      sem: "V",
      courseCode: "CS52214C",
      type: "Theory",
      title: "Database Management Systems (5B)",
      credits: "3",
      hours: "40",
      hodRemarks: "",
    },
    {
      id: "7",
      sem: "V",
      courseCode: "CS52215C",
      type: "Lab",
      title: "Database Management Systems (5A)",
      credits: "1",
      hours: "10",
      hodRemarks: "",
    },
    {
      id: "8",
      sem: "V",
      courseCode: "CS52215C",
      type: "Lab",
      title: "Database Management Systems (5B)",
      credits: "1",
      hours: "10",
      hodRemarks: "",
    },
  ])

  const [resultAnalysis, setResultAnalysis] = useState([
    {
      id: "1",
      courseCode: "CS42211C (4A)",
      totalStudents: "67",
      passed: "63",
      passPercent: "94",
      above75: "29",
      range60to75: "26",
      range50to60: "8",
      range40to50: "0",
      hodRemarks: "",
    },
  ])

  const [studentProjects, setStudentProjects] = useState([
    {
      id: "1",
      batch: "2021-25",
      numStudents: "4",
      projectTitle: "AI Enhanced IELTS Preparation Using Custom Neural Networks",
      recognition: "Applied for KSCST Funding",
    },
  ])

  const [studentFeedback, setStudentFeedback] = useState([
    {
      id: "1",
      sem: "4",
      courseCode: "CS42211C",
      type: "Integrated",
      feedback1: "75",
      feedback2: "70",
      average: "72.5",
    },
  ])

  const [learningResources, setLearningResources] = useState([
    {
      id: "1",
      subjectCode: "211SP76/86 & 21DSP76/86",
      title: "Project Work",
      unit: "-",
      nature: "Report Formats, Evaluation Rubrics",
    },
  ])

  const [academicActivities, setAcademicActivities] = useState([
    {
      id: "1",
      description: "Mock NBA Audit for the department of ISE, CSE & ECE",
      venue: "AIT, Bengaluru",
      date: "19th & 20th Dec. 2024",
      role: "Conducted",
    },
  ])

  const [fundedResearch, setFundedResearch] = useState([
    {
      id: "1",
      description: "-",
      amount: "-",
      agency: "-",
      duration: "-",
    },
  ])

  const [publications, setPublications] = useState([
    {
      id: "1",
      journal: "Conference",
      details:
        "Early Detection of Diabetic Retinopathy and Glaucoma Using Machine Learning DOI: 10.1109/COSMIC63293.2024.10871392",
      impactFactor: "",
    },
  ])

  const [governance, setGovernance] = useState([
    {
      id: "1",
      role: "Asst. Dean IQAC",
      duration: "June. 2022 till date",
      achievements:
        "In the process of formulating Policies & Procedures for enhancing the overall quality of the institution",
      hodRemarks: "",
    },
  ])

  const [documentCompletion, setDocumentCompletion] = useState([
    {
      id: "1",
      document: "Project Work Files",
      completion: "90",
      hodRemarks: "",
    },
  ])

  const [examinationWork, setExaminationWork] = useState([
    {
      id: "1",
      role: "Question Paper setter for the courses OS, DBMS",
      documents: "",
      completion: "100",
      hodRemarks: "",
    },
  ])

  const [placementSupport, setPlacementSupport] = useState([
    {
      id: "1",
      usn: "-",
      studentName: "-",
      type: "-",
      assistance: "-",
      company: "-",
      hodRemarks: "",
    },
  ])

  const updateSubject = (id: string, field: string, value: string) => {
    setSubjects((prev) => prev.map((subj) => (subj.id === id ? { ...subj, [field]: value } : subj)))
  }

  const deleteRow = (data: any[], setData: any, id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  const addRow = (data: any[], setData: any, template: any) => {
    const newId = (Math.max(...data.map((d) => Number.parseInt(d.id) || 0), 0) + 1).toString()
    setData((prev) => [...prev, { ...template, id: newId }])
  }

  return (
    <div className="space-y-6">
      {/* Section I: Subjects */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>I. Subjects Handled by the Faculty Member</CardTitle>
            <Button
              onClick={() =>
                addRow(subjects, setSubjects, {
                  sem: "",
                  courseCode: "",
                  type: "",
                  title: "",
                  credits: "",
                  hours: "",
                  hodRemarks: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Subject
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Sem.</th>
                  <th className="border px-3 py-2 text-left">Course Code</th>
                  <th className="border px-3 py-2 text-left">Type</th>
                  <th className="border px-3 py-2 text-left">Course Title</th>
                  <th className="border px-3 py-2 text-left">Credits</th>
                  <th className="border px-3 py-2 text-left">Hours</th>
                  <th className="border px-3 py-2 text-left">HOD Remarks</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={subject.sem}
                        onChange={(e) => updateSubject(subject.id, "sem", e.target.value)}
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={subject.courseCode}
                        onChange={(e) => updateSubject(subject.id, "courseCode", e.target.value)}
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={subject.type}
                        onChange={(e) => updateSubject(subject.id, "type", e.target.value)}
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={subject.title}
                        onChange={(e) => updateSubject(subject.id, "title", e.target.value)}
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={subject.credits}
                        onChange={(e) => updateSubject(subject.id, "credits", e.target.value)}
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={subject.hours}
                        onChange={(e) => updateSubject(subject.id, "hours", e.target.value)}
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed">-</td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(subjects, setSubjects, subject.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section II: Result Analysis */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>II. Result Analysis of the Subjects Handled</CardTitle>
            <Button
              onClick={() =>
                addRow(resultAnalysis, setResultAnalysis, {
                  courseCode: "",
                  totalStudents: "",
                  passed: "",
                  passPercent: "",
                  above75: "",
                  range60to75: "",
                  range50to60: "",
                  range40to50: "",
                  hodRemarks: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Result
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-2 text-left">Course Code</th>
                  <th className="border px-2 py-2 text-left">Total Students</th>
                  <th className="border px-2 py-2 text-left">Passed</th>
                  <th className="border px-2 py-2 text-left">% Pass</th>
                  <th className="border px-2 py-2 text-left">&gt; 75</th>
                  <th className="border px-2 py-2 text-left">60-75</th>
                  <th className="border px-2 py-2 text-left">50-60</th>
                  <th className="border px-2 py-2 text-left">40-50</th>
                  <th className="border px-2 py-2 text-left">HOD Remarks</th>
                  <th className="border px-2 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {resultAnalysis.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="border px-2 py-2">
                      <Input value={result.courseCode} className="h-8 text-xs" disabled />
                    </td>
                    <td className="border px-2 py-2">
                      <Input value={result.totalStudents} className="h-8 text-xs" />
                    </td>
                    <td className="border px-2 py-2">
                      <Input value={result.passed} className="h-8 text-xs" />
                    </td>
                    <td className="border px-2 py-2">
                      <Input value={result.passPercent} className="h-8 text-xs" />
                    </td>
                    <td className="border px-2 py-2">
                      <Input value={result.above75} className="h-8 text-xs" />
                    </td>
                    <td className="border px-2 py-2">
                      <Input value={result.range60to75} className="h-8 text-xs" />
                    </td>
                    <td className="border px-2 py-2">
                      <Input value={result.range50to60} className="h-8 text-xs" />
                    </td>
                    <td className="border px-2 py-2">
                      <Input value={result.range40to50} className="h-8 text-xs" />
                    </td>
                    <td className="border px-2 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-xs">-</td>
                    <td className="border px-2 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(resultAnalysis, setResultAnalysis, result.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section III: Student Projects */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>III. Details of Student Projects Handled</CardTitle>
            <Button
              onClick={() =>
                addRow(studentProjects, setStudentProjects, {
                  batch: "",
                  numStudents: "",
                  projectTitle: "",
                  recognition: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Batch</th>
                  <th className="border px-3 py-2 text-left">No. of Students</th>
                  <th className="border px-3 py-2 text-left">Project Title</th>
                  <th className="border px-3 py-2 text-left">Recognition/Awards</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={project.batch}
                        onChange={(e) =>
                          setStudentProjects(
                            studentProjects.map((p) => (p.id === project.id ? { ...p, batch: e.target.value } : p)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={project.numStudents}
                        onChange={(e) =>
                          setStudentProjects(
                            studentProjects.map((p) =>
                              p.id === project.id ? { ...p, numStudents: e.target.value } : p,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={project.projectTitle}
                        onChange={(e) =>
                          setStudentProjects(
                            studentProjects.map((p) =>
                              p.id === project.id ? { ...p, projectTitle: e.target.value } : p,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={project.recognition}
                        onChange={(e) =>
                          setStudentProjects(
                            studentProjects.map((p) =>
                              p.id === project.id ? { ...p, recognition: e.target.value } : p,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(studentProjects, setStudentProjects, project.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section IV: Student Feedback */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>IV. Summary of Students Feedback on Subjects Taught</CardTitle>
            <Button
              onClick={() =>
                addRow(studentFeedback, setStudentFeedback, {
                  sem: "",
                  courseCode: "",
                  type: "",
                  feedback1: "",
                  feedback2: "",
                  average: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Feedback
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Sem.</th>
                  <th className="border px-3 py-2 text-left">Course Code</th>
                  <th className="border px-3 py-2 text-left">Type</th>
                  <th className="border px-3 py-2 text-left">Feedback 1%</th>
                  <th className="border px-3 py-2 text-left">Feedback 2%</th>
                  <th className="border px-3 py-2 text-left">Average</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentFeedback.map((feedback) => (
                  <tr key={feedback.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={feedback.sem}
                        onChange={(e) =>
                          setStudentFeedback(
                            studentFeedback.map((f) => (f.id === feedback.id ? { ...f, sem: e.target.value } : f)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={feedback.courseCode}
                        onChange={(e) =>
                          setStudentFeedback(
                            studentFeedback.map((f) =>
                              f.id === feedback.id ? { ...f, courseCode: e.target.value } : f,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={feedback.type}
                        onChange={(e) =>
                          setStudentFeedback(
                            studentFeedback.map((f) => (f.id === feedback.id ? { ...f, type: e.target.value } : f)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={feedback.feedback1}
                        onChange={(e) =>
                          setStudentFeedback(
                            studentFeedback.map((f) =>
                              f.id === feedback.id ? { ...f, feedback1: e.target.value } : f,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={feedback.feedback2}
                        onChange={(e) =>
                          setStudentFeedback(
                            studentFeedback.map((f) =>
                              f.id === feedback.id ? { ...f, feedback2: e.target.value } : f,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={feedback.average}
                        onChange={(e) =>
                          setStudentFeedback(
                            studentFeedback.map((f) => (f.id === feedback.id ? { ...f, average: e.target.value } : f)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(studentFeedback, setStudentFeedback, feedback.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section V: Learning Resources */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>V. Learning Resources and Materials Developed</CardTitle>
            <Button
              onClick={() =>
                addRow(learningResources, setLearningResources, {
                  subjectCode: "",
                  title: "",
                  unit: "",
                  nature: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Resource
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Subject Code</th>
                  <th className="border px-3 py-2 text-left">Title</th>
                  <th className="border px-3 py-2 text-left">Unit No.</th>
                  <th className="border px-3 py-2 text-left">Nature of Resource</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {learningResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={resource.subjectCode}
                        onChange={(e) =>
                          setLearningResources(
                            learningResources.map((r) =>
                              r.id === resource.id ? { ...r, subjectCode: e.target.value } : r,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={resource.title}
                        onChange={(e) =>
                          setLearningResources(
                            learningResources.map((r) => (r.id === resource.id ? { ...r, title: e.target.value } : r)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={resource.unit}
                        onChange={(e) =>
                          setLearningResources(
                            learningResources.map((r) => (r.id === resource.id ? { ...r, unit: e.target.value } : r)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={resource.nature}
                        onChange={(e) =>
                          setLearningResources(
                            learningResources.map((r) => (r.id === resource.id ? { ...r, nature: e.target.value } : r)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(learningResources, setLearningResources, resource.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section VI: Academic Activities */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>VI. Academic Activities Participated/Conducted</CardTitle>
            <Button
              onClick={() =>
                addRow(academicActivities, setAcademicActivities, {
                  description: "",
                  venue: "",
                  date: "",
                  role: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Activity
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Description</th>
                  <th className="border px-3 py-2 text-left">Venue</th>
                  <th className="border px-3 py-2 text-left">Date</th>
                  <th className="border px-3 py-2 text-left">Participated/Conducted</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {academicActivities.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={activity.description}
                        onChange={(e) =>
                          setAcademicActivities(
                            academicActivities.map((a) =>
                              a.id === activity.id ? { ...a, description: e.target.value } : a,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={activity.venue}
                        onChange={(e) =>
                          setAcademicActivities(
                            academicActivities.map((a) => (a.id === activity.id ? { ...a, venue: e.target.value } : a)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={activity.date}
                        onChange={(e) =>
                          setAcademicActivities(
                            academicActivities.map((a) => (a.id === activity.id ? { ...a, date: e.target.value } : a)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={activity.role}
                        onChange={(e) =>
                          setAcademicActivities(
                            academicActivities.map((a) => (a.id === activity.id ? { ...a, role: e.target.value } : a)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(academicActivities, setAcademicActivities, activity.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section VII: Funded Research */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>VII. Funded Research/Consultancy/Seminars</CardTitle>
            <Button
              onClick={() =>
                addRow(fundedResearch, setFundedResearch, {
                  description: "",
                  amount: "",
                  agency: "",
                  duration: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Description</th>
                  <th className="border px-3 py-2 text-left">Amount (Rs.)</th>
                  <th className="border px-3 py-2 text-left">Funding Agency</th>
                  <th className="border px-3 py-2 text-left">Duration</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {fundedResearch.map((research) => (
                  <tr key={research.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={research.description}
                        onChange={(e) =>
                          setFundedResearch(
                            fundedResearch.map((r) =>
                              r.id === research.id ? { ...r, description: e.target.value } : r,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={research.amount}
                        onChange={(e) =>
                          setFundedResearch(
                            fundedResearch.map((r) => (r.id === research.id ? { ...r, amount: e.target.value } : r)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={research.agency}
                        onChange={(e) =>
                          setFundedResearch(
                            fundedResearch.map((r) => (r.id === research.id ? { ...r, agency: e.target.value } : r)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={research.duration}
                        onChange={(e) =>
                          setFundedResearch(
                            fundedResearch.map((r) => (r.id === research.id ? { ...r, duration: e.target.value } : r)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(fundedResearch, setFundedResearch, research.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section VIII: Publications */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>VIII. Research Publications</CardTitle>
            <Button
              onClick={() =>
                addRow(publications, setPublications, {
                  journal: "",
                  details: "",
                  impactFactor: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Publication
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Journal/Conference</th>
                  <th className="border px-3 py-2 text-left">Publication Details</th>
                  <th className="border px-3 py-2 text-left">Impact Factor</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {publications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={pub.journal}
                        onChange={(e) =>
                          setPublications(
                            publications.map((p) => (p.id === pub.id ? { ...p, journal: e.target.value } : p)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={pub.details}
                        onChange={(e) =>
                          setPublications(
                            publications.map((p) => (p.id === pub.id ? { ...p, details: e.target.value } : p)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={pub.impactFactor}
                        onChange={(e) =>
                          setPublications(
                            publications.map((p) => (p.id === pub.id ? { ...p, impactFactor: e.target.value } : p)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(publications, setPublications, pub.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section IX: Governance */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>IX. Institutional Governance and Administration</CardTitle>
            <Button
              onClick={() =>
                addRow(governance, setGovernance, {
                  role: "",
                  duration: "",
                  achievements: "",
                  hodRemarks: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Role</th>
                  <th className="border px-3 py-2 text-left">Duration</th>
                  <th className="border px-3 py-2 text-left">Achievements</th>
                  <th className="border px-3 py-2 text-left">HOD Remarks</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {governance.map((gov) => (
                  <tr key={gov.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={gov.role}
                        onChange={(e) =>
                          setGovernance(governance.map((g) => (g.id === gov.id ? { ...g, role: e.target.value } : g)))
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={gov.duration}
                        onChange={(e) =>
                          setGovernance(
                            governance.map((g) => (g.id === gov.id ? { ...g, duration: e.target.value } : g)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Textarea
                        value={gov.achievements}
                        onChange={(e) =>
                          setGovernance(
                            governance.map((g) => (g.id === gov.id ? { ...g, achievements: e.target.value } : g)),
                          )
                        }
                        className="min-h-8 text-xs"
                      />
                    </td>
                    <td className="border px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed">-</td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(governance, setGovernance, gov.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section X: Document Completion */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>X. Document Updation on Time</CardTitle>
            <Button
              onClick={() =>
                addRow(documentCompletion, setDocumentCompletion, {
                  document: "",
                  completion: "",
                  hodRemarks: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Document</th>
                  <th className="border px-3 py-2 text-left">% Completion on Time</th>
                  <th className="border px-3 py-2 text-left">HOD Remarks</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {documentCompletion.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={doc.document}
                        onChange={(e) =>
                          setDocumentCompletion(
                            documentCompletion.map((d) => (d.id === doc.id ? { ...d, document: e.target.value } : d)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={doc.completion}
                        onChange={(e) =>
                          setDocumentCompletion(
                            documentCompletion.map((d) => (d.id === doc.id ? { ...d, completion: e.target.value } : d)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed">-</td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(documentCompletion, setDocumentCompletion, doc.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section XI: Examination Work */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>XI. Examination Work</CardTitle>
            <Button
              onClick={() =>
                addRow(examinationWork, setExaminationWork, {
                  role: "",
                  documents: "",
                  completion: "",
                  hodRemarks: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Work
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Role/Nature of Work</th>
                  <th className="border px-3 py-2 text-left">Documents</th>
                  <th className="border px-3 py-2 text-left">% Work Completed on Time</th>
                  <th className="border px-3 py-2 text-left">HOD Remarks</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {examinationWork.map((work) => (
                  <tr key={work.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Textarea
                        value={work.role}
                        onChange={(e) =>
                          setExaminationWork(
                            examinationWork.map((w) => (w.id === work.id ? { ...w, role: e.target.value } : w)),
                          )
                        }
                        className="text-s"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={work.documents}
                        onChange={(e) =>
                          setExaminationWork(
                            examinationWork.map((w) => (w.id === work.id ? { ...w, documents: e.target.value } : w)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={work.completion}
                        onChange={(e) =>
                          setExaminationWork(
                            examinationWork.map((w) => (w.id === work.id ? { ...w, completion: e.target.value } : w)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed">-</td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(examinationWork, setExaminationWork, work.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section XII: Placement Support */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>XII. Placement/Internship Support</CardTitle>
            <Button
              onClick={() =>
                addRow(placementSupport, setPlacementSupport, {
                  usn: "",
                  studentName: "",
                  type: "",
                  assistance: "",
                  company: "",
                  hodRemarks: "",
                })
              }
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Record
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Student USN</th>
                  <th className="border px-3 py-2 text-left">Student Name</th>
                  <th className="border px-3 py-2 text-left">Placement/Internship</th>
                  <th className="border px-3 py-2 text-left">Type of Assistance</th>
                  <th className="border px-3 py-2 text-left">Company/Contact</th>
                  <th className="border px-3 py-2 text-left">HOD Remarks</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {placementSupport.map((placement) => (
                  <tr key={placement.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">
                      <Input
                        value={placement.usn}
                        onChange={(e) =>
                          setPlacementSupport(
                            placementSupport.map((p) => (p.id === placement.id ? { ...p, usn: e.target.value } : p)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={placement.studentName}
                        onChange={(e) =>
                          setPlacementSupport(
                            placementSupport.map((p) =>
                              p.id === placement.id ? { ...p, studentName: e.target.value } : p,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={placement.type}
                        onChange={(e) =>
                          setPlacementSupport(
                            placementSupport.map((p) => (p.id === placement.id ? { ...p, type: e.target.value } : p)),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={placement.assistance}
                        onChange={(e) =>
                          setPlacementSupport(
                            placementSupport.map((p) =>
                              p.id === placement.id ? { ...p, assistance: e.target.value } : p,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2">
                      <Input
                        value={placement.company}
                        onChange={(e) =>
                          setPlacementSupport(
                            placementSupport.map((p) =>
                              p.id === placement.id ? { ...p, company: e.target.value } : p,
                            ),
                          )
                        }
                        className="h-8"
                      />
                    </td>
                    <td className="border px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed">-</td>
                    <td className="border px-3 py-2 text-center">
                      <Button
                        onClick={() => deleteRow(placementSupport, setPlacementSupport, placement.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Remarks */}
      <Card>
        <CardHeader>
          <CardTitle>XIII. Additional Remarks by HOD</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="HOD Remarks will be added after evaluation" className="min-h-24" disabled />
        </CardContent>
      </Card>

      {/* Signature Section */}
      
    </div>
  )
}
