"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"
import { 
  LogOut, 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  ClipboardList, 
  FileMinus, 
  Trash2, 
  FileCheck, 
  Trophy,
  GraduationCap
} from "lucide-react"

export default function SemesterDashboard() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sem = searchParams.get("sem") || "1"
  const [username, setUsername] = useState("JOHN")

  useEffect(() => {
    const storedUsername = localStorage.getItem("username")
    if (storedUsername) {
      setUsername(storedUsername.toUpperCase())
    }
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const modules = [
    {
      title: "Scheme",
      description: "View scheme for this semester",
      icon: FileText,
      href: `/student-portal/my-class/semester/scheme?sem=${sem}`,
      color: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-700",
    },
    {
      title: "Syllabus",
      description: "Download or view syllabus",
      icon: BookOpen,
      href: `/student-portal/my-class/semester/syllabus?sem=${sem}`,
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      title: "Course Registration",
      description: "Register for courses",
      icon: ClipboardList,
      href: `/student-portal/my-class/semester/course-registration?sem=${sem}`,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Course Withdraw",
      description: "Withdraw from a registered course",
      icon: FileMinus,
      href: `/student-portal/my-class/semester/course-withdraw?sem=${sem}`,
      color: "from-rose-500 to-rose-700",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
    },
    {
      title: "Course Drop",
      description: "Drop a course from your schedule",
      icon: Trash2,
      href: `/student-portal/my-class/semester/course-drop?sem=${sem}`,
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      title: "Exam Registration",
      description: "Register for semester exams",
      icon: FileCheck,
      href: `/student-portal/my-class/semester/exam-registration?sem=${sem}`,
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Results",
      description: "View course results",
      icon: Trophy,
      href: `/student-portal/my-class/result?sem=${sem}`,
      color: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Digital Campus</h1>
                <p className="text-xs text-gray-500">Student Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">J</span>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">JOHN</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm" className="ml-4 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button & Title */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()} 
            className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Semester Selection
          </Button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Semester {sem} Dashboard</h2>
          </div>
          <p className="text-gray-600 ml-1">Manage your academics, registrations, and results for this semester.</p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <button
                key={module.title}
                onClick={() => router.push(module.href)}
                className="group h-32 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100 overflow-hidden flex flex-col items-center justify-center p-4"
              >
                <div className={`p-3 rounded-full mb-3 ${module.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                   <Icon className={`w-6 h-6 ${module.textColor}`} />
                </div>
                <h3 className="font-semibold text-sm text-gray-800 text-center leading-tight mb-1">{module.title}</h3>
                <p className="text-xs text-gray-500 text-center">{module.description}</p>
                
                {/* Hover effect bar */}
                <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}