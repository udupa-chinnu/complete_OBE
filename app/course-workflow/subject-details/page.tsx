"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"

export default function SubjectDetailsPage() {
  const router = useRouter()
  const [selectedSubject, setSelectedSubject] = useState("")

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

  const handleSaveNext = () => {
    router.push("/course-workflow/course-closure-report")
  }

  const handleBack = () => {
    router.push("/course-workflow/timetable-upload")
  }

  const handleViewFile = () => {
    alert("File viewer interface would open here")
  }

  // Mock subject details based on selected subject
  const getSubjectDetails = () => {
    if (selectedSubject.includes("Data Structures")) {
      return {
        name: "Data Structures",
        code: "CS301",
        batch: "2023-24",
        scheme: "2022",
        semester: "3rd",
      }
    } else if (selectedSubject.includes("Database")) {
      return {
        name: "Database Management Systems",
        code: "CS401",
        batch: "2023-24",
        scheme: "2022",
        semester: "4th",
      }
    } else {
      return {
        name: "Software Engineering",
        code: "CS501",
        batch: "2023-24",
        scheme: "2022",
        semester: "5th",
      }
    }
  }

  const subjectDetails = getSubjectDetails()

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
              <h1 className="text-xl font-semibold text-gray-800">Subject Details</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-600">Syllabus Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject Name</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject Code</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Batch (Year)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Scheme (Year)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Semester</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">
                      <div className="font-medium text-gray-900">{subjectDetails.name}</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <Badge variant="secondary">{subjectDetails.code}</Badge>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{subjectDetails.batch}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{subjectDetails.scheme}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{subjectDetails.semester}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <Button
                        onClick={handleViewFile}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2 bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View File</span>
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Subject Overview</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>
                  <strong>Subject:</strong> {subjectDetails.name} ({subjectDetails.code})
                </p>
                <p>
                  <strong>Academic Details:</strong> Batch {subjectDetails.batch}, Scheme {subjectDetails.scheme},{" "}
                  {subjectDetails.semester} Semester
                </p>
                <p>
                  <strong>Status:</strong> Course file workflow in progress
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

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
