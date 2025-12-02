"use client"

import { useState, useEffect } from "react"
import { API_BASE_URL } from '@/lib/api'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star, MessageSquare } from "lucide-react"

export default function FeedbackPage() {
  const router = useRouter()
  const [feedbackType, setFeedbackType] = useState<"faculty" | "institution" | "graduate" | null>(null)
  const [selectedFaculty, setSelectedFaculty] = useState<string | number>("")
  const [answersMap, setAnswersMap] = useState<Record<string, any>>({})
  const [comments, setComments] = useState("")
  const [faculties, setFaculties] = useState<Array<any>>([])
  const [activeFacultyForm, setActiveFacultyForm] = useState<any>(null)
  const [activeInstitutionForm, setActiveInstitutionForm] = useState<any>(null)
  const [activeGraduateForm, setActiveGraduateForm] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [ratings, setRatings] = useState<Record<string | number, number>>({})

  useEffect(() => {
    // Fetch active faculty feedback form and active faculties dropdown
    async function load() {
      try {
        const fRes = await fetch(`${API_BASE_URL}/faculties/dropdown/active`)
        const fJson = await fRes.json()
        if (fJson.success) setFaculties(fJson.data)

        // load active faculty feedback form
        const listRes = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public`)
        const listJson = await listRes.json()
        if (listJson.success && Array.isArray(listJson.data)) {
          const active = listJson.data.find((f: any) => f.status === 'Active')
          if (active) {
            const detailRes = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${active.id}`)
            const detailJson = await detailRes.json()
            if (detailJson.success) setActiveFacultyForm(detailJson.data)
          }
        }

        // load active institution feedback form
        try {
          const instListRes = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public`)
          const instListJson = await instListRes.json()
          if (instListJson.success && Array.isArray(instListJson.data)) {
            const activeInst = instListJson.data.find((f: any) => f.status === 'Active')
            if (activeInst) {
              const instDetailRes = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/public/${activeInst.id}`)
              const instDetailJson = await instDetailRes.json()
              if (instDetailJson.success) setActiveInstitutionForm(instDetailJson.data)
            }
          }
        } catch (e) {
          console.warn('No active institution form or fetch error', e)
        }

        // load active graduate exit survey form
        try {
          const gradListRes = await fetch(`${API_BASE_URL}/academic-swo/graduate-exit-survey/public`)
          const gradListJson = await gradListRes.json()
          if (gradListJson.success && Array.isArray(gradListJson.data)) {
            const activeGrad = gradListJson.data.find((f: any) => f.status === 'Active')
            if (activeGrad) {
              const gradDetailRes = await fetch(`${API_BASE_URL}/academic-swo/graduate-exit-survey/public/${activeGrad.id}`)
              const gradDetailJson = await gradDetailRes.json()
              if (gradDetailJson.success) setActiveGraduateForm(gradDetailJson.data)
            }
          }
        } catch (e) {
          console.warn('No active graduate form or fetch error', e)
        }
      } catch (err) {
        console.error('Error loading feedback form or faculties', err)
      }
    }
    load()
  }, [])

  const handleRating = (questionId: string | number, rating: number) => {
    setAnswersMap(prev => ({ ...prev, [String(questionId)]: { ...prev[String(questionId)], answer_rating: rating } }))
    setRatings(prev => ({ ...prev, [String(questionId)]: rating }))
  }

  const handleTextAnswer = (questionId: string | number, text: string) => {
    setAnswersMap(prev => ({ ...prev, [String(questionId)]: { ...prev[String(questionId)], answer_text: text } }))
  }

  const handleSubmit = async () => {
    // Unified submit handler for faculty, institution, and graduate forms
    try {
      setLoading(true)

      if (feedbackType === 'faculty') {
        if (!activeFacultyForm) return alert('No active faculty form available')
        if (!selectedFaculty) return alert('Please select a faculty member')

        const answers: any[] = []
        
        // Handle both area-based and flat question models
        const areasToProcess = (activeFacultyForm.areas && activeFacultyForm.areas.length > 0)
          ? activeFacultyForm.areas
          : [{ id: 'flat', area_name: activeFacultyForm.title || 'General', questions: activeFacultyForm.allQuestions || activeFacultyForm.questions || [] }]
        
        for (const area of areasToProcess) {
          for (const q of (area.questions || [])) {
            const stored = answersMap[String(q.id)]
            if (q.question_type === 'rating') {
              const rating = stored?.answer_rating ?? ratings[String(q.id)] ?? null
              if (rating === null || rating === undefined) return alert('Please answer all rating questions before submitting')
              answers.push({ question_id: q.id, answer_rating: rating })
            } else {
              const text = stored?.answer_text || ''
              if (!text.trim()) return alert('Please answer all questions before submitting')
              answers.push({ question_id: q.id, answer_text: text })
            }
          }
        }

        const payload = {
          respondent_user_id: 1,
          respondent_type: 'student',
          faculty_id: Number(selectedFaculty),
          answers
        }

        const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/${activeFacultyForm.id}/submit`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (json.success) {
          alert('Feedback submitted successfully!')
          setFeedbackType(null)
          setSelectedFaculty('')
          setAnswersMap({})
          setRatings({})
          setComments('')
        } else alert('Error submitting feedback: ' + (json.message || 'unknown'))
        return
      }

      if (feedbackType === 'institution') {
        if (!activeInstitutionForm) return alert('No active institution form available')

        const answers: any[] = []
        for (const area of (activeInstitutionForm.areas || [])) {
          const areaOptional = area.is_mandatory === false
          for (const q of (area.questions || [])) {
            const stored = answersMap[String(q.id)]
            // all institution questions are rating type in UI
            const rating = stored?.answer_rating ?? ratings[String(q.id)] ?? null
            if ((rating === null || rating === undefined) && !areaOptional) return alert('Please answer all mandatory questions before submitting')
            if (rating !== null && rating !== undefined) answers.push({ question_id: q.id, answer_rating: rating })
          }
        }

        const payload = { respondent_user_id: 1, respondent_type: 'student', answers }
        const res = await fetch(`${API_BASE_URL}/academic-swo/institution-feedback/${activeInstitutionForm.id}/submit`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (json.success) {
          alert('Institution feedback submitted successfully!')
          setFeedbackType(null)
          setAnswersMap({})
          setRatings({})
          setComments('')
        } else alert('Error submitting feedback: ' + (json.message || 'unknown'))
        return
      }

      if (feedbackType === 'graduate') {
        if (!activeGraduateForm) return alert('No active graduate exit survey available')

        const ratingAreaNames = new Set([
          'Quality of Instructions & Support',
          'Facilities Offered for Academics',
          'Academic Services',
          'General Facilities',
          'Graduation Feedback (Capabilities)'
        ])

        const answers: any[] = []
        for (const area of (activeGraduateForm.areas || [])) {
          const areaOptional = area.is_mandatory === false
          const isRatingArea = ratingAreaNames.has((area.area_name || area.name || '').trim())
          for (const q of (area.questions || [])) {
            const stored = answersMap[String(q.id)]
            if (isRatingArea) {
              const rating = stored?.answer_rating ?? ratings[String(q.id)] ?? null
              if ((rating === null || rating === undefined) && !areaOptional) return alert('Please answer all mandatory rating questions before submitting')
              if (rating !== null && rating !== undefined) answers.push({ question_id: q.id, answer_rating: rating })
            } else {
              const text = stored?.answer_text || ''
              if (!text.trim() && !areaOptional) return alert('Please answer all mandatory text questions before submitting')
              if (text && text.trim()) answers.push({ question_id: q.id, answer_text: text })
            }
          }
        }

        const payload = { respondent_user_id: 1, respondent_type: 'graduate', batch_year: activeGraduateForm.batch_start_year, answers }
        const res = await fetch(`${API_BASE_URL}/academic-swo/graduate-exit-survey/${activeGraduateForm.id}/submit`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        })
        const json = await res.json()
        if (json.success) {
          alert('Graduate exit survey submitted successfully!')
          setFeedbackType(null)
          setAnswersMap({})
          setRatings({})
          setComments('')
        } else alert('Error submitting feedback: ' + (json.message || 'unknown'))
        return
      }
    } catch (err) {
      console.error(err)
      alert('Error submitting feedback')
    } finally {
      setLoading(false)
    }
  }

  if (!feedbackType) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Feedback</h1>
                <p className="text-sm text-gray-600">Share your feedback and suggestions</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setFeedbackType("faculty")}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">Faculty Feedback</CardTitle>
                  <CardDescription>Provide feedback for your current semester faculty members</CardDescription>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setFeedbackType("institution")}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">Institution Feedback</CardTitle>
                  <CardDescription>Provide feedback for the institution (areas & services)</CardDescription>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setFeedbackType("graduate")}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">Graduate Exit Survey</CardTitle>
                  <CardDescription>Graduating student exit survey (if applicable)</CardDescription>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setFeedbackType(null)}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {feedbackType === "faculty" ? "Faculty Feedback" : feedbackType === "institution" ? "Institution Feedback" : "Graduate Exit Survey"}
              </h1>
              <p className="text-sm text-gray-600">Your feedback helps us improve</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {feedbackType === "faculty" && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Select Faculty Member</label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-- Choose a faculty member --</option>
                    {faculties.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.full_name || faculty.name || faculty.first_name || faculty.faculty_id}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedFaculty && activeFacultyForm && (
                  <div className="space-y-6 pt-6 border-t">
                    {(
                      (activeFacultyForm.areas && activeFacultyForm.areas.length > 0)
                      ? activeFacultyForm.areas
                      : [{ id: 'flat', area_name: activeFacultyForm.title || 'General', questions: activeFacultyForm.allQuestions || activeFacultyForm.questions || [] }]
                    ).map((area: any) => (
                      <div key={area.id} className="space-y-4">
                        <h3 className="font-semibold">{area.area_name}</h3>
                        {(area.questions || []).map((q: any) => (
                          <div key={q.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">{q.question_text || q.text}</label>
                            {q.question_type === 'rating' && (
                              <div className="flex items-center space-x-2">
                                {[1,2,3,4,5].map((n) => (
                                  <button key={n} onClick={() => handleRating(q.id, n)} className="transition-transform hover:scale-110">
                                    <Star className={`w-7 h-7 ${ratings[String(q.id)] && ratings[String(q.id)] >= n ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                  </button>
                                ))}
                                {ratings[String(q.id)] && <span className="text-sm font-semibold text-gray-700 ml-2">{ratings[String(q.id)]}/5</span>}
                              </div>
                            )}
                            {q.question_type !== 'rating' && (
                              <textarea value={answersMap[String(q.id)]?.answer_text || ''} onChange={(e) => handleTextAnswer(q.id, e.target.value)} className="w-full px-3 py-2 border rounded" rows={3} />
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {feedbackType === "institution" && (
              <div className="space-y-6 pt-6 border-t">
                {!activeInstitutionForm && <div className="text-sm text-muted-foreground">No active institution feedback is available.</div>}
                {activeInstitutionForm && activeInstitutionForm.areas.map((area: any) => (
                  <div key={area.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{area.area_name}</h3>
                      <span className="text-xs text-gray-500">{area.is_mandatory === false ? 'Optional' : 'Mandatory'}</span>
                    </div>
                    <div className="space-y-2">
                      { (area.questions || []).map((q: any) => (
                        <div key={q.id} className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">{q.question_text}</label>
                          <div className="flex items-center space-x-2">
                            {[1,2,3,4,5].map((n) => (
                              <button key={n} onClick={() => handleRating(q.id, n)} className="transition-transform hover:scale-110">
                                <Star className={`w-7 h-7 ${ratings[String(q.id)] && ratings[String(q.id)] >= n ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                              </button>
                            ))}
                            {ratings[String(q.id)] && <span className="text-sm font-semibold text-gray-700 ml-2">{ratings[String(q.id)]}/5</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {feedbackType === "graduate" && (
              <div className="space-y-6 pt-6 border-t">
                {!activeGraduateForm && <div className="text-sm text-muted-foreground">No active graduate exit survey is available.</div>}
                {activeGraduateForm && (
                  <div className="space-y-4">
                    {activeGraduateForm.areas.map((area: any) => {
                      const ratingAreaNames = new Set([
                        'Quality of Instructions & Support',
                        'Facilities Offered for Academics',
                        'Academic Services',
                        'General Facilities',
                        'Graduation Feedback (Capabilities)'
                      ])
                      const isRatingArea = ratingAreaNames.has((area.area_name || area.name || '').trim())
                      return (
                        <div key={area.id} className="border rounded-md p-4 bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">{area.area_name || area.name}</h4>
                            <span className="text-xs text-gray-500">{area.is_mandatory === false ? 'Optional' : 'Mandatory'}</span>
                          </div>
                          <div className="space-y-3">
                            {(area.questions || []).map((q: any) => (
                              <div key={q.id}>
                                <label className="block text-sm font-medium text-gray-700">{q.question_text}</label>
                                {isRatingArea ? (
                                  <div className="flex items-center space-x-2 mt-1">
                                    {[1,2,3,4,5].map((n) => (
                                      <button key={n} onClick={() => handleRating(q.id, n)} className="transition-transform hover:scale-110">
                                        <Star className={`w-7 h-7 ${ratings[String(q.id)] && ratings[String(q.id)] >= n ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                      </button>
                                    ))}
                                    {ratings[String(q.id)] && <span className="text-sm font-semibold text-gray-700 ml-2">{ratings[String(q.id)]}/5</span>}
                                  </div>
                                ) : (
                                  <textarea value={answersMap[String(q.id)]?.answer_text || ''} onChange={(e) => handleTextAnswer(q.id, e.target.value)} className="w-full px-3 py-2 border rounded" rows={3} />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Comments/Suggestions</label>
              <textarea
                placeholder="Share your detailed feedback and suggestions..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={5}
              />
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>
                Submit Feedback
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setFeedbackType(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
