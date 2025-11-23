"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacultyPersonalForm } from "@/components/faculty-personal-form"
import { FacultyQualificationForm } from "@/components/faculty-qualification-form"
import { FacultyAdditionalForm } from "@/components/faculty-additional-form"
import { facultiesApi } from "@/lib/api"

export default function AddFacultyPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    personal: {},
    qualification: {},
    additional: {},
  })

  const handlePersonalSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, personal: data }))
    setActiveTab("qualification")
  }

  const handleQualificationSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, qualification: data }))
    setActiveTab("additional")
  }

  const handleAdditionalSubmit = async (data: any) => {
    try {
      const completeData = { ...formData.personal, ...formData.qualification, ...data }
      
      // Create FormData for file upload
      const formDataToSend = new FormData()
      Object.keys(completeData).forEach((key) => {
        if (completeData[key] !== null && completeData[key] !== undefined) {
          if (key === 'profilePhoto' && completeData[key] instanceof File) {
            formDataToSend.append('profilePhoto', completeData[key])
          } else if (key === 'publications' || key === 'researchProjects' || key === 'certifications') {
            // Handle arrays
            formDataToSend.append(key, JSON.stringify(completeData[key]))
          } else if (typeof completeData[key] === 'object' && !(completeData[key] instanceof File)) {
            formDataToSend.append(key, JSON.stringify(completeData[key]))
          } else {
            formDataToSend.append(key, completeData[key])
          }
        }
      })

      const response = await facultiesApi.create(formDataToSend)
      
      if (response.success) {
        router.push("/admin/faculty")
      } else {
        alert(response.message || "Failed to create faculty")
      }
    } catch (error) {
      console.error("Error creating faculty:", error)
      alert("Failed to create faculty. Please try again.")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Faculty</h1>
        <p className="text-muted-foreground">Add a new faculty member to the system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculty Information</CardTitle>
          <CardDescription>Please fill in all the required information about the faculty member</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="qualification">Qualifications</TabsTrigger>
              <TabsTrigger value="additional">Additional Details</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <FacultyPersonalForm onSubmit={handlePersonalSubmit} initialData={formData.personal} />
            </TabsContent>
            <TabsContent value="qualification">
              <FacultyQualificationForm onSubmit={handleQualificationSubmit} initialData={formData.qualification} />
            </TabsContent>
            <TabsContent value="additional">
              <FacultyAdditionalForm onSubmit={handleAdditionalSubmit} initialData={formData.additional} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
