"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DepartmentInfoPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleBackToHOD = () => {
    router.push("/hod-dashboard")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const handleModuleClick = (moduleName: string) => {
    const route = moduleName.toLowerCase().replace(/\s+/g, "-")
    router.push(`/hod-dashboard/department-info/${route}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
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
                <span className="font-medium">RITHESH PAKKALA P</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">RP</span>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button onClick={handleBackToHOD} variant="outline" size="sm">
            ← Back to HOD Dashboard
          </Button>
        </div>

        {/* Department Info Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Department Information</h2>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Button
            onClick={() => handleModuleClick("Floor Plan")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-lg font-medium"
          >
            Floor Plan
          </Button>
          <Button
            onClick={() => handleModuleClick("Vision")}
            className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-lg font-medium"
          >
            Vision
          </Button>
          <Button
            onClick={() => handleModuleClick("Mission")}
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-lg font-medium"
          >
            Mission
          </Button>
          <Button
            onClick={() => handleModuleClick("PEO")}
            className="bg-red-500 hover:bg-red-600 text-white p-6 h-auto text-lg font-medium"
          >
            PEO
          </Button>
          <Button
            onClick={() => handleModuleClick("PSO")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 h-auto text-lg font-medium"
          >
            PSO
          </Button>
          <Button
            onClick={() => handleModuleClick("PO")}
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 h-auto text-lg font-medium"
          >
            PO
          </Button>
          <Button
            onClick={() => handleModuleClick("Stakeholder")}
            className="bg-teal-500 hover:bg-teal-600 text-white p-6 h-auto text-lg font-medium"
          >
            Stakeholder
          </Button>
          <Button
            onClick={() => handleModuleClick("Program Offered")}
            className="bg-pink-500 hover:bg-pink-600 text-white p-6 h-auto text-lg font-medium"
          >
            Program Offered
          </Button>
          <Button
            onClick={() => handleModuleClick("Amenities")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white p-6 h-auto text-lg font-medium"
          >
            Amenities
          </Button>
        </div>
      </div>
    </div>
  )
}
