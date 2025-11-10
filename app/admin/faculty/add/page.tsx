"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacultyPersonalForm } from "@/components/faculty-personal-form"
import { FacultyQualificationForm } from "@/components/faculty-qualification-form"
import { FacultyAdditionalForm } from "@/components/faculty-additional-form"

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

  const handleAdditionalSubmit = (data: any) => {
    setFormData((prev) => ({ ...prev, additional: data }))

    // In a real application, you would submit the complete form data to your backend
    console.log("Complete faculty data:", { ...formData.personal, ...formData.qualification, ...data })

    // Redirect to faculty list page
    router.push("/admin/faculty")
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
              <FacultyPersonalForm onSubmit={handlePersonalSubmit} />
            </TabsContent>
            <TabsContent value="qualification">
              <FacultyQualificationForm onSubmit={handleQualificationSubmit} />
            </TabsContent>
            <TabsContent value="additional">
              <FacultyAdditionalForm onSubmit={handleAdditionalSubmit} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
