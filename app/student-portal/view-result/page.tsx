"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, Trophy } from "lucide-react"

export default function ViewResultPage() {
  const router = useRouter()
  const [selectedSemester, setSelectedSemester] = useState("3")

  const semesterResults: Record<string, any[]> = {
    "1": [
      {
        course: "Fundamentals of Programming",
        code: "CS101",
        ia: 18,
        endTerm: 35,
        total: 53,
        grade: "B",
        credits: 4,
        gpa: 3.0,
      },
      {
        course: "Data Structures Basics",
        code: "CS102",
        ia: 17,
        endTerm: 32,
        total: 49,
        grade: "B-",
        credits: 4,
        gpa: 2.7,
      },
    ],
    "2": [
      { course: "Database Concepts", code: "CS151", ia: 19, endTerm: 38, total: 57, grade: "A", credits: 4, gpa: 4.0 },
      { course: "Web Basics", code: "CS152", ia: 16, endTerm: 30, total: 46, grade: "B-", credits: 3, gpa: 2.7 },
    ],
    "3": [
      { course: "Data Structures", code: "CS301", ia: 18, endTerm: 35, total: 53, grade: "B", credits: 4, gpa: 3.0 },
      { course: "Web Development", code: "CS302", ia: 17, endTerm: 32, total: 49, grade: "B-", credits: 3, gpa: 2.7 },
      { course: "Database Systems", code: "CS303", ia: 19, endTerm: 38, total: 57, grade: "A", credits: 4, gpa: 4.0 },
    ],
  }

  const results = semesterResults[selectedSemester] || []

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-blue-100 text-blue-800"
      case "B-":
        return "bg-blue-100 text-blue-800"
      case "C":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const semesterGPA =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + r.gpa * r.credits, 0) / results.reduce((sum, r) => sum + r.credits, 0)
        ).toFixed(2)
      : "0.00"

  const totalCredits = results.reduce((sum, r) => sum + r.credits, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Examination Results</h1>
              <p className="text-sm text-gray-600">View your semester-wise results</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Semester Selection */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Semester</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {["1", "2", "3"].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedSemester === sem ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Semester {sem}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <>
            {/* GPA Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Semester GPA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-blue-600">{semesterGPA}</div>
                  <p className="text-xs text-gray-500 mt-1">Out of 4.0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Credits Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-green-600">{totalCredits}</div>
                  <p className="text-xs text-gray-500 mt-1">Credits this semester</p>
                </CardContent>
              </Card>
            </div>

            {/* Results Table */}
            <Card>
              <CardHeader>
                <CardTitle>Course Results - Semester {selectedSemester}</CardTitle>
                <CardDescription>Detailed course performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">Course Name</th>
                        <th className="text-left py-2 px-4 font-semibold text-gray-700">Code</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">IA</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">End Term</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">Total</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">Grade</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">Credits</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">GPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-800 font-medium">{result.course}</td>
                          <td className="py-3 px-4 text-gray-600">{result.code}</td>
                          <td className="py-3 px-4 text-center text-gray-600">{result.ia}</td>
                          <td className="py-3 px-4 text-center text-gray-600">{result.endTerm}</td>
                          <td className="py-3 px-4 text-center text-gray-800 font-semibold">{result.total}</td>
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(result.grade)}`}
                            >
                              {result.grade}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center text-gray-600">{result.credits}</td>
                          <td className="py-3 px-4 text-center text-gray-800 font-semibold">{result.gpa.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {results.length === 0 && (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No results available for this semester yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
