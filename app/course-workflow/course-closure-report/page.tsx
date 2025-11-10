"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

export default function CourseClosureReportPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleSaveNext = () => {
    router.push("/course-workflow/course-outcomes")
  }

  const handleBack = () => {
    router.push("/course-workflow/subject-details")
  }

  const handleViewReport = (part: string) => {
    alert(`View ${part} interface would open here`)
  }

  const closureReportData = [
    {
      year: "2022",
      scheme: "2018",
      data: [
        {
          id: 1,
          subjectCode: "15CSCUS",
          handledBy: "Course Associate - Dr. Smith",
          section: "A",
          partAStatus: "completed",
          partBStatus: "incomplete",
        },
        {
          id: 2,
          subjectCode: "15CSCUS",
          handledBy: "Course Owner - Dr. Johnson",
          section: "B",
          partAStatus: "completed",
          partBStatus: "incomplete",
        },
      ],
    },
    {
      year: "2021",
      scheme: "2018",
      data: [
        {
          id: 1,
          subjectCode: "15CSCUS",
          handledBy: "Course Associate - Dr. Brown",
          section: "A",
          partAStatus: "completed",
          partBStatus: "incomplete",
        },
        {
          id: 2,
          subjectCode: "15CSCUS",
          handledBy: "Course Owner - Dr. Wilson",
          section: "C",
          partAStatus: "completed",
          partBStatus: "incomplete",
        },
      ],
    },
    {
      year: "2020",
      scheme: "2018",
      data: [
        {
          id: 1,
          subjectCode: "15CSCUS",
          handledBy: "Course Associate - Dr. Davis",
          section: "A",
          partAStatus: "completed",
          partBStatus: "incomplete",
        },
        {
          id: 2,
          subjectCode: "15CSCUS",
          handledBy: "Course Owner - Dr. Miller",
          section: "B",
          partAStatus: "completed",
          partBStatus: "incomplete",
        },
      ],
    },
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
              <h1 className="text-xl font-semibold text-gray-800">Previous Cycle Course Closure Report</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-600">Previous Cycle Course Closure Report</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {closureReportData.map((yearData, yearIndex) => (
              <div key={yearIndex} className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Year - {yearData.year} (Scheme - {yearData.scheme})
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">#</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject Code</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Subject Handled By</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Section</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                          Course Closure Report Status
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearData.data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3">{row.id}</td>
                          <td className="border border-gray-300 px-4 py-3 font-medium">{row.subjectCode}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.handledBy}</td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">{row.section}</td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className={`${
                                  row.partAStatus === "completed"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-red-500 hover:bg-red-600"
                                } text-white`}
                              >
                                PART-A
                              </Button>
                              <Button
                                size="sm"
                                className={`${
                                  row.partBStatus === "completed"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-red-500 hover:bg-red-600"
                                } text-white`}
                              >
                                PART-B
                              </Button>
                            </div>
                          </td>
                          <td className="border border-gray-300 px-4 py-3">
                            <div className="flex space-x-2 items-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewReport("PART-A")}
                                className="p-1"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="ml-1 text-xs">part-a</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewReport("PART-B")}
                                className="p-1"
                              >
                                <Eye className="h-4 w-4" />
                                <span className="ml-1 text-xs">part-b</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
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
