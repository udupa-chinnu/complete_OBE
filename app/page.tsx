"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simple validation
    if (!username || !password) {
      setError("Please enter both username and password")
      setIsLoading(false)
      return
    }

    // Store login info
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("username", username)
    localStorage.setItem("password", password)

    // Role-based redirection based on username prefix
    if (username.toLowerCase().startsWith("adm")) {
      // Redirect to admin portal
      router.push("/admin/dashboard")
    } else if (username.toUpperCase().startsWith("FA")) {
      // Redirect to faculty portal
      localStorage.setItem("userRole", "faculty")
      router.push("/dashboard")
    } else if (username.toLowerCase().startsWith("acad")) {
      // Redirect to academic portal
      router.push("/academicSWO")
    } else if (username.toLowerCase().startsWith("4sf")) {
      // Redirect to student portal
      localStorage.setItem("userRole", "student")
      router.push("/student-portal")
    } else {
      setError("Invalid username prefix. Please check your username.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Digital Campus</CardTitle>
          <CardDescription>Multi-Role Login Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                Prefix: adm (Admin) | FA (Faculty) | acad (Academic) | 4sf (Student)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-gray-700">
            <p className="font-semibold mb-2">Demo Credentials:</p>
            <p>• Admin: adm123 / pass123</p>
            <p>• Faculty: FA001 / pass123</p>
            <p>• Academic: acad001 / pass123</p>
            <p>• Student: 4sf001 / pass123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
