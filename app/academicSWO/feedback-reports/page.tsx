"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/card"
import { Button } from "@/components/admin/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/select"
import { Input } from "@/components/admin/input"
import { Label } from "@/components/admin/label"
import { Textarea } from "@/components/admin/textarea"
import { Switch } from "@/components/admin/switch"
import { BarChart, FileDown, FileText, Search, Edit, Trash2, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/admin/dialog"
import { Badge } from "@/components/admin/badge"

// Sample data for faculty feedback reports
const initialFacultyReports = [
  {
    id: 1,
    faculty: "Dr. Sharma",
    department: "Information Science & Engineering",
    subject: "Data Structures",
    semester: "Odd Semester 2023-24",
    responseCount: 45,
    averageRating: 4.5,
    status: "Completed",
  },
  {
    id: 2,
    faculty: "Dr. Patel",
    department: "Information Science & Engineering",
    subject: "Database Management",
    semester: "Odd Semester 2023-24",
    responseCount: 42,
    averageRating: 4.2,
    status: "Completed",
  },
]

// Sample data for institution feedback reports
const initialInstitutionReports = [
  {
    id: 1,
    title: "Institution Infrastructure Feedback - 2023",
    targetAudience: "Students",
    semester: "Odd Semester 2023-24",
    responseCount: 320,
    averageRating: 4.1,
    status: "Completed",
  },
  {
    id: 2,
    title: "Administrative Services Feedback - 2023",
    targetAudience: "Students & Faculty",
    semester: "Odd Semester 2023-24",
    responseCount: 180,
    averageRating: 3.8,
    status: "Completed",
  },
]

export default function FeedbackReportsPage() {
  const [activeTab, setActiveTab] = useState("faculty")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  
  const [facultyReports, setFacultyReports] = useState(initialFacultyReports)
  const [institutionReports, setInstitutionReports] = useState(initialInstitutionReports)

  // Dialog States
  const [viewReport, setViewReport] = useState<any | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<any | null>(null)
  const [deleteId, setDeleteId] = useState<{id: number, type: 'faculty' | 'institution'} | null>(null)

  // Filter faculty reports based on search and filters
  const filteredFacultyReports = facultyReports.filter((report) => {
    const matchesSearch =
      report.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "" || selectedDepartment === "all" || report.department === selectedDepartment
    const matchesSemester = selectedSemester === "" || selectedSemester === "all" || report.semester === selectedSemester
    return matchesSearch && matchesDepartment && matchesSemester
  })

  // Filter institution reports based on search and filters
  const filteredInstitutionReports = institutionReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = selectedSemester === "" || selectedSemester === "all" || report.semester === selectedSemester
    return matchesSearch && matchesSemester
  })

  // Handlers
  const handleView = (report: any) => {
    setViewReport(report)
  }

  const handleEdit = (report: any) => {
    setEditData({...report})
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (activeTab === 'faculty') {
      setFacultyReports(prev => prev.map(r => r.id === editData.id ? editData : r))
    } else {
      setInstitutionReports(prev => prev.map(r => r.id === editData.id ? editData : r))
    }
    setIsEditing(false)
    setEditData(null)
  }

  const handleDelete = () => {
    if (deleteId) {
      if (deleteId.type === 'faculty') {
        setFacultyReports(prev => prev.filter(r => r.id !== deleteId.id))
      } else {
        setInstitutionReports(prev => prev.filter(r => r.id !== deleteId.id))
      }
      setDeleteId(null)
    }
  }

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feedback Reports</h1>
          <p className="text-muted-foreground">View and analyze feedback reports</p>
        </div>
      </div>

      <Tabs defaultValue="faculty" value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <div className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="faculty">Faculty Feedback</TabsTrigger>
            <TabsTrigger value="institution">Institution Feedback</TabsTrigger>
          </TabsList>
        </div>

        {/* Faculty Feedback Reports Tab */}
        <TabsContent value="faculty" className="w-full mt-0">
          <Card className="w-full border shadow-sm">
            <CardHeader>
              <CardTitle>Faculty Feedback Reports</CardTitle>
              <CardDescription>View and analyze faculty feedback reports</CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by faculty or subject..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="Information Science & Engineering">Information Science & Engineering</SelectItem>
                    <SelectItem value="Computer Science & Engineering">Computer Science & Engineering</SelectItem>
                    <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="Odd Semester 2023-24">Odd Semester 2023-24</SelectItem>
                    <SelectItem value="Even Semester 2023-24">Even Semester 2023-24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Avg. Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFacultyReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                          No reports found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredFacultyReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.faculty}</TableCell>
                          <TableCell>{report.subject}</TableCell>
                          <TableCell>{report.department}</TableCell>
                          <TableCell>{report.responseCount}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">{report.averageRating}</span>
                              <span className="text-xs text-muted-foreground">/5</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={report.status === "Completed" ? "default" : "secondary"}
                              className={report.status === "Completed" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View" onClick={() => handleView(report)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(report)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" title="Delete" onClick={() => setDeleteId({id: report.id, type: 'faculty'})}>
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

        {/* Institution Feedback Reports Tab */}
        <TabsContent value="institution" className="w-full mt-0">
          <Card className="w-full border shadow-sm">
            <CardHeader>
              <CardTitle>Institution Feedback Reports</CardTitle>
              <CardDescription>View and analyze institution feedback reports</CardDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Semesters</SelectItem>
                    <SelectItem value="Odd Semester 2023-24">Odd Semester 2023-24</SelectItem>
                    <SelectItem value="Even Semester 2023-24">Even Semester 2023-24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Target Audience</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Avg. Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInstitutionReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                          No reports found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredInstitutionReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.title}</TableCell>
                          <TableCell>{report.targetAudience}</TableCell>
                          <TableCell>{report.semester}</TableCell>
                          <TableCell>{report.responseCount}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="font-medium">{report.averageRating}</span>
                              <span className="text-xs text-muted-foreground">/5</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={report.status === "Completed" ? "default" : "secondary"}
                              className={report.status === "Completed" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                            >
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View" onClick={() => handleView(report)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(report)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" title="Delete" onClick={() => setDeleteId({id: report.id, type: 'institution'})}>
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
      </Tabs>

      {/* View Dialog */}
      <Dialog open={!!viewReport} onOpenChange={(open) => !open && setViewReport(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{viewReport?.title || `Report for ${viewReport?.faculty}`}</DialogTitle>
            <DialogDescription>Detailed view of the selected report.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Status:</Label>
              <Badge variant="outline" className="w-fit col-span-3">{viewReport?.status}</Badge>
            </div>
            {viewReport?.subject && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Subject:</Label>
                <span className="col-span-3">{viewReport.subject}</span>
              </div>
            )}
             {viewReport?.department && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Department:</Label>
                <span className="col-span-3">{viewReport.department}</span>
              </div>
            )}
             <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-bold">Semester:</Label>
                <span className="col-span-3">{viewReport?.semester}</span>
              </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Responses:</Label>
              <span className="col-span-3">{viewReport?.responseCount}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Rating:</Label>
              <span className="col-span-3 font-semibold text-lg">{viewReport?.averageRating} / 5</span>
            </div>
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={() => setViewReport(null)}>Close</Button>
             {/* <Button variant="default"><FileDown className="w-4 h-4 mr-2"/> Download PDF</Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={(open) => !open && setIsEditing(false)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
            <DialogDescription>Update the details for this report.</DialogDescription>
          </DialogHeader>
          {editData && (
            <div className="grid gap-4 py-4">
               {editData.faculty && (
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty" className="text-right">Faculty</Label>
                      <Input id="faculty" value={editData.faculty} onChange={(e) => setEditData({...editData, faculty: e.target.value})} className="col-span-3" />
                   </div>
               )}
               {editData.title && (
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">Title</Label>
                      <Input id="title" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} className="col-span-3" />
                   </div>
               )}
                {editData.subject && (
                   <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject" className="text-right">Subject</Label>
                      <Input id="subject" value={editData.subject} onChange={(e) => setEditData({...editData, subject: e.target.value})} className="col-span-3" />
                   </div>
               )}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="semester" className="text-right">Semester</Label>
                    <Select value={editData.semester} onValueChange={(value) => setEditData({...editData, semester: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Odd Semester 2023-24">Odd Semester 2023-24</SelectItem>
                        <SelectItem value="Even Semester 2023-24">Even Semester 2023-24</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Status</Label>
                    <Select value={editData.status} onValueChange={(value) => setEditData({...editData, status: value})}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this report? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}