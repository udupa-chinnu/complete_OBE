"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FacultyPersonalForm } from "@/components/faculty-personal-form"
import { FacultyQualificationForm } from "@/components/faculty-qualification-form"
import { FacultyAdditionalForm } from "@/components/faculty-additional-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { facultiesApi } from "@/lib/api"

export default function EditFacultyPage() {
  const router = useRouter()
  const params = useParams()
  const facultyId = params.id as string
  const [activeTab, setActiveTab] = useState("personal")
  const [loading, setLoading] = useState(true)
  const [faculty, setFaculty] = useState<any>(null)
  const [formData, setFormData] = useState({
    personal: {},
    qualification: {},
    additional: {},
  })

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await facultiesApi.getById(parseInt(facultyId))
        if (response.success && response.data) {
          setFaculty(response.data)
          // Pre-populate form data - map API response to form format
          const data = response.data
          setFormData({
            personal: {
              ...data,
              // Map snake_case to camelCase for personal form
              dateOfBirth: data.date_of_birth || "",
              permanentAddress: data.permanent_address || "",
              currentAddress: data.current_address || "",
              residenceNumber: data.residence_number || "",
              personalEmail: data.personal_email || "",
              officialEmail: data.official_email || "",
              bloodGroup: data.blood_group || "",
              appointmentLetterNumber: data.appointment_letter_number || "",
              appointmentDate: data.appointment_date || "",
              parentDepartment: data.parent_department || "",
              joiningDate: data.joining_date || "",
              designationDate: data.designation_date || "",
              associateType: data.associate_type || "",
              currentlyAssociated: data.currently_associated || "",
              appointedTo: data.appointed_to || "",
              academicExperience: data.academic_experience?.toString() || "",
              researchExperience: data.research_experience?.toString() || "",
              industryExperience: data.industry_experience?.toString() || "",
            },
            qualification: { 
              qualifications: data.qualifications || [],
              highestQualification: data.qualifications?.[0]?.degree || "",
              specialization: data.qualifications?.[0]?.specialization || "",
              university: data.qualifications?.[0]?.university || "",
              yearOfCompletion: data.qualifications?.[0]?.year_of_completion?.toString() || "",
            },
            additional: {
              height: data.height || "",
              contactNumber: data.contact_number || "",
              bankAccountNumber: data.bank_account_number || "",
              bankName: data.bank_name || "",
              bankBranch: data.bank_branch || "",
              ifscCode: data.ifsc_code || "",
              pan: data.pan || "",
              aadharNumber: data.aadhar_number || "",
              maritalStatus: data.marital_status || "Unmarried",
              spouseName: data.spouse_name || "",
              uan: data.uan || "",
              googleScholar: data.google_scholar || "",
              scopusId: data.scopus_id || "",
              orcId: data.orcid || "",
              preExistingAilments: data.pre_existing_ailments || "",
            },
          })
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
          } else if (typeof completeData[key] === 'object' && !(completeData[key] instanceof File)) {
            formDataToSend.append(key, JSON.stringify(completeData[key]))
          } else {
            formDataToSend.append(key, completeData[key])
          }
        }
      })

      const response = await facultiesApi.update(parseInt(facultyId), formDataToSend)
      
      if (response.success) {
        router.push("/admin/faculty")
      } else {
        alert(response.message || "Failed to update faculty")
      }
    } catch (error) {
      console.error("Error updating faculty:", error)
      alert("Failed to update faculty. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading faculty data...</p>
        </div>
      </div>
    )
  }

  if (!faculty) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Faculty not found</p>
          <Button asChild className="mt-4">
            <Link href="/admin/faculty">Back to Faculty List</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/faculty">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Faculty</h1>
          <p className="text-muted-foreground">Update faculty member information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Faculty Information</CardTitle>
          <CardDescription>Update the information about the faculty member</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="qualification">Qualifications</TabsTrigger>
              <TabsTrigger value="additional">Additional Details</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <FacultyPersonalForm faculty={faculty} initialData={formData.personal} onSubmit={handlePersonalSubmit} />
            </TabsContent>
            <TabsContent value="qualification">
              <FacultyQualificationForm 
                initialData={formData.qualification}
                onSubmit={handleQualificationSubmit} 
              />
            </TabsContent>
            <TabsContent value="additional">
              <FacultyAdditionalForm faculty={faculty} initialData={formData.additional} onSubmit={handleAdditionalSubmit} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

