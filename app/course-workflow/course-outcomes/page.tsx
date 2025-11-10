"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CourseOutcomesPage() {
  const router = useRouter()
  const [activeView, setActiveView] = useState<string>("")

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleBack = () => {
    router.push("/course-workflow/course-closure-report")
  }

  const handleViewPrevious = () => {
    setActiveView("previous")
  }

  const handleCreateNew = () => {
    setActiveView("create")
  }

  const handleViewCurrent = () => {
    setActiveView("current")
  }

  const handleSaveNext = () => {
    router.push("/course-workflow/curriculum-gap-analysis")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button onClick={handleBack} variant="outline" size="sm">
                ← Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Course Outcomes</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeView && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-blue-600">Course Outcomes Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Button
                  onClick={handleViewPrevious}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-lg font-medium"
                >
                  View Previous Course Outcome
                </Button>
                <Button
                  onClick={handleCreateNew}
                  className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-lg font-medium"
                >
                  Create New Course Outcome
                </Button>
                <Button
                  onClick={handleViewCurrent}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-lg font-medium"
                >
                  View Current Cycle CO
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {activeView === "previous" && <PreviousCourseOutcomes onBack={() => setActiveView("")} />}
        {activeView === "create" && (
          <CreateCourseOutcome onBack={() => setActiveView("")} onSaveNext={handleSaveNext} />
        )}
        {activeView === "current" && <CurrentCourseOutcomes onBack={() => setActiveView("")} />}
      </div>
    </div>
  )
}

function PreviousCourseOutcomes({ onBack }: { onBack: () => void }) {
  const previousCOData = [
    {
      year: "2022",
      data: [
        { coNumber: "C302-1", statement: "S1", level: "CL4" },
        { coNumber: "C302-2", statement: "S2", level: "CL3" },
        { coNumber: "C302-3", statement: "S3", level: "CL2" },
        { coNumber: "C302-4", statement: "S4", level: "CL2" },
        { coNumber: "C302-5", statement: "S5", level: "CL6" },
      ],
    },
    {
      year: "2021",
      data: [
        { coNumber: "C302-1", statement: "S1", level: "CL4" },
        { coNumber: "C302-2", statement: "S2", level: "CL3" },
        { coNumber: "C302-3", statement: "S3", level: "CL2" },
        { coNumber: "C302-4", statement: "S4", level: "CL2" },
        { coNumber: "C302-5", statement: "S5", level: "CL6" },
      ],
    },
    {
      year: "2020",
      data: [
        { coNumber: "C302-1", statement: "S1", level: "CL4" },
        { coNumber: "C302-2", statement: "S2", level: "CL3" },
        { coNumber: "C302-3", statement: "S3", level: "CL2" },
        { coNumber: "C302-4", statement: "S4", level: "CL2" },
        { coNumber: "C302-5", statement: "S5", level: "CL6" },
      ],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-blue-600">Previous Course Outcomes</CardTitle>
          <Button onClick={onBack} variant="outline">
            Back to Options
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {previousCOData.map((yearData, yearIndex) => (
          <div key={yearIndex} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Course Outcome - Year {yearData.year}</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CO Number</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CO Statement</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {yearData.data.map((co, coIndex) => (
                    <tr key={coIndex} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">{co.coNumber}</td>
                      <td className="border border-gray-300 px-4 py-3">{co.statement}</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">{co.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function CreateCourseOutcome({ onBack, onSaveNext }: { onBack: () => void; onSaveNext: () => void }) {
  const [courseOutcomes, setCourseOutcomes] = useState([
    { id: 1, coNumber: "C201-1", statement: "Stat 1", level: "CL3" },
    { id: 2, coNumber: "C201-2", statement: "Stat 2", level: "CL4" },
    { id: 3, coNumber: "C201-3", statement: "Stat 3", level: "CL6" },
  ])

  const [formData, setFormData] = useState({
    coNumber: "",
    statement: "",
    level: "CL1",
  })

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.coNumber && formData.statement) {
      const newCO = {
        id: courseOutcomes.length + 1,
        coNumber: formData.coNumber,
        statement: formData.statement,
        level: formData.level,
      }
      setCourseOutcomes([...courseOutcomes, newCO])
      setFormData({ coNumber: "", statement: "", level: "CL1" })
    }
  }

  const handleEdit = (id: number) => {
    alert(`Edit functionality for CO ${id} would be implemented here`)
  }

  const handleDelete = (id: number) => {
    setCourseOutcomes(courseOutcomes.filter((co) => co.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-green-600">Course Outcomes (COs)</CardTitle>
          <Button onClick={onBack} variant="outline">
            Back to Options
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* CO Input Form */}
        <form onSubmit={handleAdd} className="bg-gray-50 p-6 rounded-lg">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2 pr-4">
                  <label htmlFor="conum" className="font-medium">
                    CO Number:
                  </label>
                </td>
                <td className="py-2">
                  <input
                    type="text"
                    id="conum"
                    value={formData.coNumber}
                    onChange={(e) => setFormData({ ...formData, coNumber: e.target.value })}
                    placeholder="e.g., C201-1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4">
                  <label htmlFor="statement" className="font-medium">
                    CO Statement:
                  </label>
                </td>
                <td className="py-2">
                  <input
                    type="text"
                    id="statement"
                    value={formData.statement}
                    onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                    placeholder="Enter CO Statement"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4">
                  <label htmlFor="bloom" className="font-medium">
                    Bloom's Level:
                  </label>
                </td>
                <td className="py-2">
                  <select
                    id="bloom"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="CL1">CL1</option>
                    <option value="CL2">CL2</option>
                    <option value="CL3">CL3</option>
                    <option value="CL4">CL4</option>
                    <option value="CL6">CL6</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="py-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        {/* CO Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">#</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CO Number</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CO Statement</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bloom's Level</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {courseOutcomes.map((co, index) => (
                <tr key={co.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-3 font-medium">{co.coNumber}</td>
                  <td className="border border-gray-300 px-4 py-3">{co.statement}</td>
                  <td className="border border-gray-300 px-4 py-3 font-medium">{co.level}</td>
                  <td className="border border-gray-300 px-4 py-3">
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(co.id)}
                        size="sm"
                        variant="outline"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(co.id)}
                        size="sm"
                        variant="outline"
                        className="bg-red-500 hover:bg-red-600 text-white border-red-500"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Save & Next Button */}
        <div className="flex justify-center">
          <Button onClick={onSaveNext} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
            Save & Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CurrentCourseOutcomes({ onBack }: { onBack: () => void }) {
  const currentCOData = [
    { coNumber: "C302-1", statement: "Current S1", level: "CL4" },
    { coNumber: "C302-2", statement: "Current S2", level: "CL3" },
    { coNumber: "C302-3", statement: "Current S3", level: "CL2" },
    { coNumber: "C302-4", statement: "Current S4", level: "CL2" },
    { coNumber: "C302-5", statement: "Current S5", level: "CL6" },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-purple-600">Current Cycle Course Outcomes</CardTitle>
          <Button onClick={onBack} variant="outline">
            Back to Options
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CO Number</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">CO Statement</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Level</th>
              </tr>
            </thead>
            <tbody>
              {currentCOData.map((co, coIndex) => (
                <tr key={coIndex} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-medium">{co.coNumber}</td>
                  <td className="border border-gray-300 px-4 py-3">{co.statement}</td>
                  <td className="border border-gray-300 px-4 py-3 font-medium">{co.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
