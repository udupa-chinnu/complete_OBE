"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getCurrentUser } from "@/lib/auth"

export default function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check authentication using the auth system
    if (!isAuthenticated()) {
      router.push("/")
      return
    }

    // Verify user type is student
    const user = getCurrentUser()
    if (!user || user.userType !== 'student') {
      router.push("/")
      return
    }
  }, [router])

  return <>{children}</>
}
