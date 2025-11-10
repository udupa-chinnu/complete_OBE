"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function StudentPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    const userRole = localStorage.getItem("userRole")

    if (!isLoggedIn || userRole !== "student") {
      router.push("/")
    }
  }, [router])

  return <>{children}</>
}
