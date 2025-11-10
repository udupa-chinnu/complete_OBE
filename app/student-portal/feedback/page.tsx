"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Star, MessageSquare } from "lucide-react"

export default function FeedbackPage() {
  const router = useRouter()
  const [feedbackType, setFeedbackType] = useState<"faculty" | "general" | null>(null)
  const [selectedFaculty, setSelectedFaculty] = useState("")
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [comments, setComments] = useState("")

  const faculties = [
    { id: 1, name: "Dr. Sarah Johnson", subject: "Data Structures" },
    { id: 2, name: "Prof. Mike Wilson", subject: "Web Development" },
    { id: 3, name: "Dr. Emily Davis", subject: "Database Systems" },
    { id: 4, name: "Prof. Robert Brown", subject: "Data Structures Lab" },
    { id: 5, name: "Prof. Jennifer Smith", subject: "Web Development Lab" },
  ]

  const criteria = ["Knowledge", "Teaching Method", "Communication", "Availability", "Overall"]

  const handleRating = (criterion: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [criterion]: rating }))
  }

  const handleSubmit = () => {
    alert("Feedback submitted successfully!")
    setFeedbackType(null)
    setSelectedFaculty("")
    setRatings({})
    setComments("")
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
                        {faculty.name} ({faculty.subject})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedFaculty && (
                  <div className="space-y-6 pt-6 border-t">
                    {criteria.map((criterion) => (
                      <div key={criterion} className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">{criterion}</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => handleRating(criterion, star)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 ${
                                  ratings[criterion] && ratings[criterion] >= star
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                          {ratings[criterion] && (
                            <span className="text-sm font-semibold text-gray-700 ml-2">{ratings[criterion]}/5</span>
                          )}
                        </div>
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
