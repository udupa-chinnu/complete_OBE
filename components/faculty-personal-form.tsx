"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface FacultyPersonalFormProps {
  faculty?: any
  initialData?: any
  onSubmit: (data: any) => void
}

export function FacultyPersonalForm({ faculty, initialData, onSubmit }: FacultyPersonalFormProps) {
  const data = initialData || faculty || {}
  
  // Convert dates to YYYY-MM-DD format for input type="date"
  const formatDateForInput = (date: string | Date | undefined) => {
    if (!date) return ""
    if (typeof date === 'string') {
      // If it's already in YYYY-MM-DD format, return as is
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) return date
      // Otherwise, try to parse it
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
  const [sameAsAbove, setSameAsAbove] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    // Faculty Information
    facultyId: data.facultyId || data.faculty_id || "",
    title: data.title || "",
    firstName: data.firstName || data.first_name || "",
    middleName: data.middleName || data.middle_name || "",
    lastName: data.lastName || data.last_name || "",
    callName: data.callName || data.call_name || "",
    initials: data.initials || "",
    designation: data.designation || "",
    dateOfBirth: formatDateForInput(data.dateOfBirth || data.date_of_birth),
    gender: data.gender || "",
    permanentAddress: data.permanentAddress || data.permanent_address || "",
    currentAddress: data.currentAddress || data.current_address || "",
    city: data.city || "",
    state: data.state || "",
    pincode: data.pincode || "",
    residenceNumber: data.residenceNumber || data.residence_number || "",
    personalEmail: data.personalEmail || data.personal_email || "",
    officialEmail: data.officialEmail || data.official_email || "",
    nationality: data.nationality || "Indian",
    religion: data.religion || "",
    category: data.category || "",
    caste: data.caste || "",
    bloodGroup: data.bloodGroup || data.blood_group || "",

    // Employment Information
    appointmentLetterNumber: data.appointmentLetterNumber || data.appointment_letter_number || "",
    appointmentDate: formatDateForInput(data.appointmentDate || data.appointment_date),
    parentDepartment: data.parentDepartment || data.parent_department || "",
    joiningDate: formatDateForInput(data.joiningDate || data.joining_date),
    designationDate: formatDateForInput(data.designationDate || data.designation_date),
    associateType: data.associateType || data.associate_type || "",
    currentlyAssociated: data.currentlyAssociated || data.currently_associated || "Yes",
    appointedTo: data.appointedTo || data.appointed_to || "",
    academicExperience: data.academicExperience || data.academic_experience?.toString() || "",
    researchExperience: data.researchExperience || data.research_experience?.toString() || "",
    industryExperience: data.industryExperience || data.industry_experience?.toString() || "",
    profilePhoto: data.profilePhoto || "",
  })

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

  const handleSameAsAboveChange = (checked: boolean) => {
    setSameAsAbove(checked)
    if (checked) {
      setFormData((prev) => ({ ...prev, currentAddress: prev.permanentAddress }))
    }
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfilePhoto(file)
      setFormData((prev) => ({ ...prev, profilePhoto: file.name }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      profilePhoto: profilePhoto, // Include the File object
    }
    onSubmit(submitData)
  }

  const titles = ["Dr.", "Prof.", "Mr.", "Ms.", "Mrs.", "Shri", "Smt."]
  const designations = ["Professor", "Associate Professor", "Assistant Professor"]
  const genders = ["Male", "Female", "Other"]
  const states = ["Karnataka", "Tamil Nadu", "Maharashtra", "Delhi", "Uttar Pradesh", "Kerala", "Andhra Pradesh"]
  const cities = ["Bangalore", "Mangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Kolkata"]
  const nationalities = ["Indian", "Other"]
  const religions = ["Hindu", "Muslim", "Christian", "Jain", "Buddhist", "Parsi", "Sikh", "Others"]
  const categories = ["GM", "1A", "2A", "2B", "3A", "3B", "SC", "ST"]
  const castes = ["Brahmin", "Konkani", "GSB", "Shia", "Sunni", "Catholics", "Billava", "Poojary", "Shetty", "Others"]
  const bloodGroups = ["A+", "B+", "O+", "AB+", "AB-", "A-", "B-", "O-"]
  const associateTypes = ["Regular", "Contracted", "Visiting", "Guest", "Any Other"]
  const departments = [
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Data Science",
    "AIML",
    "IoT",
    "Others",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <Label htmlFor="callName">Call Name</Label>
          <Input id="callName" name="callName" value={formData.callName} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="initials">Initials</Label>
          <Input id="initials" name="initials" value={formData.initials} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="designation">Designation</Label>
          <Select
            value={formData.designation}
            onValueChange={(value) => handleSelectChange("designation", value)}
            required
          >
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
      </div>

      {/* Employment Information */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Employment Information</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="appointmentLetterNumber">Appointment Letter Number</Label>
            <Input
              id="appointmentLetterNumber"
              name="appointmentLetterNumber"
              value={formData.appointmentLetterNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointmentDate">Appointment Letter Date</Label>
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
            <Select
              value={formData.parentDepartment}
              onValueChange={(value) => handleSelectChange("parentDepartment", value)}
              required
            >
              <SelectTrigger id="parentDepartment">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
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
          <Label htmlFor="designation">Current Designation</Label>
          <Select
            value={formData.designation}
            onValueChange={(value) => handleSelectChange("designation", value)}
            required
          >
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
            <Select
              value={formData.associateType}
              onValueChange={(value) => handleSelectChange("associateType", value)}
              required
            >
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
          <div className="space-y-2">
            <Label htmlFor="currentlyAssociated">Currently Associated</Label>
            <Select
              value={formData.currentlyAssociated}
              onValueChange={(value) => handleSelectChange("currentlyAssociated", value)}
              required
            >
              <SelectTrigger id="currentlyAssociated">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointedTo">Appointed To</Label>
            <Select
              value={formData.appointedTo}
              onValueChange={(value) => handleSelectChange("appointedTo", value)}
              required
            >
              <SelectTrigger id="appointedTo">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-4">
          <div className="space-y-2">
            <Label htmlFor="academicExperience">Academic Experience (Years)</Label>
            <Input
              id="academicExperience"
              name="academicExperience"
              type="number"
              min="0"
              step="0.5"
              value={formData.academicExperience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchExperience">Research Experience (Years)</Label>
            <Input
              id="researchExperience"
              name="researchExperience"
              type="number"
              min="0"
              step="0.5"
              value={formData.researchExperience}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industryExperience">Industry Experience (Years)</Label>
            <Input
              id="industryExperience"
              name="industryExperience"
              type="number"
              min="0"
              step="0.5"
              value={formData.industryExperience}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="profilePhoto">Profile Photo</Label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoChange}
          />
          {formData.profilePhoto && !profilePhoto && (
            <p className="text-sm text-muted-foreground">Current file: {formData.profilePhoto}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="permanentAddress">Permanent Address</Label>
        <Textarea
          id="permanentAddress"
          name="permanentAddress"
          value={formData.permanentAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="currentAddress">Current Address</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id="sameAsAbove" checked={sameAsAbove} onCheckedChange={handleSameAsAboveChange} />
            <label
              htmlFor="sameAsAbove"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Same as above
            </label>
          </div>
        </div>
        <Textarea
          id="currentAddress"
          name="currentAddress"
          value={formData.currentAddress}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select value={formData.city} onValueChange={(value) => handleSelectChange("city", value)} required>
            <SelectTrigger id="city">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)} required>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="residenceNumber">Residence Number</Label>
          <Input id="residenceNumber" name="residenceNumber" value={formData.residenceNumber} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="personalEmail">Personal Email</Label>
          <Input
            id="personalEmail"
            name="personalEmail"
            type="email"
            value={formData.personalEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="officialEmail">Official Email</Label>
          <Input
            id="officialEmail"
            name="officialEmail"
            type="email"
            value={formData.officialEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Select
            value={formData.nationality}
            onValueChange={(value) => handleSelectChange("nationality", value)}
            required
          >
            <SelectTrigger id="nationality">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              {nationalities.map((nationality) => (
                <SelectItem key={nationality} value={nationality}>
                  {nationality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="religion">Religion</Label>
          <Select value={formData.religion} onValueChange={(value) => handleSelectChange("religion", value)} required>
            <SelectTrigger id="religion">
              <SelectValue placeholder="Select religion" />
            </SelectTrigger>
            <SelectContent>
              {religions.map((religion) => (
                <SelectItem key={religion} value={religion}>
                  {religion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="caste">Caste</Label>
          <Select value={formData.caste} onValueChange={(value) => handleSelectChange("caste", value)} required>
            <SelectTrigger id="caste">
              <SelectValue placeholder="Select caste" />
            </SelectTrigger>
            <SelectContent>
              {castes.map((caste) => (
                <SelectItem key={caste} value={caste}>
                  {caste}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select
            value={formData.bloodGroup}
            onValueChange={(value) => handleSelectChange("bloodGroup", value)}
            required
          >
            <SelectTrigger id="bloodGroup">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((bloodGroup) => (
                <SelectItem key={bloodGroup} value={bloodGroup}>
                  {bloodGroup}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Next: Qualifications</Button>
      </div>
    </form>
  )
}
