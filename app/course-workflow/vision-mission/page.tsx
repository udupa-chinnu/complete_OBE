"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function VisionMissionPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleSaveNext = () => {
    router.push("/course-workflow/timetable-upload")
  }

  const handleBack = () => {
    router.push("/course-file-content")
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
              <h1 className="text-xl font-semibold text-gray-800">Vision, Mission & Objectives</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Vision */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-600">Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value="To be a premier institution of higher learning, fostering innovation, excellence, and ethical leadership in engineering and technology education, contributing to the advancement of society and the nation."
                className="min-h-[100px] bg-gray-50"
              />
            </CardContent>
          </Card>

          {/* Mission */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-600">Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value="To provide quality education in engineering and technology through innovative teaching-learning processes, research, and industry collaboration. To develop competent professionals with strong ethical values, leadership qualities, and commitment to lifelong learning. To contribute to the technological advancement and socio-economic development of the region and the nation."
                className="min-h-[120px] bg-gray-50"
              />
            </CardContent>
          </Card>

          {/* Program Educational Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-600">Program Educational Objectives (PEOs)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value="PEO1: Graduates will demonstrate technical competence in their chosen field of engineering and adapt to emerging technologies.

PEO2: Graduates will exhibit professional skills including effective communication, teamwork, and leadership abilities.

PEO3: Graduates will engage in lifelong learning and pursue advanced studies or professional development.

PEO4: Graduates will demonstrate ethical responsibility and contribute to the betterment of society."
                className="min-h-[150px] bg-gray-50"
              />
            </CardContent>
          </Card>

          {/* Program Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-orange-600">Program Outcomes (POs)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value="PO1: Engineering knowledge: Apply knowledge of mathematics, science, and engineering fundamentals.

PO2: Problem analysis: Identify, formulate, and analyze complex engineering problems.

PO3: Design/development of solutions: Design solutions for complex engineering problems.

PO4: Conduct investigations: Use research-based knowledge and methods to provide valid conclusions.

PO5: Modern tool usage: Create, select, and apply appropriate techniques and modern tools.

PO6: The engineer and society: Apply reasoning informed by contextual knowledge.

PO7: Environment and sustainability: Understand the impact of professional solutions.

PO8: Ethics: Apply ethical principles and commit to professional ethics.

PO9: Individual and team work: Function effectively as an individual and as a member of diverse teams.

PO10: Communication: Communicate effectively on complex engineering activities.

PO11: Project management and finance: Demonstrate knowledge and understanding of management principles.

PO12: Life-long learning: Recognize the need for and have the ability to engage in independent learning."
                className="min-h-[300px] bg-gray-50"
              />
            </CardContent>
          </Card>

          {/* Program Specific Outcomes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-red-600">Program Specific Outcomes (PSOs)</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value="PSO1: Professional Skills: Ability to apply knowledge of computer science and engineering to solve real-world problems.

PSO2: Technical Expertise: Proficiency in software development, system design, and emerging technologies.

PSO3: Innovation and Research: Capability to engage in research and development activities in computer science and related fields."
                className="min-h-[120px] bg-gray-50"
              />
            </CardContent>
          </Card>
        </div>

        {/* Save & Next Button */}
        <div className="flex justify-center mt-8">
          <Button onClick={handleSaveNext} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  )
}
