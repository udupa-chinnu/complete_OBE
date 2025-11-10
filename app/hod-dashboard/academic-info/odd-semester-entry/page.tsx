"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, CheckCircle, Lock } from "lucide-react"

export default function OddSemesterEntryPage() {
  const router = useRouter()
  const [currentSemester, setCurrentSemester] = useState("")
  const [scheme, setScheme] = useState("")
  const [courseData, setCourseData] = useState({
    courseCode: "",
    nbaCode: "",
    courseType: "",
    module: "",
  })
  const [semesterCourses, setSemesterCourses] = useState<{
    [key: string]: any[]
  }>({
    "3": [],
    "5": [],
    "7": [],
  })
  const [completedSemesters, setCompletedSemesters] = useState<string[]>([])

  const modules = ["Module A", "Module B", "Module C", "Module D", "Module E"]
  const courseTypes = ["BSC", "ESC", "PCC", "OEC"]
  const schemes = ["2015 Scheme", "2017 Scheme", "2018 Scheme", "Other"]

  const getSchemePrefix = (scheme: string, semester: string) => {
    const prefixes: { [key: string]: { [key: string]: string } } = {
      "2015 Scheme": { "3": "15", "5": "15", "7": "15" },
      "2017 Scheme": { "3": "17", "5": "17", "7": "17" },
      "2018 Scheme": { "3": "18", "5": "18", "7": "18" },
      Other: { "3": "XX", "5": "XX", "7": "XX" },
    }
    return prefixes[scheme]?.[semester] || ""
  }

  const handleAddCourse = () => {
    if (
      currentSemester &&
      scheme &&
      courseData.courseCode &&
      courseData.nbaCode &&
      courseData.courseType &&
      courseData.module
    ) {
      const newCourse = {
        id: Date.now(),
        courseCode: courseData.courseCode,
        nbaCode: courseData.nbaCode,
        courseType: courseData.courseType,
        module: courseData.module,
        scheme: scheme,
      }

      setSemesterCourses({
        ...semesterCourses,
        [currentSemester]: [...(semesterCourses[currentSemester] || []), newCourse],
      })

      setCourseData({ courseCode: "", nbaCode: "", courseType: "", module: "" })
    }
  }

  const handleSubmitSemester = () => {
    if (semesterCourses[currentSemester]?.length > 0) {
      setCompletedSemesters([...completedSemesters, currentSemester])
      setCurrentSemester("")
      setCourseData({ courseCode: "", nbaCode: "", courseType: "", module: "" })
    }
  }

  const canSelectSemester = (semester: string) => {
    const semesterOrder = ["3", "5", "7"]
    const currentIndex = semesterOrder.indexOf(semester)
    if (currentIndex === 0) return true
    return completedSemesters.includes(semesterOrder[currentIndex - 1])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Odd Semester Course Entry</h1>
              <p className="text-sm text-gray-600">Enter courses for semesters 3, 5, and 7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Semester Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Semester</CardTitle>
            <CardDescription>Choose a semester to enter courses (complete in order: 3 → 5 → 7)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {["3", "5", "7"].map((sem) => {
                const isCompleted = completedSemesters.includes(sem)
                const isLocked = !canSelectSemester(sem)
                return (
                  <Button
                    key={sem}
                    onClick={() => !isLocked && !isCompleted && setCurrentSemester(sem)}
                    disabled={isLocked}
                    className={`h-20 flex flex-col items-center justify-center ${
                      currentSemester === sem
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : isCompleted
                          ? "bg-green-100 hover:bg-green-100 text-green-800"
                          : isLocked
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white border-2 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-xl font-bold">Semester {sem}</span>
                    {isCompleted && <CheckCircle className="w-4 h-4 mt-1" />}
                    {isLocked && <Lock className="w-4 h-4 mt-1" />}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Course Entry Form */}
        {currentSemester && !completedSemesters.includes(currentSemester) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add Course - Semester {currentSemester}</CardTitle>
              <CardDescription>Fill in the course details and select module mapping</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="scheme">Scheme</Label>
                <Select value={scheme} onValueChange={setScheme}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {schemes.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="courseCode">Course Code</Label>
                  <div className="flex gap-2 mt-1">
                    <div className="px-3 py-2 bg-gray-100 rounded border text-sm font-semibold">
                      {scheme ? getSchemePrefix(scheme, currentSemester) : "XX"}
                    </div>
                    <Input
                      id="courseCode"
                      placeholder="e.g., CS32"
                      value={courseData.courseCode}
                      onChange={(e) => setCourseData({ ...courseData, courseCode: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nbaCode">NBA Code</Label>
                  <div className="flex gap-2 mt-1">
                    <div className="px-3 py-2 bg-gray-100 rounded border text-sm font-semibold">C{currentSemester}</div>
                    <Input
                      id="nbaCode"
                      placeholder="e.g., XX"
                      value={courseData.nbaCode}
                      onChange={(e) => setCourseData({ ...courseData, nbaCode: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="courseType">Course Type</Label>
                <Select
                  value={courseData.courseType}
                  onValueChange={(value) => setCourseData({ ...courseData, courseType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Module Mapping</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {modules.map((mod) => (
                    <label
                      key={mod}
                      className="flex items-center gap-2 p-2 border rounded hover:bg-blue-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="module"
                        value={mod}
                        checked={courseData.module === mod}
                        onChange={(e) => setCourseData({ ...courseData, module: e.target.value })}
                      />
                      <span className="text-sm text-gray-700">{mod}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button onClick={handleAddCourse} className="w-full bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Courses Added for Current Semester */}
        {currentSemester && semesterCourses[currentSemester]?.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Courses Added - Semester {currentSemester}</CardTitle>
              <CardDescription>Total: {semesterCourses[currentSemester]?.length} courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {semesterCourses[currentSemester]?.map((course) => (
                  <div key={course.id} className="p-3 border rounded bg-gray-50">
                    <h4 className="font-semibold text-gray-800">
                      {getSchemePrefix(course.scheme, currentSemester)}
                      {course.courseCode}
                    </h4>
                    <p className="text-sm text-gray-600">
                      NBA: C{currentSemester}
                      {course.nbaCode} | Type: {course.courseType} | Module: {course.module}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        {currentSemester && semesterCourses[currentSemester]?.length > 0 && (
          <Card className="mb-8 p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-800 mb-4">
              All courses for Semester {currentSemester} are ready. Submit to lock and proceed to next semester.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentSemester("")}>
                Continue Adding
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmitSemester}>
                Submit Semester {currentSemester}
              </Button>
            </div>
          </Card>
        )}

        {/* Completed Semesters Summary */}
        {completedSemesters.length > 0 && (
          <Card className="mb-8 p-4 bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Completed Semesters:</h3>
            <div className="flex gap-2">
              {completedSemesters.map((sem) => (
                <span key={sem} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                  Semester {sem} ✓
                </span>
              ))}
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/hod-dashboard/academic-info/even-semester-entry")}
            disabled={completedSemesters.length === 0}
          >
            Proceed to Even Semesters →
          </Button>
        </div>
      </div>
    </div>
  )
}
