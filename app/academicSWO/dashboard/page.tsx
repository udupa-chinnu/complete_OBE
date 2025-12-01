"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/card"
import { Button } from "@/components/admin/button"
import Link from "next/link"
import { MessageSquare, School, FileText, Users, BookOpen, ClipboardList, GraduationCap } from "lucide-react"

export default function AcademicDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Academic Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Academic Administration Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Faculty Feedback</CardTitle>
            <CardDescription>Manage faculty feedback forms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Create and manage feedback forms for faculty evaluation</p>
            <Button asChild className="w-full">
              <Link href="/academicSWO/faculty-feedback">Manage Faculty Feedback</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Institution Feedback</CardTitle>
            <CardDescription>Manage institution feedback forms</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Create and manage feedback forms for institution evaluation</p>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/academicSWO/institution-feedback">Manage Institution Feedback</Link>
            </Button>
          </CardContent>
        </Card>

        {/* New Graduate Exit Survey Card */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Graduate Exit Survey</CardTitle>
            <CardDescription>Manage exit surveys for graduates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Create and manage graduate exit survey forms</p>
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/academicSWO/graduate-exit-survey">Manage Exit Survey</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Feedback Reports</CardTitle>
            <CardDescription>View and analyze feedback reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Generate and view reports from collected feedback</p>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/academicSWO/feedback-reports">View Reports</Link>
            </Button>
          </CardContent>
        </Card>

      
      </div>

    </div>
  )
}