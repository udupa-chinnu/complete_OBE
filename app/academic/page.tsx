"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AcademicPage() {
  const router = useRouter()
  const [facultySubjects] = useState({
    theory: [
      { code: "CS301", name: "Data Structures", semester: "3rd", batch: "2023-24" },
      { code: "CS401", name: "Database Management Systems", semester: "4th", batch: "2023-24" },
      { code: "CS501", name: "Software Engineering", semester: "5th", batch: "2023-24" },
    ],
    laboratory: [
      { code: "CS302L", name: "Data Structures Lab", semester: "3rd", batch: "2023-24" },
      { code: "CS402L", name: "DBMS Lab", semester: "4th", batch: "2023-24" },
    ],
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }
  const handleSubjectClick = (selectedSubject: string) => {
    localStorage.setItem("selectedSubject", selectedSubject)
    router.push("/course-file-content")
  }

  const handlePreviousYearFiles = () => {
    router.push("/previous-year-files")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button onClick={handleBackToDashboard} variant="outline" size="sm">
                ← Back to Dashboard
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Academic Module</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Theory Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-blue-600">Theory Subjects Allocated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                    {facultySubjects.theory.map((subj, index) => (
                      <Button
                        key={index}
                        onClick={() => handleSubjectClick(subj.name)}
                        variant="outline"
                        className="justify-start p-4 h-auto hover:bg-blue-50"
                      >
                         <div className="flex flex-col text-left">
      <span className="font-medium">{subj.name}</span>
      <span className="text-sm text-gray-600">
        {subj.code} • Semester: {subj.semester} • Batch: {subj.batch}
      </span>
    </div>
                      </Button>
                    ))}
                  </div>
            </CardContent>
          </Card>

          {/* Laboratory Subjects */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-green-600">Laboratory Subjects Allocated</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {facultySubjects.laboratory.map((subject, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{subject.name}</h3>
                    <Badge variant="secondary">{subject.code}</Badge>
                  </div>
                  
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Previous Year Course Files Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handlePreviousYearFiles}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
          >
            Click here to see previous year course files
          </Button>
        </div>
      </div>
    </div>
  )
}
