"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DialogFooter } from "@/components/ui/dialog"

interface LeavementFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function LeavementForm({ onSubmit, onCancel }: LeavementFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    department: "",
    designation: "",
    staffType: "",
    typeOfExit: "",
    lastWorkingDay: "",
    exitStatus: "",
  })

  const [lastWorkingDay, setLastWorkingDay] = useState<Date | undefined>(undefined)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLastWorkingDayChange = (date: Date | undefined) => {
    setLastWorkingDay(date)
    if (date) {
      setFormData((prev) => ({ ...prev, lastWorkingDay: format(date, "yyyy-MM-dd") }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

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
  const exitTypes = ["Resignation", "Retirement", "Termination", "Transfer", "End of Contract"]
  const exitStatuses = ["In Progress", "Completed"]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeId">Employee ID</Label>
          <Input id="employeeId" name="employeeId" value={formData.employeeId} onChange={handleChange} required />
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
          <Label htmlFor="designation">Designation</Label>
          <Input id="designation" name="designation" value={formData.designation} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="staffType">Staff Type</Label>
          <Select value={formData.staffType} onValueChange={(value) => handleSelectChange("staffType", value)} required>
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
          <Label htmlFor="typeOfExit">Type of Exit</Label>
          <Select
            value={formData.typeOfExit}
            onValueChange={(value) => handleSelectChange("typeOfExit", value)}
            required
          >
            <SelectTrigger id="typeOfExit">
              <SelectValue placeholder="Select exit type" />
            </SelectTrigger>
            <SelectContent>
              {exitTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastWorkingDay">Last Working Day</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {lastWorkingDay ? format(lastWorkingDay, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={lastWorkingDay} onSelect={handleLastWorkingDayChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="exitStatus">Exit Status</Label>
          <Select
            value={formData.exitStatus}
            onValueChange={(value) => handleSelectChange("exitStatus", value)}
            required
          >
            <SelectTrigger id="exitStatus">
              <SelectValue placeholder="Select exit status" />
            </SelectTrigger>
            <SelectContent>
              {exitStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
