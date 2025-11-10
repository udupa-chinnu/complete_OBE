"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function ModuleInformationPage() {
  const router = useRouter()
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      nbaCode: "C201",
    },
  ])

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    nbaCode: "",
  })

  const handleAddCourse = () => {
    if (formData.courseName && formData.courseCode && formData.nbaCode) {
      setCourses([
        ...courses,
        {
          id: Date.now(),
          name: formData.courseName,
          code: formData.courseCode,
          nbaCode: formData.nbaCode,
        },
      ])
      setFormData({ courseName: "", courseCode: "", nbaCode: "" })
    }
  }

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

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
              <h1 className="text-2xl font-bold text-gray-800">Module Information</h1>
              <p className="text-sm text-gray-600">Manage basic course information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>Enter course details including name, code, and NBA code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  placeholder="e.g., Data Structures"
                  value={formData.courseName}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="courseCode">Course Code</Label>
                <Input
                  id="courseCode"
                  placeholder="e.g., CS201"
                  value={formData.courseCode}
                  onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nbaCode">NBA Code</Label>
                <Input
                  id="nbaCode"
                  placeholder="e.g., C201"
                  value={formData.nbaCode}
                  onChange={(e) => setFormData({ ...formData, nbaCode: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={handleAddCourse} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </CardContent>
        </Card>

        {/* Courses List */}
        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
            <CardDescription>Total courses: {courses.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border rounded hover:bg-gray-50">
                  <div>
                    <h3 className="font-semibold text-gray-800">{course.name}</h3>
                    <p className="text-sm text-gray-600">
                      Code: {course.code} | NBA: {course.nbaCode}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                    className="hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {courses.length === 0 && <p className="text-center text-gray-500 py-8">No courses added yet</p>}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/hod-dashboard/academic-info")}>
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  )
}
