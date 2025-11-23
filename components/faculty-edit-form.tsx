"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { departmentsApi } from "@/lib/api"

interface FacultyEditFormProps {
  faculty: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function FacultyEditForm({ faculty, onSubmit, onCancel }: FacultyEditFormProps) {
  const [activeTab, setActiveTab] = useState("personal")
  const [departments, setDepartments] = useState<any[]>([])
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)

  // Format date for input type="date"
  const formatDateForInput = (date: string | Date | undefined) => {
    if (!date) return ""
    if (typeof date === 'string') {
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) return date
      const d = new Date(date)
      if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0]
      }
      return ""
    }
    if (date instanceof Date) {
      return date.toISOString().split('T')[0]
    }
    return ""
  }

  const [formData, setFormData] = useState({
    facultyId: faculty?.faculty_id || "",
    title: faculty?.title || "",
    firstName: faculty?.first_name || "",
    middleName: faculty?.middle_name || "",
    lastName: faculty?.last_name || "",
    designation: faculty?.designation || "",
    gender: faculty?.gender || "",
    personalEmail: faculty?.personal_email || "",
    officialEmail: faculty?.official_email || "",
    parentDepartment: faculty?.parent_department || "",
    appointmentLetterNumber: faculty?.appointment_letter_number || "",
    appointmentDate: formatDateForInput(faculty?.appointment_date),
    joiningDate: formatDateForInput(faculty?.joining_date),
    designationDate: formatDateForInput(faculty?.designation_date),
    dateOfBirth: formatDateForInput(faculty?.date_of_birth),
    associateType: faculty?.associate_type || "",
    academicExperience: faculty?.academic_experience?.toString() || "",
    researchExperience: faculty?.research_experience?.toString() || "",
    industryExperience: faculty?.industry_experience?.toString() || "",
  })

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentsApi.getAll()
        if (response.success && response.data && Array.isArray(response.data)) {
          setDepartments(response.data)
        }
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }
    fetchDepartments()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      profilePhoto: profilePhoto,
    }
    onSubmit(submitData)
  }

  const titles = ["Dr.", "Prof.", "Mr.", "Ms.", "Mrs.", "Shri", "Smt."]
  const designations = ["Professor", "Associate Professor", "Assistant Professor"]
  const genders = ["Male", "Female", "Other"]
  const associateTypes = ["Regular", "Contracted", "Visiting", "Guest", "Any Other"]

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="facultyId">Faculty ID</Label>
              <Input id="facultyId" name="facultyId" value={formData.facultyId} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Select value={formData.title} onValueChange={(value) => handleSelectChange("title", value)} required>
                <SelectTrigger id="title">
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  {titles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="middleName">Middle Name</Label>
              <Input id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleDateChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)} required>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="personalEmail">Personal Email</Label>
              <Input id="personalEmail" name="personalEmail" type="email" value={formData.personalEmail} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="officialEmail">Official Email</Label>
              <Input id="officialEmail" name="officialEmail" type="email" value={formData.officialEmail} onChange={handleChange} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={handleProfilePhotoChange} />
              {faculty?.profile_photo_path && !profilePhoto && (
                <p className="text-sm text-muted-foreground">Current: {faculty.profile_photo_path}</p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="appointmentLetterNumber">Appointment Letter Number</Label>
              <Input id="appointmentLetterNumber" name="appointmentLetterNumber" value={formData.appointmentLetterNumber} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Appointment Date</Label>
              <Input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                value={formData.appointmentDate}
                onChange={(e) => handleDateChange("appointmentDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parentDepartment">Parent Department</Label>
              <Select value={formData.parentDepartment} onValueChange={(value) => handleSelectChange("parentDepartment", value)} required>
                <SelectTrigger id="parentDepartment">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={(e) => handleDateChange("joiningDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designationDate">Designation Date</Label>
              <Input
                id="designationDate"
                name="designationDate"
                type="date"
                value={formData.designationDate}
                onChange={(e) => handleDateChange("designationDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select value={formData.designation} onValueChange={(value) => handleSelectChange("designation", value)} required>
                <SelectTrigger id="designation">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((designation) => (
                    <SelectItem key={designation} value={designation}>
                      {designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="associateType">Association Type</Label>
              <Select value={formData.associateType} onValueChange={(value) => handleSelectChange("associateType", value)} required>
                <SelectTrigger id="associateType">
                  <SelectValue placeholder="Select associate type" />
                </SelectTrigger>
                <SelectContent>
                  {associateTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="academicExperience">Academic Experience (Years)</Label>
              <Input id="academicExperience" name="academicExperience" type="number" min="0" step="0.5" value={formData.academicExperience} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="researchExperience">Research Experience (Years)</Label>
              <Input id="researchExperience" name="researchExperience" type="number" min="0" step="0.5" value={formData.researchExperience} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industryExperience">Industry Experience (Years)</Label>
              <Input id="industryExperience" name="industryExperience" type="number" min="0" step="0.5" value={formData.industryExperience} onChange={handleChange} required />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  )
}

