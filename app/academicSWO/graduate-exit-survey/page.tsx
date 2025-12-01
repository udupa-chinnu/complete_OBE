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
  batch: string
  status: "Active" | "Inactive"
  createdAt: string
  description: string
  areas: FeedbackArea[] 
  questions: Question[]
}

// --- Default Areas & Questions from Images ---
const DEFAULT_AREAS = [
  { id: "personal", name: "Personal Details", isMandatory: true },
  { id: "placement", name: "Placement Details", isMandatory: true },
  { id: "learning_quality", name: "Quality of Instructions & Support", isMandatory: true },
  { id: "facilities_academic", name: "Facilities Offered for Academics", isMandatory: true },
  { id: "academic_services", name: "Academic Services", isMandatory: true },
  { id: "general_facilities", name: "General Facilities", isMandatory: true },
  { id: "graduation_feedback", name: "Graduation Feedback (Capabilities)", isMandatory: true },
  { id: "subjective", name: "Subjective Feedback", isMandatory: true },
  { id: "suggestions", name: "Suggestions & Recommendation", isMandatory: true },
]


const DEFAULT_QUESTIONS: Question[] = [
  // PERSONAL (text fields, but stored as questions for CRUD)
  { id: 1, text: "Name of the Graduating Student", areaId: "personal" },
  { id: 2, text: "Date of Birth", areaId: "personal" },
  { id: 3, text: "University Seat No", areaId: "personal" },
  { id: 4, text: "Academic Batch", areaId: "personal" },
  { id: 5, text: "Department", areaId: "personal" },
  { id: 6, text: "Contact Number", areaId: "personal" },
  { id: 7, text: "Email ID", areaId: "personal" },
  { id: 8, text: "Father's Name", areaId: "personal" },
  { id: 9, text: "Permanent Address", areaId: "personal" },

  // PLACEMENT
  { id: 10, text: "Mode of Placement (On Campus / Off Campus / Not Placed)", areaId: "placement" },
  { id: 11, text: "Name of Company & Designation", areaId: "placement" },
  { id: 12, text: "Career Preference (Core Engg / R&D / Public Sector / etc.)", areaId: "placement" },

  // QUALITY OF INSTRUCTIONS (1–10)
  { id: 20, text: "Basic Sciences (Maths, Physics, Chemistry)", areaId: "learning_quality" },
  { id: 21, text: "Foundation Courses in Engineering", areaId: "learning_quality" },
  { id: 22, text: "Applied & Specialized Engineering Courses", areaId: "learning_quality" },
  { id: 23, text: "Computers (Programming, Software Usage)", areaId: "learning_quality" },
  { id: 24, text: "Humanities & Management Courses", areaId: "learning_quality" },
  { id: 25, text: "Languages (English & Kannada)", areaId: "learning_quality" },
  { id: 26, text: "Additional Teaching Resources (Videos, PPTs)", areaId: "learning_quality" },
  { id: 27, text: "Technical Staff Support", areaId: "learning_quality" },
  { id: 28, text: "Mentoring by Faculty", areaId: "learning_quality" },
  { id: 29, text: "Treatment by Principal, HoD & Staff Members", areaId: "learning_quality" },

  // ACADEMIC FACILITIES
  { id: 30, text: "Classrooms", areaId: "facilities_academic" },
  { id: 31, text: "Multimedia Facilities", areaId: "facilities_academic" },
  { id: 32, text: "Basic Sciences Lab", areaId: "facilities_academic" },
  { id: 33, text: "Engineering Labs", areaId: "facilities_academic" },
  { id: 34, text: "Internet / Wi-Fi", areaId: "facilities_academic" },
  { id: 35, text: "Department Library", areaId: "facilities_academic" },
  { id: 36, text: "Hands-On Laboratory", areaId: "facilities_academic" },
  { id: 37, text: "Academic Projects / Seminars", areaId: "facilities_academic" },
  { id: 38, text: "Industry Connect Laboratory", areaId: "facilities_academic" },
  { id: 39, text: "Green Technology", areaId: "facilities_academic" },
  { id: 40, text: "Social Innovation", areaId: "facilities_academic" },
  { id: 41, text: "Connectivity with Premier Institutions", areaId: "facilities_academic" },
  { id: 42, text: "Department Association", areaId: "facilities_academic" },

  // ACADEMIC SERVICES
  { id: 50, text: "Examination Cell", areaId: "academic_services" },
  { id: 51, text: "Placement & Training Cell", areaId: "academic_services" },
  { id: 52, text: "Library Services", areaId: "academic_services" },
  { id: 53, text: "College Office", areaId: "academic_services" },
  { id: 54, text: "Student Welfare Office", areaId: "academic_services" },
  { id: 55, text: "Reprographics & Stationery", areaId: "academic_services" },

  // GENERAL FACILITIES
  { id: 60, text: "Sports & Gymnasium", areaId: "general_facilities" },
  { id: 61, text: "Seminar Hall / Auditorium", areaId: "general_facilities" },
  { id: 62, text: "Canteen / Food Court", areaId: "general_facilities" },
  { id: 63, text: "Clubs for Personality Development", areaId: "general_facilities" },
  { id: 64, text: "Healthcare / Counselling Center", areaId: "general_facilities" },
  { id: 65, text: "Security & Safety", areaId: "general_facilities" },
  { id: 66, text: "Transport", areaId: "general_facilities" },
  { id: 67, text: "Hostel", areaId: "general_facilities" },
  { id: 68, text: "Drinking Water / Hygiene", areaId: "general_facilities" },
  { id: 69, text: "Parking Lot", areaId: "general_facilities" },

  // GRADUATION FEEDBACK (Capabilities)
  { id: 80, text: "Ability to gather information properly", areaId: "graduation_feedback" },
  { id: 81, text: "Ability to interpret & present information", areaId: "graduation_feedback" },
  { id: 82, text: "Ability to design feasible engineering solutions", areaId: "graduation_feedback" },
  { id: 83, text: "Teamwork / Leadership readiness", areaId: "graduation_feedback" },
  { id: 84, text: "Ability to communicate effectively", areaId: "graduation_feedback" },
  { id: 85, text: "Professional ethics awareness", areaId: "graduation_feedback" },
  { id: 86, text: "Ability to plan & manage projects", areaId: "graduation_feedback" },
  { id: 87, text: "Readiness for independent learning", areaId: "graduation_feedback" },
  { id: 88, text: "Placement confidence / career readiness", areaId: "graduation_feedback" },
  { id: 89, text: "Ability to adapt to new technology", areaId: "graduation_feedback" },
  { id: 90, text: "Satisfaction with academic program at Sahyadri", areaId: "graduation_feedback" },

  // SUBJECTIVE FEEDBACK
  { id: 100, text: "Strengths", areaId: "subjective" },
  { id: 101, text: "Areas of Improvement", areaId: "subjective" },
  { id: 102, text: "Important skills developed", areaId: "subjective" },
  { id: 103, text: "Learning/Field experience valued the most", areaId: "subjective" },
  { id: 104, text: "Anything that inspired you / changed your ideas about the world", areaId: "subjective" },

  // SUGGESTIONS & RECOMMENDATIONS
  { id: 110, text: "Any suggestions for improving the department", areaId: "suggestions" },
  { id: 111, text: "Any suggestions for improving the institute", areaId: "suggestions" },
  { id: 112, text: "Would you recommend Sahyadri to others? (Yes/No)", areaId: "suggestions" },
  { id: 113, text: "Reason for your recommendation choice", areaId: "suggestions" },
]


