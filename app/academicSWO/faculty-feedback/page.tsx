"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/admin/card"
import { Button } from "@/components/admin/button"
import { Input } from "@/components/admin/input"
import { Label } from "@/components/admin/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/select"
import { Textarea } from "@/components/admin/textarea"
import { Switch } from "@/components/admin/switch"
import { PlusCircle, Edit, Trash2, Eye, Copy } from "lucide-react"

// Sample data for faculty feedback forms
const feedbackForms = [
  {
    id: 1,
    title: "Faculty Performance Evaluation - 2023",
    department: "Information Science & Engineering",
    semester: "Odd Semester 2023-24",
    status: "Active",
    createdAt: "2023-08-15",
    questions: [
      { id: 1, text: "The faculty is well prepared for the class...", type: "rating" },
      // ... abbreviated for brevity
    ],
  },
  {
    id: 2,
    title: "Lab Instruction Evaluation - 2023",
    department: "Information Science & Engineering",
    semester: "Odd Semester 2023-24",
    status: "Draft",
    createdAt: "2023-08-20",
    questions: [
      { id: 1, text: "The lab instructor explains the experiments...", type: "rating" },
    ],
  },
]

export default function FacultyFeedbackPage() {
  const [activeTab, setActiveTab] = useState("existing")
  const [questions, setQuestions] = useState<{ id: number; text: string; type: string }[]>([
    { id: 1, text: "", type: "rating" },
  ])

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: "", type: "rating" }])
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Feedback</h1>
          <p className="text-muted-foreground">Create and manage faculty feedback forms</p>
        </div>
      </div>

      <Tabs defaultValue="existing" value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
        <div className="w-full mb-4">
          {/* Removed max-w-md to allow tabs to fill width on smaller screens or look balanced */}
          <TabsList className="grid w-full md:w-auto md:inline-grid md:grid-cols-2 min-w-[400px]">
            <TabsTrigger value="existing">Existing Forms</TabsTrigger>
            <TabsTrigger value="create">Create New Form</TabsTrigger>
          </TabsList>
        </div>

        {/* Existing Forms Tab */}
        <TabsContent value="existing" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Faculty Feedback Forms</CardTitle>
              <CardDescription>View and manage existing feedback forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feedbackForms.map((form) => (
                      <TableRow key={form.id}>
                        <TableCell className="font-medium">{form.title}</TableCell>
                        <TableCell>{form.department}</TableCell>
                        <TableCell>{form.semester}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              form.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {form.status}
                          </span>
                        </TableCell>
                        <TableCell>{form.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Create New Form Tab */}
        <TabsContent value="create" className="w-full">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create New Feedback Form</CardTitle>
              <CardDescription>Design a new faculty feedback form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form Grid: Stacks on mobile, 2 columns on medium screens, fills width */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input id="title" placeholder="Enter form title" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger id="department" className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Information Science & Engineering</SelectItem>
                      <SelectItem value="cs">Computer Science & Engineering</SelectItem>
                      <SelectItem value="ec">Electronics & Communication</SelectItem>
                      <SelectItem value="me">Mechanical Engineering</SelectItem>
                      <SelectItem value="cv">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select>
                    <SelectTrigger id="semester" className="w-full">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="odd-2023">Odd Semester 2023-24</SelectItem>
                      <SelectItem value="even-2023">Even Semester 2023-24</SelectItem>
                      <SelectItem value="odd-2024">Odd Semester 2024-25</SelectItem>
                      <SelectItem value="even-2024">Even Semester 2024-25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="status" />
                    <Label htmlFor="status" className="cursor-pointer">Activate immediately</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Form Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter a description for this feedback form" 
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Label className="text-lg font-medium">Questions</Label>
                  <Button variant="outline" onClick={addQuestion} className="w-full sm:w-auto">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border p-4 rounded-md space-y-4 bg-card">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Question {index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove Question</span>
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                          <Textarea
                            id={`question-${question.id}`}
                            placeholder="Enter question text"
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`type-${question.id}`}>Question Type</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value) => updateQuestion(question.id, "type", value)}
                          >
                            <SelectTrigger id={`type-${question.id}`}>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rating">Rating (1-5)</SelectItem>
                              <SelectItem value="text">Text Response</SelectItem>
                              <SelectItem value="mcq">Multiple Choice</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button
                variant="outline"
                onClick={() => setActiveTab("existing")}
              >
                Cancel
              </Button>
              <Button>Save Feedback Form</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}