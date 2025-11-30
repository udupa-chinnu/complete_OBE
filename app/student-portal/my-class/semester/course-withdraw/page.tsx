"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, GraduationCap, BookOpen, Calendar, Users, XCircle, Lock, LogOut, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

type Course = {
  id: string
  name: string
  code: string
  credits: number
  instructor: string
  isMandatory: boolean
}

// Selected courses summing up to 22 Credits
const registered: Course[] = [
  { id: "r1", name: "Data Structures", code: "CS301", credits: 4, instructor: "Dr. Smith", isMandatory: true },
  { id: "r2", name: "Web Development", code: "CS302", credits: 3, instructor: "Prof. Johnson", isMandatory: false },
  { id: "r3", name: "Database Systems", code: "CS303", credits: 4, instructor: "Dr. Williams", isMandatory: true },
  { id: "r4", name: "Computer Networks", code: "CS304", credits: 3, instructor: "Prof. Brown", isMandatory: false },
  { id: "r5", name: "Operating Systems", code: "CS305", credits: 4, instructor: "Dr. Johnson", isMandatory: false },
  { id: "r6", name: "Software Engineering", code: "CS306", credits: 4, instructor: "Prof. Garcia", isMandatory: true },
]

export default function CourseWithdraw({ searchParams }: { searchParams?: { sem?: string } }) {
  const router = useRouter()
  const sem = searchParams?.sem || "1"
  const username = "JOHN"
  
  const [items, setItems] = useState(registered)
  const [withdrawnCourses, setWithdrawnCourses] = useState<Course[]>([])

  const totalCredits = items.reduce((sum, item) => sum + item.credits, 0)
  const minCredits = 16
  const mandatoryCount = items.filter(c => c.isMandatory).length

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  function withdraw(id: string) {
    const course = items.find((i) => i.id === id)
    if (!course) return

    if (course.isMandatory) {
      alert(`${course.name} is a mandatory course and cannot be withdrawn.`)
      return
    }

    const newTotal = totalCredits - course.credits
    if (newTotal < minCredits) {
      alert(`Cannot withdraw from ${course.name}. You must maintain at least ${minCredits} credits. Withdrawing from this course would leave you with ${newTotal} credits.`)
      return
    }

    setItems((it) => it.filter((i) => i.id !== id))
    setWithdrawnCourses((prev) => [...prev, course])
  }

  function undoWithdraw(id: string) {
    const course = withdrawnCourses.find((c) => c.id === id)
    if (!course) return

    setWithdrawnCourses((prev) => prev.filter((c) => c.id !== id))
    setItems((prev) => [...prev, course])
  }

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
                  <span className="text-white text-sm font-semibold">{username.charAt(0)}</span>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-800">{username}</p>
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button & Title */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()} 
            className="mb-4 pl-0 hover:bg-transparent hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-rose-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-rose-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Course Withdrawal</h1>
          </div>
          <div className="flex items-center gap-2 ml-1 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <p>Semester {sem} • Academic Year 2024-25</p>
          </div>
        </div>

        {/* Credits Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center border-r border-gray-100 last:border-0">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Current Credits</p>
              <p className={`text-4xl font-bold ${totalCredits < minCredits ? 'text-red-600' : 'text-rose-600'}`}>
                {totalCredits}
              </p>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Registered Courses</p>
              <p className="text-4xl font-bold text-blue-600">{items.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Minimum Required</p>
              <p className="text-4xl font-bold text-gray-700">{minCredits}</p>
            </div>
          </div>

          {totalCredits <= minCredits && (
            <div className="mt-4 bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Credit Limit Reached</p>
                  <p className="text-sm text-orange-700 mt-1">
                    You cannot withdraw from any more courses. You must maintain at least {minCredits} credits.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 bg-rose-50 border-l-4 border-rose-400 p-4 rounded">
            <div className="flex items-start gap-2">
              <Lock className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-rose-800">Mandatory Courses</p>
                <p className="text-sm text-rose-700 mt-1">
                  {mandatoryCount} mandatory course(s) cannot be withdrawn.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-rose-600" />
            <h2 className="text-xl font-semibold text-gray-800">Active Registration</h2>
            <span className="ml-2 px-2 py-1 bg-rose-100 text-rose-700 text-sm font-medium rounded-full">
              {items.length} courses
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No courses registered</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((course) => {
                const newTotal = totalCredits - course.credits
                const wouldBeUnderMin = newTotal < minCredits
                const cannotWithdraw = course.isMandatory || wouldBeUnderMin

                return (
                  <div
                    key={course.id}
                    className={`border rounded-lg p-5 transition-all ${
                      cannotWithdraw
                        ? 'border-gray-100 bg-gray-50 opacity-90'
                        : 'border-gray-200 hover:shadow-md hover:border-rose-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                          <span className="px-2 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded">
                            {course.code}
                          </span>
                          <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded">
                            {course.credits} Credits
                          </span>
                          {course.isMandatory && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                              <Lock className="w-3 h-3" />
                              Mandatory
                            </span>
                          )}
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{course.instructor}</span>
                          </div>
                        </div>

                        {wouldBeUnderMin && !course.isMandatory && (
                          <p className="mt-2 text-xs text-red-600 font-medium">
                            Cannot withdraw - would drop below {minCredits} credits
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => withdraw(course.id)}
                        disabled={cannotWithdraw}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                          cannotWithdraw
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white'
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                        Withdraw
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Withdrawn Courses */}
        {withdrawnCourses.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Withdrawn Courses</h2>
            <div className="grid gap-4">
              {withdrawnCourses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg p-5 bg-gray-50 opacity-75"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-500 line-through">{course.name}</h3>
                        <span className="px-2 py-1 bg-white border border-gray-200 text-gray-400 text-xs font-medium rounded">
                          {course.code}
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-500 text-xs font-semibold rounded">
                          {course.credits} Credits
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{course.instructor}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => undoWithdraw(course.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 hover:shadow-md transition-all"
                    >
                      Undo Withdrawal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}