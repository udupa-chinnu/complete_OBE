"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function SupplementaryCourseRegistrationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  const failedCourses = [
    { id: "CS201", name: "Data Structures", semester: "3", credits: 4 },
    { id: "CS202", name: "Web Development", semester: "3", credits: 3 },
  ]

  const handleSubmit = () => {
    alert("Supplementary course registration submitted successfully!")
    setStep(3)
  }

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
              <h1 className="text-2xl font-bold text-gray-800">Supplementary Course Registration</h1>
              <p className="text-sm text-gray-600">Register for supplementary courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Supplementary Courses</CardTitle>
              <CardDescription>Select the courses you want to appear for supplementary examination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {failedCourses.map((course) => (
                  <label
                    key={course.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course.id)}
                      onChange={() => {
                        setSelectedCourses((prev) =>
                          prev.includes(course.id) ? prev.filter((id) => id !== course.id) : [...prev, course.id],
                        )
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-gray-800">{course.name}</p>
                      <p className="text-sm text-gray-600">
                        {course.id} • Semester {course.semester} • {course.credits} Credits
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setStep(2)}
                  disabled={selectedCourses.length === 0}
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Registration</CardTitle>
              <CardDescription>Review your supplementary course selection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {failedCourses
                  .filter((c) => selectedCourses.includes(c.id))
                  .map((course) => (
                    <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold text-gray-800">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.id}</p>
                      </div>
                      <p className="font-semibold text-gray-800">{course.credits} Credits</p>
                    </div>
                  ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
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
              <p className="text-gray-600 mb-6">Your supplementary course registration has been submitted.</p>
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
