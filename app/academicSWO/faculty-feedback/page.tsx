"use client"

import { useState, useEffect } from "react"
import { API_BASE_URL } from '@/lib/api'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/admin/card"
import { Button } from "@/components/admin/button"
import { Input } from "@/components/admin/input"
import { Label } from "@/components/admin/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/select"
import { Textarea } from "@/components/admin/textarea"
import { Switch } from "@/components/admin/switch"
import { PlusCircle, Edit, Power, Eye, Plus, X, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/admin/dialog"
import { Badge } from "@/components/admin/badge"

// Types
type Question = {
  id: number
  text: string
}

type FeedbackForm = {
  id: number
  title: string
  department: string
  semester: string
  status: "Active" | "Inactive"
  createdAt: string
  description: string
  questions: Question[]
}


export default function FacultyFeedbackPage() {
  const [activeTab, setActiveTab] = useState("existing")
  const [forms, setForms] = useState<FeedbackForm[]>([])

  // Lookups
  const [departments, setDepartments] = useState<Array<any>>([])
  const [semesters, setSemesters] = useState<Array<any>>([])

  // Form State
  const [isEditing, setIsEditing] = useState(false)
  const [currentFormId, setCurrentFormId] = useState<number | null>(null)
  const [formTitle, setFormTitle] = useState("")
  const [formDepartment, setFormDepartment] = useState("")
  const [formSemester, setFormSemester] = useState("")
  const [formStatus, setFormStatus] = useState<boolean>(false)
  const [formDescription, setFormDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([{ id: 1, text: "" }])

  // Dialog States
  const [viewForm, setViewForm] = useState<FeedbackForm | null>(null)
  const [toggleStatusForm, setToggleStatusForm] = useState<FeedbackForm | null>(null)

  // Load forms, departments and semesters
  const refreshForms = async () => {
    try {
      const dRes = await fetch(`${API_BASE_URL}/departments`)
      const dJson = await dRes.json()
      if (dJson.success) setDepartments(dJson.data || [])

      const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public`)
      const json = await res.json()
      if (json.success) {
        setForms(json.data || [])
        const semMap: Record<string,string> = {}
        if (Array.isArray(json.data)) {
          json.data.forEach((f: any) => { if (f.semester_id && f.semester_name) semMap[String(f.semester_id)] = f.semester_name })
        }
        const semMapEntries = Object.entries(semMap)
        const sems = semMapEntries.map(([id,name]) => ({ id: Number(id), name }))
        setSemesters(sems)
      }
    } catch (err) {
      console.error('Error refreshing faculty forms', err)
    }
  }

  useEffect(() => { refreshForms() }, [])

  const resetForm = () => {
    setFormTitle("")
    setFormDepartment("")
    setFormSemester("")
    setFormStatus(false)
    setFormDescription("")
    setQuestions([{ id: 1, text: "" }])
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
    setQuestions([...questions, { id: Date.now(), text: "" }])
  }

  const removeQuestion = (id: number) => {
    if (questions.length <= 1) return
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: number, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)))
  }

  const handleSave = async () => {
    if (!formTitle || !formDepartment || !formSemester) {
      alert("Please fill in all required fields")
      return
    }

    // Filter out empty questions
    const filteredQuestions = questions
      .filter(q => q.text.trim().length > 0)
      .map(q => ({ text: q.text.trim(), type: 'rating' }))

    if (filteredQuestions.length === 0) {
      alert("Please add at least one question before saving the form")
      return
    }

    try {
      const payload: any = {
        title: formTitle,
        description: formDescription,
        department_id: Number(formDepartment),
        semester_id: Number(formSemester),
        areas: [],
        questions: filteredQuestions,
        is_mandatory: false
      }

      console.debug('Faculty form payload:', payload)

      if (isEditing && currentFormId) {
        const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${currentFormId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (json.success) {
          if (formStatus) {
            await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${currentFormId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Active' }) })
          }
          await refreshForms()
          resetForm()
          setActiveTab('existing')
        } else {
          alert('Error updating form: ' + (json.message || 'unknown'))
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (json.success) {
          const newId = json.data?.id
          if (formStatus && newId) {
            await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${newId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Active' }) })
          }
          await refreshForms()
          resetForm()
          setActiveTab('existing')
        } else {
          alert('Error creating form: ' + (json.message || 'unknown'))
        }
      }
    } catch (err) {
      console.error('Error saving faculty form', err)
      alert('Error saving form')
    }
  }

  const handleEdit = async (form: FeedbackForm) => {
    try {
      const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${form.id}`)
      const json = await res.json()
      if (json.success && json.data) {
        const fullForm = json.data
        setFormTitle(fullForm.title)
        setFormDepartment(String(fullForm.department_id || ''))
        setFormSemester(String(fullForm.semester_id || ''))
        setFormStatus(fullForm.status === "Active")
        setFormDescription(fullForm.description || "")
        
        // Fetch and load questions
        const allQs = fullForm.allQuestions || []
        if (Array.isArray(allQs) && allQs.length > 0) {
          setQuestions(allQs.map((q: any) => ({
            id: q.id,
            text: q.question_text || q.text || ''
          })))
        } else {
          setQuestions([{ id: 1, text: "" }])
        }
        
        setIsEditing(true)
        setCurrentFormId(form.id)
        setActiveTab("create")
      } else {
        alert('Error loading form details')
      }
    } catch (err) {
      console.error('Error fetching form details:', err)
      alert('Error loading form details')
    }
  }

  const handleToggleStatus = async () => {
    if (!toggleStatusForm) return
    try {
      const newStatus = toggleStatusForm.status === 'Active' ? 'Inactive' : 'Active'
      const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${toggleStatusForm.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const json = await res.json()
      if (json.success) {
        await refreshForms()
        setToggleStatusForm(null)
      } else {
        alert('Error toggling status: ' + (json.message || 'unknown'))
      }
    } catch (err) {
      console.error('Error toggling faculty form status', err)
      alert('Error toggling status')
    }
  }

  const isDeactivating = toggleStatusForm?.status === "Active";
  const confirmActionLabel = isDeactivating ? "Deactivate" : "Activate";
  const confirmActionVariant = isDeactivating ? "destructive" : "default";

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
                      <TableHead className="w-[40%] min-w-[250px]">Title</TableHead>
                      <TableHead className="w-[15%] min-w-[100px]">Department</TableHead>
                      <TableHead className="w-[15%] min-w-[100px]">Semester</TableHead>
                      <TableHead className="w-[15%] min-w-[100px]">Status</TableHead>
                      <TableHead className="w-[15%] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                          No feedback forms found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      forms.map((form) => (
                        <TableRow key={form.id}>
                          <TableCell className="font-medium">{form.title}</TableCell>
                          <TableCell>{(form as any).department_name || '-'}</TableCell>
                          <TableCell>{(form as any).semester_name || '-'}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={form.status === "Active" ? "default" : "secondary"}
                              className={form.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                            >
                              {form.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View" onClick={async () => {
                                try {
                                  const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${form.id}`)
                                  const json = await res.json()
                                  if (json.success) setViewForm(json.data)
                                  else alert('Error loading form details')
                                } catch (err) {
                                  console.error('Error loading form details', err)
                                  alert('Error loading form details')
                                }
                              }}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(form)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={form.status === "Active" ? "text-orange-500 hover:text-orange-600" : "text-green-600 hover:text-green-700"}
                                title={form.status === "Active" ? "Deactivate" : "Activate"} 
                                onClick={() => setToggleStatusForm(form)}
                              >
                                <Power className="h-4 w-4" />
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
              <CardTitle>{isEditing ? "Edit Feedback Form" : "Create New Faculty Feedback Form"}</CardTitle>
              <CardDescription>
                Design a feedback form by adding questions for faculty evaluation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Form Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      {departments.map((d) => (
                        <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select value={formSemester} onValueChange={setFormSemester}>
                    <SelectTrigger id="semester" className="w-full">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((s) => (
                        <SelectItem key={s.id} value={String(s.id)}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 flex flex-col justify-end pb-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 h-[44px]">
                    <div className="space-y-0.5">
                      <Label htmlFor="status" className="text-sm">Active</Label>
                    </div>
                    <Switch 
                      id="status" 
                      checked={formStatus}
                      onCheckedChange={setFormStatus}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Form Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter a description for this feedback form" 
                  className="min-h-[80px] w-full resize-y"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              {/* Questions Section */}
              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Questions ({questions.filter(q => q.text.trim().length > 0).length})</h3>
                  <Button onClick={addQuestion} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>

                <div className="space-y-4">
                  {questions.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground">
                      No questions added yet. Click "Add Question" to get started.
                    </div>
                  ) : (
                    questions.map((question, index) => (
                      <div key={question.id} className="flex items-end gap-4 p-4 border rounded-lg bg-muted/10">
                        <div className="flex-grow space-y-2">
                          <Label className="text-sm font-medium">Question {index + 1}</Label>
                          <Input
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, e.target.value)}
                            placeholder="Enter your question here..."
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeQuestion(question.id)}
                          disabled={questions.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
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
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground uppercase">Description</Label>
              <p className="text-sm">{viewForm?.description || "No description provided."}</p>
            </div>
            
            <div className="space-y-4">
              <Label className="text-sm text-muted-foreground uppercase">Questions ({(viewForm as any)?.allQuestions?.length || 0})</Label>
              {((viewForm as any)?.allQuestions && Array.isArray((viewForm as any)?.allQuestions) && (viewForm as any)?.allQuestions.length > 0) ? (
                <ul className="space-y-3">
                  {(viewForm as any)?.allQuestions.map((q: any, i: number) => (
                    <li key={q.id || i} className="text-sm flex gap-4 p-3 border rounded-lg bg-muted/10">
                      <span className="text-muted-foreground font-medium min-w-fit">{i + 1}.</span>
                      <span>{q.question_text || q.text}</span>
                    </li>
                  ))}
                </ul>
              ) : <div className="text-sm text-muted-foreground italic">No questions available.</div>}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewForm(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!toggleStatusForm} onOpenChange={(open) => !open && setToggleStatusForm(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{confirmActionLabel} Feedback Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to {confirmActionLabel.toLowerCase()} this form?
              {isDeactivating 
                ? " Students will no longer be able to submit feedback." 
                : " This will deactivate any other currently active form."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setToggleStatusForm(null)}>
              Cancel
            </Button>
            <Button 
              variant={confirmActionVariant as any} 
              onClick={handleToggleStatus}
            >
              {confirmActionLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
