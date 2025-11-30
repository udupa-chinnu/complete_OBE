"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, GraduationCap, BookOpen, Calendar, Users, LogOut, ArrowLeft } from "lucide-react"
import { logout } from "@/lib/auth"

type Course = { 
  id: string
  name: string
  code: string
  credits: number
  instructor: string
}

const sampleCourses: Course[] = [
  { id: "c1", name: "Data Structures", code: "CS301", credits: 4, instructor: "Dr. Smith" },
  { id: "c2", name: "Web Development", code: "CS302", credits: 3, instructor: "Prof. Johnson" },
  { id: "c3", name: "Database Systems", code: "CS303", credits: 4, instructor: "Dr. Williams" },
  { id: "c4", name: "Computer Networks", code: "CS304", credits: 3, instructor: "Prof. Brown" },
  { id: "c5", name: "Machine Learning", code: "CS305", credits: 4, instructor: "Dr. Davis" },
  { id: "c6", name: "Software Engineering", code: "CS306", credits: 4, instructor: "Prof. Garcia" },

]

export default function CourseRegistration({ searchParams }: { searchParams?: { sem?: string } }) {
  const router = useRouter()
  const sem = searchParams?.sem || "1"
  
  // Static Username
  const username = "JOHN"
  
  const minCredits = 16
  const maxCredits = 28

  // Initialize with specific courses selected to sum up to 22 Credits
  // Selected: c1(4) + c2(3) + c3(4) + c4(3) + c5(4) + c6(4) = 22 Credits
  const [selected, setSelected] = useState<Record<string, boolean>>({
    "c1": true,
    "c2": true,
    "c3": true,
    "c4": true,
    "c5": true,
    "c6": true,
    "c7": false,
    "c8": false,
  })

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const totalCredits = Object.keys(selected)
    .filter((k) => selected[k])
    .reduce((sum, id) => {
      const course = sampleCourses.find((c) => c.id === id)
      return sum + (course?.credits || 0)
    }, 0)

  const selectedCount = Object.values(selected).filter(Boolean).length

  function toggle(id: string) {
    const course = sampleCourses.find((c) => c.id === id)
    if (!course) return

    // Check if selecting would exceed max credits
    if (!selected[id] && totalCredits + course.credits > maxCredits) {
      alert(`Cannot select ${course.name}. This would exceed the maximum of ${maxCredits} credits.`)
      return
    }

    setSelected((s) => ({ ...s, [id]: !s[id] }))
  }

  function handleRegister() {
    if (totalCredits < minCredits) {
       alert(`You need at least ${minCredits} credits to register. Currently selected: ${totalCredits} credits.`)
       return
    }

    const chosen = Object.keys(selected).filter((k) => selected[k])
    const courseNames = chosen.map(id => {
      const course = sampleCourses.find(c => c.id === id)
      return course?.name || id
    })
    alert(`Successfully registered for ${chosen.length} courses!\nTotal Credits: ${totalCredits}\n\nCourses:\n- ${courseNames.join('\n- ')}`)
    
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
            <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Course Registration</h1>
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
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Courses Selected</p>
              <p className="text-4xl font-bold text-blue-600">{selectedCount}</p>
            </div>
            <div className="text-center border-r border-gray-100 last:border-0">
              <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Total Credits</p>
              <p className={`text-4xl font-bold ${
                totalCredits < minCredits || totalCredits > maxCredits ? 'text-red-600' : 'text-purple-600'
              }`}>
                {totalCredits}
              </p>
            </div>
            <div className="text-center">
               <p className="text-sm text-gray-500 mb-1 uppercase tracking-wide font-medium">Required Range</p>
               <p className="text-2xl font-semibold text-gray-700 mt-2">{minCredits} - {maxCredits} Credits</p>
            </div>
          </div>
          
          {/* Warning Messages */}
          <div className="mt-4 text-center">
             {totalCredits < minCredits && (
                <p className="text-sm text-red-600 font-medium bg-red-50 py-2 rounded">
                   ⚠️ Minimum {minCredits} credits required. You need {minCredits - totalCredits} more.
                </p>
             )}
             {totalCredits > maxCredits && (
                <p className="text-sm text-red-600 font-medium bg-red-50 py-2 rounded">
                   ⚠️ Maximum {maxCredits} credits allowed. Please remove {totalCredits - maxCredits} credits.
                </p>
             )}
          </div>
        </div>

        {/* Available Courses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-800">Course List</h2>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
              {sampleCourses.length} Available
            </span>
          </div>

          <div className="grid gap-4">
            {sampleCourses.map((course) => {
              const isSelected = !!selected[course.id]
              const wouldExceedMax = !isSelected && totalCredits + course.credits > maxCredits

              return (
                <div
                  key={course.id}
                  className={`border rounded-lg p-5 transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50/50 shadow-sm'
                      : wouldExceedMax 
                        ? 'border-gray-200 opacity-50 cursor-not-allowed bg-gray-50'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                  }`}
                  onClick={() => !wouldExceedMax && toggle(course.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="pt-1">
                      {isSelected ? (
                        <CheckCircle2 className="w-6 h-6 text-purple-600 fill-purple-100" />
                      ) : (
                        <Circle className={`w-6 h-6 ${wouldExceedMax ? 'text-gray-300' : 'text-gray-300 group-hover:text-purple-400'}`} />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className={`text-lg font-semibold ${isSelected ? 'text-purple-900' : 'text-gray-700'}`}>
                            {course.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded">
                          {course.code}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className={`font-medium ${isSelected ? 'text-purple-700' : 'text-gray-600'}`}>
                                {course.credits} Credits
                            </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side status */}
                  <div className="hidden sm:block">
                      {isSelected && <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">Selected</span>}
                      {!isSelected && wouldExceedMax && <span className="text-xs font-medium text-red-500">Credit Limit Reached</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Register Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky bottom-6">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden md:block">
                <p className="text-sm text-gray-500">Confirm your selection for Semester {sem}</p>
                <p className="text-lg font-semibold text-gray-800">{selectedCount} Courses • {totalCredits} Credits</p>
            </div>
            <button
                onClick={handleRegister}
                disabled={selectedCount === 0 || totalCredits < minCredits || totalCredits > maxCredits}
                className={`flex-1 md:flex-none px-8 py-3 rounded-lg font-semibold text-white transition-all ${
                selectedCount > 0 && totalCredits >= minCredits && totalCredits <= maxCredits
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
                {selectedCount === 0 
                  ? 'Select Courses' 
                  : totalCredits < minCredits 
                    ? `Need ${minCredits - totalCredits} More Credits`
                    : totalCredits > maxCredits
                      ? `Exceeds Limit by ${totalCredits - maxCredits}`
                      : 'Confirm Registration'
                }
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}