"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CourseFileContentPage() {
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState("")
  const [hasReadContent, setHasReadContent] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }

    const subject = localStorage.getItem("selectedSubject")
    if (subject) {
      setSelectedSubject(subject)
    }
  }, [router])

  const handleNext = () => {
    if (hasReadContent) {
      router.push("/course-workflow/vision-mission")
    }
  }

  const handleBack = () => {
    router.push("/academic")
  }

  const courseFileContent = [
    "Course Cover Page",
    "Vision and Mission of Institute and Department",
    "Programme Educational Objectives (PEOs)",
    "List of Programme Outcomes (POs) and Programme Specific Outcomes (PSOs)",
    "Faculty Incharge Information",
    "a. Brief Bio Data",
    "b. Individual Timetable",
    "Class Timetable",
    "Syllabus with LTP (VTU Original)",
    "Course Closure Report (Previous Semester)",
    "List of Course Outcomes (COs)",
    "COs-POs-PSOs Mapping",
    "Curriculum Gap Analysis",
    "Content Beyond the Syllabus Planned",
    "Action Plans Based on Suggestions Made in Course Closure Report (Previous Semester)",
    "Lesson Plan",
    "Direct Assessment / Indirect Assessment Tools Planned in Current Cycle",
    "Direct Assessment",
    "a. CIE Question Papers",
    "b. Moderation Forms",
    "c. Scheme of Evaluation",
    "d. CIE and Assignment CO Attainment (Refer OBE Excel)",
    "Indirect Assessment",
    "a. CO Attainment (Refer OBE Excel)",
    "Details of Innovative Techniques Used in Classroom Teaching Process (if any)",
    "References",
    "a. Textbook Citations",
    "b. Journals",
    "c. Handbooks",
    "d. Webpages",
    "Student Feedback on Course Outcomes",
    "Attendance Register",
    "Result Analysis",
    "Course Closure Report (Current Semester)",
    "Course Coordinator Closure Report (Current Semester)",
  ]

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
              <h1 className="text-xl font-semibold text-gray-800">Course File Content</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Selected Subject: {selectedSubject}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Course File Content */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-600">COURSE FILE CONTENT</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <ol className="space-y-2 text-sm">
                  {courseFileContent.map((item, index) => (
                    <li key={index} className="flex">
                      <span className="mr-3 text-gray-500">{index + 1}.</span>
                      <span
                        className={
                          item.startsWith("a.") ||
                          item.startsWith("b.") ||
                          item.startsWith("c.") ||
                          item.startsWith("d.")
                            ? "ml-4"
                            : ""
                        }
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Additional Guidelines with uploaded image */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-600">ADDITIONAL GUIDELINES</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img 
                  src="/images/course-file-content.png" 
                  alt="CO Formulation Process and Assessment Guidelines"
                  className="w-full h-auto rounded-lg border border-gray-200"
                />
                
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Checkbox and Next Button */}
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="read-confirmation"
              checked={hasReadContent}
              onCheckedChange={(checked) => setHasReadContent(checked as boolean)}
            />
            <label
              htmlFor="read-confirmation"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I read and I will follow
            </label>
          </div>

          <Button
            onClick={handleNext}
            disabled={!hasReadContent}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
