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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LeaveRequestFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  isAdmin?: boolean
}

export function LeaveRequestForm({ onSubmit, onCancel, isAdmin = false }: LeaveRequestFormProps) {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [supportingDocument, setSupportingDocument] = useState<File | null>(null)
  const [documentName, setDocumentName] = useState<string>("")

  const [formData, setFormData] = useState({
    // Staff Information
    name: "",
    employeeId: "",
    department: "",
    designation: "",
    staffType: "Teaching",
    contactNumber: "",

    // Leave Request Details
    leaveType: "",
    fromDate: "",
    toDate: "",
    halfDay: "No",
    totalDays: "0",
    reason: "",

    // Approval Section (Admin Only)
    status: "Pending",
    approverName: "",
    remarks: "",
  })

  // Mock leave balance data
  const leaveBalance = {
    casual: 12,
    sick: 10,
    earned: 15,
    duty: 5,
    maternity: 180,
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFromDateChange = (date: Date | undefined) => {
    setFromDate(date)
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      setFormData((prev) => ({ ...prev, fromDate: formattedDate }))
      calculateTotalDays(formattedDate, formData.toDate, formData.halfDay)
    }
  }

  const handleToDateChange = (date: Date | undefined) => {
    setToDate(date)
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd")
      setFormData((prev) => ({ ...prev, toDate: formattedDate }))
      calculateTotalDays(formData.fromDate, formattedDate, formData.halfDay)
    }
  }

  const handleHalfDayChange = (value: string) => {
    setFormData((prev) => ({ ...prev, halfDay: value }))
    calculateTotalDays(formData.fromDate, formData.toDate, value)
  }

  const calculateTotalDays = (from: string, to: string, halfDay: string) => {
    if (from && to) {
      const fromDateObj = new Date(from)
      const toDateObj = new Date(to)

      // Calculate difference in days
      const diffTime = Math.abs(toDateObj.getTime() - fromDateObj.getTime())
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // Include both start and end days

      // Adjust for half day
      if (halfDay !== "No" && diffDays > 0) {
        diffDays -= 0.5
      }

      setFormData((prev) => ({ ...prev, totalDays: diffDays.toString() }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSupportingDocument(file)
    setDocumentName(file ? file.name : "")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Add submission date
    const submissionData = {
      ...formData,
      submissionDate: new Date().toISOString(),
      supportingDocument: documentName,
    }

    onSubmit(submissionData)
  }

  const departments = [
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Data Science",
    "AIML",
    "IoT",
    "Administration",
    "Library",
    "Accounts",
  ]

  const staffTypes = ["Teaching", "Non-Teaching"]

  const leaveTypes = [
    "Casual Leave",
    "Sick Leave",
    "Earned Leave",
    "Duty Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Study Leave",
    "Others",
  ]

  const halfDayOptions = ["No", "Yes - Morning", "Yes - Afternoon"]

  const statusOptions = ["Pending", "Approved", "Rejected"]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium mb-4">1. Staff Information</h3>
          <div className="space-y-4">
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
              <Input
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              />
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
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">2. Leave Request Details</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leaveType">Type of Leave</Label>
              <Select
                value={formData.leaveType}
                onValueChange={(value) => handleSelectChange("leaveType", value)}
                required
              >
                <SelectTrigger id="leaveType">
                  <SelectValue placeholder="Select leave type" />
                </SelectTrigger>
                <SelectContent>
                  {leaveTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={fromDate} onSelect={handleFromDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={toDate} onSelect={handleToDateChange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="halfDay">Half Day?</Label>
              <Select value={formData.halfDay} onValueChange={handleHalfDayChange} required>
                <SelectTrigger id="halfDay">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {halfDayOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalDays">Total Days</Label>
              <Input id="totalDays" name="totalDays" value={formData.totalDays} readOnly className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Please provide the reason for your leave request"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportingDocument">Supporting Document (Optional)</Label>
              <Input id="supportingDocument" name="supportingDocument" type="file" onChange={handleFileChange} />
              {documentName && <p className="text-sm text-muted-foreground">Selected file: {documentName}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Leave Balance Information */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="px-3 py-1">
              Casual Leave: {leaveBalance.casual} days
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Sick Leave: {leaveBalance.sick} days
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Earned Leave: {leaveBalance.earned} days
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Duty Leave: {leaveBalance.duty} days
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Maternity Leave: {leaveBalance.maternity} days
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Admin Approval Section */}
      {isAdmin && (
        <div>
          <h3 className="text-lg font-medium mb-4">3. Approval Section</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="approverName">Approver Name</Label>
              <Input
                id="approverName"
                name="approverName"
                value={formData.approverName}
                onChange={handleChange}
                required={formData.status !== "Pending"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks (if any)</Label>
              <Textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Enter any remarks regarding this leave request"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{isAdmin ? "Update Leave Request" : "Submit Leave Request"}</Button>
      </div>
    </form>
  )
}
