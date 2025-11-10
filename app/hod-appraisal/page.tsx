"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Eye } from "lucide-react"

// Mock data for submitted appraisals
const submittedAppraisals = [
  {
    id: 1,
    name: "Mr. Vasudeva Rao P V",
    designation: "Assistant Professor",
    department: "Information Science & Engineering",
    submittedDate: "2024-11-15",
    status: "Pending",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    designation: "Associate Professor",
    department: "Information Science & Engineering",
    submittedDate: "2024-11-14",
    status: "Pending",
  },
  {
    id: 3,
    name: "Prof. Rajesh Kumar",
    designation: "Professor",
    department: "Information Science & Engineering",
    submittedDate: "2024-11-13",
    status: "Pending",
  },
  {
    id: 4,
    name: "Ms. Anjali Singh",
    designation: "Assistant Professor",
    department: "Information Science & Engineering",
    submittedDate: "2024-11-12",
    status: "Pending",
  },
]

export default function HODAppraisalPage() {
  const router = useRouter()
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(null)

  const handleViewAppraisal = (facultyId: number) => {
    setSelectedFacultyId(facultyId)
    router.push(`/hod-appraisal/review/${facultyId}`)
  }

  const handleBackToHOD = () => {
    router.push("/hod-dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button onClick={handleBackToHOD} variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Faculty Appraisal Review</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Total Submitted</p>
                <p className="text-3xl font-bold text-blue-600">{submittedAppraisals.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {submittedAppraisals.filter((a) => a.status === "Pending").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Approved</p>
                <p className="text-3xl font-bold text-green-600">
                  {submittedAppraisals.filter((a) => a.status === "Approved").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Faculty List */}
        <Card>
          <CardHeader>
            <CardTitle>Submitted Appraisals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Submitted Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedAppraisals.map((faculty, index) => (
                    <tr key={faculty.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-sm text-gray-800">{faculty.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{faculty.designation}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{faculty.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{faculty.submittedDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge className="bg-yellow-100 text-yellow-800">{faculty.status}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button
                          onClick={() => handleViewAppraisal(faculty.id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Review</span>
                        </Button>
                      </td>
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
