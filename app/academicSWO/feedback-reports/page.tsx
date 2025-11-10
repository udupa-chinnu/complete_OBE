"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { BarChart, FileDown, FileText, Search } from "lucide-react"

// Sample data for faculty feedback reports
const facultyReports = [
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
  {
    id: 3,
    faculty: "Dr. Kumar",
    department: "Information Science & Engineering",
    subject: "Computer Networks",
    semester: "Odd Semester 2023-24",
    responseCount: 38,
    averageRating: 4.7,
    status: "Completed",
  },
  {
    id: 4,
    faculty: "Dr. Singh",
    department: "Information Science & Engineering",
    subject: "Operating Systems",
    semester: "Odd Semester 2023-24",
    responseCount: 40,
    averageRating: 4.0,
    status: "In Progress",
  },
]

// Sample data for institution feedback reports
const institutionReports = [
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
  {
    id: 3,
    title: "Library Services Feedback - 2023",
    targetAudience: "Students",
    semester: "Odd Semester 2023-24",
    responseCount: 290,
    averageRating: 4.3,
    status: "In Progress",
  },
]

export default function FeedbackReportsPage() {
  const [activeTab, setActiveTab] = useState("faculty")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("")

  // Filter faculty reports based on search and filters
  const filteredFacultyReports = facultyReports.filter((report) => {
    const matchesSearch =
      report.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "" || report.department === selectedDepartment
    const matchesSemester = selectedSemester === "" || report.semester === selectedSemester
    return matchesSearch && matchesDepartment && matchesSemester
  })

  // Filter institution reports based on search and filters
  const filteredInstitutionReports = institutionReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSemester = selectedSemester === "" || report.semester === selectedSemester
    return matchesSearch && matchesSemester
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feedback Reports</h1>
          <p className="text-muted-foreground">View and analyze feedback reports</p>
        </div>
      </div>

      <Tabs defaultValue="faculty" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="faculty">Faculty Feedback</TabsTrigger>
          <TabsTrigger value="institution">Institution Feedback</TabsTrigger>
        </TabsList>

        {/* Faculty Feedback Reports Tab */}
        <TabsContent value="faculty">
          <Card>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Responses</TableHead>
                    <TableHead>Avg. Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFacultyReports.map((report) => (
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
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            report.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Report</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <BarChart className="h-4 w-4" />
                            <span className="sr-only">View Analytics</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileDown className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Institution Feedback Reports Tab */}
        <TabsContent value="institution">
          <Card>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Target Audience</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Responses</TableHead>
                    <TableHead>Avg. Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInstitutionReports.map((report) => (
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
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            report.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View Report</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <BarChart className="h-4 w-4" />
                            <span className="sr-only">View Analytics</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileDown className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
