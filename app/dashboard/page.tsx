"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { getCurrentUser, getAvailableRoles, logout, isAuthenticated } from "@/lib/auth"

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState("")
  const [user, setUser] = useState<any>(null)
  const [availableRoles, setAvailableRoles] = useState<Array<'faculty' | 'hod'>>([])
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push("/")
      return
    }

    // Get current user
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }

    setUser(currentUser)

    // Get available roles
    const roles = getAvailableRoles()
    setAvailableRoles(roles)
    
    // Debug: Log roles to console
    console.log('Available roles:', roles)
    console.log('User data:', currentUser)
    console.log('User roles array:', currentUser?.roles)

    // Don't auto-select role - let user choose from dropdown
    // Only set if there's exactly one role (shouldn't happen, but safety check)
    if (roles.length === 1) {
      setSelectedRole(roles[0])
    }
  }, [router])

  const handleRoleChange = (role: string) => {
    if (!role || role === "no-roles") return
    
    setSelectedRole(role)
    
    // Navigate immediately when role is selected
    if (role === "faculty") {
      router.push("/faculty-dashboard")
    } else if (role === "hod") {
      router.push("/hod-dashboard")
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
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
                <span className="font-medium">
                  {user.facultyInfo 
                    ? `${user.facultyInfo.first_name || ''} ${user.facultyInfo.last_name || ''}`.trim() || user.username
                    : user.username}
                </span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">
                    {user.facultyInfo 
                      ? `${user.facultyInfo.first_name?.[0] || ''}${user.facultyInfo.last_name?.[0] || ''}`.toUpperCase() || user.username[0].toUpperCase()
                      : user.username[0].toUpperCase()}
                  </span>
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
            <Select value={selectedRole || ""} onValueChange={handleRoleChange}>
              <SelectTrigger className="w-full bg-transparent border-white text-white placeholder:text-white [&>span]:text-white">
                <SelectValue placeholder="Select Role" className="text-white" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.length > 0 ? (
                  availableRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role === 'faculty' ? 'Faculty' : 'HOD'}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-roles" disabled>No roles available</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-white p-4 h-auto">Profile</Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white p-4 h-auto">Personal Reports</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto">Individual Pay Slip</Button>
        </div>

        
      </div>
    </div>
  )
}
