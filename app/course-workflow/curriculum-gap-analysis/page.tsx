"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus } from 'lucide-react'

export default function CurriculumGapAnalysisPage() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<string>("")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleBack = () => {
    router.push("/course-workflow/course-outcomes")
  }

  const handleViewPrevious = () => {
    setActiveView("previous")
  }

  const handleFillCurrent = () => {
    setActiveView("fill")
  }

  const handleViewCurrent = () => {
    setActiveView("current")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button onClick={handleBack} variant="outline" size="sm">
                ← Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Curriculum Gap Analysis</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeView && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600">Curriculum Gap Analysis Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Button
                  onClick={handleViewPrevious}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-lg font-medium"
                >
                  View Previous Curriculum Gap Analysis
                </Button>
                <Button
                  onClick={handleFillCurrent}
                  className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-lg font-medium"
                >
                  Fill Current Curriculum Gap Analysis
                </Button>
                <Button
                  onClick={handleViewCurrent}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-lg font-medium"
                >
                  View Current Cycle Gap Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === "previous" && <PreviousGapAnalysis onBack={() => setActiveView("")} />}
        {activeView === "fill" && <FillCurrentGapAnalysis onBack={() => setActiveView("")} />}
        {activeView === "current" && <CurrentGapAnalysis onBack={() => setActiveView("")} />}
      </div>
    </div>
  )
}