const initialForms: FeedbackForm[] = [
  {
    id: 1,
    title: "Graduate Exit Survey - 2024",
    batch: "2020-2024",
    status: "Active",
    createdAt: "2024-05-15",
    description: "Survey for graduating students to assess program outcomes and facilities.",
    areas: DEFAULT_AREAS,
    questions: DEFAULT_QUESTIONS,
  },
]

export default function GraduateExitSurveyPage() {
  const [activeTab, setActiveTab] = useState("existing")
  const [forms, setForms] = useState<FeedbackForm[]>(initialForms)

  // --- Form State ---
  const [isEditing, setIsEditing] = useState(false)
  const [currentFormId, setCurrentFormId] = useState<number | null>(null)
  
  const [formTitle, setFormTitle] = useState("")
  const [formBatch, setFormBatch] = useState("")
  const [formStatus, setFormStatus] = useState<boolean>(false)
  const [formDescription, setFormDescription] = useState("")
  
  // Dynamic Areas & Questions State
  const [areas, setAreas] = useState<FeedbackArea[]>([...DEFAULT_AREAS])
  const [questions, setQuestions] = useState<Question[]>([...DEFAULT_QUESTIONS])
  
  // New Area Inputs
  const [newAreaName, setNewAreaName] = useState("")
  const [newAreaType, setNewAreaType] = useState<"mandatory" | "optional">("mandatory")

  // --- Dialog States ---
  const [viewForm, setViewForm] = useState<FeedbackForm | null>(null)
  const [toggleStatusForm, setToggleStatusForm] = useState<FeedbackForm | null>(null)

  // --- Helper Functions ---

  const resetForm = () => {
    setFormTitle("")
    setFormBatch("")
    setFormStatus(false)
    setFormDescription("")
    setAreas([...DEFAULT_AREAS]) 
    setQuestions([...DEFAULT_QUESTIONS])
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

  const handleSave = () => {
    if (!formTitle || !formBatch) {
      alert("Please fill in all required fields")
      return
    }

    // Logic to handle single active form
    let updatedForms = [...forms];
    const newStatus = formStatus ? "Active" : "Inactive";

    // If creating/updating to 'Active', deactivate others
    if (newStatus === "Active") {
      updatedForms = updatedForms.map(f => ({
        ...f,
        status: f.id === currentFormId ? "Active" : "Inactive"
      }));
    }

    const formData: FeedbackForm = {
      id: isEditing && currentFormId ? currentFormId : Date.now(),
      title: formTitle,
      batch: formBatch,
      status: newStatus,
      createdAt: isEditing 
        ? forms.find(f => f.id === currentFormId)?.createdAt || new Date().toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      description: formDescription,
      areas: areas,
      questions: questions,
    }

    if (isEditing) {
      // If updating status, ensure others are deactivated
       if (formStatus) {
         setForms(prev => prev.map(f => {
             if (f.id === currentFormId) return formData;
             return { ...f, status: "Inactive" };
         }));
      } else {
         setForms(prev => prev.map(f => f.id === currentFormId ? formData : f));
      }
    } else {
       if (formStatus) {
         setForms(prev => [...prev.map(f => ({...f, status: "Inactive" as const})), formData]);
      } else {
         setForms(prev => [...prev, formData]);
      }
    }

    resetForm()
    setActiveTab("existing")
  }

  const handleEdit = (form: FeedbackForm) => {
    setFormTitle(form.title)
    setFormBatch(form.batch)
    setFormStatus(form.status === "Active")
    setFormDescription(form.description || "")
    setAreas(form.areas.map(a => ({...a})))
    setQuestions(form.questions.map(q => ({...q})))
    
    setIsEditing(true)
    setCurrentFormId(form.id)
    setActiveTab("create")
  }

  const handleToggleStatus = () => {
    if (toggleStatusForm) {
      const newStatus = toggleStatusForm.status === "Active" ? "Inactive" : "Active"
      
      setForms(forms.map(f => {
        if (f.id === toggleStatusForm.id) {
          return { ...f, status: newStatus }
        }
        // If activating this form, deactivate all others
        if (newStatus === "Active") {
            return { ...f, status: "Inactive" }
        }
        return f
      }))
      setToggleStatusForm(null)
    }
  }

  const isDeactivating = toggleStatusForm?.status === "Active";
  const confirmActionLabel = isDeactivating ? "Deactivate" : "Activate";
  const confirmActionVariant = isDeactivating ? "destructive" : "default";

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Graduate Exit Survey</h1>
          <p className="text-muted-foreground">Manage exit surveys for graduating students</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col space-y-6">
        <div className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="existing">Existing Surveys</TabsTrigger>
            <TabsTrigger value="create">{isEditing ? "Edit Survey" : "Create New Survey"}</TabsTrigger>
          </TabsList>
        </div>

        {/* Existing Forms Tab */}
        <TabsContent value="existing" className="w-full mt-0">
          <Card className="w-full border shadow-sm">
            <CardHeader>
              <CardTitle>Graduate Exit Surveys</CardTitle>
              <CardDescription>View and manage existing surveys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%] min-w-[250px]">Title</TableHead>
                      <TableHead className="w-[20%] min-w-[150px]">Batch</TableHead>
                      <TableHead className="w-[15%] min-w-[100px]">Status</TableHead>
                      <TableHead className="w-[10%] min-w-[100px]">Created</TableHead>
                      <TableHead className="w-[15%] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                          No surveys found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      forms.map((form) => (
                        <TableRow key={form.id}>
                          <TableCell className="font-medium">{form.title}</TableCell>
                          <TableCell>{form.batch}</TableCell>
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
                              <Button variant="ghost" size="icon" title="View" onClick={() => setViewForm(form)}>
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
              <CardTitle>{isEditing ? "Edit Survey" : "Create New Survey"}</CardTitle>
              <CardDescription>
                Design a graduate exit survey with standard PO questions and facility feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Form Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Survey Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter survey title (e.g. Graduate Exit Survey 2024)" 
                    className="w-full"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batch">Batch (Year)</Label>
                  <Input 
                    id="batch" 
                    placeholder="e.g. 2020-2024" 
                    className="w-full"
                    value={formBatch}
                    onChange={(e) => setFormBatch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter a description for this survey" 
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
                  <h3 className="text-lg font-semibold">Survey Sections & Questions</h3>
                  
                  {/* Add Area Controls */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Input 
                        placeholder="New Section Name" 
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
                        Add Section
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {areas.length === 0 ? (
                      <div className="text-center py-8 border-2 border-dashed rounded-lg text-muted-foreground">
                          Start by adding a section above.
                      </div>
                  ) : (
                      areas.map((area) => (
                        <Card key={area.id} className="border shadow-sm">
                            <CardHeader className="pb-3 bg-muted/20 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-base font-medium">{area.name}</CardTitle>
                                    <Badge variant={area.isMandatory ? "default" : "secondary"}>
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
                {isEditing ? "Update Survey" : "Save Survey"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Dialog */}
      <Dialog open={!!viewForm} onOpenChange={(open) => !open && setViewForm(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewForm?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 mt-2">
              <Badge variant="outline">Batch: {viewForm?.batch}</Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground uppercase">Description</Label>
              <p className="text-sm">{viewForm?.description || "No description provided."}</p>
            </div>
            
            <div className="space-y-4">
              <Label className="text-sm text-muted-foreground uppercase">Sections & Questions</Label>
              {viewForm?.areas.map(area => (
                  <div key={area.id} className="border rounded-md p-4 bg-muted/10">
                      <div className="flex justify-between items-center mb-3">
                          <h4 className="font-semibold text-sm">{area.name}</h4>
                          <Badge variant={area.isMandatory ? "default" : "outline"} className="text-[10px]">
                              {area.isMandatory ? "Mandatory" : "Optional"}
                          </Badge>
                      </div>
                      <ul className="space-y-3">
                          {viewForm.questions.filter(q => q.areaId === area.id).map((q, i) => (
                              <li key={q.id} className="text-sm flex justify-between items-start gap-4 pl-4 border-l-2 border-muted">
                                  <span>{q.text}</span>
                              </li>
                          ))}
                          {viewForm.questions.filter(q => q.areaId === area.id).length === 0 && (
                              <li className="text-xs text-muted-foreground italic">No questions in this section.</li>
                          )}
                      </ul>
                  </div>
              ))}
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
            <DialogTitle>{confirmActionLabel} Survey</DialogTitle>
            <DialogDescription>
              Are you sure you want to {confirmActionLabel.toLowerCase()} this survey?
              {isDeactivating 
                ? " Students will no longer be able to submit responses." 
                : " This will deactivate any other currently active survey."}
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