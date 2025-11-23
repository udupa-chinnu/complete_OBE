'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search } from 'lucide-react'

interface StudentGrace {
  id: number
  name: string
  usn: string
  attendancePercentage: number
  totalClasses: number
  presentClasses: number
}

interface AbsentDate {
  date: string
  classesHeld: number
  markedClasses: number[]
}

export default function GraceAttendancePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedStudent, setSelectedStudent] = useState<StudentGrace | null>(null)
  const [absentDates, setAbsentDates] = useState<AbsentDate[]>([])

  const [graceStudents, setGraceStudents] = useState<StudentGrace[]>([
    { id: 1, name: 'Aarav Sharma', usn: '4SF21CS001', attendancePercentage: 78, totalClasses: 40, presentClasses: 31 },
    { id: 2, name: 'Chirag Patel', usn: '4SF21CS003', attendancePercentage: 82, totalClasses: 40, presentClasses: 33 },
    { id: 3, name: 'Diana Singh', usn: '4SF21CS004', attendancePercentage: 80, totalClasses: 40, presentClasses: 32 },
    { id: 4, name: 'Faizan Khan', usn: '4SF21CS006', attendancePercentage: 75, totalClasses: 40, presentClasses: 30 },
  ])

  const getAbsentDatesForStudent = (studentId: number): AbsentDate[] => {
    const data: Record<number, AbsentDate[]> = {
      1: [
        { date: '18/9/2025', classesHeld: 2, markedClasses: [] },
        { date: '19/9/2025', classesHeld: 1, markedClasses: [] },
        { date: '23/9/2025', classesHeld: 4, markedClasses: [] },
      ],
      2: [
        { date: '20/9/2025', classesHeld: 3, markedClasses: [] },
        { date: '21/9/2025', classesHeld: 2, markedClasses: [] },
      ],
      3: [
        { date: '18/9/2025', classesHeld: 4, markedClasses: [] },
        { date: '22/9/2025', classesHeld: 1, markedClasses: [] },
      ],
      4: [
        { date: '19/9/2025', classesHeld: 2, markedClasses: [] },
        { date: '20/9/2025', classesHeld: 3, markedClasses: [] },
        { date: '24/9/2025', classesHeld: 2, markedClasses: [] },
      ],
    }
    return data[studentId] || []
  }

  const handleSelectStudent = (student: StudentGrace) => {
    setSelectedStudent(student)
    setAbsentDates(getAbsentDatesForStudent(student.id))
  }

  const toggleClassAttendance = (dateIndex: number, classNumber: number) => {
    const updatedDates = [...absentDates]
    const markedIndex = updatedDates[dateIndex].markedClasses.indexOf(classNumber)
    
    if (markedIndex > -1) {
      updatedDates[dateIndex].markedClasses.splice(markedIndex, 1)
    } else {
      updatedDates[dateIndex].markedClasses.push(classNumber)
    }
    
    setAbsentDates(updatedDates)
  }

  const calculateNewAttendance = (): number => {
    if (!selectedStudent) return 0
    
    const totalMarkedClasses = absentDates.reduce((sum, date) => sum + date.markedClasses.length, 0)
    const newPresentClasses = selectedStudent.presentClasses + totalMarkedClasses
    const newPercentage = (newPresentClasses / selectedStudent.totalClasses) * 100
    
    return Math.round(newPercentage)
  }

  const handleSaveGraceAttendance = () => {
    if (!selectedStudent) return

    const newAttendancePercentage = calculateNewAttendance()
    
    if (newAttendancePercentage >= 85) {
      setGraceStudents(graceStudents.filter(s => s.id !== selectedStudent.id))
      alert(`Student ${selectedStudent.name} has been marked grace attendance. Attendance is now ${newAttendancePercentage}%. Removed from grace list.`)
      setSelectedStudent(null)
      setAbsentDates([])
    } else {
      setGraceStudents(graceStudents.map(s => 
        s.id === selectedStudent.id 
          ? { 
              ...s, 
              attendancePercentage: newAttendancePercentage,
              presentClasses: s.presentClasses + absentDates.reduce((sum, d) => sum + d.markedClasses.length, 0)
            }
          : s
      ))
      alert(`Grace attendance saved. New attendance: ${newAttendancePercentage}%`)
      setSelectedStudent(null)
      setAbsentDates([])
    }
  }

  const filteredStudents = graceStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.usn.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const newAttendancePercentage = calculateNewAttendance()
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

    const handleBackToRoleSelection = () => {
    router.push("/faculty-dashboard/attendance")
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ...  header ... */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">Digital Campus</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Rajesh Sharma</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">RS</span>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedStudent ? (
          <>
            <div className="mb-6">
                <div className="mb-6">
          <Button onClick={handleBackToRoleSelection} variant="outline" size="sm">
            ← Back to dashboard
          </Button>
        </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Grace Attendance</h1>
              <p className="text-gray-600">Students with attendance below 85%</p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Students Requiring Grace Attendance</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or USN"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-100">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Student Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">USN</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Attendance %</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-800">{student.name}</td>
                          <td className="px-4 py-3 text-gray-600">{student.usn}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              student.attendancePercentage >= 85 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {student.attendancePercentage}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Button 
                              onClick={() => handleSelectStudent(student)}
                              size="sm"
                              className="bg-teal-600 hover:bg-teal-700"
                            >
                              Mark Grace
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No students found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="mb-6">
              <Button 
                onClick={() => setSelectedStudent(null)}
                variant="outline"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Student List
              </Button>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Grace Attendance for {selectedStudent.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">USN: {selectedStudent.usn} | Current Attendance: {selectedStudent.attendancePercentage}%</p>
              </CardHeader>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Absent Dates - Mark Classes Attended</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-100">
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                        {[1, 2, 3, 4].map(num => (
                          <th key={num} className="px-4 py-3 text-center font-semibold text-gray-700">{num}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {absentDates.map((dateRecord, dateIndex) => (
                        <tr key={dateIndex} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-800">{dateRecord.date}</td>
                          {[1, 2, 3, 4].map(classNum => (
                            <td key={classNum} className="px-4 py-3 text-center">
                              {classNum <= dateRecord.classesHeld ? (
                                <Checkbox
                                  checked={dateRecord.markedClasses.includes(classNum)}
                                  onCheckedChange={() => toggleClassAttendance(dateIndex, classNum)}
                                />
                              ) : null}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Current Attendance: <span className="font-semibold text-gray-800">{selectedStudent.attendancePercentage}%</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Marked Classes: <span className="font-semibold text-gray-800">{absentDates.reduce((sum, d) => sum + d.markedClasses.length, 0)}</span>
                  </p>
                  <p className="text-lg font-semibold text-teal-700 mt-3">
                    New Attendance: {newAttendancePercentage}%
                    {newAttendancePercentage >= 85 && (
                      <span className="ml-2 text-green-600">(Will be removed from grace list)</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button 
                onClick={handleSaveGraceAttendance}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Save Grace Attendance
              </Button>
              <Button 
                onClick={() => setSelectedStudent(null)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
