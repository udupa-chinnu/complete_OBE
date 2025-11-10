"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Check as CheckList } from "lucide-react"

export default function ExamApplicationPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<"none" | "application" | "checklist">("none")

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
              <h1 className="text-2xl font-bold text-gray-800">Exam Application</h1>
              <p className="text-sm text-gray-600">Manage your examination applications and checklist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedOption === "none" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What would you like to do?</h2>
              <p className="text-gray-600">Select an option to proceed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fill Application */}
              <button
                onClick={() => setSelectedOption("application")}
                className="group p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Fill Application</h3>
                </div>
                <p className="text-gray-600 text-sm text-left">
                  Register for the upcoming examination. Select your courses and provide necessary details for exam
                  registration.
                </p>
              </button>

              {/* View Checklist */}
              <button
                onClick={() => setSelectedOption("checklist")}
                className="group p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-green-600 transition-all hover:shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <CheckList className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">View Checklist</h3>
                </div>
                <p className="text-gray-600 text-sm text-left">
                  View the hall ticket issuance checklist and track completion status of required documents and
                  approvals.
                </p>
              </button>
            </div>
          </div>
        )}

        {selectedOption === "application" && <ExamApplicationForm onBack={() => setSelectedOption("none")} />}
        {selectedOption === "checklist" && <HallTicketChecklist onBack={() => setSelectedOption("none")} />}
      </div>
    </div>
  )
}

