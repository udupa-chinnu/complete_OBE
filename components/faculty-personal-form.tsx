"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface FacultyPersonalFormProps {
  faculty?: any
  onSubmit: (data: any) => void
}

export function FacultyPersonalForm({ faculty, onSubmit }: FacultyPersonalFormProps) {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    faculty?.dateOfBirth ? new Date(faculty.dateOfBirth) : undefined,
  )
  const [joiningDate, setJoiningDate] = useState<Date | undefined>(
    faculty?.joiningDate ? new Date(faculty.joiningDate) : undefined,
  )
  const [designationDate, setDesignationDate] = useState<Date | undefined>(
    faculty?.designationDate ? new Date(faculty.designationDate) : undefined,
  )
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(
    faculty?.appointmentDate ? new Date(faculty.appointmentDate) : undefined,
  )
  const [sameAsAbove, setSameAsAbove] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)

  const [formData, setFormData] = useState({
    // Faculty Information
    facultyId: faculty?.facultyId || "",
    title: faculty?.title || "",
    firstName: faculty?.firstName || "",
    middleName: faculty?.middleName || "",
    lastName: faculty?.lastName || "",
    callName: faculty?.callName || "",
    initials: faculty?.initials || "",
    designation: faculty?.designation || "",
    dateOfBirth: faculty?.dateOfBirth || "",
    gender: faculty?.gender || "",
    permanentAddress: faculty?.permanentAddress || "",
    currentAddress: faculty?.currentAddress || "",
    city: faculty?.city || "",
    state: faculty?.state || "",
    pincode: faculty?.pincode || "",
    residenceNumber: faculty?.residenceNumber || "",
    personalEmail: faculty?.personalEmail || "",
    officialEmail: faculty?.officialEmail || "",
    nationality: faculty?.nationality || "Indian",
    religion: faculty?.religion || "",
    category: faculty?.category || "",
    caste: faculty?.caste || "",
    bloodGroup: faculty?.bloodGroup || "",

    // Employment Information
    appointmentLetterNumber: faculty?.appointmentLetterNumber || "",
    appointmentDate: faculty?.appointmentDate || "",
    parentDepartment: faculty?.parentDepartment || "",
    joiningDate: faculty?.joiningDate || "",
    designationDate: faculty?.designationDate || "",
    associateType: faculty?.associateType || "",
    currentlyAssociated: faculty?.currentlyAssociated || "Yes",
    appointedTo: faculty?.appointedTo || "",
    academicExperience: faculty?.academicExperience || "",
    researchExperience: faculty?.researchExperience || "",
    industryExperience: faculty?.industryExperience || "",
    profilePhoto: faculty?.profilePhoto || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateOfBirthChange = (date: Date | undefined) => {
    setDateOfBirth(date)
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleJoiningDateChange = (date: Date | undefined) => {
    setJoiningDate(date)
    if (date) {
      setFormData((prev) => ({ ...prev, joiningDate: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleDesignationDateChange = (date: Date | undefined) => {
    setDesignationDate(date)
    if (date) {
      setFormData((prev) => ({ ...prev, designationDate: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleAppointmentDateChange = (date: Date | undefined) => {
    setAppointmentDate(date)
    if (date) {
      setFormData((prev) => ({ ...prev, appointmentDate: format(date, "yyyy-MM-dd") }))
    }
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
    onSubmit(formData)
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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={dateOfBirth} onSelect={handleDateOfBirthChange} initialFocus />
            </PopoverContent>
          </Popover>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {appointmentDate ? format(appointmentDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={appointmentDate}
                  onSelect={handleAppointmentDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {joiningDate ? format(joiningDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={joiningDate} onSelect={handleJoiningDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="designationDate">Date of Current Designation</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {designationDate ? format(designationDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={designationDate}
                  onSelect={handleDesignationDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="associateType">Associate Type</Label>
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
