"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"
import {
  User,
  CreditCard,
  BookOpen,
  BarChart3,
  MessageSquare,
  Calendar,
  Users,
  Receipt,
  ClipboardList,
  FileText,
  Trophy,
  FileCheck,
  LogOut,
} from "lucide-react"

export default function StudentPortal() {
  const [username, setUsername] = useState("JOHN")
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
      title: "Profile",
      description: "View personal & academic details",
      icon: User,
      href: "/student-portal/profile",
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-700",
    },
    {
      title: "Fee Pay",
      description: "Manage fee payments & receipts",
      icon: CreditCard,
      href: "/student-portal/fee-pay",
      color: "from-slate-500 to-slate-700",
      bgColor: "bg-slate-50",
      textColor: "text-slate-700",
    },
    {
      title: "My Class",
      description: "View current semester subjects",
      icon: BookOpen,
      href: "/student-portal/my-class",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      title: "IA/Attendance",
      description: "Internal assessments & attendance",
      icon: BarChart3,
      href: "/student-portal/ia-attendance",
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Feedback",
      description: "Provide feedback to faculty",
      icon: MessageSquare,
      href: "/student-portal/feedback",
      color: "from-teal-500 to-teal-700",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
    },
    {
      title: "Activities",
      description: "College events & activities",
      icon: Calendar,
      href: "/student-portal/activities",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Mentor-Mentee",
      description: "Mentorship programs",
      icon: Users,
      href: "/student-portal/mentor-mentee",
      color: "from-teal-400 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
    },
    {
      title: "Fee Receipt",
      description: "Download fee receipts",
      icon: Receipt,
      href: "/student-portal/fee-receipt",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
    {
      title: "Course Registration",
      description: "Register for courses",
      icon: ClipboardList,
      href: "/student-portal/course-registration",
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Supplementary Course Registration",
      description: "Register supplementary courses",
      icon: FileText,
      href: "/student-portal/supplementary-course",
      color: "from-pink-500 to-pink-700",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
    },
    {
      title: "Exam Application",
      description: "Apply for examinations",
      icon: FileCheck,
      href: "/student-portal/exam-application",
      color: "from-red-500 to-red-700",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      title: "Supplementary Exam Application",
      description: "Apply for supplementary exams",
      icon: FileText,
      href: "/student-portal/supplementary-exam",
      color: "from-slate-600 to-slate-800",
      bgColor: "bg-slate-50",
      textColor: "text-slate-700",
    },
    {
      title: "Apply for Paper Seeing Re-evaluation",
      description: "Request paper re-evaluation",
      icon: Trophy,
      href: "/student-portal/paper-revaluation",
      color: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-700",
    },
    {
      title: "View Result",
      description: "Check semester results",
      icon: BarChart3,
      href: "/student-portal/view-result",
      color: "from-teal-600 to-teal-800",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
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
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">JOHN</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm" className="ml-4 bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          </div>
          <p className="text-gray-600">Welcome back, John! Select any module to get started</p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <button
                key={module.title}
                onClick={() => router.push(module.href)}
                className="group h-32 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className={`h-full bg-gradient-to-br ${module.color} rounded-lg flex flex-col items-center justify-center text-white p-4 group-hover:brightness-110 transition-all`}
                >
                  <Icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm text-center leading-tight">{module.title}</h3>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
