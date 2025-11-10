"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState("")
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    if (role === "faculty") {
      router.push("/faculty-dashboard")
    } else if (role === "hod") {
      router.push("/hod-dashboard")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Fixed for all interfaces */}
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
        {/* Top Navigation Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-500 rounded-lg p-4">
            <Select onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full bg-transparent border-white text-white placeholder:text-white [&>span]:text-white">
                <SelectValue placeholder="Role" className="text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="hod">HOD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 h-auto">Profile</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto">Leave Module</Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white p-4 h-auto">Personal Reports</Button>
        </div>

        {/* Individual Pay Slip */}
        <div className="flex justify-center mb-8">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto">Individual Pay Slip</Button>
        </div>


      </div>
    </div>
  )
}