function PreviousGapAnalysis({ onBack }: { onBack: () => void }) {
  const previousGapData = [
    {
      year: "2022",
      modules: [
        {
          moduleNumber: 1,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 2,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 3,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 4,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 5,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },
      ],
    },
    {
      year: "2021",
      modules: [
        {
          moduleNumber: 1,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 2,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 3,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 4,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 5,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },
      ],
    },
    {
      year: "2020",
      modules: [
        {
          moduleNumber: 1,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 2,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 3,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 4,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 5,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },
      ],
    },
    
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-blue-600">Curriculum Gap - Previous Cycles</CardTitle>
          <Button onClick={onBack} variant="outline">
            Back to Options
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {previousGapData.map((yearData, yearIndex) => (
          <div key={yearIndex} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Year: {yearData.year}</h2>

            {yearData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold text-blue-600">Module – {module.moduleNumber}</h3>

                {/* AICTE Future Skills */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Relevance of the Topic to the AICTE Future Skills
                  </h4>
                  <ol className="list-[lower-alpha] list-inside space-y-1">
                    {module.aicteSkills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-gray-700">
                        {skill}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Competitive Examination Syllabus */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Competitive Examination Syllabus</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Exam</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Topic</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Document</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.competitiveExams.map((exam, examIndex) => (
                          <tr key={examIndex}>
                            <td className="border border-gray-300 px-4 py-2">{examIndex + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{exam.exam}</td>
                            <td className="border border-gray-300 px-4 py-2">{exam.topic}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{exam.document}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benchmarking Institutions */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Benchmarking Institutions</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Institute Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Topic</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Document</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.benchmarkingInstitutions.map((institute, instituteIndex) => (
                          <tr key={instituteIndex}>
                            <td className="border border-gray-300 px-4 py-2">{instituteIndex + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{institute.institute}</td>
                            <td className="border border-gray-300 px-4 py-2">{institute.topic}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{institute.document}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Relevance to Industry */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Relevance to the Industry</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Industry Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Domain</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Topic Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.industryRelevance.map((industry, industryIndex) => (
                          <tr key={industryIndex}>
                            <td className="border border-gray-300 px-4 py-2">{industryIndex + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{industry.industry}</td>
                            <td className="border border-gray-300 px-4 py-2">{industry.domain}</td>
                            <td className="border border-gray-300 px-4 py-2">{industry.topic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function FillCurrentGapAnalysis({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  const [modules, setModules] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      moduleNumber: i + 1,
      checkedSections: {
        aicteSkills: false,
        competitiveExams: false,
        benchmarking: false,
        industryPlacement: false,
      },
      aicteSkills: [{ topic: "" }],
      competitiveExams: [{ exam: "GATE", topic: "", file: null }],
      benchmarking: [{ instituteName: "", domain: "", topic: "", file: null }],
      industryPlacement: {
        type: "",
        industry: [{ name: "", domain: "", topic: "", file: null }],
        placement: [{ topic: "" }],
      },
    })),
  )

  const handleCheckboxChange = (moduleIndex: number, section: string, checked: boolean) => {
    setModules((prev) =>
      prev.map((module, index) =>
        index === moduleIndex
          ? { ...module, checkedSections: { ...module.checkedSections, [section]: checked } }
          : module,
      ),
    )
  }

  const addField = (moduleIndex: number, section: string) => {
    setModules((prev) =>
      prev.map((module, index) => {
        if (index !== moduleIndex) return module

        const newModule = { ...module }
        if (section === "aicteSkills") {
          newModule.aicteSkills = [...module.aicteSkills, { topic: "" }]
        } else if (section === "competitiveExams") {
          newModule.competitiveExams = [...module.competitiveExams, { exam: "GATE", topic: "", file: null }]
        } else if (section === "benchmarking") {
          newModule.benchmarking = [...module.benchmarking, { instituteName: "", domain: "", topic: "", file: null }]
        } else if (section === "industry") {
          newModule.industryPlacement.industry = [
            ...module.industryPlacement.industry,
            { name: "", domain: "", topic: "", file: null },
          ]
        } else if (section === "placement") {
          newModule.industryPlacement.placement = [...module.industryPlacement.placement, { topic: "" }]
        }
        return newModule
      }),
    )
  }

  const removeField = (moduleIndex: number, section: string, fieldIndex: number) => {
    setModules((prev) =>
      prev.map((module, index) => {
        if (index !== moduleIndex) return module

        const newModule = { ...module }
        if (section === "aicteSkills" && module.aicteSkills.length > 1) {
          newModule.aicteSkills = module.aicteSkills.filter((_, i) => i !== fieldIndex)
        } else if (section === "competitiveExams" && module.competitiveExams.length > 1) {
          newModule.competitiveExams = module.competitiveExams.filter((_, i) => i !== fieldIndex)
        } else if (section === "benchmarking" && module.benchmarking.length > 1) {
          newModule.benchmarking = module.benchmarking.filter((_, i) => i !== fieldIndex)
        } else if (section === "industry" && module.industryPlacement.industry.length > 1) {
          newModule.industryPlacement.industry = module.industryPlacement.industry.filter((_, i) => i !== fieldIndex)
        } else if (section === "placement" && module.industryPlacement.placement.length > 1) {
          newModule.industryPlacement.placement = module.industryPlacement.placement.filter((_, i) => i !== fieldIndex)
        }
        return newModule
      }),
    )
  }

  const handleSave = () => {
    router.push("/course-workflow/textbooks-references")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-green-600">Current Cycle - Curriculum Gap</CardTitle>
          <Button onClick={onBack} variant="outline">
            Back to Options
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {modules.map((module, moduleIndex) => (
          <div key={moduleIndex} className="border border-gray-200 rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-semibold text-blue-600">Module - {module.moduleNumber}</h3>

            {/* Checklist */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={module.checkedSections.aicteSkills}
                  onCheckedChange={(checked) => handleCheckboxChange(moduleIndex, "aicteSkills", checked as boolean)}
                />
                <label className="text-sm font-medium">Relevance to AICTE Future Skills</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={module.checkedSections.competitiveExams}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(moduleIndex, "competitiveExams", checked as boolean)
                  }
                />
                <label className="text-sm font-medium">Competitive Examination Syllabus</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={module.checkedSections.benchmarking}
                  onCheckedChange={(checked) => handleCheckboxChange(moduleIndex, "benchmarking", checked as boolean)}
                />
                <label className="text-sm font-medium">Benchmarking Institutions</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={module.checkedSections.industryPlacement}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(moduleIndex, "industryPlacement", checked as boolean)
                  }
                />
                <label className="text-sm font-medium">Relevance to the Industry / Placement</label>
              </div>
            </div>

            {/* AICTE Future Skills */}
            {module.checkedSections.aicteSkills && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">Relevance to AICTE Future Skills</h4>
                  <Button
                    onClick={() => addField(moduleIndex, "aicteSkills")}
                    size="sm"
                    variant="outline"
                    className="p-1"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {module.aicteSkills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <Input
                      placeholder="Topic Name"
                      value={skill.topic}
                      onChange={(e) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].aicteSkills[skillIndex].topic = e.target.value
                        setModules(newModules)
                      }}
                    />
                    {module.aicteSkills.length > 1 && (
                      <Button
                        onClick={() => removeField(moduleIndex, "aicteSkills", skillIndex)}
                        size="sm"
                        variant="outline"
                        className="p-1"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Competitive Examination Syllabus */}
            {module.checkedSections.competitiveExams && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">Competitive Examination Syllabus</h4>
                  <Button
                    onClick={() => addField(moduleIndex, "competitiveExams")}
                    size="sm"
                    variant="outline"
                    className="p-1"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {module.competitiveExams.map((exam, examIndex) => (
                  <div key={examIndex} className="flex items-center space-x-2">
                    <Select
                      value={exam.exam}
                      onValueChange={(value) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].competitiveExams[examIndex].exam = value
                        setModules(newModules)
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GATE">GATE</SelectItem>
                        <SelectItem value="RVET">RVET</SelectItem>
                        <SelectItem value="NET">NET</SelectItem>
                        <SelectItem value="SLET">SLET</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Topic"
                      value={exam.topic}
                      onChange={(e) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].competitiveExams[examIndex].topic = e.target.value
                        setModules(newModules)
                      }}
                    />
                    <Input type="file" className="w-32" />
                    {module.competitiveExams.length > 1 && (
                      <Button
                        onClick={() => removeField(moduleIndex, "competitiveExams", examIndex)}
                        size="sm"
                        variant="outline"
                        className="p-1"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Benchmarking Institutions */}
            {module.checkedSections.benchmarking && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">Benchmarking Institutions</h4>
                  <Button
                    onClick={() => addField(moduleIndex, "benchmarking")}
                    size="sm"
                    variant="outline"
                    className="p-1"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {module.benchmarking.map((institute, instituteIndex) => (
                  <div key={instituteIndex} className="flex items-center space-x-2">
                    <Input
                      placeholder="Institute Name"
                      value={institute.instituteName}
                      onChange={(e) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].benchmarking[instituteIndex].instituteName = e.target.value
                        setModules(newModules)
                      }}
                    />
                    <Input
                      placeholder="Domain"
                      value={institute.domain}
                      onChange={(e) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].benchmarking[instituteIndex].domain = e.target.value
                        setModules(newModules)
                      }}
                    />
                    <Input
                      placeholder="Topic Used"
                      value={institute.topic}
                      onChange={(e) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].benchmarking[instituteIndex].topic = e.target.value
                        setModules(newModules)
                      }}
                    />
                    <Input type="file" className="w-32" />
                    {module.benchmarking.length > 1 && (
                      <Button
                        onClick={() => removeField(moduleIndex, "benchmarking", instituteIndex)}
                        size="sm"
                        variant="outline"
                        className="p-1"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Industry/Placement Relevance */}
            {module.checkedSections.industryPlacement && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Relevance to the Industry / Placement</h4>

                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`relevance-${moduleIndex}`}
                      value="industry"
                      checked={module.industryPlacement.type === "industry"}
                      onChange={(e) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].industryPlacement.type = e.target.value
                        setModules(newModules)
                      }}
                    />
                    <span>Industry</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`relevance-${moduleIndex}`}
                      value="placement"
                      checked={module.industryPlacement.type === "placement"}
                      onChange={(e) => {
                        const newModules = [...modules]
                        newModules[moduleIndex].industryPlacement.type = e.target.value
                        setModules(newModules)
                      }}
                    />
                    <span>Placement</span>
                  </label>
                </div>

                {module.industryPlacement.type === "industry" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-700">Industry</h5>
                      <Button
                        onClick={() => addField(moduleIndex, "industry")}
                        size="sm"
                        variant="outline"
                        className="p-1"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {module.industryPlacement.industry.map((industry, industryIndex) => (
                      <div key={industryIndex} className="flex items-center space-x-2">
                        <Input
                          placeholder="Industry Name"
                          value={industry.name}
                          onChange={(e) => {
                            const newModules = [...modules]
                            newModules[moduleIndex].industryPlacement.industry[industryIndex].name = e.target.value
                            setModules(newModules)
                          }}
                        />
                        <Input
                          placeholder="Domain"
                          value={industry.domain}
                          onChange={(e) => {
                            const newModules = [...modules]
                            newModules[moduleIndex].industryPlacement.industry[industryIndex].domain = e.target.value
                            setModules(newModules)
                          }}
                        />
                        <Input
                          placeholder="Topic"
                          value={industry.topic}
                          onChange={(e) => {
                            const newModules = [...modules]
                            newModules[moduleIndex].industryPlacement.industry[industryIndex].topic = e.target.value
                            setModules(newModules)
                          }}
                        />
                        <Input type="file" className="w-32" />
                        {module.industryPlacement.industry.length > 1 && (
                          <Button
                            onClick={() => removeField(moduleIndex, "industry", industryIndex)}
                            size="sm"
                            variant="outline"
                            className="p-1"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {module.industryPlacement.type === "placement" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-700">Placement</h5>
                      <Button
                        onClick={() => addField(moduleIndex, "placement")}
                        size="sm"
                        variant="outline"
                        className="p-1"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {module.industryPlacement.placement.map((placement, placementIndex) => (
                      <div key={placementIndex} className="flex items-center space-x-2">
                        <Input
                          placeholder="Placement Topic"
                          value={placement.topic}
                          onChange={(e) => {
                            const newModules = [...modules]
                            newModules[moduleIndex].industryPlacement.placement[placementIndex].topic = e.target.value
                            setModules(newModules)
                          }}
                        />
                        {module.industryPlacement.placement.length > 1 && (
                          <Button
                            onClick={() => removeField(moduleIndex, "placement", placementIndex)}
                            size="sm"
                            variant="outline"
                            className="p-1"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Save Button */}
        <div className="flex justify-center">
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
            Save & Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CurrentGapAnalysis({ onBack }: { onBack: () => void }) {
  const previousGapData = [
    {
      year: "2022",
      modules: [
        {
          moduleNumber: 1,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 2,
          aicteSkills: ["Skill A", "Skill B", "Skill C"],
          competitiveExams: [{ exam: "GATE", topic: "Data Structures", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 3,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 4,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },{
          moduleNumber: 5,
          aicteSkills: ["Skill X", "Skill Y", "Skill Z"],
          competitiveExams: [{ exam: "GATE", topic: "Algorithms", document: "📄" }],
          benchmarkingInstitutions: [{ institute: "IIT", topic: "Machine Learning", document: "📄" }],
          industryRelevance: [{ industry: "TCS", domain: "AI", topic: "Deep Learning" }],
        },
      ],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-purple-600">Current Cycle Gap Analysis</CardTitle>
          <Button onClick={onBack} variant="outline">
            Back to Options
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {previousGapData.map((yearData, yearIndex) => (
          <div key={yearIndex} className="space-y-6">
            {yearData.modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="border border-gray-200 rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold text-blue-600">Module – {module.moduleNumber}</h3>

                {/* AICTE Future Skills */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Relevance of the Topic to the AICTE Future Skills
                  </h4>
                  <ol className="list-[lower-alpha] list-inside space-y-1">
                    {module.aicteSkills?.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-gray-700">
                        {skill}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Competitive Examination Syllabus */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Competitive Examination Syllabus</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Exam</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Topic</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Document</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.competitiveExams?.map((exam, examIndex) => (
                          <tr key={examIndex}>
                            <td className="border border-gray-300 px-4 py-2">{examIndex + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{exam.exam}</td>
                            <td className="border border-gray-300 px-4 py-2">{exam.topic}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{exam.document}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Benchmarking Institutions */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Benchmarking Institutions</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Institute Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Topic</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Document</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.benchmarkingInstitutions?.map((institute, instituteIndex) => (
                          <tr key={instituteIndex}>
                            <td className="border border-gray-300 px-4 py-2">{instituteIndex + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{institute.institute}</td>
                            <td className="border border-gray-300 px-4 py-2">{institute.topic}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{institute.document}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Relevance to Industry */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Relevance to the Industry</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Industry Name</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Domain</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Topic Used</th>
                        </tr>
                      </thead>
                      <tbody>
                        {module.industryRelevance?.map((industry, industryIndex) => (
                          <tr key={industryIndex}>
                            <td className="border border-gray-300 px-4 py-2">{industryIndex + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{industry.industry}</td>
                            <td className="border border-gray-300 px-4 py-2">{industry.domain}</td>
                            <td className="border border-gray-300 px-4 py-2">{industry.topic}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
