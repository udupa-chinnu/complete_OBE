"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FacultyUnifiedForm } from "@/components/faculty-unified-form"
import { API_BASE_URL } from "@/lib/api"

export default function AddFacultyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/faculties`, {
        method: 'POST',
        body: formData
      })
      const json = await response.json()
      
      if (json.success) {
        alert('Faculty created successfully! Default password: faculty123')
        router.push('/admin/faculty')
      } else {
        alert('Error: ' + (json.message || 'Failed to create faculty'))
      }
    } catch (error) {
      console.error('Error creating faculty:', error)
      alert('Error creating faculty. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Faculty</h1>
        <p className="text-muted-foreground">Create a new faculty member with all details.</p>
      </div>
      <FacultyUnifiedForm onSubmit={handleSubmit} isEditing={false} />
    </div>
  )
}
