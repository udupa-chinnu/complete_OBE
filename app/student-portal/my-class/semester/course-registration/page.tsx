// "use client"

// import { useState } from "react"

// type Course = { id: string; name: string; code: string }

// const sampleCourses: Course[] = [
//   { id: "c1", name: "Data Structures", code: "CS301" },
//   { id: "c2", name: "Web Development", code: "CS302" },
//   { id: "c3", name: "Database Systems", code: "CS303" },
// ]

// export default function CourseRegistration({ searchParams }: { searchParams?: { sem?: string } }) {
//   const sem = searchParams?.sem || "1"
//   const [selected, setSelected] = useState<Record<string, boolean>>({})

//   function toggle(id: string) {
//     setSelected((s) => ({ ...s, [id]: !s[id] }))
//   }

//   function handleRegister() {
//     const chosen = Object.keys(selected).filter((k) => selected[k])
//     alert(`Registered ${chosen.length} course(s) for semester ${sem}: ${chosen.join(", ")}`)
//   }

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-semibold mb-2">Course Registration — Semester {sem}</h1>
//       <p className="text-sm text-muted-foreground mb-4">Select courses to register for this semester.</p>

//       <div className="space-y-2">
//         {sampleCourses.map((c) => (
//           <label key={c.id} className="flex items-center gap-3">
//             <input type="checkbox" checked={!!selected[c.id]} onChange={() => toggle(c.id)} />
//             <span className="font-medium">{c.name}</span>
//             <span className="text-sm text-muted-foreground">({c.code})</span>
//           </label>
//         ))}
//       </div>

//       <div className="mt-4">
//         <button onClick={handleRegister} className="px-4 py-2 rounded bg-blue-600 text-white">Register</button>
//       </div>
//     </main>
//   )
// }
"use client"

import { useState } from "react"
import { CheckCircle2, Circle, GraduationCap, BookOpen, AlertCircle, Calendar, Users } from "lucide-react"

type Course = { 
  id: string
  name: string
  code: string
  credits: number
  instructor: string
  schedule: string
  seats: number
  enrolled: number
}

const sampleCourses: Course[] = [
  { id: "c1", name: "Data Structures", code: "CS301", credits: 4, instructor: "Dr. Smith", schedule: "Mon/Wed 10:00-11:30", seats: 60, enrolled: 45 },
  { id: "c2", name: "Web Development", code: "CS302", credits: 3, instructor: "Prof. Johnson", schedule: "Tue/Thu 14:00-15:30", seats: 50, enrolled: 38 },
  { id: "c3", name: "Database Systems", code: "CS303", credits: 4, instructor: "Dr. Williams", schedule: "Mon/Wed 14:00-15:30", seats: 55, enrolled: 52 },
  { id: "c4", name: "Computer Networks", code: "CS304", credits: 3, instructor: "Prof. Brown", schedule: "Tue/Thu 10:00-11:30", seats: 45, enrolled: 30 },
  { id: "c5", name: "Machine Learning", code: "CS305", credits: 4, instructor: "Dr. Davis", schedule: "Wed/Fri 16:00-17:30", seats: 40, enrolled: 39 },
  { id: "c6", name: "Software Engineering", code: "CS306", credits: 4, instructor: "Prof. Garcia", schedule: "Mon/Wed 16:00-17:30", seats: 50, enrolled: 42 },
  { id: "c7", name: "Mobile App Development", code: "CS307", credits: 3, instructor: "Dr. Martinez", schedule: "Tue/Thu 16:00-17:30", seats: 35, enrolled: 28 },
  { id: "c8", name: "Artificial Intelligence", code: "CS308", credits: 4, instructor: "Prof. Lee", schedule: "Mon/Fri 10:00-11:30", seats: 45, enrolled: 44 },
]

