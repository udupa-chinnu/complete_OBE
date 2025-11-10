"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus } from "lucide-react"

export default function UGProgramPage() {
  const router = useRouter()
  const [programName, setProgramName] = useState("")
  const [programType, setProgramType] = useState("")
  const [programDuration, setProgramDuration] = useState("4")
  const [approvalLetters, setApprovalLetters] = useState([{ authority: "", file: null as File | null }])
  const [closureLetterFile, setClosureLetterFile] = useState<File | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleApprovalFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newApprovalLetters = [...approvalLetters]
      newApprovalLetters[index].file = e.target.files[0]
      setApprovalLetters(newApprovalLetters)
    }
  }

  const handleApprovalAuthorityChange = (index: number, value: string) => {
    const newApprovalLetters = [...approvalLetters]
    newApprovalLetters[index].authority = value
    setApprovalLetters(newApprovalLetters)
  }

  const addApprovalLetter = () => {
    setApprovalLetters([...approvalLetters, { authority: "", file: null }])
  }

  const removeApprovalLetter = (index: number) => {
    if (approvalLetters.length > 1) {
      setApprovalLetters(approvalLetters.filter((_, i) => i !== index))
    }
  }

  const handleClosureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClosureLetterFile(e.target.files[0])
    }
  }

  const handleSave = () => {
    alert("UG Program data saved successfully!")
  }

  const handleBack = () => {
    router.push("/hod-dashboard/department-info/program-offered")
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
            ← Back to Program Offered
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-600">Under Graduate (UG) Program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Program Name */}
            <div className="space-y-2">
              <Label htmlFor="program-name">Program Name</Label>
              <Select onValueChange={setProgramName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Program Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bachelor of Engineering in Computer Science and Engineering">
                    Bachelor of Engineering in Computer Science and Engineering
                  </SelectItem>
                  <SelectItem value="Bachelor of Engineering in Electronics and Communication Engineering">
                    Bachelor of Engineering in Electronics and Communication Engineering
                  </SelectItem>
                  <SelectItem value="Bachelor of Engineering in Mechanical Engineering">
                    Bachelor of Engineering in Mechanical Engineering
                  </SelectItem>
                  <SelectItem value="Bachelor of Engineering in Civil Engineering">
                    Bachelor of Engineering in Civil Engineering
                  </SelectItem>
                  <SelectItem value="Bachelor of Engineering in Electrical and Electronics Engineering">
                    Bachelor of Engineering in Electrical and Electronics Engineering
                  </SelectItem>
                  <SelectItem value="Bachelor of Technology in Information Technology">
                    Bachelor of Technology in Information Technology
                  </SelectItem>
                  <SelectItem value="Bachelor of Science in Computer Science">
                    Bachelor of Science in Computer Science
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Program Type */}
            <div className="space-y-2">
              <Label htmlFor="program-type">Program Type</Label>
              <Select onValueChange={setProgramType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Program Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Program Duration */}
            <div className="space-y-2">
              <Label htmlFor="program-duration">Program Duration (Years)</Label>
              <Input
                id="program-duration"
                type="text"
                value={programDuration}
                onChange={(e) => setProgramDuration(e.target.value)}
                placeholder="4"
              />
            </div>

            {/* Approval Letters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Approval Letters</Label>
                <Button onClick={addApprovalLetter} size="sm" variant="outline" className="p-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {approvalLetters.map((approval, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">Approval Letter {index + 1}</h4>
                    {approvalLetters.length > 1 && (
                      <Button onClick={() => removeApprovalLetter(index)} size="sm" variant="outline" className="p-1">
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Authority</Label>
                      <Select onValueChange={(value) => handleApprovalAuthorityChange(index, value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Authority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AICTE">AICTE</SelectItem>
                          <SelectItem value="UGC">UGC</SelectItem>
                          <SelectItem value="MHRD">MHRD</SelectItem>
                          <SelectItem value="State Government">State Government</SelectItem>
                          <SelectItem value="University">University</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Approval Letter</Label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleApprovalFileChange(index, e)}
                      />
                      {approval.file && <p className="text-sm text-blue-600 mt-1">Selected: {approval.file.name}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sanctioned Intake/Closure Letters */}
            <div className="space-y-2">
              <Label htmlFor="closure-letters">Sanctioned Intake/Closure Letters</Label>
              <div className="border border-gray-300 rounded-lg p-3">
                <Input type="file" accept=".pdf,.doc,.docx" onChange={handleClosureFileChange} />
                {closureLetterFile && <p className="text-sm text-blue-600 mt-1">Selected: {closureLetterFile.name}</p>}
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Save UG Program
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
