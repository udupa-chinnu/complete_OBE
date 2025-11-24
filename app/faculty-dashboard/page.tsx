"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

export default function FacultyDashboard() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleAcademicClick = () => {
    router.push("/academic")
  }

  const handleReserachClick = () => {
    router.push("/faculty-dashboard/research")
  }

  const handleBackToRoleSelection = () => {
    router.push("/dashboard")
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleAppraisalClick = () => {
    router.push("/faculty-appraisal")
  }

   const handleAttendanceClick = () => {
    router.push("/faculty-dashboard/attendance")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">Digital Campus</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Rajesh Sharma</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">RS</span>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button onClick={handleBackToRoleSelection} variant="outline" size="sm">
            ← Back to Role Selection
          </Button>
        </div>

        {/* Faculty Dashboard Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Faculty Dashboard</h2>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={handleAcademicClick}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-lg font-medium"
          >
            Academic
          </Button>
          <Button className="bg-red-500 hover:bg-red-600 text-white p-6 h-auto text-lg font-medium" onClick={handleReserachClick}>Research</Button>
          
          <Button onClick={handleAttendanceClick} className="bg-orange-500 hover:bg-orange-600 text-white p-6 h-auto text-lg font-medium">
            Attendance
          </Button>
          <Button onClick={handleAppraisalClick} className="bg-teal-400 hover:bg-teal-500 text-white p-6 h-auto text-lg font-medium">
            Appraisal
          </Button>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 h-auto text-lg font-medium">
            Administration
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white p-6 h-auto text-lg font-medium">
            Mentor-Mentee
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto text-lg font-medium">
            Examination
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white p-6 h-auto text-lg font-medium">
            Feedback Report
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-lg font-medium">
            Admission
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white p-6 h-auto text-lg font-medium">
            Admission List
          </Button>
          <Button className="bg-cyan-400 hover:bg-cyan-500 text-white p-6 h-auto text-lg font-medium">
            Student List
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white p-6 h-auto text-lg font-medium">
            Document Verification
          </Button>
          
        </div>

        
      </div>
    </div>
  )
}
