"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UploadForm } from "@/components/upload-form"

// Sample data for mandatory uploads
const initialUploads = [
  {
    id: 1,
    title: "NAAC Accreditation Report 2023",
    type: "Accreditation Reports",
    department: "Computer Science Engineering",
    document: "naac-report-2023.pdf",
    uploadDate: "2023-05-15",
    status: "active",
  },
  {
    id: 2,
    title: "NBA Self-Assessment Report",
    type: "Accreditation Reports",
    department: "Information Science Engineering",
    document: "nba-sar-2023.pdf",
    uploadDate: "2023-06-20",
    status: "active",
  },
  {
    id: 3,
    title: "Course Closure Report - Data Structures",
    type: "Course Closure",
    department: "Computer Science Engineering",
    document: "ds-closure-2023.pdf",
    uploadDate: "2023-07-10",
    status: "active",
  },
  {
    id: 4,
    title: "Research Project Completion Report",
    type: "Research Closure",
    department: "Electronics & Communication",
    document: "iot-research-closure.pdf",
    uploadDate: "2023-04-05",
    status: "inactive",
  },
  {
    id: 5,
    title: "Annual Academic Audit Report",
    type: "Accreditation Reports",
    department: "Mechanical Engineering",
    document: "academic-audit-2023.pdf",
    uploadDate: "2023-08-12",
    status: "active",
  },
]

export default function UploadsPage() {
  const [uploads, setUploads] = useState(initialUploads)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUpload, setCurrentUpload] = useState<any>(null)

  // Filter uploads based on search term
  const filteredUploads = uploads.filter(
    (upload) =>
      upload.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUpload = (newUpload: any) => {
    const uploadWithId = {
      ...newUpload,
      id: uploads.length + 1,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "active",
    }
    setUploads([...uploads, uploadWithId])
    setIsAddDialogOpen(false)
  }

  const handleEditUpload = (updatedUpload: any) => {
    setUploads(uploads.map((upload) => (upload.id === updatedUpload.id ? updatedUpload : upload)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteUpload = (id: number) => {
    setUploads(
      uploads.map((upload) =>
        upload.id === id ? { ...upload, status: upload.status === "active" ? "inactive" : "active" } : upload,
      ),
    )
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mandatory Closure Uploads</h1>
          <p className="text-muted-foreground">Manage mandatory document uploads and reports</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New Document</DialogTitle>
              <DialogDescription>Upload a new mandatory document or report.</DialogDescription>
            </DialogHeader>
            <UploadForm onSubmit={handleAddUpload} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUploads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No documents found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUploads.map((upload) => (
                <TableRow key={upload.id}>
                  <TableCell className="font-medium">{upload.title}</TableCell>
                  <TableCell>{upload.type}</TableCell>
                  <TableCell>{upload.department}</TableCell>
                  <TableCell>{new Date(upload.uploadDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={upload.status === "active" ? "default" : "secondary"}>
                      {upload.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUpload(upload)
                            setIsViewDialogOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUpload(upload)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentUpload(upload)
                            setIsDeleteDialogOpen(true)
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {upload.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Upload Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Document Details</DialogTitle>
            <DialogDescription>Detailed information about the uploaded document.</DialogDescription>
          </DialogHeader>
          {currentUpload && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Document Title</Label>
                <div className="col-span-3">{currentUpload.title}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Document Type</Label>
                <div className="col-span-3">{currentUpload.type}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Department</Label>
                <div className="col-span-3">{currentUpload.department}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Upload Date</Label>
                <div className="col-span-3">{new Date(currentUpload.uploadDate).toLocaleDateString()}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Document</Label>
                <div className="col-span-3 flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  {currentUpload.document}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  <Badge variant={currentUpload.status === "active" ? "default" : "secondary"}>
                    {currentUpload.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Upload Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
            <DialogDescription>Update the document details.</DialogDescription>
          </DialogHeader>
          {currentUpload && (
            <UploadForm
              upload={currentUpload}
              onSubmit={handleEditUpload}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Upload Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentUpload?.status === "active" ? "Deactivate" : "Activate"} Document</DialogTitle>
            <DialogDescription>
              {currentUpload?.status === "active"
                ? "This will deactivate the document. It can be reactivated later."
                : "This will reactivate the document."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentUpload?.status === "active" ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">{currentUpload?.title}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentUpload?.status === "active" ? "destructive" : "default"}
              onClick={() => handleDeleteUpload(currentUpload?.id)}
            >
              {currentUpload?.status === "active" ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
