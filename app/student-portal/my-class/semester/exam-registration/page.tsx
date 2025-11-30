"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, GraduationCap, BookOpen, Calendar, LogOut, ArrowLeft } from "lucide-react"
import { logout } from "@/lib/auth"

type ExamCourse = {
  id: string
  name: string
  code: string
  credits: number
}

// Courses sum to 22 Credits
const examCourses: ExamCourse[] = [
  { id: "x1", name: "Data Structures", code: "CS301", credits: 4 },
  { id: "x2", name: "Web Development", code: "CS302", credits: 3 },
  { id: "x3", name: "Database Systems", code: "CS303", credits: 4 },
  { id: "x4", name: "Computer Networks", code: "CS304", credits: 3 },
  { id: "x5", name: "Operating Systems", code: "CS305", credits: 4 },
  { id: "x6", name: "Software Engineering", code: "CS306", credits: 4 },
]

export default function ExamRegistration({ searchParams }: { searchParams?: { sem?: string } }) {
  const router = useRouter()
  const sem = searchParams?.sem || "1"
  const username = "JOHN"
  
  // Initialize with ALL exams selected by default
  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    const initialSelection: Record<string, boolean> = {}
    examCourses.forEach(course => {
      initialSelection[course.id] = true
    })
    return initialSelection
  })

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const selectedCount = Object.values(selected).filter(Boolean).length
  
  const totalCredits = Object.keys(selected)
    .filter((k) => selected[k])
    .reduce((sum, id) => {
      const course = examCourses.find((c) => c.id === id)
      return sum + (course?.credits || 0)
    }, 0)

  function toggle(id: string) {
    setSelected((s) => ({ ...s, [id]: !s[id] }))
  }

  function submit() {
    if (selectedCount === 0) {
      alert("Please select at least one exam to register.")
      return
    }

    const chosen = Object.keys(selected).filter((k) => selected[k])
    const courseNames = chosen.map(id => {
      const course = examCourses.find(c => c.id === id)
      return course ? `${course.name} (${course.code})` : id
    })

    alert(`✓ Exam Registration Successful!\n\nSemester ${sem}\nRegistered for ${selectedCount} exam(s) (${totalCredits} Credits):\n\n- ${courseNames.join('\n- ')}\n\nAdmit cards will be available 7 days before the exam date.`)
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
            <div className="p-2 bg-emerald-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Exam Registration</h1>
          </div>
          <div className="flex items-center gap-2 ml-1 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <p>Semester {sem} • End Semester Examinations 2024</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center border-r border-gray-100 last:border-0">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Selected Exams</p>
              <p className="text-4xl font-bold text-emerald-600">{selectedCount}</p>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Total Credits</p>
              <p className="text-4xl font-bold text-blue-600">{totalCredits}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Exam Period</p>
              <p className="text-xl font-semibold text-gray-700 mt-2">Dec 15-30, 2024</p>
            </div>
          </div>

          {selectedCount > 0 && (
            <div className="mt-4 bg-emerald-50 border-l-4 border-emerald-400 p-4 rounded">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-emerald-800">Ready to Submit</p>
                  <p className="text-sm text-emerald-700 mt-1">
                    You have selected {selectedCount} exam(s). Click "Submit Registration" to confirm.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exam List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold text-gray-800">Available Exams</h2>
            <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
              {examCourses.length} exams
            </span>
          </div>

          <div className="grid gap-4">
            {examCourses.map((course) => {
              const isSelected = !!selected[course.id]

              return (
                <div
                  key={course.id}
                  className={`border rounded-lg p-5 transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                  onClick={() => toggle(course.id)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div className="pt-0.5">
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 group-hover:text-emerald-400" />
                      )}
                    </div>

                    <div className="flex-1 flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <h3 className={`text-lg font-semibold ${isSelected ? 'text-emerald-900' : 'text-gray-800'}`}>
                            {course.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded">
                          {course.code}
                        </span>
                      </div>

                      <span className={`font-medium text-sm ${isSelected ? 'text-emerald-700' : 'text-gray-600'}`}>
                        {course.credits} Credits
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky bottom-6">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden md:block">
               <p className="text-sm text-gray-500">Confirm exam registration</p>
               <p className="text-lg font-semibold text-gray-800">{selectedCount} Exams Selected</p>
            </div>
            <button
              onClick={submit}
              disabled={selectedCount === 0}
              className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                selectedCount > 0
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {selectedCount === 0
                ? 'Select Exams to Register'
                : `Submit Registration`}
            </button>
          </div>
          
          
        </div>

      </div>
    </div>
  )
}