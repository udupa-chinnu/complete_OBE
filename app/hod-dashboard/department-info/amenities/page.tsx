"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AmenitiesPage() {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleBackToDepartmentInfo = () => {
    router.push("/hod-dashboard/department-info")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const handleAmenityClick = (amenityName: string) => {
    const route = amenityName.toLowerCase().replace(/\s+/g, "-")
    router.push(`/hod-dashboard/department-info/amenities/${route}`)
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
          <Button onClick={handleBackToDepartmentInfo} variant="outline" size="sm">
            ← Back to Department Info
          </Button>
        </div>

        {/* Amenities Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Amenities</h2>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            onClick={() => handleAmenityClick("Staff Room")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto text-lg font-medium"
          >
            Staff Room
          </Button>
          <Button
            onClick={() => handleAmenityClick("Classroom")}
            className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto text-lg font-medium"
          >
            Classroom
          </Button>
          <Button
            onClick={() => handleAmenityClick("Study Space")}
            className="bg-purple-600 hover:bg-purple-700 text-white p-6 h-auto text-lg font-medium"
          >
            Study Space
          </Button>
          <Button
            onClick={() => handleAmenityClick("Laboratory")}
            className="bg-red-500 hover:bg-red-600 text-white p-6 h-auto text-lg font-medium"
          >
            Laboratory
          </Button>
          <Button
            onClick={() => handleAmenityClick("Library")}
            className="bg-cyan-500 hover:bg-cyan-600 text-white p-6 h-auto text-lg font-medium"
          >
            Library
          </Button>
          <Button
            onClick={() => handleAmenityClick("Any Others")}
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 h-auto text-lg font-medium"
          >
            Any Others
          </Button>
        </div>
      </div>
    </div>
  )
}
