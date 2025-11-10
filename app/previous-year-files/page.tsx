"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PreviousYearFilesPage() {
  const router = useRouter()
  const [academicYear, setAcademicYear] = useState("")
  const [semester, setSemester] = useState("")
  const [subject, setSubject] = useState("")
  const [showResults, setShowResults] = useState(false)

  const subjects = [
    "Data Structures (CS301)",
    "Database Management Systems (CS401)",
    "Software Engineering (CS501)",
    "Data Structures Lab (CS302L)",
    "DBMS Lab (CS402L)",
  ]

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleShow = () => {
    if (academicYear && semester && subject) {
      setShowResults(true)
    }
  }

  const handleSubjectClick = (selectedSubject: string) => {
    localStorage.setItem("selectedSubject", selectedSubject)
    router.push("/course-file-content")
  }

  const handleBackToAcademic = () => {
    router.push("/academic")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button onClick={handleBackToAcademic} variant="outline" size="sm">
                ← Back to Academic
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Previous Year Course Files</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Academic Year</label>
                <Select onValueChange={setAcademicYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-24">2023-24</SelectItem>
                    <SelectItem value="2022-23">2022-23</SelectItem>
                    <SelectItem value="2021-22">2021-22</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Semester</label>
                <Select onValueChange={setSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="odd">Odd</SelectItem>
                    <SelectItem value="even">Even</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <Select onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subj, index) => (
                      <SelectItem key={index} value={subj}>
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleShow} className="bg-blue-600 hover:bg-blue-700">
                Show
              </Button>
            </div>

            {showResults && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Selected Course Details:</h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Academic Year:</strong> {academicYear}
                  </p>
                  <p>
                    <strong>Semester:</strong> {semester}
                  </p>
                  <p>
                    <strong>Subject:</strong> {subject}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-md font-semibold mb-3">Available Subjects:</h4>
                  <div className="grid gap-3">
                    {subjects.map((subj, index) => (
                      <Button
                        key={index}
                        onClick={() => handleSubjectClick(subj)}
                        variant="outline"
                        className="justify-start p-4 h-auto hover:bg-blue-50"
                      >
                        {subj}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
