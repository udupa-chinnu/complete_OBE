"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, BarChart3, Trophy } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const [results] = useState([
    {
      id: 1,
      course: "Data Structures",
      code: "CS201",
      midterm: 18,
      endterm: 35,
      total: 53,
      grade: "B",
      credits: 4,
      gpa: 3.0,
    },
    {
      id: 2,
      course: "Web Development",
      code: "CS202",
      midterm: 17,
      endterm: 32,
      total: 49,
      grade: "B-",
      credits: 3,
      gpa: 2.7,
    },
    {
      id: 3,
      course: "Database Systems",
      code: "CS203",
      midterm: 19,
      endterm: 38,
      total: 57,
      grade: "A",
      credits: 4,
      gpa: 4.0,
    },
    {
      id: 4,
      course: "Object Oriented Programming",
      code: "CS204",
      midterm: 18,
      endterm: 34,
      total: 52,
      grade: "B",
      credits: 3,
      gpa: 3.0,
    },
    {
      id: 5,
      course: "Operating Systems",
      code: "CS205",
      midterm: 16,
      endterm: 30,
      total: 46,
      grade: "B-",
      credits: 4,
      gpa: 2.7,
    },
  ])

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

  const totalCredits = results.reduce((sum, result) => sum + result.credits, 0)
  const totalGPA = (results.reduce((sum, result) => sum + result.gpa * result.credits, 0) / totalCredits).toFixed(2)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Exam Results</h1>
              <p className="text-sm text-gray-600">View your grades and performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* GPA Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Cumulative GPA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600">{totalGPA}</div>
              <p className="text-xs text-gray-500 mt-1">Out of 4.0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Total Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{totalCredits}</div>
              <p className="text-xs text-gray-500 mt-1">Credits completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Course Results</CardTitle>
            <CardDescription>Detailed performance in each course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Course</th>
                    <th className="text-left py-2 px-4 font-semibold text-gray-700">Code</th>
                    <th className="text-center py-2 px-4 font-semibold text-gray-700">Midterm</th>
                    <th className="text-center py-2 px-4 font-semibold text-gray-700">Endterm</th>
                    <th className="text-center py-2 px-4 font-semibold text-gray-700">Total</th>
                    <th className="text-center py-2 px-4 font-semibold text-gray-700">Grade</th>
                    <th className="text-center py-2 px-4 font-semibold text-gray-700">Credits</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800 font-medium">{result.course}</td>
                      <td className="py-3 px-4 text-gray-600">{result.code}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{result.midterm}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{result.endterm}</td>
                      <td className="py-3 px-4 text-center text-gray-800 font-semibold">{result.total}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getGradeColor(result.grade)}`}>
                          {result.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600">{result.credits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
