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
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/admin/dialog"
import { Badge } from "@/components/admin/badge"

// Types
type Question = {
  id: number
  text: string
  type: string
}

type FeedbackForm = {
  id: number
  title: string
  department: string
  semester: string
  status: "Active" | "Draft"
  createdAt: string
  description: string
  questions: Question[]
}

// Sample data
const initialForms: FeedbackForm[] = [
  {
    id: 1,
    title: "Faculty Performance Evaluation - 2023",
    department: "Information Science & Engineering",
    semester: "Odd Semester 2023-24",
    status: "Active",
    createdAt: "2023-08-15",
    description: "Standard evaluation form for faculty performance.",
    questions: [
      { id: 1, text: "The faculty is well prepared for the class and delivers the content effectively.", type: "rating" },
      { id: 2, text: "The faculty encourages student participation and interaction.", type: "rating" },
    ],
  },
  {
    id: 2,
    title: "Lab Instruction Evaluation - 2023",
    department: "Information Science & Engineering",
    semester: "Odd Semester 2023-24",
    status: "Draft",
    createdAt: "2023-08-20",
    description: "Feedback regarding laboratory sessions.",
    questions: [
      { id: 1, text: "The lab instructor explains the experiments clearly.", type: "rating" },
    ],
  },
]

export default function FacultyFeedbackPage() {
  const [activeTab, setActiveTab] = useState("existing")
  const [forms, setForms] = useState<FeedbackForm[]>(initialForms)
  
  // Form State
  const [isEditing, setIsEditing] = useState(false)
  const [currentFormId, setCurrentFormId] = useState<number | null>(null)
  const [formTitle, setFormTitle] = useState("")
  const [formDepartment, setFormDepartment] = useState("")
  const [formSemester, setFormSemester] = useState("")
  const [formStatus, setFormStatus] = useState<boolean>(false) // false = Draft, true = Active
  const [formDescription, setFormDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([{ id: 1, text: "", type: "rating" }])

  // Dialog States
  const [viewForm, setViewForm] = useState<FeedbackForm | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  // --- Form Handlers ---

  const resetForm = () => {
    setFormTitle("")
    setFormDepartment("")
    setFormSemester("")
    setFormStatus(false)
    setFormDescription("")
    setQuestions([{ id: 1, text: "", type: "rating" }])
    setIsEditing(false)
    setCurrentFormId(null)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "create" && !isEditing) {
      resetForm()
    }
  }

  const addQuestion = () => {
    setQuestions([...questions, { id: Date.now(), text: "", type: "rating" }])
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const handleSave = () => {
    if (!formTitle || !formDepartment || !formSemester) {
      alert("Please fill in all required fields")
      return
    }

    const formData: FeedbackForm = {
      id: isEditing && currentFormId ? currentFormId : Date.now(),
      title: formTitle,
      department: formDepartment,
      semester: formSemester,
      status: formStatus ? "Active" : "Draft",
      createdAt: isEditing 
        ? forms.find(f => f.id === currentFormId)?.createdAt || new Date().toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      description: formDescription,
      questions: questions,
    }

    if (isEditing) {
      setForms(forms.map(f => f.id === currentFormId ? formData : f))
    } else {
      setForms([...forms, formData])
    }

    resetForm()
    setActiveTab("existing")
  }

  // --- Action Handlers ---

  const handleEdit = (form: FeedbackForm) => {
    setFormTitle(form.title)
    setFormDepartment(form.department)
    setFormSemester(form.semester)
    setFormStatus(form.status === "Active")
    setFormDescription(form.description || "")
    setQuestions(form.questions.map(q => ({...q}))) // Deep copy questions
    
    setIsEditing(true)
    setCurrentFormId(form.id)
    setActiveTab("create")
  }

  const handleDelete = () => {
    if (deleteId) {
      setForms(forms.filter(f => f.id !== deleteId))
      setDeleteId(null)
    }
  }

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Feedback</h1>
          <p className="text-muted-foreground">Create and manage faculty feedback forms</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col space-y-6">
        <div className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="existing">Existing Forms</TabsTrigger>
            <TabsTrigger value="create">{isEditing ? "Edit Form" : "Create New Form"}</TabsTrigger>
          </TabsList>
        </div>

        {/* Existing Forms Tab */}
        <TabsContent value="existing" className="w-full mt-0">
          <Card className="w-full border shadow-sm">
            <CardHeader>
              <CardTitle>Faculty Feedback Forms</CardTitle>
              <CardDescription>View and manage existing feedback forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%] min-w-[200px]">Title</TableHead>
                      <TableHead className="w-[20%] min-w-[150px]">Department</TableHead>
                      <TableHead className="w-[15%] min-w-[120px]">Semester</TableHead>
                      <TableHead className="w-[10%] min-w-[100px]">Status</TableHead>
                      <TableHead className="w-[10%] min-w-[100px]">Created</TableHead>
                      <TableHead className="w-[15%] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                          No feedback forms found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      forms.map((form) => (
                        <TableRow key={form.id}>
                          <TableCell className="font-medium">{form.title}</TableCell>
                          <TableCell>{form.department}</TableCell>
                          <TableCell>{form.semester}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={form.status === "Active" ? "default" : "secondary"}
                              className={form.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                            >
                              {form.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{form.createdAt}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="View"
                                onClick={() => setViewForm(form)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                title="Edit"
                                onClick={() => handleEdit(form)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-500 hover:text-red-600" 
                                title="Delete"
                                onClick={() => setDeleteId(form.id)}
                              >
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

        {/* Create/Edit Form Tab */}
        <TabsContent value="create" className="w-full mt-0">
          <Card className="w-full border shadow-sm">
            <CardHeader>
              <CardTitle>{isEditing ? "Edit Feedback Form" : "Create New Feedback Form"}</CardTitle>
              <CardDescription>
                {isEditing ? "Update the existing form details below" : "Design a new faculty feedback form"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter form title" 
                    className="w-full"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formDepartment} onValueChange={setFormDepartment}>
                    <SelectTrigger id="department" className="w-full">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Information Science & Engineering">Information Science & Engineering</SelectItem>
                      <SelectItem value="Computer Science & Engineering">Computer Science & Engineering</SelectItem>
                      <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                      <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                      <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={formSemester} onValueChange={setFormSemester}>
                    <SelectTrigger id="semester" className="w-full">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Odd Semester 2023-24">Odd Semester 2023-24</SelectItem>
                      <SelectItem value="Even Semester 2023-24">Even Semester 2023-24</SelectItem>
                      <SelectItem value="Odd Semester 2024-25">Odd Semester 2024-25</SelectItem>
                      <SelectItem value="Even Semester 2024-25">Even Semester 2024-25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Form Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter a description for this feedback form" 
                    className="min-h-[120px] w-full resize-y"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex flex-col justify-end pb-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 h-[120px]">
                    <div className="space-y-0.5">
                      <Label htmlFor="status" className="text-base">Active Status</Label>
                      <p className="text-sm text-muted-foreground">Enable to make visible</p>
                    </div>
                    <Switch 
                      id="status" 
                      checked={formStatus}
                      onCheckedChange={setFormStatus}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <Label className="text-xl font-semibold">Questions</Label>
                  <Button onClick={addQuestion} className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Question
                  </Button>
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={question.id} className="border p-6 rounded-lg space-y-4 bg-card hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between border-b pb-3">
                        <h3 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Question {index + 1}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3 space-y-2">
                          <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                          <Input
                            id={`question-${question.id}`}
                            placeholder="Type your question here..."
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`type-${question.id}`}>Response Type</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value) => updateQuestion(question.id, "type", value)}
                          >
                            <SelectTrigger id={`type-${question.id}`} className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rating">Rating Scale (1-5)</SelectItem>
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
            <CardFooter className="flex justify-between border-t p-6 bg-muted/10">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm()
                  setActiveTab("existing")
                }}
                className="w-32"
              >
                Cancel
              </Button>
              <Button className="w-32" onClick={handleSave}>
                {isEditing ? "Update Form" : "Save Form"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Dialog */}
      <Dialog open={!!viewForm} onOpenChange={(open) => !open && setViewForm(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{viewForm?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{viewForm?.department}</Badge>
              <span>•</span>
              <span>{viewForm?.semester}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground uppercase">Description</Label>
              <p className="text-sm">{viewForm?.description || "No description provided."}</p>
            </div>
            
            <div className="space-y-3">
              <Label className="text-sm text-muted-foreground uppercase">Questions ({viewForm?.questions.length})</Label>
              <div className="border rounded-md divide-y">
                {viewForm?.questions.map((q, i) => (
                  <div key={q.id} className="p-3 text-sm flex justify-between items-start gap-4">
                    <span>{i + 1}. {q.text}</span>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">{q.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewForm(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Feedback Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this form? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}