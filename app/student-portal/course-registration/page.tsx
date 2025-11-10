"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function CourseRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    semester: "3",
    courses: [] as string[],
  })

  const availableCourses = [
    { id: "CS301", name: "Advanced Data Structures", credits: 4, type: "Theory" },
    { id: "CS302", name: "Web Frameworks", credits: 3, type: "Theory" },
    { id: "CS303", name: "Advanced Database Design", credits: 4, type: "Theory" },
    { id: "CS304", name: "Advanced Data Structures Lab", credits: 2, type: "Lab" },
    { id: "CS305", name: "Web Frameworks Lab", credits: 2, type: "Lab" },
  ]

  const handleCourseToggle = (courseId: string) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter((id) => id !== courseId)
        : [...prev.courses, courseId],
    }))
  }

  const handleSubmit = () => {
    alert("Course registration submitted successfully!")
    setStep(3)
  }

  const totalCredits = availableCourses
    .filter((c) => formData.courses.includes(c.id))
    .reduce((sum, c) => sum + c.credits, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Course Registration</h1>
              <p className="text-sm text-gray-600">Select your courses for the upcoming semester</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-blue-600" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Semester</CardTitle>
              <CardDescription>Choose the semester for which you want to register</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData((prev) => ({ ...prev, semester: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                </select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)}>
                Next
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Courses</CardTitle>
              <CardDescription>Choose the courses you want to register for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {availableCourses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.courses.includes(course.id)}
                      onChange={() => handleCourseToggle(course.id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-gray-800">{course.name}</p>
                      <p className="text-sm text-gray-600">
                        {course.id} • {course.credits} Credits • {course.type}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Total Credits:</strong> {totalCredits} Credits
                </p>
                <p className="text-xs text-gray-600 mt-1">Minimum: 12 Credits | Maximum: 20 Credits</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setStep(2.5)}
                  disabled={totalCredits < 12 || totalCredits > 20}
                >
                  Continue to Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2.5 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Confirm</CardTitle>
              <CardDescription>Review your course selection before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {availableCourses
                  .filter((c) => formData.courses.includes(c.id))
                  .map((course) => (
                    <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold text-gray-800">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">{course.credits} Credits</p>
                        <p className="text-xs text-gray-600">{course.type}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-800">Registration Ready</p>
                  <p className="text-sm text-green-700">Total Credits: {totalCredits} Credits</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                  Submit Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">Your course registration has been submitted successfully.</p>
              <div className="space-y-2 mb-8">
                <p className="text-sm text-gray-700">
                  <strong>Total Courses:</strong> {formData.courses.length}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Total Credits:</strong> {totalCredits}
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/student-portal")}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
