"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageSquare, School, FileText, Users, BookOpen, ClipboardList } from "lucide-react"

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
              <Link href="/academic/faculty-feedback">Manage Faculty Feedback</Link>
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
              <Link href="/academic/institution-feedback">Manage Institution Feedback</Link>
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
              <Link href="/academic/feedback-reports">View Reports</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Course Management</CardTitle>
            <CardDescription>Manage courses and curriculum</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Add, edit, and manage course information</p>
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700">
              <Link href="/academic/course-management">Manage Courses</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Faculty Management</CardTitle>
            <CardDescription>Manage faculty information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Add, edit, and manage faculty details</p>
            <Button asChild className="w-full bg-red-600 hover:bg-red-700">
              <Link href="/academic/faculty-management">Manage Faculty</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Exam Management</CardTitle>
            <CardDescription>Manage examination schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm">Create and manage examination schedules</p>
            <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
              <Link href="/academic/exam-management">Manage Exams</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your recent activities in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Faculty Feedback Form Updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <School className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Institution Feedback Form Created</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Feedback Report Generated</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <ClipboardList className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">End Semester Feedback Collection</p>
                  <p className="text-xs text-muted-foreground">Due in 5 days</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Update Course Syllabus</p>
                  <p className="text-xs text-muted-foreground">Due in 1 week</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-cyan-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Faculty Performance Review</p>
                  <p className="text-xs text-muted-foreground">Due in 2 weeks</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
