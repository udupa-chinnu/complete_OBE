"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Edit, Trash2, Download, FileText, Award } from "lucide-react"

interface ResearchProposal {
  id: string
  title: string
  agency: string
  otherAgency?: string
  proposalType: string
  piDepartment: string
  piName: string
  piDetails: string
  hasCoPI: boolean
  coPIDetails?: string
  projectDuration: string
  durationType: "months" | "years"
  projectCost: number
  proposalFile?: File
  presentationFile?: File
  status: "applied" | "granted" | "awaiting_result" | "rejected"
  sanctionLetter?: File
  hasMidTermReports: boolean
  midTermReports: File[]
  projectStatus?: "ongoing" | "completed"
  completionReport?: File
  utilizationCertificate?: File
  projectOutcome?: string
  outcomeDetails?: string
  projectRecognition?: string
  submissionDate: string
}

export default function ResearchManagement() {
  const [activeTab, setActiveTab] = useState("create") // Added state to control tabs
  const [proposals, setProposals] = useState<ResearchProposal[]>([])
  const [currentProposal, setCurrentProposal] = useState<Partial<ResearchProposal>>({
    title: "",
    agency: "",
    otherAgency: "",
    proposalType: "",
    piDepartment: "",
    piName: "",
    piDetails: "",
    hasCoPI: false,
    coPIDetails: "",
    projectDuration: "",
    durationType: "months",
    projectCost: 0,
    status: "applied",
    hasMidTermReports: false,
    midTermReports: [],
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [midTermFiles, setMidTermFiles] = useState<File[]>([])

  const agencies = ["AICTE", "DST", "SERB", "VTU", "VGST", "Any Other"]
  const proposalTypes = ["Inter Department", "Inter Institute", "Individual", "Collaborative"]
  const outcomeTypes = ["Product", "Patent", "Publication", "Any Other"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && editingId) {
      setProposals(
        proposals.map((proposal) =>
          proposal.id === editingId
            ? {
                ...proposal,
                ...(currentProposal as ResearchProposal),
                midTermReports: midTermFiles, // Ensure updated files are saved
              }
            : proposal,
        ),
      )
      setIsEditing(false)
      setEditingId(null)
    } else {
      const newProposal: ResearchProposal = {
        id: Date.now().toString(),
        ...(currentProposal as ResearchProposal),
        submissionDate: new Date().toISOString().split("T")[0],
        midTermReports: midTermFiles,
      }
      setProposals([...proposals, newProposal])
    }

    // Reset form
    setCurrentProposal({
      title: "",
      agency: "",
      otherAgency: "",
      proposalType: "",
      piDepartment: "",
      piName: "",
      piDetails: "",
      hasCoPI: false,
      coPIDetails: "",
      projectDuration: "",
      durationType: "months",
      projectCost: 0,
      status: "applied",
      hasMidTermReports: false,
      midTermReports: [],
    })
    setMidTermFiles([])
    
    // Switch back to manage tab after save
    setActiveTab("manage")
  }

  const handleEdit = (proposal: ResearchProposal) => {
    setCurrentProposal(proposal)
    setIsEditing(true)
    setEditingId(proposal.id)
    setMidTermFiles(proposal.midTermReports || [])
    // Switch to create/edit tab to show the form
    setActiveTab("create")
  }

  const handleDelete = (id: string) => {
    setProposals(proposals.filter((proposal) => proposal.id !== id))
  }

  const addMidTermReport = (file: File) => {
    setMidTermFiles([...midTermFiles, file])
  }

  const removeMidTermReport = (index: number) => {
    setMidTermFiles(midTermFiles.filter((_, i) => i !== index))
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingId(null)
    setCurrentProposal({
      title: "",
      agency: "",
      otherAgency: "",
      proposalType: "",
      piDepartment: "",
      piName: "",
      piDetails: "",
      hasCoPI: false,
      coPIDetails: "",
      projectDuration: "",
      durationType: "months",
      projectCost: 0,
      status: "applied",
      hasMidTermReports: false,
      midTermReports: [],
    })
    setMidTermFiles([])
    setActiveTab("manage")
  }

  const totalProposals = proposals.length
  const grantedProposals = proposals.filter((p) => p.status === "granted").length
  const appliedProposals = proposals.filter((p) => p.status === "applied").length
  const completedProjects = proposals.filter((p) => p.projectStatus === "completed").length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Management</h1>
          <p className="text-gray-600">Manage research proposals, projects, and publications</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProposals}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Granted</p>
                  <p className="text-2xl font-bold text-green-600">{grantedProposals}</p>
                </div>
                <Award className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Applied</p>
                  <p className="text-2xl font-bold text-orange-600">{appliedProposals}</p>
                </div>
                <Upload className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-purple-600">{completedProjects}</p>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Done</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controlled Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="create">{isEditing ? "Edit Proposal" : "Create Proposal"}</TabsTrigger>
            <TabsTrigger value="manage">Manage Proposals</TabsTrigger>
            <TabsTrigger value="granted">Granted Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Edit Research Proposal" : "Create New Research Proposal"}</CardTitle>
                <CardDescription>
                  {isEditing ? "Update the research proposal details" : "Submit a new research proposal"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Proposal Title *</Label>
                        <Input
                          id="title"
                          value={currentProposal.title}
                          onChange={(e) => setCurrentProposal({ ...currentProposal, title: e.target.value })}
                          placeholder="Enter proposal title"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="agency">Agency *</Label>
                        <Select
                          value={currentProposal.agency}
                          onValueChange={(value) => setCurrentProposal({ ...currentProposal, agency: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select agency" />
                          </SelectTrigger>
                          <SelectContent>
                            {agencies.map((agency) => (
                              <SelectItem key={agency} value={agency}>
                                {agency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {currentProposal.agency === "Any Other" && (
                        <div className="space-y-2">
                          <Label htmlFor="otherAgency">Specify Agency *</Label>
                          <Input
                            id="otherAgency"
                            value={currentProposal.otherAgency}
                            onChange={(e) => setCurrentProposal({ ...currentProposal, otherAgency: e.target.value })}
                            placeholder="Specify the agency"
                            required
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="proposalType">Proposal Type *</Label>
                        <Select
                          value={currentProposal.proposalType}
                          onValueChange={(value) => setCurrentProposal({ ...currentProposal, proposalType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select proposal type" />
                          </SelectTrigger>
                          <SelectContent>
                            {proposalTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* PI Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Principal Investigator (PI) Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="piDepartment">Department Name *</Label>
                        <Input
                          id="piDepartment"
                          value={currentProposal.piDepartment}
                          onChange={(e) => setCurrentProposal({ ...currentProposal, piDepartment: e.target.value })}
                          placeholder="Enter department name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="piName">Name of PI *</Label>
                        <Input
                          id="piName"
                          value={currentProposal.piName}
                          onChange={(e) => setCurrentProposal({ ...currentProposal, piName: e.target.value })}
                          placeholder="Enter PI name"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="piDetails">Other PI Details</Label>
                      <Textarea
                        id="piDetails"
                        value={currentProposal.piDetails}
                        onChange={(e) => setCurrentProposal({ ...currentProposal, piDetails: e.target.value })}
                        placeholder="Enter additional PI details (qualifications, experience, etc.)"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Co-PI Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Co-Principal Investigator (Co-PI)</h3>
                    <div className="space-y-2">
                      <Label>Does the PI have Co-PI? *</Label>
                      <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="hasCoPI"
                            value="yes"
                            checked={currentProposal.hasCoPI === true}
                            onChange={() => setCurrentProposal({ ...currentProposal, hasCoPI: true })}
                          />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="hasCoPI"
                            value="no"
                            checked={currentProposal.hasCoPI === false}
                            onChange={() => setCurrentProposal({ ...currentProposal, hasCoPI: false })}
                          />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    {currentProposal.hasCoPI && (
                      <div className="space-y-2">
                        <Label htmlFor="coPIDetails">Co-PI Details *</Label>
                        <Textarea
                          id="coPIDetails"
                          value={currentProposal.coPIDetails}
                          onChange={(e) => setCurrentProposal({ ...currentProposal, coPIDetails: e.target.value })}
                          placeholder="Enter Co-PI details (name, department, qualifications, etc.)"
                          rows={3}
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="projectDuration">Project Duration *</Label>
                        <Input
                          id="projectDuration"
                          type="number"
                          min="1"
                          value={currentProposal.projectDuration}
                          onChange={(e) => setCurrentProposal({ ...currentProposal, projectDuration: e.target.value })}
                          placeholder="Enter duration"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="durationType">Duration Type *</Label>
                        <Select
                          value={currentProposal.durationType}
                          onValueChange={(value) =>
                            setCurrentProposal({ ...currentProposal, durationType: value as "months" | "years" })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectCost">Project Cost (₹) *</Label>
                        <Input
                          id="projectCost"
                          type="number"
                          min="0"
                          value={currentProposal.projectCost}
                          onChange={(e) =>
                            setCurrentProposal({ ...currentProposal, projectCost: Number(e.target.value) })
                          }
                          placeholder="Enter project cost"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* File Uploads */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Document Uploads</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="proposalFile">Upload Proposal</Label>
                        <Input
                          id="proposalFile"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) =>
                            setCurrentProposal({ ...currentProposal, proposalFile: e.target.files?.[0] })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="presentationFile">Upload Presentation</Label>
                        <Input
                          id="presentationFile"
                          type="file"
                          accept=".pdf,.ppt,.pptx"
                          onChange={(e) =>
                            setCurrentProposal({ ...currentProposal, presentationFile: e.target.files?.[0] })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Proposal Status</h3>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status of Proposal *</Label>
                      <Select
                        value={currentProposal.status}
                        onValueChange={(value) => setCurrentProposal({ ...currentProposal, status: value as any })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="granted">Granted</SelectItem>
                          <SelectItem value="awaiting_result">Awaiting Result</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Granted Project Details */}
                  {currentProposal.status === "granted" && (
                    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold text-green-800">Granted Project Details</h3>

                      <div className="space-y-2">
                        <Label htmlFor="sanctionLetter">Sanction Letter</Label>
                        <Input
                          id="sanctionLetter"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) =>
                            setCurrentProposal({ ...currentProposal, sanctionLetter: e.target.files?.[0] })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Mid-term Reports Required?</Label>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="hasMidTermReports"
                              value="yes"
                              checked={currentProposal.hasMidTermReports === true}
                              onChange={() => setCurrentProposal({ ...currentProposal, hasMidTermReports: true })}
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="hasMidTermReports"
                              value="no"
                              checked={currentProposal.hasMidTermReports === false}
                              onChange={() => setCurrentProposal({ ...currentProposal, hasMidTermReports: false })}
                            />
                            <span>No</span>
                          </label>
                        </div>
                      </div>

                      {currentProposal.hasMidTermReports && (
                        <div className="space-y-2">
                          <Label>Mid-term Reports</Label>
                          <div className="space-y-2">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  addMidTermReport(e.target.files[0])
                                }
                              }}
                            />
                            {midTermFiles.length > 0 && (
                              <div className="space-y-1">
                                {midTermFiles.map((file, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-2 bg-white rounded border"
                                  >
                                    <span className="text-sm">{file.name}</span>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      onClick={() => removeMidTermReport(index)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="projectStatus">Project Status</Label>
                        <Select
                          value={currentProposal.projectStatus}
                          onValueChange={(value) =>
                            setCurrentProposal({ ...currentProposal, projectStatus: value as "ongoing" | "completed" })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select project status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {currentProposal.projectStatus === "completed" && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800">Completion Details</h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="completionReport">Completion Report</Label>
                              <Input
                                id="completionReport"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) =>
                                  setCurrentProposal({ ...currentProposal, completionReport: e.target.files?.[0] })
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="utilizationCertificate">Utilization Certificate</Label>
                              <Input
                                id="utilizationCertificate"
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) =>
                                  setCurrentProposal({
                                    ...currentProposal,
                                    utilizationCertificate: e.target.files?.[0],
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="projectOutcome">Outcome of Project</Label>
                            <Select
                              value={currentProposal.projectOutcome}
                              onValueChange={(value) =>
                                setCurrentProposal({ ...currentProposal, projectOutcome: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select outcome type" />
                              </SelectTrigger>
                              <SelectContent>
                                {outcomeTypes.map((outcome) => (
                                  <SelectItem key={outcome} value={outcome}>
                                    {outcome}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="outcomeDetails">Outcome Details</Label>
                            <Textarea
                              id="outcomeDetails"
                              value={currentProposal.outcomeDetails}
                              onChange={(e) =>
                                setCurrentProposal({ ...currentProposal, outcomeDetails: e.target.value })
                              }
                              placeholder="Describe the project outcome in detail"
                              rows={3}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="projectRecognition">Recognition of the Project</Label>
                            <Textarea
                              id="projectRecognition"
                              value={currentProposal.projectRecognition}
                              onChange={(e) =>
                                setCurrentProposal({ ...currentProposal, projectRecognition: e.target.value })
                              }
                              placeholder="Any recognition, awards, or acknowledgments received"
                              rows={2}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      {isEditing ? "Update Proposal" : "Submit Proposal"}
                    </Button>
                    {isEditing && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>All Research Proposals</CardTitle>
                <CardDescription>Manage your research proposals and track their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Proposal Title</TableHead>
                        <TableHead>Agency</TableHead>
                        <TableHead>PI Name</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Cost (₹)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proposals.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4">
                            No proposals found. Create one to get started.
                          </TableCell>
                        </TableRow>
                      ) : (
                        proposals.map((proposal) => (
                          <TableRow key={proposal.id}>
                            <TableCell className="font-medium max-w-xs truncate">{proposal.title}</TableCell>
                            <TableCell>
                              {proposal.agency === "Any Other" ? proposal.otherAgency : proposal.agency}
                            </TableCell>
                            <TableCell>{proposal.piName}</TableCell>
                            <TableCell>
                              {proposal.projectDuration} {proposal.durationType}
                            </TableCell>
                            <TableCell>₹{proposal.projectCost.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  proposal.status === "granted"
                                    ? "default"
                                    : proposal.status === "applied"
                                      ? "secondary"
                                      : proposal.status === "awaiting_result"
                                        ? "outline"
                                        : "destructive"
                                }
                              >
                                {proposal.status.replace("_", " ").toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>{proposal.submissionDate}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(proposal)}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDelete(proposal.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="granted">
            <Card>
              <CardHeader>
                <CardTitle>Granted Projects</CardTitle>
                <CardDescription>Track progress of your granted research projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {proposals
                    .filter((p) => p.status === "granted")
                    .map((project) => (
                      <div key={project.id} className="p-6 border rounded-lg bg-green-50 border-green-200">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-green-800">{project.title}</h3>
                            <p className="text-sm text-green-600">
                              {project.agency === "Any Other" ? project.otherAgency : project.agency} • ₹
                              {project.projectCost.toLocaleString()} •{project.projectDuration} {project.durationType}
                            </p>
                          </div>
                          <Badge variant={project.projectStatus === "completed" ? "default" : "secondary"}>
                            {project.projectStatus || "Ongoing"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700">Principal Investigator</p>
                            <p className="text-sm text-gray-600">
                              {project.piName} - {project.piDepartment}
                            </p>
                          </div>
                          {project.hasCoPI && (
                            <div>
                              <p className="text-sm font-medium text-gray-700">Co-Principal Investigator</p>
                              <p className="text-sm text-gray-600">{project.coPIDetails}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          
                          {project.midTermReports && project.midTermReports.length > 0 && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Mid-term Reports ({project.midTermReports.length})
                            </Button>
                          )}
                          {project.completionReport && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Completion Report
                            </Button>
                          )}
                          {project.utilizationCertificate && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Utilization Certificate
                            </Button>
                          )}
                        </div>

                        {project.projectStatus === "completed" && (
                          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Project Outcome</h4>
                            <p className="text-sm text-blue-700 mb-2">
                              <strong>Type:</strong> {project.projectOutcome}
                            </p>
                            {project.outcomeDetails && (
                              <p className="text-sm text-blue-700 mb-2">
                                <strong>Details:</strong> {project.outcomeDetails}
                              </p>
                            )}
                            {project.projectRecognition && (
                              <p className="text-sm text-blue-700">
                                <strong>Recognition:</strong> {project.projectRecognition}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                  {proposals.filter((p) => p.status === "granted").length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p>No granted projects found.</p>
                      <p className="text-sm">Submit proposals to see them here once granted.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}