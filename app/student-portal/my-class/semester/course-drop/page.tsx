// "use client"

// import { useState } from "react"

// const enrolled = [
//   { id: "e1", name: "Database Systems", code: "CS303" },
//   { id: "e2", name: "Algorithms", code: "CS304" },
// ]

// export default function CourseDrop({ searchParams }: { searchParams?: { sem?: string } }) {
//   const sem = searchParams?.sem || "1"
//   const [items, setItems] = useState(enrolled)

//   function drop(id: string) {
//     setItems((it) => it.filter((i) => i.id !== id))
//   }

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-semibold mb-2">Course Drop — Semester {sem}</h1>
//       <p className="text-sm text-muted-foreground mb-4">Drop a course from your enrolled list.</p>

//       <ul className="space-y-3">
//         {items.map((c) => (
//           <li key={c.id} className="flex items-center justify-between border p-3 rounded">
//             <div>
//               <div className="font-medium">{c.name}</div>
//               <div className="text-sm text-muted-foreground">{c.code}</div>
//             </div>
//             <button onClick={() => drop(c.id)} className="px-3 py-1 bg-orange-600 text-white rounded">Drop</button>
//           </li>
//         ))}
//       </ul>
//     </main>
//   )
// }
"use client"

import { useState } from "react"
import { AlertCircle, GraduationCap, BookOpen, Lock, Calendar, Users } from "lucide-react"

type Course = {
  id: string
  name: string
  code: string
  credits: number
  instructor: string
  schedule: string
  isMandatory: boolean
}

const enrolled: Course[] = [
  { id: "e1", name: "Database Systems", code: "CS303", credits: 4, instructor: "Dr. Williams", schedule: "Mon/Wed 14:00-15:30", isMandatory: true },
  { id: "e2", name: "Algorithms", code: "CS304", credits: 3, instructor: "Prof. Smith", schedule: "Tue/Thu 10:00-11:30", isMandatory: true },
  { id: "e3", name: "Operating Systems", code: "CS305", credits: 4, instructor: "Dr. Johnson", schedule: "Mon/Wed 16:00-17:30", isMandatory: false },
  { id: "e4", name: "Computer Networks", code: "CS306", credits: 3, instructor: "Prof. Brown", schedule: "Tue/Thu 14:00-15:30", isMandatory: false },
  { id: "e5", name: "Software Engineering", code: "CS307", credits: 4, instructor: "Prof. Garcia", schedule: "Wed/Fri 10:00-11:30", isMandatory: true },
  { id: "e6", name: "Web Technologies", code: "CS308", credits: 3, instructor: "Dr. Martinez", schedule: "Mon/Fri 14:00-15:30", isMandatory: false },
  { id: "e7", name: "Machine Learning", code: "CS309", credits: 4, instructor: "Dr. Davis", schedule: "Tue/Thu 16:00-17:30", isMandatory: false },
  { id: "e8", name: "Mobile Development", code: "CS310", credits: 3, instructor: "Prof. Lee", schedule: "Wed/Fri 14:00-15:30", isMandatory: false },
]

export default function CourseDrop({ searchParams }: { searchParams?: { sem?: string } }) {
  const sem = searchParams?.sem || "1"
  const [items, setItems] = useState(enrolled)
  const [selectedToDrop, setSelectedToDrop] = useState<string | null>(null)
  const [droppedCourses, setDroppedCourses] = useState<Course[]>([])

  const totalCredits = items.reduce((sum, item) => sum + item.credits, 0)
  const minCredits = 21
  const mandatoryCount = items.filter(c => c.isMandatory).length

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Course Drop Portal</h1>
          </div>
          <div className="flex items-center gap-2 ml-11 text-gray-600">
            <Calendar className="w-4 h-4" />
            <p>Semester {sem} • Academic Year 2024-25</p>
          </div>
        </div>

        {/* Credits Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Credits</p>
              <p className="text-4xl font-bold text-indigo-600">{totalCredits}</p>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Enrolled Courses</p>
              <p className="text-4xl font-bold text-blue-600">{items.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Minimum Required</p>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Enrolled Courses</h2>
            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded">
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
                      className={`border-2 rounded-lg p-5 transition-all ${
                        isSelected
                          ? 'border-red-500 bg-red-50 shadow-md'
                          : cannotDrop
                          ? 'border-gray-200 bg-gray-50'
                          : 'border-gray-200 hover:border-red-300 hover:shadow-md cursor-pointer'
                      }`}
                      onClick={() => !cannotDrop && selectCourse(course.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="pt-1">
                            <input
                              type="radio"
                              name="course-to-drop"
                              checked={isSelected}
                              onChange={() => !cannotDrop && selectCourse(course.id)}
                              disabled={cannotDrop}
                              className={`w-5 h-5 ${cannotDrop ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Users className="w-4 h-4" />
                                <span>{course.instructor}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{course.schedule}</span>
                              </div>
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
            <div className="mt-6">
              <button
                onClick={confirmDrop}
                disabled={!selectedToDrop}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                  selectedToDrop
                    ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Dropped Courses</h2>
            <div className="grid gap-4">
              {droppedCourses.map((course) => (
                <div
                  key={course.id}
                  className="border-2 border-gray-200 rounded-lg p-5 bg-gray-50 opacity-75"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-600 line-through">{course.name}</h3>
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 text-sm font-semibold rounded">
                          {course.credits} credits
                        </span>
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 text-sm font-medium rounded">
                          {course.code}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{course.instructor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{course.schedule}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => undoDrop(course.id)}
                      className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 hover:shadow-lg transition-all"
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
    </main>
  )
}