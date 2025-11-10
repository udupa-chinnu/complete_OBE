"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FacultyAdditionalFormProps {
  faculty?: any
  onSubmit: (data: any) => void
}

export function FacultyAdditionalForm({ faculty, onSubmit }: FacultyAdditionalFormProps) {
  const [formData, setFormData] = useState({
    height: faculty?.height || "",
    contactNumber: faculty?.contactNumber || "",
    payscale: faculty?.payscale || "",
    bankAccountNumber: faculty?.bankAccountNumber || "",
    pan: faculty?.pan || "",
    aadharNumber: faculty?.aadharNumber || "",
    preExistingAilments: faculty?.preExistingAilments || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const heights = [
    "4 Feet 0 Inches",
    "4 Feet 1 Inch",
    "4 Feet 2 Inches",
    "4 Feet 3 Inches",
    "4 Feet 4 Inches",
    "4 Feet 5 Inches",
    "4 Feet 6 Inches",
    "4 Feet 7 Inches",
    "4 Feet 8 Inches",
    "4 Feet 9 Inches",
    "4 Feet 10 Inches",
    "4 Feet 11 Inches",
    "5 Feet 0 Inches",
    "5 Feet 1 Inch",
    "5 Feet 2 Inches",
    "5 Feet 3 Inches",
    "5 Feet 4 Inches",
    "5 Feet 5 Inches",
    "5 Feet 6 Inches",
    "5 Feet 7 Inches",
    "5 Feet 8 Inches",
    "5 Feet 9 Inches",
    "5 Feet 10 Inches",
    "5 Feet 11 Inches",
    "6 Feet 0 Inches",
    "6 Feet 1 Inch",
    "6 Feet 2 Inches",
    "6 Feet 3 Inches",
    "6 Feet 4 Inches",
    "6 Feet 5 Inches",
    "6 Feet 6 Inches",
    "6 Feet 7 Inches",
    "6 Feet 8 Inches",
    "6 Feet 9 Inches",
    "6 Feet 10 Inches",
    "6 Feet 11 Inches",
    "7 Feet 0 Inches",
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Select value={formData.height} onValueChange={(value) => handleSelectChange("height", value)} required>
            <SelectTrigger id="height">
              <SelectValue placeholder="Select height" />
            </SelectTrigger>
            <SelectContent>
              {heights.map((height) => (
                <SelectItem key={height} value={height}>
                  {height}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="payscale">Payscale</Label>
          <Input id="payscale" name="payscale" value={formData.payscale} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
          <Input
            id="bankAccountNumber"
            name="bankAccountNumber"
            value={formData.bankAccountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pan">PAN</Label>
          <Input id="pan" name="pan" value={formData.pan} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="aadharNumber">Aadhar Number</Label>
          <Input id="aadharNumber" name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preExistingAilments">Pre-Existing Ailments</Label>
        <Textarea
          id="preExistingAilments"
          name="preExistingAilments"
          value={formData.preExistingAilments}
          onChange={handleChange}
          placeholder="Enter any pre-existing medical conditions (if any)"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Faculty</Button>
      </div>
    </form>
  )
}
