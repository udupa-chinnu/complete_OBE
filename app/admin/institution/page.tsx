"use client"

import { useState } from "react"
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

// Sample institution data
const initialInstitutionData = {
  // Basic Info
  name: "Sahyadri College of Engineering and Management",
  code: "SCEM-001",
  establishmentYear: "2007",
  instituteType: "Private",
  affiliationType: "Affiliated",
  affiliatedUniversity: "Visvesvaraya Technological University",
  instituteCategory: "Engineering",
  accreditationStatus: "NBA",
  naacGrade: "A+",
  nbaAccreditedPrograms: "Computer Science Engineering, Information Science Engineering, Electronics & Communication",
  logo: "college-logo.png",

  // Contact & Location
  addressLine1: "Sahyadri Campus, Adyar",
  addressLine2: "Mangalore",
  city: "Mangalore",
  district: "Dakshina Kannada",
  state: "Karnataka",
  country: "India",
  pincode: "575007",
  officialEmail: "info@sahyadri.edu.in",
  officialContact: "0824-2277222",
  website: "https://sahyadri.edu.in",
  locationCoordinates: "12.8698° N, 74.8867° E",

  // Governance
  headOfInstitution: "Dr. Rajesha S",
  headDesignation: "Principal",
  headEmail: "principal@sahyadri.edu.in",
  headPhone: "0824-2277222",
  governingBodyExists: "Yes",
  governingBodyMembers: "Dr. Manjunath Bhandary (Chairman), Dr. Rajesha S (Principal), ...",
  trustName: "Bhandary Foundation",
  registrationNumber: "BF-123456",
  trustRegistrationDate: "2005-06-15",

  // Academic Info
  ugPrograms: "8",
  pgPrograms: "5",
  phdPrograms: "3",
  totalDepartments: "6",
  facultyStrength: "150",
  studentIntake: "900",
  academicCalendarAvailable: "Yes",
  examinationSystem: "Semester",
  mediumOfInstruction: "English",

  // Infrastructure
  campusArea: "32",
  builtUpArea: "25000",
  classrooms: "60",
  labs: "30",
  libraryAvailable: "Yes",
  internetBandwidth: "1000",
  wifiEnabled: "Yes",
  hostelAvailable: "Yes",
  transportAvailable: "Yes",
  busesCount: "15",

  // Recognitions
  ugcRecognitionDate: "2008-07-10",
  aicteApprovalYear: "2007",
  nbaAccreditationDetails: "NBA accredited for 5 years (2020-2025)",
  naacAccreditationDetails: "NAAC A+ grade with 3.51 CGPA",
  isoCertification: "ISO 9001:2015",
  otherAwards: "NIRF Rank: 150-200 band, ARIIA Rank: 25",

  // Miscellaneous
  vision:
    "To be a premier institution in the field of technical education through academic excellence and to be recognized globally for its contribution to industry and society.",
  mission:
    "To develop competent professionals with integrity and social responsibility. To provide quality education and research opportunities. To promote industry-academia collaboration.",
  coreValues: "Excellence, Integrity, Innovation, Teamwork, Social Responsibility",
  collegeAnthem: "Sahyadri, the temple of learning...",
  notableAlumni: "Mr. Rakshith Shetty (CEO, TechInnovate), Ms. Priya Sharma (Senior Engineer, Google)...",
  socialMediaLinks: "Facebook: /sahyadricollege, Instagram: @sahyadricollege, LinkedIn: /sahyadri-college",
}

export default function InstitutionPage() {
  const [institutionData, setInstitutionData] = useState(initialInstitutionData)
  const [activeTab, setActiveTab] = useState("basic")
  const [isEditing, setIsEditing] = useState(false)

  const handleBasicInfoSubmit = (data: any) => {
    setInstitutionData((prev) => ({ ...prev, ...data }))
    setIsEditing(false)
  }

  const handleContactInfoSubmit = (data: any) => {
    setInstitutionData((prev) => ({ ...prev, ...data }))
    setIsEditing(false)
  }

  const handleGovernanceInfoSubmit = (data: any) => {
    setInstitutionData((prev) => ({ ...prev, ...data }))
    setIsEditing(false)
  }

  const handleAcademicInfoSubmit = (data: any) => {
    setInstitutionData((prev) => ({ ...prev, ...data }))
    setIsEditing(false)
  }

  const handleInfrastructureInfoSubmit = (data: any) => {
    setInstitutionData((prev) => ({ ...prev, ...data }))
    setIsEditing(false)
  }

  const handleRecognitionsInfoSubmit = (data: any) => {
    setInstitutionData((prev) => ({ ...prev, ...data }))
    setIsEditing(false)
  }

  const handleMiscellaneousInfoSubmit = (data: any) => {
    setInstitutionData((prev) => ({ ...prev, ...data }))
    setIsEditing(false)
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
