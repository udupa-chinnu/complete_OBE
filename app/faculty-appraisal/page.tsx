"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Send } from "lucide-react"
import PartAForm from "@/components/appraisal/part-a-form"
import PartBForm from "@/components/appraisal/part-b-form"

export default function FacultyAppraisalPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("part-a")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleSubmitAppraisal = async () => {
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      alert("Appraisal submitted successfully to HOD for evaluation!")
      router.push("/faculty-dashboard")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button onClick={() => router.push("/faculty-dashboard")} variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Faculty Performance Management System</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Faculty Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Faculty Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-800">Rajesh Sharma</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-semibold text-gray-800">Information Science & Engineering</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Designation</p>
                <p className="font-semibold text-gray-800">Assistant Professor</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Academic Year</p>
                <p className="font-semibold text-gray-800">2024-25</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="part-a">PMS Part A</TabsTrigger>
            <TabsTrigger value="part-b">PMS Part B</TabsTrigger>
          </TabsList>

          <TabsContent value="part-a" className="space-y-6">
            <PartAForm />
          </TabsContent>

          <TabsContent value="part-b" className="space-y-6">
            <PartBForm />
          </TabsContent>
        </Tabs>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleSubmitAppraisal}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 flex items-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? "Submitting..." : "Submit Appraisal to HOD"}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
