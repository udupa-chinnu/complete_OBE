"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { GraduationCap, Calendar, LogOut, ArrowLeft, Trophy, FileText } from "lucide-react"
import { logout } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"

type ResultRow = {
  id: number;
  course: string;
  code: string;
  cie: [number, number, number];
  total: number;
};

const sampleResults: ResultRow[] = [
  { id: 1, course: "Data Structures", code: "CS201", cie: [18, 20, 17], total: 55 },
  { id: 2, course: "Web Development", code: "CS202", cie: [16, 15, 18], total: 49 },
  { id: 3, course: "Database Systems", code: "CS203", cie: [12, 14, 13], total: 39 },
  { id: 4, course: "Computer Networks", code: "CS204", cie: [20, 19, 18], total: 57 },
  { id: 5, course: "Operating Systems", code: "CS205", cie: [10, 11, 12], total: 33 }, // Example of Not Eligible
];

export default function ViewResultPage({ searchParams }: { searchParams?: { sem?: string } }) {
  const router = useRouter()
  const sem = searchParams?.sem || "1"
  const username = "JOHN"

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  // Calculate eligibility based on average >= 12
  // Average = Total / 3. So if Total < 36, Not Eligible.
  const isEligible = (total: number) => {
    const average = total / 3;
    return average >= 12;
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
            <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">View Results</h1>
          </div>
          <div className="flex items-center gap-2 ml-1 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <p>Semester {sem} • Internal Assessments</p>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <h2 className="font-semibold text-gray-800">Course Breakdown</h2>
                </div>
                <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Minimum Average Required: 12
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Course Name</th>
                            <th className="px-6 py-4">Code</th>
                            <th className="px-6 py-4 text-center">CIE 1</th>
                            <th className="px-6 py-4 text-center">CIE 2</th>
                            <th className="px-6 py-4 text-center">CIE 3</th>
                            <th className="px-6 py-4 text-center">Total</th>
                            <th className="px-6 py-4 text-right">Eligibility</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sampleResults.map((r) => {
                            const eligible = isEligible(r.total);
                            return (
                                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{r.course}</td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                                            {r.code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600">{r.cie[0]}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{r.cie[1]}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{r.cie[2]}</td>
                                    <td className="px-6 py-4 text-center font-bold text-gray-800">{r.total}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Badge 
                                            variant={eligible ? "default" : "destructive"}
                                            className={`${eligible ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-700 hover:bg-red-200"} border-0`}
                                        >
                                            {eligible ? "Eligible" : "Not Eligible"}
                                        </Badge>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 bg-gray-50 text-center text-xs text-gray-500 border-t border-gray-200">
                * Eligibility Criteria: Average score across all CIEs must be at least 12.
            </div>
        </div>
      </div>
    </div>
  )
}