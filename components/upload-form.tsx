"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { departmentsApi } from "@/lib/api"

interface UploadFormProps {
  upload?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function UploadForm({ upload, onSubmit, onCancel }: UploadFormProps) {
  const [formData, setFormData] = useState({
    id: upload?.id || null,
    title: upload?.title || "",
    type: upload?.type || "",
    department: upload?.department || upload?.department_name || "",
    document: upload?.document || "",
    uploadDate: upload?.uploadDate || upload?.upload_date ? (upload.upload_date.includes('T') ? upload.upload_date.split('T')[0] : upload.upload_date) : new Date().toISOString().split("T")[0],
    status: upload?.status || "active",
  })

  const [file, setFile] = useState<File | null>(null)
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

  const uploadTypes = [
    "Accreditation Reports",
    "Course Closure",
    "Research Closure",
    "Faculty Development",
    "Student Achievement",
    "Infrastructure Report",
    "Annual Report",
    "Other",
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFormData((prev) => ({ ...prev, document: selectedFile.name }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const submitData = {
      ...formData,
      document: file || formData.document, // Pass file if new one selected
    }
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Document Title
          </Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Document Type
          </Label>
          <div className="col-span-3">
            <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {uploadTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="department" className="text-right">
            Department
          </Label>
          <div className="col-span-3">
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
              required
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="institution">Institution Level</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.name}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="document" className="text-right">
            Upload Document
          </Label>
          <Input
            id="document"
            name="document"
            type="file"
            accept=".pdf,.docx,.xlsx,.doc"
            onChange={handleFileChange}
            className="col-span-3"
          />
          {formData.document && !file && (
            <div className="col-span-3 col-start-2 text-sm text-muted-foreground">
              Current file: {formData.document}
            </div>
          )}
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
