"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, CheckCircle, XCircle } from "lucide-react"

// Mock faculty data
const facultyData: Record<number, any> = {
  1: {
    id: 1,
    name: "Mr. Vasudeva Rao P V",
    designation: "Assistant Professor",
    department: "Information Science & Engineering",
    email: "vasudeva@college.edu",
    submittedDate: "2024-11-15",
  },
  2: {
    id: 2,
    name: "Dr. Priya Sharma",
    designation: "Associate Professor",
    department: "Information Science & Engineering",
    email: "priya@college.edu",
    submittedDate: "2024-11-14",
  },
  3: {
    id: 3,
    name: "Prof. Rajesh Kumar",
    designation: "Professor",
    department: "Information Science & Engineering",
    email: "rajesh@college.edu",
    submittedDate: "2024-11-13",
  },
  4: {
    id: 4,
    name: "Ms. Anjali Singh",
    designation: "Assistant Professor",
    department: "Information Science & Engineering",
    email: "anjali@college.edu",
    submittedDate: "2024-11-12",
  },
}

// instead of importing and using PartAForm and PartBForm components
export default function HODReviewPage() {
  const router = useRouter()
  const params = useParams()
  const facultyId = Number.parseInt(params.facultyId as string)
  const faculty = facultyData[facultyId]

  const [activeTab, setActiveTab] = useState("part-a")
  const [showApprovalModal, setShowApprovalModal] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null)
  const [hodRemarks, setHodRemarks] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApprove = async () => {
    setApprovalAction("approve")
    setShowApprovalModal(true)
  }

  const handleReject = async () => {
    setApprovalAction("reject")
    setShowApprovalModal(true)
  }

  const handleSubmitApproval = async () => {
    if (!hodRemarks.trim()) {
      alert("Please provide remarks before submitting")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const message =
        approvalAction === "approve"
          ? `Appraisal approved and forwarded to Admin with remarks: "${hodRemarks}"`
          : `Appraisal rejected with remarks: "${hodRemarks}". Faculty will be notified.`

      alert(message)
      setShowApprovalModal(false)
      setHodRemarks("")
      router.push("/hod-appraisal")
      setIsSubmitting(false)
    }, 1000)
  }

  if (!faculty) {
    return <div>Faculty not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button onClick={() => router.push("/hod-appraisal")} variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Appraisal Review</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Faculty Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Faculty Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-800">{faculty.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Designation</p>
                <p className="font-semibold text-gray-800">{faculty.designation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-semibold text-gray-800">{faculty.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Submitted Date</p>
                <p className="font-semibold text-gray-800">{faculty.submittedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="part-a">PMS Part A</TabsTrigger>
            <TabsTrigger value="part-b">PMS Part B</TabsTrigger>
          </TabsList>

          <TabsContent value="part-a" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Part A: Subjects Handled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-blue-50 border-b">
                      <tr>
                        <th className="border px-3 py-2 text-left">Semester</th>
                        <th className="border px-3 py-2 text-left">Subject Code</th>
                        <th className="border px-3 py-2 text-left">Subject Name</th>
                        <th className="border px-3 py-2 text-left">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border px-3 py-2">Sem 5</td>
                        <td className="border px-3 py-2">18CS51</td>
                        <td className="border px-3 py-2">Software Engineering</td>
                        <td className="border px-3 py-2">3</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border px-3 py-2">Sem 5</td>
                        <td className="border px-3 py-2">18CS52</td>
                        <td className="border px-3 py-2">Database Management</td>
                        <td className="border px-3 py-2">4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="part-b" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Part B: PBAS Evaluation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead className="bg-green-50 border-b">
                      <tr>
                        <th className="border px-3 py-2 text-left">Section</th>
                        <th className="border px-3 py-2 text-center">Maximum Points</th>
                        <th className="border px-3 py-2 text-center">Obtained Points</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border px-3 py-2">Academic Activities</td>
                        <td className="border px-3 py-2 text-center">200</td>
                        <td className="border px-3 py-2 text-center">175</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border px-3 py-2">Research & Publications</td>
                        <td className="border px-3 py-2 text-center">200</td>
                        <td className="border px-3 py-2 text-center">150</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border px-3 py-2">Departmental Activities</td>
                        <td className="border px-3 py-2 text-center">100</td>
                        <td className="border px-3 py-2 text-center">85</td>
                      </tr>
                      <tr className="bg-blue-50 font-semibold">
                        <td className="border px-3 py-2">Total</td>
                        <td className="border px-3 py-2 text-center">500</td>
                        <td className="border px-3 py-2 text-center">410</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handleApprove}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 flex items-center space-x-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Approve</span>
          </Button>
          <Button
            onClick={handleReject}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 flex items-center space-x-2"
          >
            <XCircle className="w-4 h-4" />
            <span>Reject</span>
          </Button>
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className={approvalAction === "approve" ? "text-green-600" : "text-red-600"}>
                {approvalAction === "approve" ? "Approve Appraisal" : "Reject Appraisal"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">HOD Remarks *</label>
                <Textarea
                  value={hodRemarks}
                  onChange={(e) => setHodRemarks(e.target.value)}
                  placeholder="Enter your remarks..."
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button onClick={() => setShowApprovalModal(false)} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApproval}
                  disabled={isSubmitting}
                  className={
                    approvalAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }
                >
                  {isSubmitting
                    ? approvalAction === "approve"
                      ? "Approving..."
                      : "Rejecting..."
                    : approvalAction === "approve"
                      ? "Approve"
                      : "Reject"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
