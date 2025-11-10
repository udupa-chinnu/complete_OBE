"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Plus, Minus } from "lucide-react"

export default function VisionPage() {
  const router = useRouter()
  const [formulationFile, setFormulationFile] = useState<File | null>(null)
  const [version, setVersion] = useState("")
  const [articulation, setArticulation] = useState("")
  const [momEntries, setMomEntries] = useState([{ version: "", file: null as File | null }])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleFormulationFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormulationFile(e.target.files[0])
    }
  }

  const handleMomFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newMomEntries = [...momEntries]
      newMomEntries[index].file = e.target.files[0]
      setMomEntries(newMomEntries)
    }
  }

  const handleMomVersionChange = (index: number, value: string) => {
    const newMomEntries = [...momEntries]
    newMomEntries[index].version = value
    setMomEntries(newMomEntries)
  }

  const addMomEntry = () => {
    setMomEntries([...momEntries, { version: "", file: null }])
  }

  const removeMomEntry = (index: number) => {
    if (momEntries.length > 1) {
      setMomEntries(momEntries.filter((_, i) => i !== index))
    }
  }

  const handleSave = () => {
    alert("Vision data saved successfully!")
  }

  const handleBack = () => {
    router.push("/hod-dashboard/department-info")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">Digital Campus</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">RITHESH PAKKALA P</span>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">RP</span>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={handleBack} variant="outline" size="sm">
            ← Back to Department Info
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-green-600">Vision Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Formulation Upload */}
            <div className="space-y-2">
              <Label htmlFor="formulation">Formulation Document</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-green-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="text-center">
                  <Label htmlFor="formulation-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-gray-700">Click to upload formulation document</span>
                  </Label>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                </div>
                <Input
                  id="formulation-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFormulationFileChange}
                  className="hidden"
                />
              </div>
              {formulationFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                  <p className="text-sm text-green-600">Selected: {formulationFile.name}</p>
                </div>
              )}
            </div>

            {/* Version */}
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                type="text"
                placeholder="Enter version (e.g., v1.0, v2.1)"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
              />
            </div>

            {/* MOMs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Minutes of Meetings (MOMs)</Label>
                <Button onClick={addMomEntry} size="sm" variant="outline" className="p-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {momEntries.map((mom, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">MOM Entry {index + 1}</h4>
                    {momEntries.length > 1 && (
                      <Button onClick={() => removeMomEntry(index)} size="sm" variant="outline" className="p-1">
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Version for this MOM</Label>
                    <Input
                      placeholder="Enter version for this MOM"
                      value={mom.version}
                      onChange={(e) => handleMomVersionChange(index, e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Upload MOM Document</Label>
                    <div className="border border-gray-300 rounded-lg p-3">
                      <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleMomFileChange(index, e)} />
                      {mom.file && <p className="text-sm text-green-600 mt-1">Selected: {mom.file.name}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Articulation */}
            <div className="space-y-2">
              <Label htmlFor="articulation">Articulation</Label>
              <Textarea
                id="articulation"
                placeholder="Enter articulation details..."
                value={articulation}
                onChange={(e) => setArticulation(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-center">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg">
                Save Vision
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
