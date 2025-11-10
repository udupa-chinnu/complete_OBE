"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"

export default function PaperRevaluationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [reason, setReason] = useState("")

  const pastExams = [
    { id: "CS201", name: "Data Structures", semester: "2", score: 35, maxScore: 100 },
    { id: "CS202", name: "Web Development", semester: "2", score: 40, maxScore: 100 },
    { id: "CS203", name: "Database Systems", semester: "2", score: 38, maxScore: 100 },
  ]

  const handleSubmit = () => {
    alert("Paper re-evaluation request submitted successfully!")
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
              <h1 className="text-2xl font-bold text-gray-800">Paper Seeing Re-evaluation</h1>
              <p className="text-sm text-gray-600">Request for paper re-evaluation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Examination Papers</CardTitle>
              <CardDescription>Select papers you want to request for re-evaluation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Re-evaluation Fee</p>
                  <p className="text-sm text-blue-700">₹500 per paper</p>
                </div>
              </div>

              <div className="space-y-3">
                {pastExams.map((exam) => (
                  <label
                    key={exam.id}
                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(exam.id)}
                      onChange={() => {
                        setSelectedCourses((prev) =>
                          prev.includes(exam.id) ? prev.filter((id) => id !== exam.id) : [...prev, exam.id],
                        )
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-gray-800">{exam.name}</p>
                      <p className="text-sm text-gray-600">
                        Semester {exam.semester} • Score: {exam.score}/{exam.maxScore}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Reason for Re-evaluation</label>
                <textarea
                  placeholder="Explain why you want re-evaluation..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setStep(2)}
                  disabled={selectedCourses.length === 0 || !reason.trim()}
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
              <CardTitle>Confirm Re-evaluation Request</CardTitle>
              <CardDescription>Review your request before submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {pastExams
                  .filter((e) => selectedCourses.includes(e.id))
                  .map((exam) => (
                    <div key={exam.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-semibold text-gray-800">{exam.name}</p>
                        <p className="text-sm text-gray-600">Current Score: {exam.score}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">₹500</span>
                    </div>
                  ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Reason:</strong>
                </p>
                <p className="text-sm text-gray-700">{reason}</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Total Fee:</strong> ₹{selectedCourses.length * 500}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardContent className="pt-12 text-center pb-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted Successfully!</h2>
              <p className="text-gray-600 mb-6">Your paper re-evaluation request has been submitted.</p>
              <div className="space-y-2 mb-8 text-left max-w-sm mx-auto">
                <p className="text-sm text-gray-700">
                  <strong>Papers:</strong> {selectedCourses.length}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Total Fee:</strong> ₹{selectedCourses.length * 500}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong> Pending
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
