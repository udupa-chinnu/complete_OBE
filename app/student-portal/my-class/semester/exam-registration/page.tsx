// "use client"

// import { useState } from "react"

// const examCourses = [
//   { id: "x1", name: "Data Structures", code: "CS301" },
//   { id: "x2", name: "Web Development", code: "CS302" },
// ]

// export default function ExamRegistration({ searchParams }: { searchParams?: { sem?: string } }) {
//   const sem = searchParams?.sem || "1"
//   const [selected, setSelected] = useState<Record<string, boolean>>({})

//   function toggle(id: string) {
//     setSelected((s) => ({ ...s, [id]: !s[id] }))
//   }

//   function submit() {
//     const chosen = Object.keys(selected).filter((k) => selected[k])
//     alert(`Exam registration submitted for semester ${sem}: ${chosen.join(", ")}`)
//   }

//   return (
//     <main className="p-6">
//       <h1 className="text-2xl font-semibold mb-2">Exam Registration — Semester {sem}</h1>
//       <p className="text-sm text-muted-foreground mb-4">Select exams to register for.</p>

//       <div className="space-y-2">
//         {examCourses.map((c) => (
//           <label key={c.id} className="flex items-center gap-3">
//             <input type="checkbox" checked={!!selected[c.id]} onChange={() => toggle(c.id)} />
//             <span className="font-medium">{c.name}</span>
//             <span className="text-sm text-muted-foreground">({c.code})</span>
//           </label>
//         ))}
//       </div>

//       <div className="mt-4">
//         <button onClick={submit} className="px-4 py-2 rounded bg-blue-600 text-white">Submit Registration</button>
//       </div>
//     </main>
//   )
// }
"use client"

import { useState } from "react"
import { CheckCircle2, Circle, GraduationCap, BookOpen, Calendar, Users, FileText, Clock } from "lucide-react"

type ExamCourse = {
  id: string
  name: string
  code: string
  credits: number
  instructor: string
  examDate: string
  examTime: string
  examVenue: string
}

const examCourses: ExamCourse[] = [
  { id: "x1", name: "Data Structures", code: "CS301", credits: 4, instructor: "Dr. Smith", examDate: "Dec 15, 2024", examTime: "10:00 AM - 1:00 PM", examVenue: "Hall A" },
  { id: "x2", name: "Web Development", code: "CS302", credits: 3, instructor: "Prof. Johnson", examDate: "Dec 17, 2024", examTime: "2:00 PM - 5:00 PM", examVenue: "Hall B" },
  { id: "x3", name: "Database Systems", code: "CS303", credits: 4, instructor: "Dr. Williams", examDate: "Dec 19, 2024", examTime: "10:00 AM - 1:00 PM", examVenue: "Hall C" },
  { id: "x4", name: "Computer Networks", code: "CS304", credits: 3, instructor: "Prof. Brown", examDate: "Dec 21, 2024", examTime: "2:00 PM - 5:00 PM", examVenue: "Hall A" },
  { id: "x5", name: "Operating Systems", code: "CS305", credits: 4, instructor: "Dr. Johnson", examDate: "Dec 23, 2024", examTime: "10:00 AM - 1:00 PM", examVenue: "Hall B" },
  { id: "x6", name: "Software Engineering", code: "CS306", credits: 4, instructor: "Prof. Garcia", examDate: "Dec 26, 2024", examTime: "2:00 PM - 5:00 PM", examVenue: "Hall C" },
  { id: "x7", name: "Machine Learning", code: "CS307", credits: 4, instructor: "Dr. Davis", examDate: "Dec 28, 2024", examTime: "10:00 AM - 1:00 PM", examVenue: "Hall A" },
  { id: "x8", name: "Mobile Development", code: "CS308", credits: 3, instructor: "Prof. Lee", examDate: "Dec 30, 2024", examTime: "2:00 PM - 5:00 PM", examVenue: "Hall B" },
]

export default function ExamRegistration({ searchParams }: { searchParams?: { sem?: string } }) {
  const sem = searchParams?.sem || "1"
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const selectedCount = Object.values(selected).filter(Boolean).length

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
    
    alert(`✓ Exam Registration Successful!\n\nSemester ${sem}\nRegistered for ${selectedCount} exam(s):\n\n${courseNames.join('\n')}\n\nAdmit cards will be available 7 days before the exam date.`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="w-8 h-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-800">Exam Registration Portal</h1>
          </div>
          <div className="flex items-center gap-2 ml-11 text-gray-600">
            <Calendar className="w-4 h-4" />
            <p>Semester {sem} • End Semester Examinations 2024</p>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Selected Exams</p>
              <p className="text-4xl font-bold text-emerald-600">{selectedCount}</p>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Available Exams</p>
              <p className="text-4xl font-bold text-blue-600">{examCourses.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Exam Period</p>
              <p className="text-lg font-semibold text-gray-700">Dec 15-30, 2024</p>
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

          {selectedCount === 0 && (
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Select Exams</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Please select the exams you wish to appear for this semester.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Available Exams */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-semibold text-gray-800">Available Exams</h2>
            <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded">
              {examCourses.length} exams
            </span>
          </div>

          <div className="grid gap-4">
            {examCourses.map((course) => {
              const isSelected = !!selected[course.id]

              return (
                <div
                  key={course.id}
                  className={`border-2 rounded-lg p-5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                  onClick={() => toggle(course.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="pt-1">
                        {isSelected ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded">
                            {course.credits} credits
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded">
                            {course.code}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{course.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{course.examDate}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{course.examTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FileText className="w-4 h-4" />
                            <span>Venue: {course.examVenue}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={submit}
            disabled={selectedCount === 0}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              selectedCount > 0
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedCount === 0
              ? 'Select Exams to Register'
              : `Submit Registration for ${selectedCount} Exam${selectedCount !== 1 ? 's' : ''}`}
          </button>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Note: Admit cards will be available for download 7 days before the exam date
          </p>
        </div>
      </div>
    </main>
  )
}