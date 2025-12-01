"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/admin/card"
import { Button } from "@/components/admin/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/select"
import { Input } from "@/components/admin/input"
import { Search, Eye, FileDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/admin/dialog"
import { Label } from "@/components/admin/label"

// --- Types ---
type FacultyReport = {
  id: number
  faculty: string
  department: string
  subject: string
  semester: string
  responseCount: number
  isActive: boolean
}

type InstitutionReport = {
  id: number
  title: string
  semester: string
  responseCount: number
  isActive: boolean
}

type GraduateExitReport = {
  id: number
  title: string
  batch: string
  responseCount: number
  isActive: boolean
}

// --- Initial Data ---
const initialFacultyReports: FacultyReport[] = [
  {
    id: 1,
    faculty: "Dr. Sharma",
    department: "Information Science & Engineering",
    subject: "Data Structures",
    semester: "Odd Semester 2023-24",
    responseCount: 45,
    isActive: true,
  },
  {
    id: 2,
    faculty: "Dr. Patel",
    department: "Information Science & Engineering",
    subject: "Database Management",
    semester: "Odd Semester 2023-24",
    responseCount: 42,
    isActive: false,
  },
]

const initialInstitutionReports: InstitutionReport[] = [
  {
    id: 1,
    title: "Institution Infrastructure Feedback - 2023",
    semester: "Odd Semester 2023-24",
    responseCount: 320,
    isActive: true,
  },
  {
    id: 2,
    title: "Administrative Services Feedback - 2023",
    semester: "Odd Semester 2023-24",
    responseCount: 180,
    isActive: false,
  },
]

const initialGraduateExitReports: GraduateExitReport[] = [
  {
    id: 1,
    title: "Graduate Exit Survey - 2024",
    batch: "2020-2024",
    responseCount: 150,
    isActive: true,
  },
  {
    id: 2,
    title: "Graduate Exit Survey - 2023",
    batch: "2019-2023",
    responseCount: 145,
    isActive: false,
  },
]

export default function FeedbackReportsPage() {
  const [activeTab, setActiveTab] = useState("faculty")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")
  
  // Data States
  const [facultyReports] = useState(initialFacultyReports)
  const [institutionReports] = useState(initialInstitutionReports)
  const [graduateExitReports] = useState(initialGraduateExitReports)

  // Dialog States
  const [viewReport, setViewReport] = useState<any | null>(null)

  // Filter faculty reports
  const filteredFacultyReports = facultyReports.filter((report) => {
    const matchesSearch =
      report.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "" || selectedDepartment === "all" || report.department === selectedDepartment
    const matchesSemester = selectedSemester === "" || selectedSemester === "all" || report.semester === selectedSemester
    return matchesSearch && matchesDepartment && matchesSemester
  })

  // Filter institution reports
  const filteredInstitutionReports = institutionReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = selectedSemester === "" || selectedSemester === "all" || report.semester === selectedSemester
    return matchesSearch && matchesSemester
  })

  // Filter graduate exit reports
  const filteredGraduateExitReports = graduateExitReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Handlers
  const handleView = (report: any) => {
    setViewReport(report)
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
          <TabsList className="grid w-full md:w-[600px] grid-cols-3">
            <TabsTrigger value="faculty">Faculty Feedback</TabsTrigger>
            <TabsTrigger value="institution">Institution Feedback</TabsTrigger>
            <TabsTrigger value="graduate-exit">Graduate Exit Survey</TabsTrigger>
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
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFacultyReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
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
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View Details" onClick={() => handleView(report)}>
                                <Eye className="h-4 w-4" />
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
                      <TableHead>Semester</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInstitutionReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                          No reports found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredInstitutionReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.title}</TableCell>
                          <TableCell>{report.semester}</TableCell>
                          <TableCell>{report.responseCount}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View Report" onClick={() => handleView(report)}>
                                <Eye className="h-4 w-4" />
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

        {/* Graduate Exit Survey Reports Tab */}
        <TabsContent value="graduate-exit" className="w-full mt-0">
          <Card className="w-full border shadow-sm">
            <CardHeader>
              <CardTitle>Graduate Exit Survey Reports</CardTitle>
              <CardDescription>Analyze feedback from graduating students</CardDescription>
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
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGraduateExitReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                          No reports found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredGraduateExitReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.title}</TableCell>
                          <TableCell>{report.batch}</TableCell>
                          <TableCell>{report.responseCount}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View Report" onClick={() => handleView(report)}>
                                <Eye className="h-4 w-4" />
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
            {viewReport?.semester && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-bold">Semester:</Label>
                    <span className="col-span-3">{viewReport.semester}</span>
                </div>
            )}
            {viewReport?.batch && (
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-bold">Batch:</Label>
                    <span className="col-span-3">{viewReport.batch}</span>
                </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-bold">Responses:</Label>
              <span className="col-span-3">{viewReport?.responseCount}</span>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
             <Button variant="outline" onClick={() => setViewReport(null)}>Close</Button>
             <Button variant="default"><FileDown className="w-4 h-4 mr-2"/> Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}