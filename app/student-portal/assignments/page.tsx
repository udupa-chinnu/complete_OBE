"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function AssignmentsPage() {
  const router = useRouter()
  const [assignments] = useState([
    {
      id: 1,
      title: "Array Implementation",
      course: "Data Structures",
      dueDate: "2024-12-15",
      status: "pending",
      score: null,
      description: "Implement array data structure with basic operations",
    },
    {
      id: 2,
      title: "Responsive Website",
      course: "Web Development",
      dueDate: "2024-12-18",
      status: "pending",
      score: null,
      description: "Create a responsive portfolio website",
    },
    {
      id: 3,
      title: "SQL Queries Project",
      course: "Database Systems",
      dueDate: "2024-12-10",
      status: "submitted",
      score: 42,
      description: "Complete SQL assignment with 50 different queries",
    },
    {
      id: 4,
      title: "OOP Design Patterns",
      course: "Object Oriented Programming",
      dueDate: "2024-12-20",
      status: "pending",
      score: null,
      description: "Implement design patterns in Java",
    },
    {
      id: 5,
      title: "Process Scheduling",
      course: "Operating Systems",
      dueDate: "2024-12-08",
      status: "submitted",
      score: 38,
      description: "Simulate CPU scheduling algorithms",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "submitted":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending"
      case "submitted":
        return "Submitted"
      case "overdue":
        return "Overdue"
      default:
        return status
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-800">Assignments</h1>
              <p className="text-sm text-gray-600">Track your assignments and submissions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(assignment.status)}
                    <span className="text-sm font-medium text-gray-700">{getStatusLabel(assignment.status)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{assignment.description}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    {assignment.score !== null && (
                      <span className="text-sm font-semibold text-green-600">Score: {assignment.score}/50</span>
                    )}
                    <Button variant="outline" size="sm">
                      {assignment.status === "pending" ? "Submit" : "View"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