export default function CourseRegistration({ searchParams }: { searchParams?: { sem?: string } }) {
  const sem = searchParams?.sem || "1"
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const minCredits = 12
  const maxCredits = 21

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
      alert(`Cannot select ${course.name}. This would exceed the maximum of ${maxCredits} credits. You currently have ${totalCredits} credits selected.`)
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
    alert(`Successfully registered ${chosen.length} course(s) for Semester ${sem}!\n\nCourses:\n${courseNames.join('\n')}\n\nTotal Credits: ${totalCredits}`)
  }

  function getSeatsStatus(course: Course) {
    const available = course.seats - course.enrolled
    const percentage = (course.enrolled / course.seats) * 100
    
    if (percentage >= 95) return { text: `${available} seats left`, color: "text-red-600", bg: "bg-red-50" }
    if (percentage >= 80) return { text: `${available} seats left`, color: "text-orange-600", bg: "bg-orange-50" }
    return { text: `${available} seats available`, color: "text-green-600", bg: "bg-green-50" }
  }

  const canRegister = totalCredits >= minCredits && totalCredits <= maxCredits

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">Course Registration Portal</h1>
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
              <p className="text-sm text-gray-600 mb-1">Selected Credits</p>
              <p className={`text-4xl font-bold ${
                totalCredits < minCredits ? 'text-red-600' : 
                totalCredits > maxCredits ? 'text-red-600' : 
                'text-purple-600'
              }`}>
                {totalCredits}
              </p>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Courses Selected</p>
              <p className="text-4xl font-bold text-blue-600">{selectedCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Credit Range</p>
              <p className="text-2xl font-semibold text-gray-700">{minCredits} - {maxCredits}</p>
            </div>
          </div>

          {/* Status Messages */}
          <div className="mt-4">
            {totalCredits < minCredits && selectedCount > 0 && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">Insufficient Credits</p>
                    <p className="text-sm text-orange-700 mt-1">
                      You need {minCredits - totalCredits} more credit(s) to meet the minimum requirement.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {totalCredits >= minCredits && totalCredits <= maxCredits && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Ready to Register</p>
                    <p className="text-sm text-green-700 mt-1">
                      Your credit selection meets the requirements. Click "Register" to confirm.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {totalCredits > maxCredits && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Too Many Credits</p>
                    <p className="text-sm text-red-700 mt-1">
                      You've exceeded the maximum by {totalCredits - maxCredits} credit(s). Please deselect some courses.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Available Courses */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Available Courses</h2>
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded">
              {sampleCourses.length} courses
            </span>
          </div>

          <div className="grid gap-4">
            {sampleCourses.map((course) => {
              const isSelected = !!selected[course.id]
              const seatsStatus = getSeatsStatus(course)
              const wouldExceedMax = !isSelected && totalCredits + course.credits > maxCredits

              return (
                <div
                  key={course.id}
                  className={`border-2 rounded-lg p-5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : wouldExceedMax
                      ? 'border-gray-200 bg-gray-50 opacity-60'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                  onClick={() => !wouldExceedMax && toggle(course.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="pt-1">
                        {isSelected ? (
                          <CheckCircle2 className="w-6 h-6 text-purple-600" />
                        ) : (
                          <Circle className={`w-6 h-6 ${wouldExceedMax ? 'text-gray-300' : 'text-gray-400'}`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded">
                            {course.credits} credits
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                            {course.code}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{course.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{course.schedule}</span>
                          </div>
                          <div>
                            <span className={`px-2 py-1 ${seatsStatus.bg} ${seatsStatus.color} text-xs font-medium rounded`}>
                              {seatsStatus.text}
                            </span>
                          </div>
                        </div>

                        {wouldExceedMax && !isSelected && (
                          <p className="mt-2 text-sm text-red-600 font-medium">
                            Cannot select - would exceed {maxCredits} credit maximum
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Register Button */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={handleRegister}
            disabled={!canRegister || selectedCount === 0}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              canRegister && selectedCount > 0
                ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedCount === 0
              ? 'Select Courses to Register'
              : !canRegister
              ? 'Cannot Register - Check Credit Requirements'
              : `Register for ${selectedCount} Course${selectedCount !== 1 ? 's' : ''} (${totalCredits} Credits)`}
          </button>
        </div>
      </div>
    </main>
  )
}