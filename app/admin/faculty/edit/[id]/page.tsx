"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { FacultyUnifiedForm } from "@/components/faculty-unified-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { API_BASE_URL } from "@/lib/api"

export default function EditFacultyPage() {
  const router = useRouter()
  const params = useParams()
  const facultyId = params.id as string
  const [loading, setLoading] = useState(true)
  const [faculty, setFaculty] = useState<any>(null)

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/faculties/${facultyId}`)
        const json = await response.json()
        if (json.success && json.data) {
          setFaculty(json.data)
        } else {
          router.push("/admin/faculty")
        }
      } catch (error) {
        console.error("Error fetching faculty:", error)
        router.push("/admin/faculty")
      } finally {
        setLoading(false)
      }
    }

    if (facultyId) {
      fetchFaculty()
    }
  }, [facultyId, router])

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/faculties/${facultyId}`, {
        method: 'PUT',
        body: formData
      })
      const json = await response.json()
      
      if (json.success) {
        alert('Faculty updated successfully!')
        router.push('/admin/faculty')
      } else {
        alert('Error: ' + (json.message || 'Failed to update faculty'))
      }
    } catch (error) {
      console.error('Error updating faculty:', error)
      alert('Error updating faculty. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading faculty details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/faculty">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Faculty</h1>
          <p className="text-muted-foreground">Update faculty information and qualifications</p>
        </div>
      </div>
      {faculty && <FacultyUnifiedForm initialData={faculty} onSubmit={handleSubmit} isEditing={true} />}
    </div>
  )
}


