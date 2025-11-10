"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, CheckCircle, AlertCircle } from "lucide-react"

export default function IAAttendancePage() {
  const router = useRouter()
  const [subjects] = useState([
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      ia1: 18,
      ia2: 17,
      ia3: 19,
      totalIA: 54,
      totalClasses: 28,
      classesAttended: 26,
      attendancePercentage: 92.86,
    },
    {
      id: 2,
      name: "Web Development",
      code: "CS202",
      ia1: 17,
      ia2: 16,
      ia3: 18,
      totalIA: 51,
      totalClasses: 28,
      classesAttended: 25,
      attendancePercentage: 89.29,
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS203",
      ia1: 19,
      ia2: 18,
      ia3: 19,
      totalIA: 56,
      totalClasses: 28,
      classesAttended: 27,
      attendancePercentage: 96.43,
    },
    {
      id: 4,
      name: "Data Structures Lab",
      code: "CS204",
      ia1: 15,
      ia2: 16,
      ia3: 17,
      totalIA: 48,
      totalClasses: 14,
      classesAttended: 13,
      attendancePercentage: 92.86,
    },
    {
      id: 5,
      name: "Web Development Lab",
      code: "CS205",
      ia1: 16,
      ia2: 15,
      ia3: 18,
      totalIA: 49,
      totalClasses: 14,
      classesAttended: 13,
      attendancePercentage: 92.86,
    },
  ])

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 85) return { color: "text-green-600", bg: "bg-green-100", status: "Good" }
    if (percentage >= 75) return { color: "text-yellow-600", bg: "bg-yellow-100", status: "Satisfactory" }
    return { color: "text-red-600", bg: "bg-red-100", status: "Poor" }
  }

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
              <h1 className="text-2xl font-bold text-gray-800">IA/Attendance</h1>
              <p className="text-sm text-gray-600">Internal Assessment & Attendance Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Overall IA Average</p>
                <p className="text-3xl font-bold text-gray-800">52/60</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Average Attendance</p>
                <p className="text-3xl font-bold text-green-600">92.86%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-3xl font-bold text-gray-800">112</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Details */}
        <div className="space-y-6">
          {subjects.map((subject) => {
            const attendanceStatus = getAttendanceStatus(subject.attendancePercentage)
            return (
              <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <CardDescription>{subject.code}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Internal Assessment */}
                    <div className="border-r md:pr-6">
                      <h3 className="font-semibold text-gray-800 mb-4">Internal Assessment (IA)</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                          <span className="text-gray-700 font-medium">IA 1</span>
                          <span className="text-lg font-bold text-blue-600">{subject.ia1}/20</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                          <span className="text-gray-700 font-medium">IA 2</span>
                          <span className="text-lg font-bold text-green-600">{subject.ia2}/20</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-orange-50 rounded">
                          <span className="text-gray-700 font-medium">IA 3</span>
                          <span className="text-lg font-bold text-orange-600">{subject.ia3}/20</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded border-t-2 border-purple-200">
                          <span className="text-gray-800 font-bold">Total IA</span>
                          <span className="text-lg font-bold text-purple-600">{subject.totalIA}/60</span>
                        </div>
                      </div>
                    </div>

                    {/* Attendance */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">Attendance</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span className="text-gray-700 font-medium">Classes Attended</span>
                          <span className="text-lg font-bold text-gray-800">
                            {subject.classesAttended}/{subject.totalClasses}
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-700 font-medium">Attendance %</span>
                            <span className={`text-lg font-bold ${attendanceStatus.color}`}>
                              {subject.attendancePercentage.toFixed(2)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all ${
                                subject.attendancePercentage >= 85
                                  ? "bg-green-500"
                                  : subject.attendancePercentage >= 75
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${subject.attendancePercentage}%` }}
                            />
                          </div>
                        </div>
                        <div className={`p-3 rounded text-center ${attendanceStatus.bg}`}>
                          <p className={`font-semibold ${attendanceStatus.color}`}>{attendanceStatus.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
