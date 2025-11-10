"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Users, Calendar } from "lucide-react"

export default function CoursesPage() {
  const router = useRouter()
  const [courses] = useState([
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      instructor: "Dr. John Smith",
      progress: 75,
      credits: 4,
      semester: "3",
      status: "Active",
    },
    {
      id: 2,
      name: "Web Development",
      code: "CS202",
      instructor: "Prof. Sarah Johnson",
      progress: 60,
      credits: 3,
      semester: "3",
      status: "Active",
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS203",
      instructor: "Dr. Mike Wilson",
      progress: 85,
      credits: 4,
      semester: "3",
      status: "Active",
    },
    {
      id: 4,
      name: "Object Oriented Programming",
      code: "CS204",
      instructor: "Prof. Emily Davis",
      progress: 70,
      credits: 3,
      semester: "3",
      status: "Active",
    },
    {
      id: 5,
      name: "Operating Systems",
      code: "CS205",
      instructor: "Dr. Robert Brown",
      progress: 55,
      credits: 4,
      semester: "3",
      status: "Active",
    },
  ])

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
              <h1 className="text-2xl font-bold text-gray-800">Course Dashboard</h1>
              <p className="text-sm text-gray-600">Current Semester Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">{course.status}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {course.instructor}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Semester {course.semester}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {course.credits} Credits
                </div>
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-gray-800">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">View Course</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
