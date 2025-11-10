"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

export default function TimetableUploadPage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSaveNext = () => {
    router.push("/course-workflow/subject-details")
  }

  const handleBack = () => {
    router.push("/course-workflow/vision-mission")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button onClick={handleBack} variant="outline" size="sm">
                ← Back
              </Button>
              <h1 className="text-xl font-semibold text-gray-800">Upload Timetable</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-600">Upload Individual Timetable</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="timetable-upload" className="cursor-pointer">
                    <span className="text-lg font-medium text-gray-700">
                      Click to upload timetable or drag and drop
                    </span>
                  </Label>
                  <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB (Optional)</p>
                </div>
                <Input
                  id="timetable-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {selectedFile && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">File selected:</p>
                    <p className="text-sm text-green-600">{selectedFile.name}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)}>
                    Remove
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Uploading timetable is optional. You can skip this step and proceed to the next
                section.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save & Next Button */}
        <div className="flex justify-center mt-8">
          <Button onClick={handleSaveNext} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  )
}
