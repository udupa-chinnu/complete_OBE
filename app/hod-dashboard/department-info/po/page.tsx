"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus } from "lucide-react"

export default function POPage() {
  const router = useRouter()
  const [programOutcomes, setProgramOutcomes] = useState([{ id: 1, poNumber: "PO1", statement: "" }])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const addPO = () => {
    const newId = programOutcomes.length + 1
    setProgramOutcomes([...programOutcomes, { id: newId, poNumber: `PO${newId}`, statement: "" }])
  }

  const removePO = (id: number) => {
    if (programOutcomes.length > 1) {
      setProgramOutcomes(programOutcomes.filter((po) => po.id !== id))
    }
  }

  const updatePO = (id: number, field: string, value: string) => {
    setProgramOutcomes(programOutcomes.map((po) => (po.id === id ? { ...po, [field]: value } : po)))
  }

  const handleSave = () => {
    alert("Program Outcomes saved successfully!")
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={handleBack} variant="outline" size="sm">
            ← Back to Department Info
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold text-orange-600">Program Outcomes (PO) Management</CardTitle>
              <Button onClick={addPO} className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Add PO
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {programOutcomes.map((po, index) => (
              <div key={po.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Program Outcome {index + 1}</h4>
                  {programOutcomes.length > 1 && (
                    <Button
                      onClick={() => removePO(po.id)}
                      size="sm"
                      variant="outline"
                      className="p-1 text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>PO Number</Label>
                    <Input
                      placeholder="e.g., PO1"
                      value={po.poNumber}
                      onChange={(e) => updatePO(po.id, "poNumber", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-3">
                    <Label>PO Statement</Label>
                    <Textarea
                      placeholder="Enter Program Outcome statement..."
                      value={po.statement}
                      onChange={(e) => updatePO(po.id, "statement", e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center">
              <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 px-8 py-3 text-lg">
                Save Program Outcomes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
