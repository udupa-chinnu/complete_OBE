"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { departmentsApi } from "@/lib/api"
import { Checkbox } from "@/components/ui/checkbox"

interface FacultyUnifiedFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  isEditing?: boolean
}

export function FacultyUnifiedForm({ initialData, onSubmit, isEditing = false }: FacultyUnifiedFormProps) {
  const data = initialData || {}
  
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

  const [sameAsAbove, setSameAsAbove] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [qualifications, setQualifications] = useState(data.qualifications || [])
  const [newQualification, setNewQualification] = useState({ qualification_type: '', degree: '', specialization: '', university: '', year_of_completion: '' })
  const [departments, setDepartments] = useState<any[]>([])

  const [formData, setFormData] = useState({
    // Personal Information
    facultyId: data.faculty_id || "",
    title: data.title || "",
    firstName: data.first_name || "",
    middleName: data.middle_name || "",
    lastName: data.last_name || "",
    callName: data.call_name || "",
    initials: data.initials || "",
    designation: data.designation || "",
    dateOfBirth: formatDateForInput(data.date_of_birth),
    gender: data.gender || "",
    permanentAddress: data.permanent_address || "",
    currentAddress: data.current_address || "",
    city: data.city || "",
    state: data.state || "",
    pincode: data.pincode || "",
    residenceNumber: data.residence_number || "",
    personalEmail: data.personal_email || "",
    officialEmail: data.official_email || "",
    nationality: data.nationality || "Indian",
    religion: data.religion || "",
    category: data.category || "",
    caste: data.caste || "",
    bloodGroup: data.blood_group || "",

    // Employment Information
    appointmentLetterNumber: data.appointment_letter_number || "",
    appointmentDate: formatDateForInput(data.appointment_date),
    // parentDepartment removed from UI; appointedTo should be selected from departments
    joiningDate: formatDateForInput(data.joining_date),
    designationDate: formatDateForInput(data.designation_date),
    associateType: data.associate_type || "",
    currentlyAssociated: data.currently_associated || "Yes",
    appointedTo: data.appointed_to || "",
    academicExperience: data.academic_experience?.toString() || "",
    researchExperience: data.research_experience?.toString() || "",
    industryExperience: data.industry_experience?.toString() || "",

    // Additional Details
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
      setProfilePhoto(e.target.files[0])
    }
  }

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const res: any = await departmentsApi.getAll()
        if (res && res.success && Array.isArray(res.data)) {
          setDepartments(res.data)
        }
      } catch (err) {
        console.error('Error fetching departments', err)
      }
    }
    loadDepartments()
  }, [])

  const addQualification = () => {
    if (newQualification.degree && newQualification.qualification_type) {
      setQualifications([...qualifications, newQualification])
      setNewQualification({ qualification_type: '', degree: '', specialization: '', university: '', year_of_completion: '' })
    }
  }

  const removeQualification = (index: number) => {
    setQualifications(qualifications.filter((_: any, i: number) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formDataToSend = new FormData()
    
    // Add all text fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value as string)
    })
    
    // Add qualifications as JSON
    formDataToSend.append('qualifications', JSON.stringify(qualifications))
    
    // Add profile photo if present
    if (profilePhoto) {
      formDataToSend.append('profilePhoto', profilePhoto)
    }
    
    onSubmit(formDataToSend)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* PERSONAL INFORMATION SECTION */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="facultyId">Faculty ID *</Label>
            <Input id="facultyId" name="facultyId" value={formData.facultyId} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Select value={formData.title} onValueChange={(val) => handleSelectChange('title', val)}>
              <SelectTrigger><SelectValue placeholder="Select title" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr.">Dr.</SelectItem>
                <SelectItem value="Mr.">Mr.</SelectItem>
                <SelectItem value="Mrs.">Mrs.</SelectItem>
                <SelectItem value="Ms.">Ms.</SelectItem>
                <SelectItem value="Prof.">Prof.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="middleName">Middle Name</Label>
            <Input id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
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
            <Label htmlFor="designation">Designation *</Label>
            <Select value={formData.designation} onValueChange={(val) => handleSelectChange('designation', val)}>
              <SelectTrigger><SelectValue placeholder="Select designation" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                <SelectItem value="Professor">Professor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => handleDateChange('dateOfBirth', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={formData.gender} onValueChange={(val) => handleSelectChange('gender', val)}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalEmail">Personal Email</Label>
            <Input id="personalEmail" name="personalEmail" type="email" value={formData.personalEmail} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="officialEmail">Official Email *</Label>
            <Input id="officialEmail" name="officialEmail" type="email" value={formData.officialEmail} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationality">Nationality</Label>
            <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="religion">Religion</Label>
            <Input id="religion" name="religion" value={formData.religion} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" value={formData.category} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="caste">Caste</Label>
            <Input id="caste" name="caste" value={formData.caste} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodGroup">Blood Group</Label>
            <Input id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="residenceNumber">Residence Number</Label>
            <Input id="residenceNumber" name="residenceNumber" value={formData.residenceNumber} onChange={handleChange} />
          </div>
        </div>

        {/* Address Fields */}
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold mb-4 text-gray-800">Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="permanentAddress">Permanent Address</Label>
              <Textarea id="permanentAddress" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} rows={3} />
            </div>
            <div className="space-y-2 flex items-center gap-2">
              <Checkbox id="sameAsAbove" checked={sameAsAbove} onCheckedChange={handleSameAsAboveChange} />
              <Label htmlFor="sameAsAbove" className="cursor-pointer">Same as above</Label>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Textarea id="currentAddress" name="currentAddress" value={formData.currentAddress} onChange={handleChange} rows={3} disabled={sameAsAbove} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" value={formData.state} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold mb-4 text-gray-800">Profile Photo</h4>
          <div className="space-y-2">
            <Label htmlFor="profilePhoto">Upload Photo</Label>
            <Input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={handleProfilePhotoChange} />
          </div>
        </div>
      </div>

      {/* QUALIFICATION SECTION */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Qualifications</h3>
        <div className="space-y-4">
          {qualifications.length > 0 && (
            <div className="space-y-2">
              {qualifications.map((qual: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 border bg-white rounded">
                  <div className="flex-1">
                    <p className="font-medium">{qual.degree} ({qual.qualification_type})</p>
                    {qual.specialization && <p className="text-sm text-gray-600">Specialization: {qual.specialization}</p>}
                    {qual.university && <p className="text-sm text-gray-600">University: {qual.university}</p>}
                    {qual.year_of_completion && <p className="text-sm text-gray-600">Year: {qual.year_of_completion}</p>}
                  </div>
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeQualification(idx)}>Remove</Button>
                </div>
              ))}
            </div>
          )}
          
          <div className="border rounded p-4 bg-white space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="qual_type">Qualification Type</Label>
                <Select value={newQualification.qualification_type} onValueChange={(val) => setNewQualification({...newQualification, qualification_type: val})}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UG">Undergraduate (UG)</SelectItem>
                    <SelectItem value="PG">Postgraduate (PG)</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="Post-Doc">Post-Doc</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree/Course *</Label>
                <Input id="degree" value={newQualification.degree} onChange={(e) => setNewQualification({...newQualification, degree: e.target.value})} placeholder="e.g., B.Tech, M.Tech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" value={newQualification.specialization} onChange={(e) => setNewQualification({...newQualification, specialization: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input id="university" value={newQualification.university} onChange={(e) => setNewQualification({...newQualification, university: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year of Completion</Label>
                <Input id="year" type="number" min="1900" max="2100" value={newQualification.year_of_completion} onChange={(e) => setNewQualification({...newQualification, year_of_completion: e.target.value})} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 mt-3">
              <Button type="button" onClick={addQualification}>Add Qualification</Button>
              <Button type="button" variant="outline" onClick={() => setNewQualification({ qualification_type: '', degree: '', specialization: '', university: '', year_of_completion: '' })}>Clear</Button>
            </div>
          </div>
        </div>
      </div>

      {/* EMPLOYMENT INFORMATION SECTION */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Employment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="appointmentLetterNumber">Appointment Letter Number</Label>
            <Input id="appointmentLetterNumber" name="appointmentLetterNumber" value={formData.appointmentLetterNumber} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointmentDate">Appointment Date</Label>
            <Input id="appointmentDate" name="appointmentDate" type="date" value={formData.appointmentDate} onChange={(e) => handleDateChange('appointmentDate', e.target.value)} />
          </div>
          {/* Parent Department removed from UI per requirements */}
          <div className="space-y-2">
            <Label htmlFor="joiningDate">Joining Date</Label>
            <Input id="joiningDate" name="joiningDate" type="date" value={formData.joiningDate} onChange={(e) => handleDateChange('joiningDate', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designationDate">Designation Date</Label>
            <Input id="designationDate" name="designationDate" type="date" value={formData.designationDate} onChange={(e) => handleDateChange('designationDate', e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="associateType">Associate Type</Label>
            <Select value={formData.associateType} onValueChange={(val) => handleSelectChange('associateType', val)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">Regular</SelectItem>
                <SelectItem value="Contracted">Contracted</SelectItem>
                <SelectItem value="Visiting">Visiting</SelectItem>
                <SelectItem value="Guest">Guest</SelectItem>
                <SelectItem value="Any Other">Any Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentlyAssociated">Currently Associated</Label>
            <Select value={formData.currentlyAssociated} onValueChange={(val) => handleSelectChange('currentlyAssociated', val)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appointedTo">Appointed To</Label>
            <Select value={formData.appointedTo} onValueChange={(val) => handleSelectChange('appointedTo', val)}>
              <SelectTrigger><SelectValue placeholder="Select Department" /></SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="none">None</SelectItem> */}
                {departments.map((d: any) => (
                  <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="academicExperience">Academic Experience (years)</Label>
            <Input id="academicExperience" name="academicExperience" type="number" step="0.1" value={formData.academicExperience} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="researchExperience">Research Experience (years)</Label>
            <Input id="researchExperience" name="researchExperience" type="number" step="0.1" value={formData.researchExperience} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="industryExperience">Industry Experience (years)</Label>
            <Input id="industryExperience" name="industryExperience" type="number" step="0.1" value={formData.industryExperience} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* ADDITIONAL DETAILS SECTION */}
      <div className="border rounded-lg p-6 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Additional Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Input id="height" name="height" value={formData.height} onChange={handleChange} placeholder="e.g., 5'10''" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>
            <Select value={formData.maritalStatus} onValueChange={(val) => handleSelectChange('maritalStatus', val)}>
              <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Unmarried">Unmarried</SelectItem>
                <SelectItem value="Married">Married</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.maritalStatus === 'Married' && (
            <div className="space-y-2">
              <Label htmlFor="spouseName">Spouse Name</Label>
              <Input id="spouseName" name="spouseName" value={formData.spouseName} onChange={handleChange} />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="pan">PAN</Label>
            <Input id="pan" name="pan" value={formData.pan} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aadharNumber">Aadhar Number</Label>
            <Input id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
            <Input id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bankBranch">Bank Branch</Label>
            <Input id="bankBranch" name="bankBranch" value={formData.bankBranch} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="uan">UAN</Label>
            <Input id="uan" name="uan" value={formData.uan} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleScholar">Google Scholar</Label>
            <Input id="googleScholar" name="googleScholar" value={formData.googleScholar} onChange={handleChange} placeholder="Profile URL" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scopusId">Scopus ID</Label>
            <Input id="scopusId" name="scopusId" value={formData.scopusId} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="orcId">ORCID</Label>
            <Input id="orcId" name="orcId" value={formData.orcId} onChange={handleChange} />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            <Label htmlFor="preExistingAilments">Pre-existing Ailments</Label>
            <Textarea id="preExistingAilments" name="preExistingAilments" value={formData.preExistingAilments} onChange={handleChange} rows={2} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>Cancel</Button>
        <Button type="submit">{isEditing ? 'Update Faculty' : 'Create Faculty'}</Button>
      </div>
    </form>
  )
}
