"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function ProgressReportPage() {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState("1")

  // Complete CGPA Data for all 8 semesters
  const allCGPAData = [
    { semester: "1", gpa: 7.5 },
    { semester: "2", gpa: 7.8 },
    { semester: "3", gpa: 8.0 },
    { semester: "4", gpa: 8.2 },
    { semester: "5", gpa: 8.3 },
    { semester: "6", gpa: 8.4 },
    { semester: "7", gpa: 8.5 },
    // { semester: "8", gpa: 8.6 },
  ]

  // Filter CGPA data based on selected year
  const getCGPADataForYear = (year: string) => {
    const yearNum = Number.parseInt(year)
    const endSemester = yearNum * 2
    return allCGPAData.slice(0, endSemester)
  }

  // PO Attainment Data for each semester
  const poData: Record<string, Array<{ name: string; attainment: number }>> = {
    "1": [
      { name: "PO1", attainment: 2 },
      { name: "PO2", attainment: 2 },
      { name: "PO3", attainment: 1 },
      { name: "PO4", attainment: 2 },
      { name: "PO5", attainment: 2 },
      { name: "PO6", attainment: 1 },
      { name: "PO7", attainment: 2 },
      { name: "PO8", attainment: 2 },
      { name: "PO9", attainment: 1 },
      { name: "PO10", attainment: 2 },
      { name: "PO11", attainment: 2 },
      { name: "PO12", attainment: 1 },
      { name: "PSO1", attainment: 2 },
      { name: "PSO2", attainment: 2 },
      { name: "PSO3", attainment: 2 },
      { name: "PSO4", attainment: 1 },
      { name: "PSO5", attainment: 2 },
    ],
    "2": [
      { name: "PO1", attainment: 2 },
      { name: "PO2", attainment: 2 },
      { name: "PO3", attainment: 2 },
      { name: "PO4", attainment: 2 },
      { name: "PO5", attainment: 2 },
      { name: "PO6", attainment: 2 },
      { name: "PO7", attainment: 2 },
      { name: "PO8", attainment: 2 },
      { name: "PO9", attainment: 2 },
      { name: "PO10", attainment: 2 },
      { name: "PO11", attainment: 2 },
      { name: "PO12", attainment: 1 },
      { name: "PSO1", attainment: 2 },
      { name: "PSO2", attainment: 2 },
      { name: "PSO3", attainment: 2 },
      { name: "PSO4", attainment: 2 },
      { name: "PSO5", attainment: 2 },
    ],
    "3": [
      { name: "PO1", attainment: 3 },
      { name: "PO2", attainment: 2 },
      { name: "PO3", attainment: 2 },
      { name: "PO4", attainment: 3 },
      { name: "PO5", attainment: 2 },
      { name: "PO6", attainment: 2 },
      { name: "PO7", attainment: 3 },
      { name: "PO8", attainment: 2 },
      { name: "PO9", attainment: 2 },
      { name: "PO10", attainment: 3 },
      { name: "PO11", attainment: 2 },
      { name: "PO12", attainment: 2 },
      { name: "PSO1", attainment: 3 },
      { name: "PSO2", attainment: 2 },
      { name: "PSO3", attainment: 3 },
      { name: "PSO4", attainment: 2 },
      { name: "PSO5", attainment: 2 },
    ],
    "4": [
      { name: "PO1", attainment: 3 },
      { name: "PO2", attainment: 3 },
      { name: "PO3", attainment: 2 },
      { name: "PO4", attainment: 3 },
      { name: "PO5", attainment: 3 },
      { name: "PO6", attainment: 2 },
      { name: "PO7", attainment: 3 },
      { name: "PO8", attainment: 3 },
      { name: "PO9", attainment: 2 },
      { name: "PO10", attainment: 3 },
      { name: "PO11", attainment: 3 },
      { name: "PO12", attainment: 2 },
      { name: "PSO1", attainment: 3 },
      { name: "PSO2", attainment: 3 },
      { name: "PSO3", attainment: 3 },
      { name: "PSO4", attainment: 2 },
      { name: "PSO5", attainment: 3 },
    ],
  }

  const currentCGPAData = getCGPADataForYear(selectedYear)
  const currentPOData = poData[selectedYear]

  const getYearDescription = (year: string) => {
    const yearNum = Number.parseInt(year)
    const startSem = (yearNum - 1) * 2 + 1
    const endSem = yearNum * 2
    return `Year ${yearNum} (Semesters ${startSem}-${endSem})`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Progress Report</h1>
              <p className="text-sm text-gray-600">Track your academic performance and PO attainment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Year Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Academic Year</CardTitle>
            <CardDescription>Choose the year to view cumulative progress through that year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["1", "2", "3", "4"].map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedYear === year
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <p className="font-semibold text-gray-800">Year {year}</p>
                  <p className="text-sm text-gray-600">
                    Sem {(Number.parseInt(year) - 1) * 2 + 1}-{Number.parseInt(year) * 2}
                  </p>
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Selected: <span className="font-semibold">{getYearDescription(selectedYear)}</span>
            </p>
          </CardContent>
        </Card>

        {/* CGPA Graph */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              CGPA Progression
            </CardTitle>
            <CardDescription>
              Cumulative Grade Point Average from Semester 1 to Semester {Number.parseInt(selectedYear) * 2}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentCGPAData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="semester"
                    label={{ value: "Semester", position: "insideBottomRight", offset: -5 }}
                    stroke="#6b7280"
                  />
                  <YAxis
                    domain={[5, 10]}
                    label={{ value: "GPA (5-10)", angle: -90, position: "insideLeft" }}
                    stroke="#6b7280"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value) => (typeof value === "number" ? value.toFixed(2) : value)}
                    labelFormatter={(label) => `Semester ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="gpa"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: "#2563eb", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Grade Point Average"
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Average GPA</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(currentCGPAData.reduce((sum, item) => sum + item.gpa, 0) / currentCGPAData.length).toFixed(2)}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Highest GPA</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.max(...currentCGPAData.map((item) => item.gpa)).toFixed(2)}
                </p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Lowest GPA</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.min(...currentCGPAData.map((item) => item.gpa)).toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PO Attainment Graph */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              PO & PSO Attainment
            </CardTitle>
            <CardDescription>
              Program Outcomes (PO 1-12) and Program Specific Outcomes (PSO 1-5) attainment levels for{" "}
              {getYearDescription(selectedYear)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentPOData} margin={{ top: 5, right: 30, left: 0, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis
                    domain={[0, 3]}
                    label={{ value: "Attainment Level (1-3)", angle: -90, position: "insideLeft" }}
                    stroke="#6b7280"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f3f4f6",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value) => `Level ${value}`}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="attainment"
                    fill="#10b981"
                    name="Attainment Level"
                    radius={[8, 8, 0, 0]}
                    isAnimationActive={true}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* PO Summary */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Program Outcomes (PO)</p>
                <div className="space-y-1">
                  {[
                    { level: 1, count: currentPOData.slice(0, 12).filter((po) => po.attainment === 1).length },
                    { level: 2, count: currentPOData.slice(0, 12).filter((po) => po.attainment === 2).length },
                    { level: 3, count: currentPOData.slice(0, 12).filter((po) => po.attainment === 3).length },
                  ].map((item) => (
                    <p key={item.level} className="text-sm text-gray-600">
                      Level {item.level}: <span className="font-semibold">{item.count}/12</span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-gray-700">Program Specific Outcomes (PSO)</p>
                <div className="space-y-1">
                  {[
                    { level: 1, count: currentPOData.slice(12).filter((pso) => pso.attainment === 1).length },
                    { level: 2, count: currentPOData.slice(12).filter((pso) => pso.attainment === 2).length },
                    { level: 3, count: currentPOData.slice(12).filter((pso) => pso.attainment === 3).length },
                  ].map((item) => (
                    <p key={item.level} className="text-sm text-gray-600">
                      Level {item.level}: <span className="font-semibold">{item.count}/5</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
