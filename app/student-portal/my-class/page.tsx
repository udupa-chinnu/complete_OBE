"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Mail, User } from "lucide-react"

export default function MyClassPage() {
  const router = useRouter()
  const [subjects] = useState([
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      credits: 4,
      faculty: "Dr. Sarah Johnson",
      email: "sarah.johnson@college.edu",
      semester: "3",
      type: "Theory",
    },
    {
      id: 2,
      name: "Web Development",
      code: "CS202",
      credits: 3,
      faculty: "Prof. Mike Wilson",
      email: "mike.wilson@college.edu",
      semester: "3",
      type: "Theory",
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS203",
      credits: 4,
      faculty: "Dr. Emily Davis",
      email: "emily.davis@college.edu",
      semester: "3",
      type: "Theory",
    },
    {
      id: 4,
      name: "Data Structures Lab",
      code: "CS204",
      credits: 2,
      faculty: "Prof. Robert Brown",
      email: "robert.brown@college.edu",
      semester: "3",
      type: "Lab",
    },
    {
      id: 5,
      name: "Web Development Lab",
      code: "CS205",
      credits: 2,
      faculty: "Prof. Jennifer Smith",
      email: "jennifer.smith@college.edu",
      semester: "3",
      type: "Lab",
    },
  ])

  const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Class - Current Semester</h1>
              <p className="text-sm text-gray-600">Semester 3 | Total Credits: {totalCredits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Total Subjects</p>
                <p className="text-3xl font-bold text-gray-800">{subjects.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Theory Subjects</p>
                <p className="text-3xl font-bold text-gray-800">{subjects.filter((s) => s.type === "Theory").length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Lab Subjects</p>
                <p className="text-3xl font-bold text-gray-800">{subjects.filter((s) => s.type === "Lab").length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-lg">{subject.name}</CardTitle>
                    <CardDescription>{subject.code}</CardDescription>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${subject.type === "Theory" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}`}
                  >
                    {subject.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3 font-semibold">Faculty Information</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <User className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Faculty</p>
                        <p className="font-semibold text-gray-800">{subject.faculty}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-semibold text-gray-800 text-sm">{subject.email}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Credits</p>
                      <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded">
                        {subject.credits} Credits
                      </div>
                    </div>
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
