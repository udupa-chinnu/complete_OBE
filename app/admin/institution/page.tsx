"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InstitutionBasicForm } from "@/components/institution-basic-form"
import { InstitutionContactForm } from "@/components/institution-contact-form"
import { InstitutionGovernanceForm } from "@/components/institution-governance-form"
import { InstitutionAcademicForm } from "@/components/institution-academic-form"
import { InstitutionInfrastructureForm } from "@/components/institution-infrastructure-form"
import { InstitutionRecognitionsForm } from "@/components/institution-recognitions-form"
import { InstitutionMiscellaneousForm } from "@/components/institution-miscellaneous-form"
import { institutionApi } from "@/lib/api"

export default function InstitutionPage() {
  const [institutionData, setInstitutionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("basic")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchInstitutionData()
  }, [])

  const fetchInstitutionData = async () => {
    try {
      setLoading(true)
      const response = await institutionApi.get()
      if (response.success && response.data) {
        // Transform API data to match form structure
        const data: any = response.data
        setInstitutionData({
          // Basic Info
          name: data.name || "",
          code: data.code || "",
          establishmentYear: data.establishment_year?.toString() || "",
          instituteType: data.institute_type || "",
          affiliationType: data.affiliation_type || "",
          affiliatedUniversity: data.affiliated_university || "",
          instituteCategory: data.institute_category || "",
          accreditationStatus: data.accreditation_status || "",
          naacGrade: data.naac_grade || "",
          nbaAccreditedPrograms: data.nba_accredited_programs || "",
          logo: data.logo_path || "",

          // Contact & Location
          addressLine1: data.contact?.address_line1 || "",
          addressLine2: data.contact?.address_line2 || "",
          city: data.contact?.city || "",
          district: data.contact?.district || "",
          state: data.contact?.state || "",
          country: data.contact?.country || "",
          pincode: data.contact?.pincode || "",
          officialEmail: data.contact?.official_email || "",
          officialContact: data.contact?.official_contact || "",
          website: data.contact?.website || "",
          locationCoordinates: data.contact?.location_coordinates || "",

          // Governance
          headOfInstitution: data.governance?.head_of_institution || "",
          headDesignation: data.governance?.head_designation || "",
          headEmail: data.governance?.head_email || "",
          headPhone: data.governance?.head_phone || "",
          governingBodyExists: data.governance?.governing_body_exists || "Yes",
          governingBodyMembers: data.governance?.governing_body_members || "",
          trustName: data.governance?.trust_name || "",
          registrationNumber: data.governance?.registration_number || "",
          trustRegistrationDate: data.governance?.trust_registration_date || "",

          // Academic Info
          ugPrograms: data.academic?.ug_programs?.toString() || "",
          pgPrograms: data.academic?.pg_programs?.toString() || "",
          phdPrograms: data.academic?.phd_programs?.toString() || "",
          totalDepartments: data.academic?.total_departments?.toString() || "",
          facultyStrength: data.academic?.faculty_strength?.toString() || "",
          studentIntake: data.academic?.student_intake?.toString() || "",
          academicCalendarAvailable: data.academic?.academic_calendar_available || "Yes",
          examinationSystem: data.academic?.examination_system || "",
          mediumOfInstruction: data.academic?.medium_of_instruction || "English",

          // Infrastructure
          campusArea: data.infrastructure?.campus_area?.toString() || "",
          builtUpArea: data.infrastructure?.built_up_area?.toString() || "",
          classrooms: data.infrastructure?.classrooms?.toString() || "",
          labs: data.infrastructure?.labs?.toString() || "",
          libraryAvailable: data.infrastructure?.library_available || "Yes",
          internetBandwidth: data.infrastructure?.internet_bandwidth?.toString() || "",
          wifiEnabled: data.infrastructure?.wifi_enabled || "Yes",
          hostelAvailable: data.infrastructure?.hostel_available || "No",
          transportAvailable: data.infrastructure?.transport_available || "No",
          busesCount: data.infrastructure?.buses_count?.toString() || "",

          // Recognitions
          ugcRecognitionDate: data.recognitions?.ugc_recognition_date || "",
          aicteApprovalYear: data.recognitions?.aicte_approval_year?.toString() || "",
          nbaAccreditationDetails: data.recognitions?.nba_accreditation_details || "",
          naacAccreditationDetails: data.recognitions?.naac_accreditation_details || "",
          isoCertification: data.recognitions?.iso_certification || "",
          otherAwards: data.recognitions?.other_awards || "",

          // Miscellaneous
          vision: data.miscellaneous?.vision || "",
          mission: data.miscellaneous?.mission || "",
          coreValues: data.miscellaneous?.core_values || "",
          collegeAnthem: data.miscellaneous?.college_anthem || "",
          notableAlumni: data.miscellaneous?.notable_alumni || "",
          socialMediaLinks: data.miscellaneous?.social_media_links || "",
        })
      } else {
        // Initialize with empty data if no institution exists
        setInstitutionData({
          name: "", code: "", establishmentYear: "", instituteType: "", affiliationType: "",
          affiliatedUniversity: "", instituteCategory: "", accreditationStatus: "", naacGrade: "",
          nbaAccreditedPrograms: "", logo: "",
          addressLine1: "", addressLine2: "", city: "", district: "", state: "", country: "India",
          pincode: "", officialEmail: "", officialContact: "", website: "", locationCoordinates: "",
          headOfInstitution: "", headDesignation: "", headEmail: "", headPhone: "",
          governingBodyExists: "Yes", governingBodyMembers: "", trustName: "",
          registrationNumber: "", trustRegistrationDate: "",
          ugPrograms: "", pgPrograms: "", phdPrograms: "", totalDepartments: "",
          facultyStrength: "", studentIntake: "", academicCalendarAvailable: "Yes",
          examinationSystem: "", mediumOfInstruction: "English",
          campusArea: "", builtUpArea: "", classrooms: "", labs: "", libraryAvailable: "Yes",
          internetBandwidth: "", wifiEnabled: "Yes", hostelAvailable: "No",
          transportAvailable: "No", busesCount: "",
          ugcRecognitionDate: "", aicteApprovalYear: "", nbaAccreditationDetails: "",
          naacAccreditationDetails: "", isoCertification: "", otherAwards: "",
          vision: "", mission: "", coreValues: "", collegeAnthem: "",
          notableAlumni: "", socialMediaLinks: "",
        })
      }
    } catch (error) {
      console.error("Error fetching institution data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBasicInfoSubmit = async (data: any) => {
    try {
      const formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (key === 'logo' && data[key] instanceof File) {
          formData.append('logo', data[key])
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key])
        }
      })

      const response = await institutionApi.updateBasic(formData)
      if (response.success) {
        await fetchInstitutionData()
        setIsEditing(false)
      } else {
        alert(response.message || "Failed to save basic information")
      }
    } catch (error) {
      console.error("Error saving basic info:", error)
      alert("Failed to save basic information. Please try again.")
    }
  }

  const handleContactInfoSubmit = async (data: any) => {
    try {
      const response = await institutionApi.updateContact(data)
      if (response.success) {
        await fetchInstitutionData()
        setIsEditing(false)
      } else {
        alert(response.message || "Failed to save contact information")
      }
    } catch (error) {
      console.error("Error saving contact info:", error)
      alert("Failed to save contact information. Please try again.")
    }
  }

  const handleGovernanceInfoSubmit = async (data: any) => {
    try {
      const response = await institutionApi.updateGovernance(data)
      if (response.success) {
        await fetchInstitutionData()
        setIsEditing(false)
      } else {
        alert(response.message || "Failed to save governance information")
      }
    } catch (error) {
      console.error("Error saving governance info:", error)
      alert("Failed to save governance information. Please try again.")
    }
  }

  const handleAcademicInfoSubmit = async (data: any) => {
    try {
      const response = await institutionApi.updateAcademic(data)
      if (response.success) {
        await fetchInstitutionData()
        setIsEditing(false)
      } else {
        alert(response.message || "Failed to save academic information")
      }
    } catch (error) {
      console.error("Error saving academic info:", error)
      alert("Failed to save academic information. Please try again.")
    }
  }

  const handleInfrastructureInfoSubmit = async (data: any) => {
    try {
      const response = await institutionApi.updateInfrastructure(data)
      if (response.success) {
        await fetchInstitutionData()
        setIsEditing(false)
      } else {
        alert(response.message || "Failed to save infrastructure information")
      }
    } catch (error) {
      console.error("Error saving infrastructure info:", error)
      alert("Failed to save infrastructure information. Please try again.")
    }
  }

  const handleRecognitionsInfoSubmit = async (data: any) => {
    try {
      const response = await institutionApi.updateRecognitions(data)
      if (response.success) {
        await fetchInstitutionData()
        setIsEditing(false)
      } else {
        alert(response.message || "Failed to save recognitions information")
      }
    } catch (error) {
      console.error("Error saving recognitions info:", error)
      alert("Failed to save recognitions information. Please try again.")
    }
  }

  const handleMiscellaneousInfoSubmit = async (data: any) => {
    try {
      const response = await institutionApi.updateMiscellaneous(data)
      if (response.success) {
        await fetchInstitutionData()
        setIsEditing(false)
      } else {
        alert(response.message || "Failed to save miscellaneous information")
      }
    } catch (error) {
      console.error("Error saving miscellaneous info:", error)
      alert("Failed to save miscellaneous information. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading institution data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!institutionData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load institution data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Institutional Details</h1>
          <p className="text-muted-foreground">Manage college information, contact details, and infrastructure</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel Editing" : "Edit Information"}</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Institution Information</CardTitle>
          <CardDescription>View and manage detailed information about the institution</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-7">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="recognitions">Recognitions</TabsTrigger>
              <TabsTrigger value="miscellaneous">Miscellaneous</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <InstitutionBasicForm data={institutionData} onSubmit={handleBasicInfoSubmit} isEditing={isEditing} />
            </TabsContent>
            <TabsContent value="contact">
              <InstitutionContactForm data={institutionData} onSubmit={handleContactInfoSubmit} isEditing={isEditing} />
            </TabsContent>
            <TabsContent value="governance">
              <InstitutionGovernanceForm
                data={institutionData}
                onSubmit={handleGovernanceInfoSubmit}
                isEditing={isEditing}
              />
            </TabsContent>
            <TabsContent value="academic">
              <InstitutionAcademicForm
                data={institutionData}
                onSubmit={handleAcademicInfoSubmit}
                isEditing={isEditing}
              />
            </TabsContent>
            <TabsContent value="infrastructure">
              <InstitutionInfrastructureForm
                data={institutionData}
                onSubmit={handleInfrastructureInfoSubmit}
                isEditing={isEditing}
              />
            </TabsContent>
            <TabsContent value="recognitions">
              <InstitutionRecognitionsForm
                data={institutionData}
                onSubmit={handleRecognitionsInfoSubmit}
                isEditing={isEditing}
              />
            </TabsContent>
            <TabsContent value="miscellaneous">
              <InstitutionMiscellaneousForm
                data={institutionData}
                onSubmit={handleMiscellaneousInfoSubmit}
                isEditing={isEditing}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
