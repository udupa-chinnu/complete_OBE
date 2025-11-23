'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, Search, ArrowLeft } from 'lucide-react'

export default function RegularAttendancePage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [classesCount, setClassesCount] = useState<number>(1)
  const [classType, setClassType] = useState<string>('regular')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [showStudents, setShowStudents] = useState(false)
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Sharma', rollNo: '4SF21CS001', present: true },
    { id: 2, name: 'Bhavna Kumar', rollNo: '4SF21CS002', present: true },
    { id: 3, name: 'Chirag Patel', rollNo: '4SF21CS003', present: false },
    { id: 4, name: 'Diana Singh', rollNo: '4SF21CS004', present: true },
    { id: 5, name: 'Esha Verma', rollNo: '4SF21CS005', present: true },
    { id: 6, name: 'Faizan Khan', rollNo: '4SF21CS006', present: false },
  ])

  const sections = ['3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B']

  const handleDateSectionChange = () => {
    if (selectedDate && selectedSection) {
      setShowStudents(true)
    } else {
      setShowStudents(false)
    }
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const presentCount = students.filter((s) => s.present).length
  const shortageCount = students.filter((s) => {
    const attendancePercentage = Math.random() * 100
    return attendancePercentage < 85
  }).length

  const toggleStudentPresence = (id: number) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, present: !s.present } : s)))
  }

  const handleSave = () => {
    if (!selectedDate || !selectedSection) {
      alert('Please fill all fields')
      return
    }
    console.log('Attendance data saved:', {
      type: 'regular',
      date: selectedDate,
      section: selectedSection,
      classesCount,
      classType,
      students: students.filter((s) => s.present),
    })
    alert('Attendance saved successfully')
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <Button onClick={() => router.push('/faculty-dashboard/attendance')} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Regular Attendance</h1>
          <p className="text-gray-600">Mark attendance for regular classes</p>
        </div>

        {/* Attendance Details Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Date and Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value)
                    handleDateSectionChange()
                  }}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="section">Select Section</Label>
                <Select 
                  value={selectedSection} 
                  onValueChange={(value) => {
                    setSelectedSection(value)
                    handleDateSectionChange()
                  }}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map((sec) => (
                      <SelectItem key={sec} value={sec}>
                        {sec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="classes">Number of Classes Taken (Max 4)</Label>
                <Input
                  id="classes"
                  type="number"
                  min="1"
                  max="4"
                  value={classesCount}
                  onChange={(e) => setClassesCount(Math.min(4, parseInt(e.target.value) || 1))}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="classType">Type of Class</Label>
                <Select value={classType} onValueChange={setClassType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="extra">Extra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {showStudents && (
          <>
            {/* Attendance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Students Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{presentCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Shortage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{shortageCount}</div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Shortage Alert */}
            {shortageCount > 0 && (
              <Card className="border-red-200 bg-red-50 mb-6">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <CardTitle className="text-red-800">Attendance Shortage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-red-700">
                  {shortageCount} student(s) have attendance below 85%. Please review their attendance records.
                </CardContent>
              </Card>
            )}

            {/* Student List */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Student Attendance</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or roll number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3 flex-1">
                        <Checkbox
                          checked={student.present}
                          onCheckedChange={() => toggleStudentPresence(student.id)}
                        />
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${student.present ? 'text-green-600' : 'text-red-600'}`}>
                        {student.present ? 'Present' : 'Absent'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex gap-4">
              <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Save Attendance
              </Button>
              <Button onClick={() => router.push('/faculty-dashboard/attendance')} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </>
        )}

        {/* Message when no selection made */}
        {!showStudents && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6 text-center">
              <p className="text-blue-800 font-medium">Please select both date and section to view students</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