function ExamApplicationForm({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "John",
    usn: "4SF21CS001",
    semester: "5",
    branch: "Computer Science",
    examType: "Regular",
    courses: [] as string[],
    hallTicketRoll: "001",
    invigilatorConsent: false,
  })

  const registeredCourses = [
    { id: "CS301", name: "Advanced Data Structures", code: "CS301" },
    { id: "CS302", name: "Web Frameworks", code: "CS302" },
    { id: "CS303", name: "Advanced Database Design", code: "CS303" },
  ]

  const handleSubmit = () => {
    if (formData.courses.length === 0) {
      alert("Please select at least one course!")
      return
    }
    if (!formData.hallTicketRoll) {
      alert("Please enter hall ticket roll number!")
      return
    }
    if (!formData.invigilatorConsent) {
      alert("Please accept the declaration!")
      return
    }
    setStep(3)
  }

  return (
    <div className="space-y-6">
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
            <CardTitle>Examination Details</CardTitle>
            <CardDescription>Enter your examination details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">USN</label>
                <input
                  type="text"
                  value={formData.usn}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Semester</label>
                <input
                  type="text"
                  value={`Semester ${formData.semester}`}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Exam Type</label>
              <select
                value={formData.examType}
                onChange={(e) => setFormData((prev) => ({ ...prev, examType: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Regular">Regular Examination</option>
                <option value="Supplementary">Supplementary Examination</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-blue-900">Examination Schedule</p>
              <p className="text-sm text-blue-700">Exam Date: January 15, 2025 onwards</p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={onBack}>
                Back
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Courses & Details</CardTitle>
            <CardDescription>Choose the courses for which you want to appear for examination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="font-semibold text-gray-700">Available Courses</p>
              {registeredCourses.map((course) => (
                <label
                  key={course.id}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.courses.includes(course.id)}
                    onChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        courses: prev.courses.includes(course.id)
                          ? prev.courses.filter((id) => id !== course.id)
                          : [...prev.courses, course.id],
                      }))
                    }}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div className="ml-3">
                    <p className="font-semibold text-gray-800">{course.name}</p>
                    <p className="text-sm text-gray-600">{course.code}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Hall Ticket Roll Number</label>
              <input
                type="text"
                placeholder="Enter your roll number"
                value={formData.hallTicketRoll}
                onChange={(e) => setFormData((prev) => ({ ...prev, hallTicketRoll: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <label className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.invigilatorConsent}
                onChange={(e) => setFormData((prev) => ({ ...prev, invigilatorConsent: e.target.checked }))}
                className="w-4 h-4 text-blue-600 rounded mt-1"
              />
              <p className="text-sm text-gray-700">
                I declare that I will follow the examination rules and regulations as per the college norms.
              </p>
            </label>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                Submit Application
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="pt-12 text-center pb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">Your examination application has been received and processed.</p>
            <div className="space-y-2 mb-8 text-left max-w-sm mx-auto bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Student:</strong> {formData.name}
              </p>
              <p className="text-sm text-gray-700">
                <strong>USN:</strong> {formData.usn}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Hall Ticket Roll:</strong> {formData.hallTicketRoll}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Courses:</strong> {formData.courses.length}
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                Your hall ticket will be available for download within 2 business days. A notification will be sent to
                your registered email.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setStep(1)
                  // setSelectedOption("none") // Commented out to fix lint error
                }}
              >
                Fill Another Application
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/student-portal")}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function HallTicketChecklist({ onBack }: { onBack: () => void }) {
  const checklistItems = [
    {
      sl: 1,
      item: "Feedback on Attainment of CO",
      authority: "Class Teacher",
      status: "completed" as const,
    },
    {
      sl: 2,
      item: "*Feedback on Institution & Faculty",
      authority: "SWO",
      status: "completed" as const,
    },
    {
      sl: 3,
      item: "Mentor Mentee Record Update",
      authority: "Mentor, FO (With Seal), Admission Officer (With Seal)",
      status: "pending" as const,
    },
    {
      sl: 4,
      item: "Fee Due",
      authority: "Admission Officer (With Seal)",
      status: "completed" as const,
    },
    {
      sl: 5,
      item: "Library",
      authority: "Librarian",
      status: "completed" as const,
    },
    {
      sl: 6,
      item: "Hostel",
      authority: "Hostel In charge",
      status: "pending" as const,
    },
  ]

  const completedItems = checklistItems.filter((item) => item.status === "completed").length
  const pendingItems = checklistItems.filter((item) => item.status === "pending").length

  const getStatusIcon = (status: "completed" | "pending") => {
    if (status === "completed") {
      return (
        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
          clipRule="evenodd"
        />
      </svg>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hall Ticket Issuance Checklist</CardTitle>
          <CardDescription>
            Checklist for issue of Exam Hall Ticket - Sahyadri College of Engineering & Management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Student Info */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold text-gray-800">John</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">USN</p>
              <p className="font-semibold text-gray-800">4SF21CS001</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Semester</p>
              <p className="font-semibold text-gray-800">5</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Branch</p>
              <p className="font-semibold text-gray-800">Computer Science</p>
            </div>
          </div>

          {/* Checklist Summary */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Completed Items</p>
              <p className="text-2xl font-bold text-green-600">{completedItems}</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600">Pending Items</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingItems}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-bold text-blue-600">{checklistItems.length}</p>
            </div>
          </div>

          {/* Checklist Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">SL. No.</th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">Check List</th>
                  <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold">
                    Signing Authority
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {checklistItems.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3 text-sm font-medium">{item.sl}</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        {item.sl <= 3 && getStatusIcon(item.status)}
                        <span>{item.item}</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">{item.authority}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status === "completed" ? "✓ Completed" : "⏱ Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Items marked with * require prior approval from Mentor/Mentor before FO & Admission
              Officer approval.
            </p>
            <p className="text-sm text-blue-900">
              HOD Signature required after seeking approval from all the above sections.
            </p>
          </div>

          {pendingItems > 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
              <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-yellow-900">Pending Items</p>
                <p className="text-sm text-yellow-700">
                  You have {pendingItems} pending item(s). Please complete all items before exam hall ticket issuance.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-green-900">All Clear!</p>
                <p className="text-sm text-green-700">
                  All checklist items are completed. You can proceed to download your hall ticket.
                </p>
              </div>
            </div>
          )}

          <Button variant="outline" className="w-full bg-transparent" onClick={onBack}>
            Back to Options
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
