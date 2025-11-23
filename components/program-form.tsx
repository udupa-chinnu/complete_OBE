"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { departmentsApi } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface ProgramFormProps {
  program?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ProgramForm({ program, onSubmit, onCancel }: ProgramFormProps) {
  const [formData, setFormData] = useState({
    id: program?.id || null,
    level: program?.level || "",
    type: program?.type || "",
    otherType: program?.otherType || "",
    name: program?.name || "",
    code: program?.code || "",
    department: program?.department || "",
    sanctionedIntake: program?.sanctionedIntake || "",
    commencementYear: program?.commencementYear || new Date().getFullYear().toString(),
    aicteApprovalYear: program?.aicteApprovalYear || new Date().getFullYear().toString(),
    aicteApprovalDoc: program?.aicteApprovalDoc || "",
    intakeChanged: program?.intakeChanged || "No",
    newIntake: program?.newIntake || "",
    intakeChangeDoc: program?.intakeChangeDoc || "",
    accreditationStatus: program?.accreditationStatus || "",
    accreditationFile: program?.accreditationFile || "",
    duration: program?.duration || "",
    totalCredits: program?.totalCredits || "",
    status: program?.status || "active",
  })

  const [aicteFile, setAicteFile] = useState<File | null>(null)
  const [intakeChangeFile, setIntakeChangeFile] = useState<File | null>(null)
  const [accreditationDocFile, setAccreditationDocFile] = useState<File | null>(null)

  const [departments, setDepartments] = useState<any[]>([])

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await departmentsApi.getAll()
        if (response.success && response.data) {
          setDepartments(response.data)
        }
      } catch (error) {
        console.error('Error fetching departments:', error)
      }
    }
    fetchDepartments()
  }, [])

  const accreditationTypes = ["NBA Accredited", "NAAC Accredited", "Not Accredited", "In Process"]

  const programLevels = ["UG", "PG", "Diploma", "Certificate", "Any Other"]

  const [programTypes, setProgramTypes] = useState<string[]>([])

  useEffect(() => {
    // Set program types based on selected level
    if (formData.level === "UG") {
      setProgramTypes(["B.E.", "B.Tech", "B.Com", "B.Sc", "B.A.", "Other"])
    } else if (formData.level === "PG") {
      setProgramTypes(["M.Tech", "M.Com", "M.Sc", "M.A.", "MBA", "MCA", "Other"])
    } else if (formData.level === "Diploma") {
      setProgramTypes(["Diploma in Engineering", "Diploma in Management", "Other"])
    } else if (formData.level === "Certificate") {
      setProgramTypes(["Certificate Course", "Other"])
    } else {
      setProgramTypes(["Other"])
    }
  }, [formData.level])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "level") {
      // Reset type when level changes
      setFormData((prev) => ({ ...prev, [name]: value, type: "" }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked ? "Yes" : "No" }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (fileType === "aicte") {
        setAicteFile(selectedFile)
        setFormData((prev) => ({ ...prev, aicteApprovalDoc: selectedFile.name }))
      } else if (fileType === "intakeChange") {
        setIntakeChangeFile(selectedFile)
        setFormData((prev) => ({ ...prev, intakeChangeDoc: selectedFile.name }))
      } else if (fileType === "accreditation") {
        setAccreditationDocFile(selectedFile)
        setFormData((prev) => ({ ...prev, accreditationFile: selectedFile.name }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      aicteApprovalDoc: aicteFile, // Include File object
      intakeChangeDoc: intakeChangeFile, // Include File object
      accreditationFile: accreditationDocFile, // Include File object
    }
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="level">Program Level</Label>
            <Select value={formData.level} onValueChange={(value) => handleSelectChange("level", value)} required>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select program level" />
              </SelectTrigger>
              <SelectContent>
                {programLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Program Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange("type", value)}
              required
              disabled={!formData.level}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select program type" />
              </SelectTrigger>
              <SelectContent>
                {programTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.type === "Other" && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="otherType">Specify Other Program Type</Label>
              <Input
                id="otherType"
                name="otherType"
                value={formData.otherType}
                onChange={handleChange}
                required={formData.type === "Other"}
              />
            </div>
          )}

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="name">Name of the Programme</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Program Code</Label>
            <Input id="code" name="code" value={formData.code} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="commencementYear">Commencement Year</Label>
            <Input
              id="commencementYear"
              name="commencementYear"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.commencementYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aicteApprovalYear">Year of AICTE Approval</Label>
            <Input
              id="aicteApprovalYear"
              name="aicteApprovalYear"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={formData.aicteApprovalYear}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="aicteApprovalDoc">AICTE Approval Document</Label>
            <Input
              id="aicteApprovalDoc"
              name="aicteApprovalDoc"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleFileChange(e, "aicte")}
            />
            {formData.aicteApprovalDoc && !aicteFile && (
              <p className="text-sm text-muted-foreground">Current file: {formData.aicteApprovalDoc}</p>
            )}
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
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

         

          <div className="space-y-2">
            <Label htmlFor="sanctionedIntake">Sanctioned Intake</Label>
            <Input
              id="sanctionedIntake"
              name="sanctionedIntake"
              type="number"
              min="1"
              value={formData.sanctionedIntake}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intakeChanged"
                checked={formData.intakeChanged === "Yes"}
                onCheckedChange={(checked) => handleCheckboxChange("intakeChanged", !!checked)}
              />
              <Label htmlFor="intakeChanged">Intake Increased/Decreased</Label>
            </div>
          </div>

          {formData.intakeChanged === "Yes" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="newIntake">New Intake</Label>
                <Input
                  id="newIntake"
                  name="newIntake"
                  type="number"
                  min="1"
                  value={formData.newIntake}
                  onChange={handleChange}
                  required={formData.intakeChanged === "Yes"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intakeChangeDoc">Supporting Document</Label>
                <Input
                  id="intakeChangeDoc"
                  name="intakeChangeDoc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "intakeChange")}
                />
                {formData.intakeChangeDoc && !intakeChangeFile && (
                  <p className="text-sm text-muted-foreground">Current file: {formData.intakeChangeDoc}</p>
                )}
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="accreditationStatus">Accreditation Status</Label>
            <Select
              value={formData.accreditationStatus}
              onValueChange={(value) => handleSelectChange("accreditationStatus", value)}
              required
            >
              <SelectTrigger id="accreditationStatus">
                <SelectValue placeholder="Select accreditation status" />
              </SelectTrigger>
              <SelectContent>
                {accreditationTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accreditationFile">Accreditation File</Label>
            <Input
              id="accreditationFile"
              name="accreditationFile"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => handleFileChange(e, "accreditation")}
            />
            {formData.accreditationFile && !accreditationDocFile && (
              <p className="text-sm text-muted-foreground">Current file: {formData.accreditationFile}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Program Duration (Years)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              min="1"
              max="10"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalCredits">Total Credits</Label>
            <Input
              id="totalCredits"
              name="totalCredits"
              type="number"
              min="1"
              value={formData.totalCredits}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  )
}
