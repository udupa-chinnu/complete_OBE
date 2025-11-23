"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Building2, FileText, Users, BarChart3, Settings } from "lucide-react"
import { logout } from "@/lib/auth"

const HODDashboardPage = () => {
  const router = useRouter()

  const containers = [
    {
      title: "Department Info",
      icon: Building2,
      color: "bg-blue-500 hover:bg-blue-600",
      path: "/hod-dashboard/department-info",
    },
    {
      title: "Academic Info",
      icon: BookOpen,
      color: "bg-purple-500 hover:bg-purple-600",
      path: "/hod-dashboard/academic-info",
    },
    {
      title: "Faculty Appraisal Review",
      icon: Award,
      color: "bg-amber-500 hover:bg-amber-600",
      path: "/hod-appraisal",
    },
    {
      title: "Course Workflow",
      icon: FileText,
      color: "bg-green-500 hover:bg-green-600",
      path: "/course-workflow/vision-mission",
    },
    {
      title: "Course File Content",
      icon: BarChart3,
      color: "bg-indigo-500 hover:bg-indigo-600",
      path: "/course-file-content",
    },
    {
      title: "Academic Portal",
      icon: Users,
      color: "bg-red-500 hover:bg-red-600",
      path: "/academic",
    },
    {
      title: "Previous Year Files",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
      path: "/previous-year-files",
    },
  ]

  const handleBackToRoleSelection = () => {
    router.push("/dashboard")
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const handleModuleClick = (moduleName: string) => {
    if(moduleName === "Faculty Appraisal"){
      router.push('/hod-appraisal')
    }
    else if (moduleName === "Department Info") {
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
          <Button onClick={handleBackToRoleSelection} variant="outline" size="sm">
            ← Back to Role Selection
          </Button>
        </div>

        {/* HOD Dashboard Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">HOD Dashboard</h2>
        </div>

        {/* Module Grid - Matching the uploaded HOD dashboard design */}
        <div className="grid grid-cols-4 gap-4">
          {/* Row 1 */}
          <Button
            onClick={() => handleModuleClick("Faculty Appraisal")}
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-sm font-medium"
          >
            Faculty Appraisal
          </Button>
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
            onClick={() => handleModuleClick("Student Info")}
            className="bg-green-500 hover:bg-green-600 text-white p-6 h-auto text-sm font-medium"
          >
            Student Info
          </Button>

          {/* Row 2 */}
          <Button
            onClick={() => handleModuleClick("Faculty Info")}
            className="bg-red-500 hover:bg-red-600 text-white p-6 h-auto text-sm font-medium"
          >
            Faculty Info
          </Button>
          <Button
            onClick={() => handleModuleClick("Academic Info")}
            className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-sm font-medium"
          >
            Academic Info
          </Button>
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

          {/* Row 3 */}
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
            onClick={() => handleModuleClick("Research")}
            className="bg-blue-400 hover:bg-blue-500 text-white p-6 h-auto text-sm font-medium"
          >
            Research
          </Button>
          <Button
            onClick={() => handleModuleClick("Consultancy")}
            className="bg-teal-500 hover:bg-teal-600 text-white p-6 h-auto text-sm font-medium"
          >
            Consultancy
          </Button>

          {/* Row 4 */}
          <Button
            onClick={() => handleModuleClick("Industry")}
            className="bg-blue-700 hover:bg-blue-800 text-white p-6 h-auto text-sm font-medium"
          >
            Industry
          </Button>
          <Button
            onClick={() => handleModuleClick("Examination")}
            className="bg-green-700 hover:bg-green-800 text-white p-6 h-auto text-sm font-medium"
          >
            Examination
          </Button>
          <Button
            onClick={() => handleModuleClick("Alumni")}
            className="bg-green-400 hover:bg-green-500 text-white p-6 h-auto text-sm font-medium"
          >
            Alumni
          </Button>
          <Button
            onClick={() => handleModuleClick("Circular")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 h-auto text-sm font-medium"
          >
            {"Grievance"}
          </Button>

          {/* Row 5 */}
          <Button
            onClick={() => handleModuleClick("Projects")}
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 h-auto text-sm font-medium"
          >
            Projects
          </Button>
          <Button
            onClick={() => handleModuleClick("Internship")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-sm font-medium"
          >
            Internship
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

          {/* Row 6 */}
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
          <Button
            onClick={() => handleModuleClick("Course Registration Details")}
            className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-sm font-medium"
          >
            Course Registration Details
          </Button>

          {/* Row 7 */}
          <Button
            onClick={() => handleModuleClick("Course Completion")}
            className="bg-orange-600 hover:bg-orange-700 text-white p-6 h-auto text-sm font-medium"
          >
            {"Leave Configuration"}
          </Button>
          <Button
            onClick={() => handleModuleClick("Any Other")}
            className="bg-pink-500 hover:bg-pink-600 text-white p-6 h-auto text-sm font-medium"
          >
            Any Other
          </Button>
          <Button
            onClick={() => handleModuleClick("Department Wise Monitoring System")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-sm font-medium col-span-2"
          >
            Department Wise Consolidated Attendance Report
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HODDashboardPage
