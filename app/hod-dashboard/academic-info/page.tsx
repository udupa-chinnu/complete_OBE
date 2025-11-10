"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Users, FileText, Settings, BarChart3, CheckSquare } from "lucide-react"

export default function AcademicInfoPage() {
  const router = useRouter()
  const [completedSteps] = useState({
    moduleInfo: false,
    moduleSetup: false,
    programStructure: false,
    oddSemester: false,
    evenSemester: false,
  })

  const modules = [
    {
      title: "Module Information",
      description: "Manage basic course information and course-faculty mapping",
      icon: BookOpen,
      href: "/hod-dashboard/academic-info/module-information",
      color: "bg-blue-500",
      completed: completedSteps.moduleInfo,
    },
    {
      title: "Module Setup",
      description: "Configure modules and select coordinators",
      icon: Settings,
      href: "/hod-dashboard/academic-info/module-setup",
      color: "bg-green-500",
      completed: completedSteps.moduleSetup,
    },
    {
      title: "Program & Course Structure",
      description: "Define program structure and course distribution",
      icon: FileText,
      href: "/hod-dashboard/academic-info/program-course-structure",
      color: "bg-purple-500",
      completed: completedSteps.programStructure,
    },
    {
      title: "Odd Semester Entry (3, 5, 7)",
      description: "Enter and manage odd semester courses",
      icon: BarChart3,
      href: "/hod-dashboard/academic-info/odd-semester-entry",
      color: "bg-orange-500",
      completed: completedSteps.oddSemester,
    },
    {
      title: "Even Semester Entry (4, 6, 8)",
      description: "Enter and manage even semester courses",
      icon: Users,
      href: "/hod-dashboard/academic-info/even-semester-entry",
      color: "bg-pink-500",
      completed: completedSteps.evenSemester,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Academic Information</h1>
              <p className="text-sm text-gray-600">Manage academic modules and course structure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Setup Progress</CardTitle>
            <CardDescription>Complete all sections to finalize academic information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(Object.values(completedSteps).filter(Boolean).length / Object.values(completedSteps).length) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {Object.values(completedSteps).filter(Boolean).length} of {Object.values(completedSteps).length} sections
              completed
            </p>
          </CardContent>
        </Card>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const Icon = module.icon
            return (
              <Card
                key={module.title}
                className="hover:shadow-lg transition-shadow cursor-pointer group relative"
                onClick={() => router.push(module.href)}
              >
                {module.completed && (
                  <div className="absolute top-3 right-3">
                    <CheckSquare className="w-5 h-5 text-green-500" />
                  </div>
                )}
                <CardHeader>
                  <div
                    className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    {module.completed ? "View" : "Start"} →
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
