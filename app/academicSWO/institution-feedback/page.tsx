"use client"

import { useState,useEffect } from "react"
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

// --- Types ---
type Question = {
  id: number
  text: string
  areaId: string 
}

type FeedbackArea = {
  id: string
  name: string
  isMandatory: boolean 
}

type FeedbackForm = {
  id: number
  title: string
  semester: string
  status: "Active" | "Inactive"
  createdAt: string
  description: string
  areas: FeedbackArea[] 
  questions: Question[]
}


export default function InstitutionFeedbackPage() {
  const [activeTab, setActiveTab] = useState("existing")
  const [forms, setForms] = useState<FeedbackForm[]>([])

  // Lookups
  const [semesters, setSemesters] = useState<Array<any>>([])

  // --- Form State ---
  const [isEditing, setIsEditing] = useState(false)
  const [currentFormId, setCurrentFormId] = useState<number | null>(null)
  
  const [formTitle, setFormTitle] = useState("")
  const [formSemester, setFormSemester] = useState("")
  const [formStatus, setFormStatus] = useState<boolean>(false)
  const [formDescription, setFormDescription] = useState("")
  
  // Dynamic Areas & Questions State
  const [areas, setAreas] = useState<FeedbackArea[]>([{ id: "default", name: "General", isMandatory: true }])
  const [questions, setQuestions] = useState<Question[]>([])
  
  // New Area Inputs
  const [newAreaName, setNewAreaName] = useState("")
  const [newAreaType, setNewAreaType] = useState<"mandatory" | "optional">("mandatory")

  // --- Dialog States ---
  const [viewForm, setViewForm] = useState<FeedbackForm | null>(null)
  const [toggleStatusForm, setToggleStatusForm] = useState<FeedbackForm | null>(null)

  // Load existing public forms and derive semesters
  const refreshForms = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public`)
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
      console.error('Error refreshing institution forms', err)
    }
  }

  // Load once on mount
  useEffect(() => { refreshForms() }, [])

  // --- Helper Functions ---

  const resetForm = () => {
    setFormTitle("")
    setFormSemester("")
    setFormStatus(false)
    setFormDescription("")
    setAreas([{ id: "default", name: "General", isMandatory: true }]) 
    setQuestions([])
    setIsEditing(false)
    setCurrentFormId(null)
    setNewAreaName("")
    setNewAreaType("mandatory")
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "create" && !isEditing) {
      resetForm()
    }
  }

  // --- Area Management ---

  const addArea = () => {
    if (!newAreaName.trim()) return
    const newId = `area_${Date.now()}`
    setAreas([...areas, { 
      id: newId, 
      name: newAreaName,
      isMandatory: newAreaType === "mandatory"
    }])
    setNewAreaName("")
    setNewAreaType("mandatory") 
  }

  const removeArea = (id: string) => {
    if (questions.some(q => q.areaId === id)) {
      alert("Cannot delete area containing questions. Remove questions first.")
      return
    }
    if (areas.length <= 1) return 
    setAreas(areas.filter(a => a.id !== id))
  }

  // --- Question Management ---

  const addQuestion = (areaId: string) => {
    setQuestions([...questions, { id: Date.now(), text: "", areaId }])
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const updateQuestion = (id: number, text: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)))
  }

  // --- CRUD Operations ---

  const handleSave = async () => {
    if (!formTitle || !formSemester) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const payload: any = {
        title: formTitle,
        description: formDescription,
        semester_id: Number(formSemester),
        areas: areas.map(a => ({ name: a.name, isMandatory: a.isMandatory, questions: questions.filter(q => q.areaId === a.id).map(q => ({ text: q.text, type: 'rating' })) })),
        is_mandatory: false
      }

      if (isEditing && currentFormId) {
        const res = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public/${currentFormId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (json.success) {
          if (formStatus) {
            await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public/${currentFormId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Active' }) })
          }
          await refreshForms()
          resetForm()
          setActiveTab('existing')
        } else {
          alert('Error updating form: ' + (json.message || 'unknown'))
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (json.success) {
          const newId = json.data?.id
          if (formStatus && newId) {
            await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public/${newId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Active' }) })
          }
          await refreshForms()
          resetForm()
          setActiveTab('existing')
        } else {
          alert('Error creating form: ' + (json.message || 'unknown'))
        }
      }
    } catch (err) {
      console.error('Error saving institution form', err)
      alert('Error saving form')
    }
  }

  const handleEdit = async (form: FeedbackForm) => {
    try {
      // Fetch full form details with areas and questions
      const res = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public/${form.id}`)
      const json = await res.json()
      if (json.success && json.data) {
        const fullForm = json.data
        setFormTitle(fullForm.title)
        setFormSemester(String(fullForm.semester_id || ''))
        setFormStatus(fullForm.status === "Active")
        setFormDescription(fullForm.description || "")
        
        if (fullForm.areas && Array.isArray(fullForm.areas)) {
          setAreas(fullForm.areas.map((a: any) => ({
            id: String(a.id),
            name: a.area_name || a.name || '',
            isMandatory: a.is_mandatory === 1
          })))
          const allQs = fullForm.allQuestions || fullForm.areas.flatMap((a: any) => a.questions || [])
          setQuestions(allQs.map((q: any) => ({
            id: q.id,
            text: q.question_text || q.text || '',
            areaId: String(q.area_id),
            type: q.question_type || 'rating'
          })))
        } else {
          setAreas([{ id: 'default', name: 'General', isMandatory: true }])
          setQuestions([])
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
      const res = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public/${toggleStatusForm.id}/status`, {
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
      console.error('Error toggling institution form status', err)
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
          <h1 className="text-3xl font-bold tracking-tight">Institution Feedback</h1>
          <p className="text-muted-foreground">Create dynamic feedback forms with custom areas</p>
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
              <CardTitle>Institution Feedback Forms</CardTitle>
              <CardDescription>View and manage existing feedback forms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%] min-w-[250px]">Title</TableHead>
                      <TableHead className="w-[20%] min-w-[150px]">Semester</TableHead>
                      <TableHead className="w-[15%] min-w-[100px]">Status</TableHead>
                      <TableHead className="w-[10%] min-w-[100px]">Created</TableHead>
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
                          <TableCell>{(form as any).semester_name || '-'}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={form.status === "Active" ? "default" : "secondary"}
                              className={form.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"}
                            >
                              {form.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date((form as any).created_at || form.createdAt || '').toLocaleDateString() || '-'}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" title="View" onClick={async () => {
                                try {
                                  const res = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public/${form.id}`)
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
              <CardTitle>{isEditing ? "Edit Feedback Form" : "Create New Institution Feedback Form"}</CardTitle>
              <CardDescription>
                Design a feedback form by creating areas (e.g., Canteen, Library) and adding specific questions to them.
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Form Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter a description for this feedback form" 
                    className="min-h-[80px] w-full resize-y"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2 flex flex-col justify-end pb-2">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30 h-[80px]">
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

              {/* Dynamic Areas & Questions Section */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">Feedback Areas & Questions</h3>
                  
                  {/* Add Area Controls */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Input 
                        placeholder="New Area Name (e.g. Canteen)" 
                        value={newAreaName} 
                        onChange={(e) => setNewAreaName(e.target.value)}
                        className="w-full sm:w-64"
                    />
                    <Select 
                      value={newAreaType} 
                      onValueChange={(val: "mandatory" | "optional") => setNewAreaType(val)}
                    >
                      <SelectTrigger className="w-full sm:w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mandatory">Mandatory</SelectItem>
                        <SelectItem value="optional">Optional</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addArea} disabled={!newAreaName.trim()} className="whitespace-nowrap">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Area
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {areas.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground">
                          Start by adding an area (e.g., Infrastructure, Library) above.
                      </div>
                  ) : (
                      areas.map((area) => (
                        <Card key={area.id} className="border shadow-sm">
                            <CardHeader className="pb-3 bg-muted/20 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-base font-medium">{area.name}</CardTitle>
                                    <Badge variant={area.isMandatory ? "default" : "outline"}>
                                        {area.isMandatory ? "Mandatory" : "Optional"}
                                    </Badge>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => addQuestion(area.id)}>
                                        <Plus className="h-3 w-3 mr-1" /> Add Question
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeArea(area.id)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                {questions.filter(q => q.areaId === area.id).length === 0 ? (
                                    <p className="text-sm text-muted-foreground text-center italic py-2">No questions added for {area.name} yet.</p>
                                ) : (
                                    questions.filter(q => q.areaId === area.id).map((question, index) => (
                                        <div key={question.id} className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0">
                                            <div className="flex-grow space-y-2">
                                                <Label className="text-xs text-muted-foreground">Question Text</Label>
                                                <Input
                                                    value={question.text}
                                                    onChange={(e) => updateQuestion(question.id, e.target.value)}
                                                    placeholder={`Enter question for ${area.name}`}
                                                />
                                            </div>
                                            
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-red-500 h-8 w-8 mt-6" 
                                                onClick={() => removeQuestion(question.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
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
            {/* <DialogDescription className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{viewForm?.semester}</Badge>
            </DialogDescription> */}
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground uppercase">Description</Label>
              <p className="text-sm">{viewForm?.description || "No description provided."}</p>
            </div>
            
            <div className="space-y-4">
              <Label className="text-sm text-muted-foreground uppercase">Feedback Areas & Questions</Label>
              {((viewForm as any)?.areas && Array.isArray((viewForm as any)?.areas) && (viewForm as any)?.areas.length > 0) ? (viewForm as any)?.areas.map((area: any) => {
                const areaQuestions = area.questions || [];
                return (
                  <div key={area.id} className="border rounded-md p-4 bg-muted/10">
                      <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-sm">{area.area_name || area.name}</h4>
                            <Badge variant={area.is_mandatory === 1 ? "default" : "outline"} className="text-[10px]">
                              {area.is_mandatory === 1 ? "Mandatory" : "Optional"}
                          </Badge>
                      </div>
                      <ul className="space-y-3">
                          {areaQuestions.length > 0 ? areaQuestions.map((q: any, i: number) => (
                              <li key={q.id || i} className="text-sm flex justify-between items-start gap-4 pl-4 border-l-2 border-muted">
                                  <span>{q.question_text || q.text}</span>
                              </li>
                          )) : <li className="text-xs text-muted-foreground italic">No questions in this area.</li>}
                      </ul>
                  </div>
                );
              }) : <div className="text-sm text-muted-foreground">No areas available.</div>}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewForm(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toggle Status Confirmation Dialog */}
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
              variant={confirmActionVariant} 
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