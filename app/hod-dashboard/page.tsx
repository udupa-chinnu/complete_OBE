"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

const HODDashboardPage = () => {
  const router = useRouter()
  // Added 'exam' and 'other' to the view state
  const [view, setView] = useState("main") // 'main', 'faculty', 'department', 'academic', 'exam', 'other'

  // Handle back navigation
  const handleBack = () => {
    if (view === "main") {
      router.push("/dashboard")
    } else {
      setView("main")
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  // Navigation logic for specific modules
  const handleModuleClick = (moduleName: string) => {
    if (moduleName === "Faculty Appraisal") {
      router.push("/hod-appraisal")
    } else if (moduleName === "Department Info") {
      router.push("/hod-dashboard/department-info")
    } else if (moduleName === "Academic Info") {
      router.push("/hod-dashboard/academic-info")
    } else {
      alert(`${moduleName} module clicked - functionality to be implemented`)
    }
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
          <Button onClick={handleBack} variant="outline" size="sm">
            ← {view === "main" ? "Back to Role Selection" : "Back to Dashboard"}
          </Button>
        </div>

        {/* Dashboard Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {view === "main" && "HOD Dashboard"}
            {view === "faculty" && "Faculty Management"}
            {view === "department" && "Department Administration"}
            {view === "academic" && "Academic Management"}
            {view === "exam" && "Examination & Grievance"}
            {view === "other" && "Other Activities"}
          </h2>
        </div>

        {/* MAIN DASHBOARD VIEW */}
        {view === "main" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Container Buttons */}
            <Button
              onClick={() => setView("faculty")}
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-lg font-medium"
            >
              Faculty
            </Button>
            <Button
              onClick={() => setView("department")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-lg font-medium"
            >
              Department
            </Button>
            <Button
              onClick={() => setView("academic")}
              className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-lg font-medium"
            >
              Academics
            </Button>
            {/* New Exam Container Button */}
            <Button
              onClick={() => setView("exam")}
              className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto text-lg font-medium"
            >
              Exam
            </Button>
            {/* New Other Container Button */}
            <Button
              onClick={() => setView("other")}
              className="bg-teal-500 hover:bg-teal-600 text-white p-6 h-auto text-lg font-medium"
            >
              Other
            </Button>

            {/* Remaining Standalone Buttons */}
            <Button
              onClick={() => handleModuleClick("Mentor-Mentee")}
              className="bg-pink-500 hover:bg-pink-600 text-white p-6 h-auto text-sm font-medium"
            >
              Mentor-Mentee
            </Button>
            <Button
              onClick={() => handleModuleClick("Co-curricular")}
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 h-auto text-sm font-medium"
            >
              Co-curricular
            </Button>
            <Button
              onClick={() => handleModuleClick("Extra-curricular")}
              className="bg-cyan-400 hover:bg-cyan-500 text-white p-6 h-auto text-sm font-medium"
            >
              Extra-curricular
            </Button>
            <Button
              onClick={() => handleModuleClick("Placement")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-6 h-auto text-sm font-medium"
            >
              Placement
            </Button>
            <Button
              onClick={() => handleModuleClick("Projects")}
              className="bg-orange-500 hover:bg-orange-600 text-white p-6 h-auto text-sm font-medium"
            >
              Projects
            </Button>
            <Button
              onClick={() => handleModuleClick("Events")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 h-auto text-sm font-medium"
            >
              Events
            </Button>
            <Button
              onClick={() => handleModuleClick("Course Completion")}
              className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto text-sm font-medium"
            >
              Leave Configuration
            </Button>
            
            {/* <Button
              onClick={() => handleModuleClick("Department Wise Monitoring System")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-sm font-medium col-span-2"
            >
              Department Wise Consolidated Attendance Report
            </Button> */}
          </div>
        )}

        {/* FACULTY VIEW */}
        {view === "faculty" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleModuleClick("Faculty Appraisal")}
              className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-sm font-medium"
            >
              Faculty Appraisal
            </Button>
            <Button
              onClick={() => handleModuleClick("Faculty Info")}
              className="bg-red-500 hover:bg-red-600 text-white p-6 h-auto text-sm font-medium"
            >
              Faculty Info
            </Button>
          </div>
        )}

        {/* DEPARTMENT VIEW */}
        {view === "department" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleModuleClick("Department Info")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-sm font-medium"
            >
              Department Info
            </Button>
            <Button
              onClick={() => handleModuleClick("Financial Info")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 h-auto text-sm font-medium"
            >
              Program Info
            </Button>
            <Button
              onClick={() => handleModuleClick("Research")}
              className="bg-blue-400 hover:bg-blue-500 text-white p-6 h-auto text-sm font-medium"
            >
              Research
            </Button>
            <Button
              onClick={() => handleModuleClick("Audit Reports")}
              className="bg-pink-600 hover:bg-pink-700 text-white p-6 h-auto text-sm font-medium"
            >
              Audit Reports
            </Button>
            <Button
              onClick={() => handleModuleClick("Budget")}
              className="bg-blue-500 hover:bg-blue-600 text-white p-6 h-auto text-sm font-medium"
            >
              Budget
            </Button>
            <Button
              onClick={() => handleModuleClick("Events")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 h-auto text-sm font-medium"
            >
              Stocks
            </Button>
          </div>
        )}

        {/* ACADEMIC VIEW */}
        {view === "academic" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleModuleClick("Student Info")}
              className="bg-green-500 hover:bg-green-600 text-white p-6 h-auto text-sm font-medium"
            >
              Student Info
            </Button>
            <Button
              onClick={() => handleModuleClick("Academic Info")}
              className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-sm font-medium"
            >
              Academic Info
            </Button>
            <Button
              onClick={() => handleModuleClick("Internship")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-sm font-medium"
            >
              Internship
            </Button>
            <Button
              onClick={() => handleModuleClick("Course Registration Details")}
              className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-sm font-medium"
            >
              Course Registration Details
            </Button>
          </div>
        )}

        {/* EXAM VIEW */}
        {view === "exam" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleModuleClick("Examination")}
              className="bg-green-700 hover:bg-green-800 text-white p-6 h-auto text-sm font-medium"
            >
              Examination
            </Button>
            <Button
              onClick={() => handleModuleClick("Circular")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 h-auto text-sm font-medium"
            >
              Grievance
            </Button>
          </div>
        )}

        {/* OTHER VIEW */}
        {view === "other" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleModuleClick("Consultancy")}
              className="bg-teal-500 hover:bg-teal-600 text-white p-6 h-auto text-sm font-medium"
            >
              Consultancy
            </Button>
            <Button
              onClick={() => handleModuleClick("Industry")}
              className="bg-blue-700 hover:bg-blue-800 text-white p-6 h-auto text-sm font-medium"
            >
              Industry
            </Button>
            <Button
              onClick={() => handleModuleClick("Alumni")}
              className="bg-green-400 hover:bg-green-500 text-white p-6 h-auto text-sm font-medium"
            >
              Alumni
            </Button>
            <Button
              onClick={() => handleModuleClick("Circular")}
              className="bg-cyan-600 hover:bg-cyan-700 text-white p-6 h-auto text-sm font-medium"
            >
              Circular
            </Button>
            <Button
              onClick={() => handleModuleClick("Admissions")}
              className="bg-cyan-300 hover:bg-cyan-400 text-white p-6 h-auto text-sm font-medium"
            >
              Notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HODDashboardPage