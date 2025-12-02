"use client"

import { useState, useEffect } from "react"
import { API_BASE_URL } from '@/lib/api'
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star, MessageSquare } from "lucide-react"

export default function FeedbackPage() {
  const router = useRouter()
  const [feedbackType, setFeedbackType] = useState<"faculty" | "general" | null>(null)
  const [selectedFaculty, setSelectedFaculty] = useState<string | number>("")
  const [answersMap, setAnswersMap] = useState<Record<string, any>>({})
  const [comments, setComments] = useState("")
  const [faculties, setFaculties] = useState<Array<any>>([])
  const [activeForm, setActiveForm] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [ratings, setRatings] = useState<Record<string | number, number>>({})

  useEffect(() => {
    // Fetch active faculty feedback form and active faculties dropdown
    async function load() {
      try {
        const fRes = await fetch(`${API_BASE_URL}/faculties/dropdown/active`)
        const fJson = await fRes.json()
        if (fJson.success) setFaculties(fJson.data)
        const listRes = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public`)
        const listJson = await listRes.json()
        if (listJson.success && Array.isArray(listJson.data)) {
          const active = listJson.data.find((f: any) => f.status === 'Active')
          if (active) {
            const detailRes = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/public/${active.id}`)
            const detailJson = await detailRes.json()
            if (detailJson.success) setActiveForm(detailJson.data)
          }
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
    if (!activeForm) return alert('No active form available')
    if (!selectedFaculty) return alert('Please select a faculty member')

    // Build answers array from areas/questions
    const answers: any[] = []
    for (const area of (activeForm.areas || [])) {
      for (const q of (area.questions || [])) {
        const stored = answersMap[String(q.id)]
        if (q.question_type === 'rating') {
          answers.push({ question_id: q.id, answer_rating: stored?.answer_rating ?? null })
        } else {
          answers.push({ question_id: q.id, answer_text: stored?.answer_text ?? '' })
        }
      }
    }

    setLoading(true)
    try {
      const payload = {
        respondent_user_id: 1, // placeholder; replace with actual logged-in user id when auth is enabled
        respondent_type: 'student',
        faculty_id: Number(selectedFaculty),
        answers
      }

      const res = await fetch(`${API_BASE_URL}/academic-swo/faculty-feedback/${activeForm.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const json = await res.json()
      if (json.success) {
        alert('Feedback submitted successfully!')
        setFeedbackType(null)
        setSelectedFaculty('')
        setAnswersMap({})
        setComments('')
      } else {
        alert('Error submitting feedback: ' + (json.message || 'unknown'))
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setFeedbackType("faculty")}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">Faculty Feedback</CardTitle>
                  <CardDescription>Provide feedback for your current semester faculty members</CardDescription>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all" onClick={() => setFeedbackType("general")}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <CardTitle className="text-lg mb-2">General Feedback</CardTitle>
                  <CardDescription>Share general feedback about college, facilities, and services</CardDescription>
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
                {feedbackType === "faculty" ? "Faculty Feedback" : "General Feedback"}
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

                {selectedFaculty && activeForm && (
                  <div className="space-y-6 pt-6 border-t">
                    {activeForm.areas.map((area: any) => (
                      <div key={area.id} className="space-y-4">
                        <h3 className="font-semibold">{area.area_name}</h3>
                        {area.questions.map((q: any) => (
                          <div key={q.id} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">{q.question_text}</label>
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

            {feedbackType === "general" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Feedback Category</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Academics</option>
                    <option>Infrastructure</option>
                    <option>Facilities</option>
                    <option>Events & Activities</option>
                    <option>Administration</option>
                    <option>Canteen & Food</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Overall Rating</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating("overall", star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            ratings["overall"] && ratings["overall"] >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
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
