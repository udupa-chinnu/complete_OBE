"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react"
import { Button } from "@/components/admin/button"
import { Input } from "@/components/admin/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/admin/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/admin/dropdown-menu"
import { Label } from "@/components/admin/label"
import { Badge } from "@/components/admin/badge"
import { UploadForm } from "@/components/upload-form"
import { uploadsApi, departmentsApi } from "@/lib/api"

export default function UploadsPage() {
  const [uploads, setUploads] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUpload, setCurrentUpload] = useState<any>(null)

  useEffect(() => {
    fetchUploads()
    fetchDepartments()
  }, [])

  const fetchUploads = async () => {
    try {
      setLoading(true)
      const response = await uploadsApi.getAll({ includeInactive: true }) // Include inactive to show deactivated items
      if (response.success && Array.isArray(response.data)) {
        setUploads(response.data as any[])
      } else {
        setUploads([])
      }
    } catch (error) {
      console.error("Error fetching uploads:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await departmentsApi.getAll()
      if (response.success && Array.isArray(response.data)) {
        setDepartments(response.data as any[])
      } else {
        setDepartments([])
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }

  // Filter uploads based on search term
  const filteredUploads = uploads.filter(
    (upload) =>
      upload.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      upload.department_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUpload = async (newUpload: any) => {
    try {
      const formData = new FormData()
      formData.append('title', newUpload.title)
      formData.append('type', newUpload.type)
      if (newUpload.department) {
        const dept = departments.find(d => d.name === newUpload.department)
        if (dept) formData.append('departmentId', dept.id.toString())
      }
      if (newUpload.document instanceof File) {
        formData.append('document', newUpload.document)
      }
      formData.append('uploadDate', newUpload.uploadDate || new Date().toISOString().split('T')[0])

      const response = await uploadsApi.create(formData)
      if (response.success) {
        await fetchUploads()
        setIsAddDialogOpen(false)
      } else {
        alert(response.message || "Failed to create upload")
      }
    } catch (error) {
      console.error("Error creating upload:", error)
      alert("Failed to create upload. Please try again.")
    }
  }

  const handleEditUpload = async (updatedUpload: any) => {
    try {
      const formData = new FormData()
      formData.append('title', updatedUpload.title)
      formData.append('type', updatedUpload.type)
      if (updatedUpload.department) {
        const dept = departments.find(d => d.name === updatedUpload.department)
        if (dept) formData.append('departmentId', dept.id.toString())
      }
      if (updatedUpload.document instanceof File) {
        formData.append('document', updatedUpload.document)
      }
      formData.append('uploadDate', updatedUpload.uploadDate)

      const response = await uploadsApi.update(currentUpload.id, formData)
      if (response.success) {
        await fetchUploads()
        setIsEditDialogOpen(false)
      } else {
        alert(response.message || "Failed to update upload")
      }
    } catch (error) {
      console.error("Error updating upload:", error)
      alert("Failed to update upload. Please try again.")
    }
  }

  const handleDeleteUpload = async (id: number) => {
    try {
      const response = await uploadsApi.deactivate(id)
      if (response.success) {
        await fetchUploads()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to deactivate upload")
      }
    } catch (error) {
      console.error("Error deactivating upload:", error)
      alert("Failed to deactivate upload. Please try again.")
    }
  }

  const handleReactivateUpload = async (id: number) => {
    try {
      const response = await uploadsApi.reactivate(id)
      if (response.success) {
        await fetchUploads()
        setIsDeleteDialogOpen(false)
      } else {
        alert(response.message || "Failed to reactivate upload")
      }
    } catch (error) {
      console.error("Error reactivating upload:", error)
      alert("Failed to reactivate upload. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading uploads...</p>
          </div>
        </div>
      </div>
    )
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
                  <TableCell>{upload.department_name || "Institute Level"}</TableCell>
                  <TableCell>{new Date(upload.upload_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={upload.is_active ? "default" : "secondary"}>
                      {upload.is_active ? "Active" : "Inactive"}
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
                          {upload.is_active ? "Deactivate" : "Activate"}
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
                <div className="col-span-3">{currentUpload.department_name || "Institute Level"}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Upload Date</Label>
                <div className="col-span-3">{new Date(currentUpload.upload_date).toLocaleDateString()}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Document</Label>
                <div className="col-span-3 flex items-center gap-2">
                  <FileText className="mr-2 h-4 w-4" />
                  {currentUpload.document_path ? (
                    <a 
                      href={`http://localhost:5000${currentUpload.document_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {currentUpload.document_path.split('/').pop()}
                    </a>
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status</Label>
                <div className="col-span-3">
                  <Badge variant={currentUpload.is_active ? "default" : "secondary"}>
                    {currentUpload.is_active ? "Active" : "Inactive"}
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
              upload={{
                ...currentUpload,
                department: currentUpload.department_name || 'institution',
                document: currentUpload.document_path ? currentUpload.document_path.split('/').pop() : '',
                uploadDate: currentUpload.upload_date ? (currentUpload.upload_date.includes('T') ? currentUpload.upload_date.split('T')[0] : currentUpload.upload_date) : new Date().toISOString().split('T')[0]
              }}
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
            <DialogTitle>{currentUpload?.is_active ? "Deactivate" : "Activate"} Document</DialogTitle>
            <DialogDescription>
              {currentUpload?.is_active
                ? "This will deactivate the document. It can be reactivated later."
                : "This will reactivate the document."}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to {currentUpload?.is_active ? "deactivate" : "activate"}{" "}
              <span className="font-semibold">{currentUpload?.title}</span>?
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={currentUpload?.is_active ? "destructive" : "default"}
              onClick={() => {
                if (currentUpload?.is_active) {
                  handleDeleteUpload(currentUpload?.id)
                } else {
                  handleReactivateUpload(currentUpload?.id)
                }
              }}
            >
              {currentUpload?.is_active ? "Deactivate" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
