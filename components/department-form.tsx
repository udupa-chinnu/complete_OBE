"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DepartmentFormProps {
  department?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

interface Faculty {
  id: number
  faculty_id: string
  full_name: string
  designation: string
}

export function DepartmentForm({ department, onSubmit, onCancel }: DepartmentFormProps) {
  const [formData, setFormData] = useState({
    id: department?.id || null,
    name: department?.name || "",
    code: department?.code || "",
    hodFacultyId: department?.hod_faculty_id || department?.hodFacultyId || "",
    establishmentYear: department?.establishmentYear || "",
    contactEmail: department?.contactEmail || "",
    contactPhone: department?.contactPhone || "",
    website: department?.website || "",
    status: department?.status || "active",
  })

  const [faculties, setFaculties] = useState<Faculty[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch active faculties for HOD dropdown
    const fetchFaculties = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/faculties/dropdown/active')
        const result = await response.json()
        if (result.success) {
          setFaculties(result.data)
        }
      } catch (error) {
        console.error('Error fetching faculties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFaculties()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Department Name
          </Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="code" className="text-right">
            Department Code
          </Label>
          <Input id="code" name="code" value={formData.code} onChange={handleChange} className="col-span-3" required />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="hodFacultyId" className="text-right">
            HOD Name
          </Label>
          <div className="col-span-3">
            <Select
              value={formData.hodFacultyId ? formData.hodFacultyId.toString() : ""}
              onValueChange={(value) => handleSelectChange("hodFacultyId", value)}
            >
              <SelectTrigger id="hodFacultyId">
                <SelectValue placeholder="Select HOD from faculties" />
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <SelectItem value="loading" disabled>Loading faculties...</SelectItem>
                ) : faculties.length === 0 ? (
                  <SelectItem value="no-faculties" disabled>No active faculties available</SelectItem>
                ) : (
                  faculties.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id.toString()}>
                      {faculty.full_name} - {faculty.designation}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="establishmentYear" className="text-right">
            Establishment Year
          </Label>
          <Input
            id="establishmentYear"
            name="establishmentYear"
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={formData.establishmentYear}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="contactEmail" className="text-right">
            Contact Email
          </Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="contactPhone" className="text-right">
            Contact Phone
          </Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="website" className="text-right">
            Department Website
          </Label>
          <Input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={handleChange}
            className="col-span-3"
          />
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
