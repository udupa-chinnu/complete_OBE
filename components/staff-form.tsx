"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StaffFormProps {
  staff?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function StaffForm({ staff, onSubmit, onCancel }: StaffFormProps) {
  const [activeTab, setActiveTab] = useState("common")
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(
    staff?.dateOfBirth ? new Date(staff.dateOfBirth) : undefined,
  )
  const [dateOfJoining, setDateOfJoining] = useState<Date | undefined>(
    staff?.dateOfJoining ? new Date(staff.dateOfJoining) : undefined,
  )
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [idProofFile, setIdProofFile] = useState<File | null>(null)

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
    staffType: staff?.staffType || "",
    department: staff?.department || "",
    staffCategory: staff?.staffCategory || "",
    status: staff?.status || "active",
    profilePhoto: staff?.profilePhoto || "",

    // Teaching staff fields
    designation: staff?.designation || "",
    qualifications: staff?.qualifications || "",
    specialization: staff?.specialization || "",
    coursesHandled: staff?.coursesHandled || "",
    subjectsOfExpertise: staff?.subjectsOfExpertise || "",
    totalExperience: staff?.totalExperience || "",
    teachingExperience: staff?.teachingExperience || "",
    industryExperience: staff?.industryExperience || "",
    researchInterests: staff?.researchInterests || "",
    numberOfPublications: staff?.numberOfPublications || "",
    patentsFiledGranted: staff?.patentsFiledGranted || "",
    fdpWorkshopsAttended: staff?.fdpWorkshopsAttended || "",
    certifications: staff?.certifications || "",
    awardsAchievements: staff?.awardsAchievements || "",
    phdStatus: staff?.phdStatus || "",
    contributionsToNbaaNaac: staff?.contributionsToNbaaNaac || "",
    coPoMappingContributions: staff?.coPoMappingContributions || "",
    resumeCV: staff?.resumeCV || "",
    idProof: staff?.idProof || "",

    // Non-teaching staff fields
    workArea: staff?.workArea || "",
    roleDescription: staff?.roleDescription || "",
    reportingOfficerName: staff?.reportingOfficerName || "",
    skillsToolsKnown: staff?.skillsToolsKnown || "",
    certificationsTraining: staff?.certificationsTraining || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "staffType") {
      // Reset type-specific fields when staff type changes
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        // Reset teaching fields if switching to non-teaching
        ...(value === "Non-Teaching"
          ? {
              designation: "",
              qualifications: "",
              specialization: "",
              coursesHandled: "",
              subjectsOfExpertise: "",
              teachingExperience: "",
              researchInterests: "",
              numberOfPublications: "",
              patentsFiledGranted: "",
              fdpWorkshopsAttended: "",
              phdStatus: "",
              contributionsToNbaaNaac: "",
              coPoMappingContributions: "",
            }
          : {}),
        // Reset non-teaching fields if switching to teaching
        ...(value === "Teaching"
          ? {
              workArea: "",
              roleDescription: "",
              reportingOfficerName: "",
              skillsToolsKnown: "",
              certificationsTraining: "",
            }
          : {}),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleDateOfBirthChange = (date: Date | undefined) => {
    setDateOfBirth(date)
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfBirth: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleDateOfJoiningChange = (date: Date | undefined) => {
    setDateOfJoining(date)
    if (date) {
      setFormData((prev) => ({ ...prev, dateOfJoining: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (fileType === "profilePhoto") {
        setProfilePhoto(file)
        setFormData((prev) => ({ ...prev, profilePhoto: file.name }))
      } else if (fileType === "resumeCV") {
        setResumeFile(file)
        setFormData((prev) => ({ ...prev, resumeCV: file.name }))
      } else if (fileType === "idProof") {
        setIdProofFile(file)
        setFormData((prev) => ({ ...prev, idProof: file.name }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const genders = ["Male", "Female", "Other"]
  const staffTypes = ["Teaching", "Non-Teaching"]
  const departments = [
    "Administration",
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Library",
    "Accounts",
  ]
  const staffCategories = ["Permanent", "Temporary", "Contractual"]
  const teachingDesignations = ["Professor", "Associate Professor", "Assistant Professor", "HOD"]
  const nonTeachingDesignations = ["Clerk", "Librarian", "Lab Assistant", "Office Superintendent", "Accountant"]
  const workAreas = ["Library", "Admin Office", "Lab", "Accounts", "Examination", "Placement"]
  const phdStatuses = ["Pursuing", "Completed", "NA"]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="common">Common Information</TabsTrigger>
          <TabsTrigger value="teaching" disabled={formData.staffType === "Non-Teaching"}>
            Teaching Details
          </TabsTrigger>
          <TabsTrigger value="nonTeaching" disabled={formData.staffType === "Teaching"}>
            Non-Teaching Details
          </TabsTrigger>
        </TabsList>

        {/* Common Information Tab */}
        <TabsContent value="common" className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
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
              <Label htmlFor="dateOfJoining">Date of Joining</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfJoining ? format(dateOfJoining, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateOfJoining} onSelect={handleDateOfJoiningChange} initialFocus />
                </PopoverContent>
              </Popover>
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
            <div className="space-y-2">
              <Label htmlFor="staffType">Staff Type</Label>
              <Select
                value={formData.staffType}
                onValueChange={(value) => handleSelectChange("staffType", value)}
                required
              >
                <SelectTrigger id="staffType">
                  <SelectValue placeholder="Select staff type" />
                </SelectTrigger>
                <SelectContent>
                  {staffTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          </div>

          {formData.staffType && (
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setActiveTab(formData.staffType === "Teaching" ? "teaching" : "nonTeaching")}
              >
                Next: {formData.staffType} Details
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Teaching Staff Tab */}
        <TabsContent value="teaching" className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select
                value={formData.designation}
                onValueChange={(value) => handleSelectChange("designation", value)}
                required={formData.staffType === "Teaching"}
              >
                <SelectTrigger id="designation">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {teachingDesignations.map((designation) => (
                    <SelectItem key={designation} value={designation}>
                      {designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Input
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required={formData.staffType === "Teaching"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required={formData.staffType === "Teaching"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phdStatus">PhD Status</Label>
              <Select
                value={formData.phdStatus}
                onValueChange={(value) => handleSelectChange("phdStatus", value)}
                required={formData.staffType === "Teaching"}
              >
                <SelectTrigger id="phdStatus">
                  <SelectValue placeholder="Select PhD status" />
                </SelectTrigger>
                <SelectContent>
                  {phdStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="coursesHandled">Courses Handled</Label>
              <Textarea
                id="coursesHandled"
                name="coursesHandled"
                value={formData.coursesHandled}
                onChange={handleChange}
                required={formData.staffType === "Teaching"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subjectsOfExpertise">Subjects of Expertise</Label>
              <Textarea
                id="subjectsOfExpertise"
                name="subjectsOfExpertise"
                value={formData.subjectsOfExpertise}
                onChange={handleChange}
                required={formData.staffType === "Teaching"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teachingExperience">Teaching Experience (Years)</Label>
              <Input
                id="teachingExperience"
                name="teachingExperience"
                type="number"
                min="0"
                step="0.5"
                value={formData.teachingExperience}
                onChange={handleChange}
                required={formData.staffType === "Teaching"}
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
                required={formData.staffType === "Teaching"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="researchInterests">Research Interests</Label>
              <Textarea
                id="researchInterests"
                name="researchInterests"
                value={formData.researchInterests}
                onChange={handleChange}
                required={formData.staffType === "Teaching"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfPublications">Number of Publications</Label>
              <Input
                id="numberOfPublications"
                name="numberOfPublications"
                type="number"
                min="0"
                value={formData.numberOfPublications}
                onChange={handleChange}
                required={formData.staffType === "Teaching"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="patentsFiledGranted">Patents Filed/Granted</Label>
              <Textarea
                id="patentsFiledGranted"
                name="patentsFiledGranted"
                value={formData.patentsFiledGranted}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="fdpWorkshopsAttended">FDP/Workshops Attended</Label>
              <Textarea
                id="fdpWorkshopsAttended"
                name="fdpWorkshopsAttended"
                value={formData.fdpWorkshopsAttended}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Textarea
                id="certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="awardsAchievements">Awards & Achievements</Label>
              <Textarea
                id="awardsAchievements"
                name="awardsAchievements"
                value={formData.awardsAchievements}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="contributionsToNbaaNaac">Contributions to NBA/NAAC</Label>
              <Textarea
                id="contributionsToNbaaNaac"
                name="contributionsToNbaaNaac"
                value={formData.contributionsToNbaaNaac}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="coPoMappingContributions">CO-PO Mapping Contributions</Label>
              <Textarea
                id="coPoMappingContributions"
                name="coPoMappingContributions"
                value={formData.coPoMappingContributions}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeCV">Resume/CV Upload</Label>
              <Input
                id="resumeCV"
                name="resumeCV"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "resumeCV")}
              />
              {formData.resumeCV && !resumeFile && (
                <p className="text-sm text-muted-foreground">Current file: {formData.resumeCV}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="idProof">ID Proof (Aadhaar/PAN)</Label>
              <Input
                id="idProof"
                name="idProof"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "idProof")}
              />
              {formData.idProof && !idProofFile && (
                <p className="text-sm text-muted-foreground">Current file: {formData.idProof}</p>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Non-Teaching Staff Tab */}
        <TabsContent value="nonTeaching" className="space-y-6 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Select
                value={formData.designation}
                onValueChange={(value) => handleSelectChange("designation", value)}
                required={formData.staffType === "Non-Teaching"}
              >
                <SelectTrigger id="designation">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {nonTeachingDesignations.map((designation) => (
                    <SelectItem key={designation} value={designation}>
                      {designation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="workArea">Work Area</Label>
              <Select
                value={formData.workArea}
                onValueChange={(value) => handleSelectChange("workArea", value)}
                required={formData.staffType === "Non-Teaching"}
              >
                <SelectTrigger id="workArea">
                  <SelectValue placeholder="Select work area" />
                </SelectTrigger>
                <SelectContent>
                  {workAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Input
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                required={formData.staffType === "Non-Teaching"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportingOfficerName">Reporting Officer Name</Label>
              <Input
                id="reportingOfficerName"
                name="reportingOfficerName"
                value={formData.reportingOfficerName}
                onChange={handleChange}
                required={formData.staffType === "Non-Teaching"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="roleDescription">Role Description</Label>
              <Textarea
                id="roleDescription"
                name="roleDescription"
                value={formData.roleDescription}
                onChange={handleChange}
                required={formData.staffType === "Non-Teaching"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="skillsToolsKnown">Skills/Tools Known</Label>
              <Textarea
                id="skillsToolsKnown"
                name="skillsToolsKnown"
                value={formData.skillsToolsKnown}
                onChange={handleChange}
                required={formData.staffType === "Non-Teaching"}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="certificationsTraining">Certifications/Training</Label>
              <Textarea
                id="certificationsTraining"
                name="certificationsTraining"
                value={formData.certificationsTraining}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resumeCV">Resume/CV Upload</Label>
              <Input
                id="resumeCV"
                name="resumeCV"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "resumeCV")}
              />
              {formData.resumeCV && !resumeFile && (
                <p className="text-sm text-muted-foreground">Current file: {formData.resumeCV}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="idProof">ID Proof (Aadhaar/PAN)</Label>
              <Input
                id="idProof"
                name="idProof"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, "idProof")}
              />
              {formData.idProof && !idProofFile && (
                <p className="text-sm text-muted-foreground">Current file: {formData.idProof}</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
