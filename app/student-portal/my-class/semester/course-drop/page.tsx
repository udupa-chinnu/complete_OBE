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

// Enrolled courses summing up to 22 Credits
const enrolled: Course[] = [
  { id: "e1", name: "Database Systems", code: "CS303", credits: 4, instructor: "Dr. Williams", isMandatory: true },
  { id: "e2", name: "Algorithms", code: "CS304", credits: 3, instructor: "Prof. Smith", isMandatory: true },
  { id: "e3", name: "Operating Systems", code: "CS305", credits: 4, instructor: "Dr. Johnson", isMandatory: false },
  { id: "e4", name: "Computer Networks", code: "CS306", credits: 3, instructor: "Prof. Brown", isMandatory: false },
  { id: "e5", name: "Software Engineering", code: "CS307", credits: 4, instructor: "Prof. Garcia", isMandatory: true },
  { id: "e6", name: "Web Technologies", code: "CS308", credits: 4, instructor: "Dr. Martinez", isMandatory: false },
]

export default function CourseDrop({ searchParams }: { searchParams?: { sem?: string } }) {
  const router = useRouter()
  const sem = searchParams?.sem || "1"
  const username = "JOHN"
  
  const [items, setItems] = useState(enrolled)
  const [selectedToDrop, setSelectedToDrop] = useState<string | null>(null)
  const [droppedCourses, setDroppedCourses] = useState<Course[]>([])

  const totalCredits = items.reduce((sum, item) => sum + item.credits, 0)
  const minCredits = 16
  const mandatoryCount = items.filter(c => c.isMandatory).length

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  function selectCourse(id: string) {
    const course = items.find((i) => i.id === id)
    if (!course) return

    if (course.isMandatory) {
      alert(`${course.name} is a mandatory course and cannot be dropped.`)
      return
    }

    const newTotal = totalCredits - course.credits
    if (newTotal < minCredits) {
      alert(`Cannot select ${course.name} for dropping. You must maintain at least ${minCredits} credits. Dropping this course would leave you with ${newTotal} credits.`)
      return
    }

    setSelectedToDrop(id)
  }

  function confirmDrop() {
    if (!selectedToDrop) {
      alert("Please select a course to drop.")
      return
    }

    const course = items.find((i) => i.id === selectedToDrop)
    if (!course) return

    setItems((it) => it.filter((i) => i.id !== selectedToDrop))
    setDroppedCourses((prev) => [...prev, course])
    setSelectedToDrop(null)
  }

  function undoDrop(id: string) {
    const course = droppedCourses.find((c) => c.id === id)
    if (!course) return

    setDroppedCourses((prev) => prev.filter((c) => c.id !== id))
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
            <div className="p-2 bg-indigo-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Course Drop</h1>
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
              <p className="text-4xl font-bold text-indigo-600">{totalCredits}</p>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Enrolled Courses</p>
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
                    You cannot drop any more courses. You must maintain at least {minCredits} credits.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <div className="flex items-start gap-2">
              <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-800">Mandatory Courses</p>
                <p className="text-sm text-blue-700 mt-1">
                  {mandatoryCount} mandatory course(s) cannot be dropped.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Enrolled Courses</h2>
            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
              {items.length} courses
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No courses enrolled</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">Select a course to drop (mandatory courses cannot be dropped)</p>
              <div className="grid gap-4">
                {items.map((course) => {
                  const isSelected = selectedToDrop === course.id
                  const newTotal = totalCredits - course.credits
                  const wouldBeUnderMin = newTotal < minCredits
                  const cannotDrop = course.isMandatory || wouldBeUnderMin

                  return (
                    <div
                      key={course.id}
                      className={`border rounded-lg p-5 transition-all ${
                        isSelected
                          ? 'border-red-500 bg-red-50 shadow-sm'
                          : cannotDrop
                          ? 'border-gray-100 bg-gray-50 opacity-80 cursor-not-allowed'
                          : 'border-gray-200 hover:border-red-300 hover:shadow-sm cursor-pointer bg-white'
                      }`}
                      onClick={() => !cannotDrop && selectCourse(course.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="pt-1">
                            <input
                              type="radio"
                              name="course-to-drop"
                              checked={isSelected}
                              onChange={() => !cannotDrop && selectCourse(course.id)}
                              disabled={cannotDrop}
                              className={`w-5 h-5 ${cannotDrop ? 'cursor-not-allowed opacity-50' : 'cursor-pointer accent-red-600'}`}
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className={`text-lg font-semibold ${isSelected ? 'text-red-900' : 'text-gray-800'}`}>
                                {course.name}
                              </h3>
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded">
                                {course.credits} credits
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                                {course.code}
                              </span>
                              {course.isMandatory && (
                                <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded">
                                  <Lock className="w-3 h-3" />
                                  Mandatory
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Users className="w-4 h-4" />
                                <span>{course.instructor}</span>
                            </div>

                            {wouldBeUnderMin && !course.isMandatory && (
                              <p className="mt-2 text-sm text-red-600 font-medium">
                                Cannot drop - would leave you with {newTotal} credits (minimum: {minCredits})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}

          {/* Drop Button */}
          {items.length > 0 && (
            <div className="mt-6 sticky bottom-4 bg-white pt-4 border-t border-gray-100">
              <button
                onClick={confirmDrop}
                disabled={!selectedToDrop}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all shadow-sm ${
                  selectedToDrop
                    ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {selectedToDrop
                  ? `Drop Selected Course`
                  : 'Select a Course to Drop'}
              </button>
            </div>
          )}
        </div>

        {/* Dropped Courses */}
        {droppedCourses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dropped Courses</h2>
            <div className="grid gap-4">
              {droppedCourses.map((course) => (
                <div
                  key={course.id}
                  className="border border-gray-200 rounded-lg p-5 bg-gray-50/80"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-medium text-gray-500 line-through decoration-gray-400">{course.name}</h3>
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-medium rounded">
                          {course.code}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{course.credits} Credits</span>
                    </div>

                    <button
                      onClick={() => undoDrop(course.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 hover:shadow-md transition-all whitespace-nowrap"
                    >
                      Undo
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