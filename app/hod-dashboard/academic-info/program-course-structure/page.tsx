"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function ProgramCourseStructurePage() {
  const router = useRouter()
  const [courseDistribution, setCourseDistribution] = useState({
    semester1: "",
    semester2: "",
    semester3: "",
    semester4: "",
    semester5: "",
    semester6: "",
    semester7: "",
    semester8: "",
  })
  const [selectedCycle, setSelectedCycle] = useState("")
  const [cycleType, setCycleType] = useState("")

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
              <h1 className="text-2xl font-bold text-gray-800">Program & Course Structure</h1>
              <p className="text-sm text-gray-600">Define program structure and course distribution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Number of Courses per Semester</CardTitle>
            <CardDescription>Enter the total number of courses in each semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <div key={sem}>
                  <Label htmlFor={`sem${sem}`}>Semester {sem}</Label>
                  <Input
                    id={`sem${sem}`}
                    type="number"
                    placeholder="e.g., 6"
                    value={courseDistribution[`semester${sem}` as keyof typeof courseDistribution]}
                    onChange={(e) =>
                      setCourseDistribution({
                        ...courseDistribution,
                        [`semester${sem}`]: e.target.value,
                      })
                    }
                    className="mt-1"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cycle Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Cycle</CardTitle>
            <CardDescription>Choose the cycle type for your program</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Cycle Type</Label>
              <div className="space-y-3 mt-2">
                <label className="flex items-center gap-2 cursor-pointer p-3 border rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    name="cycleType"
                    value="firstYear"
                    checked={selectedCycle === "firstYear"}
                    onChange={(e) => {
                      setSelectedCycle(e.target.value)
                      setCycleType("")
                    }}
                  />
                  <span className="text-gray-700 font-medium">1st Year (Physics/Chemistry)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer p-3 border rounded hover:bg-gray-50">
                  <input
                    type="radio"
                    name="cycleType"
                    value="higherYear"
                    checked={selectedCycle === "higherYear"}
                    onChange={(e) => {
                      setSelectedCycle(e.target.value)
                      setCycleType("")
                    }}
                  />
                  <span className="text-gray-700 font-medium">Higher Years (Odd/Even)</span>
                </label>
              </div>
            </div>

            {selectedCycle === "firstYear" && (
              <div className="p-4 border rounded bg-blue-50">
                <Label>Select Specialization</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="firstYearType"
                      value="physics"
                      checked={cycleType === "physics"}
                      onChange={(e) => setCycleType(e.target.value)}
                    />
                    <span className="text-gray-700">Physics</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="firstYearType"
                      value="chemistry"
                      checked={cycleType === "chemistry"}
                      onChange={(e) => setCycleType(e.target.value)}
                    />
                    <span className="text-gray-700">Chemistry</span>
                  </label>
                </div>
              </div>
            )}

            {selectedCycle === "higherYear" && (
              <div className="p-4 border rounded bg-green-50">
                <Label>Select Semester Type</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="higherYearType"
                      value="odd"
                      checked={cycleType === "odd"}
                      onChange={(e) => setCycleType(e.target.value)}
                    />
                    <span className="text-gray-700">Odd (3, 5, 7)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="higherYearType"
                      value="even"
                      checked={cycleType === "even"}
                      onChange={(e) => setCycleType(e.target.value)}
                    />
                    <span className="text-gray-700">Even (4, 6, 8)</span>
                  </label>
                </div>
              </div>
            )}

            {cycleType && (
              <div className="p-4 bg-green-100 border border-green-300 rounded text-green-800 text-sm">
                ✓ Cycle configuration: {selectedCycle === "firstYear" ? "1st Year" : "Higher Years"} -{" "}
                {cycleType.toUpperCase()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation to Semester Entry */}
        {cycleType && (
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-800 mb-4">
              Next, proceed to enter course details for your selected cycle type.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.back()}>
                Back
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  if (cycleType === "odd" || selectedCycle === "firstYear") {
                    router.push("/hod-dashboard/academic-info/odd-semester-entry")
                  } else {
                    router.push("/hod-dashboard/academic-info/even-semester-entry")
                  }
                }}
              >
                Proceed to Semester Entry →
              </Button>
            </div>
          </Card>
        )}

        {!cycleType && (
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button disabled className="bg-gray-400">
              Complete cycle selection first
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
