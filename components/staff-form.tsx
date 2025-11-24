"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface StaffFormProps {
  staff?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function StaffForm({ staff, onSubmit, onCancel }: StaffFormProps) {
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [aadharFile, setAadharFile] = useState<File | null>(null)
  const [panFile, setPanFile] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    id: staff?.id || null,
    // Common fields
    fullName: staff?.fullName || "",
    employeeId: staff?.employeeId || "",
    gender: staff?.gender || "",
    dateOfBirth: staff?.dateOfBirth || "",
    dateOfJoining: staff?.dateOfJoining || "",
    phoneNumber: staff?.phoneNumber || "",
    email: staff?.email || "",
    address: staff?.address || "",
    staffType: staff?.staffType || "Non-Teaching", // Defaulted to Non-Teaching
    department: staff?.department || "",
    staffCategory: staff?.staffCategory || "",
    designation: staff?.designation || "", // Added Designation
    totalExperience: staff?.totalExperience || "",
    status: staff?.status || "active",
    
    // Documents & Banking
    profilePhoto: staff?.profilePhoto || "",
    bankName: staff?.bankName || "",
    bankBranch: staff?.bankBranch || "",
    ifscCode: staff?.ifscCode || "",
    aadharCard: staff?.aadharCard || "",
    panCard: staff?.panCard || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (fileType === "profilePhoto") {
        setProfilePhoto(file)
        setFormData((prev) => ({ ...prev, profilePhoto: file.name }))
      } else if (fileType === "aadharCard") {
        setAadharFile(file)
        setFormData((prev) => ({ ...prev, aadharCard: file.name }))
      } else if (fileType === "panCard") {
        setPanFile(file)
        setFormData((prev) => ({ ...prev, panCard: file.name }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const genders = ["Male", "Female", "Other"]
  // staffTypes removed from selection as this form is strictly for Non-Teaching now
  
  const departments = [
    "Administration",
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Library",
    "Accounts",
    "Exam Section",
    "Placement Cell"
  ]
  
  const staffCategories = ["Permanent", "Temporary", "Contractual"]

  // Non-teaching designations only
  const designations = [
    "Office Superintendent",
    "Librarian",
    "Assistant Librarian",
    "Accountant",
    "Lab Assistant",
    "Lab Instructor",
    "System Administrator",
    "Clerk",
    "First Division Assistant (FDA)",
    "Second Division Assistant (SDA)",
    "Attender",
    "Peon",
    "Other"
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
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
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input 
            id="dateOfBirth" 
            name="dateOfBirth" 
            type="date" 
            value={formData.dateOfBirth} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dateOfJoining">Date of Joining</Label>
          <Input 
            id="dateOfJoining" 
            name="dateOfJoining" 
            type="date" 
            value={formData.dateOfJoining} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        
        {/* Removed Staff Type Select - Defaulting to Non-Teaching internally */}
        
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select
            value={formData.department}
            onValueChange={(value) => handleSelectChange("department", value)}
            required
          >
            <SelectTrigger id="department">
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

        {/* Added Designation Field */}
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
              {designations.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="staffCategory">Staff Category</Label>
          <Select
            value={formData.staffCategory}
            onValueChange={(value) => handleSelectChange("staffCategory", value)}
            required
          >
            <SelectTrigger id="staffCategory">
              <SelectValue placeholder="Select staff category" />
            </SelectTrigger>
            <SelectContent>
              {staffCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="totalExperience">Total Experience (Years)</Label>
          <Input
            id="totalExperience"
            name="totalExperience"
            type="number"
            min="0"
            step="0.5"
            value={formData.totalExperience}
            onChange={handleChange}
            required
          />
        </div>

        {/* Banking Information */}
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

        {/* File Uploads */}
        <div className="space-y-2">
          <Label htmlFor="profilePhoto">Profile Photo</Label>
          <Input
            id="profilePhoto"
            name="profilePhoto"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "profilePhoto")}
          />
          {formData.profilePhoto && !profilePhoto && (
            <p className="text-sm text-muted-foreground">Current file: {formData.profilePhoto}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="aadharCard">Upload Aadhar Card</Label>
          <Input
            id="aadharCard"
            name="aadharCard"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "aadharCard")}
          />
          {formData.aadharCard && !aadharFile && (
            <p className="text-sm text-muted-foreground">Current file: {formData.aadharCard}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="panCard">Upload PAN Card</Label>
          <Input
            id="panCard"
            name="panCard"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange(e, "panCard")}
          />
          {formData.panCard && !panFile && (
            <p className="text-sm text-muted-foreground">Current file: {formData.panCard}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}