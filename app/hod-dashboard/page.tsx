"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Building2, FileText, Users, BarChart3, Settings } from "lucide-react"

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">HOD Dashboard</h1>
            </div>
            <Button onClick={() => router.push("/")} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {containers.map((container) => {
            const Icon = container.icon
            return (
              <Button
                key={container.title}
                onClick={() => router.push(container.path)}
                className={`${container.color} text-white p-6 h-auto flex flex-col items-center justify-center space-y-2 rounded-lg shadow-md transition-all`}
              >
                <Icon className="w-8 h-8" />
                <span className="text-center font-medium">{container.title}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default HODDashboardPage
