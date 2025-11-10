"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Edit, Trash2, Eye, Copy } from "lucide-react"

// Sample data for institution feedback forms
const feedbackForms = [
  {
    id: 1,
    title: "Institution Infrastructure Feedback - 2023",
    targetAudience: "Students",
    semester: "Odd Semester 2023-24",
    status: "Active",
    createdAt: "2023-08-10",
    questions: [
      {
        id: 1,
        text: "The classrooms are well-equipped with modern teaching aids.",
        type: "rating",
      },
      {
        id: 2,
        text: "The library has adequate resources for academic needs.",
        type: "rating",
      },
      {
        id: 3,
        text: "The computer labs are well-maintained and accessible.",
        type: "rating",
      },
      {
        id: 4,
        text: "The campus has good internet connectivity.",
        type: "rating",
      },
      {
        id: 5,
        text: "The canteen facilities are satisfactory.",
        type: "rating",
      },
      {
        id: 6,
        text: "What aspects of the institution's infrastructure need improvement?",
        type: "text",
      },
    ],
  },
  {
    id: 2,
    title: "Administrative Services Feedback - 2023",
    targetAudience: "Students & Faculty",
    semester: "Odd Semester 2023-24",
    status: "Draft",
    createdAt: "2023-08-18",
    questions: [
      {
        id: 1,
        text: "The administrative staff is helpful and responsive.",
        type: "rating",
      },
      {
        id: 2,
        text: "The admission process is well-organized and efficient.",
        type: "rating",
      },
      {
        id: 3,
        text: "The examination department functions efficiently.",
        type: "rating",
      },
      {
        id: 4,
        text: "What suggestions do you have to improve administrative services?",
        type: "text",
      },
    ],
  },
]

export default function InstitutionFeedbackPage() {
  const [activeTab, setActiveTab] = useState("existing")
  const [showForm, setShowForm] = useState(false)
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Institution Feedback</h1>
          <p className="text-muted-foreground">Create and manage institution feedback forms</p>
        </div>
        <Button
          onClick={() => {
            setShowForm(true)
            setActiveTab("create")
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Form
        </Button>
      </div>

      <Tabs defaultValue="existing" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="existing">Existing Forms</TabsTrigger>
          <TabsTrigger value="create">Create New Form</TabsTrigger>
        </TabsList>

        {/* Existing Forms Tab */}
        <TabsContent value="existing">
          <Card>
            <CardHeader>
              <CardTitle>Institution Feedback Forms</CardTitle>
              <CardDescription>View and manage existing feedback forms</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Target Audience</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbackForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.title}</TableCell>
                      <TableCell>{form.targetAudience}</TableCell>
                      <TableCell>{form.semester}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            form.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {form.status}
                        </span>
                      </TableCell>
                      <TableCell>{form.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Duplicate</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
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

        {/* Create New Form Tab */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Institution Feedback Form</CardTitle>
              <CardDescription>Design a new institution feedback form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input id="title" placeholder="Enter form title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select>
                    <SelectTrigger id="targetAudience">
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="faculty">Faculty</SelectItem>
                      <SelectItem value="both">Students & Faculty</SelectItem>
                      <SelectItem value="parents">Parents</SelectItem>
                      <SelectItem value="alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select>
                    <SelectTrigger id="semester">
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
                    <Label htmlFor="status">Activate immediately</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Form Description</Label>
                <Textarea placeholder="Enter a description for this feedback form" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Questions</Label>
                  <Button variant="outline" onClick={addQuestion}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                {questions.map((question, index) => (
                  <div key={question.id} className="border p-4 rounded-md space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Question {index + 1}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove Question</span>
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                      <Textarea
                        id={`question-${question.id}`}
                        placeholder="Enter question text"
                        value={question.text}
                        onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`type-${question.id}`}>Question Type</Label>
                      <Select
                        value={question.type}
                        onValueChange={(value) => updateQuestion(question.id, "type", value)}
                      >
                        <SelectTrigger id={`type-${question.id}`}>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rating">Rating (1-5)</SelectItem>
                          <SelectItem value="text">Text Response</SelectItem>
                          <SelectItem value="mcq">Multiple Choice</SelectItem>
                          <SelectItem value="yesno">Yes/No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false)
                  setActiveTab("existing")
                }}
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
