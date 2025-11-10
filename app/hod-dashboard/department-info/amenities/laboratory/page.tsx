"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Minus } from "lucide-react"

export default function LaboratoryPage() {
  const router = useRouter()
  const [numberOfLabs, setNumberOfLabs] = useState(1)
  const [labs, setLabs] = useState([
    {
      id: 1,
      roomNumber: "",
      floorPlanFile: null as File | null,
      vision: "To be a premier institution of higher learning...",
      mission: "To provide quality education in engineering...",
      peo: "PEO1: Graduates will demonstrate technical competence...",
      pso: "PSO1: Professional Skills...",
      po: "PO1: Engineering knowledge...",
      labIncharge: "Dr. John Smith - Professor",
      labInstructor: "Mr. Jane Doe - Assistant Professor",
      dosAndDontsFile: null as File | null,
      inspirationalQuotesFile: null as File | null,
      systems: [
        { systemNumber: "", configuration: "", operatingProcedures: "", serviceRecordsFile: null as File | null },
      ],
    },
  ])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleNumberOfLabsChange = (value: string) => {
    const num = Number.parseInt(value) || 1
    setNumberOfLabs(num)

    // Adjust labs array
    if (num > labs.length) {
      const newLabs = [...labs]
      for (let i = labs.length; i < num; i++) {
        newLabs.push({
          id: i + 1,
          roomNumber: "",
          floorPlanFile: null,
          vision: "To be a premier institution of higher learning...",
          mission: "To provide quality education in engineering...",
          peo: "PEO1: Graduates will demonstrate technical competence...",
          pso: "PSO1: Professional Skills...",
          po: "PO1: Engineering knowledge...",
          labIncharge: "Dr. John Smith - Professor",
          labInstructor: "Mr. Jane Doe - Assistant Professor",
          dosAndDontsFile: null,
          inspirationalQuotesFile: null,
          systems: [{ systemNumber: "", configuration: "", operatingProcedures: "", serviceRecordsFile: null }],
        })
      }
      setLabs(newLabs)
    } else if (num < labs.length) {
      setLabs(labs.slice(0, num))
    }
  }

  const handleLabChange = (labIndex: number, field: string, value: string | File | null) => {
    const newLabs = [...labs]
    newLabs[labIndex] = { ...newLabs[labIndex], [field]: value }
    setLabs(newLabs)
  }

  const addSystem = (labIndex: number) => {
    const newLabs = [...labs]
    newLabs[labIndex].systems.push({
      systemNumber: "",
      configuration: "",
      operatingProcedures: "",
      serviceRecordsFile: null,
    })
    setLabs(newLabs)
  }

  const removeSystem = (labIndex: number, systemIndex: number) => {
    const newLabs = [...labs]
    if (newLabs[labIndex].systems.length > 1) {
      newLabs[labIndex].systems.splice(systemIndex, 1)
      setLabs(newLabs)
    }
  }

  const handleSystemChange = (labIndex: number, systemIndex: number, field: string, value: string | File | null) => {
    const newLabs = [...labs]
    newLabs[labIndex].systems[systemIndex] = { ...newLabs[labIndex].systems[systemIndex], [field]: value }
    setLabs(newLabs)
  }

  const handleSave = () => {
    alert("Laboratory data saved successfully!")
  }

  const handleBack = () => {
    router.push("/hod-dashboard/department-info/amenities")
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
            ← Back to Amenities
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-red-600">Laboratory Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Number of Labs */}
            <div className="space-y-2">
              <Label htmlFor="number-of-labs">Number of Laboratories</Label>
              <Input
                id="number-of-labs"
                type="number"
                min="1"
                value={numberOfLabs}
                onChange={(e) => handleNumberOfLabsChange(e.target.value)}
                className="w-32"
              />
            </div>

            {/* Lab Details */}
            {labs.map((lab, labIndex) => (
              <Card key={lab.id} className="border-2 border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Laboratory {labIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Lab Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Lab Room Number</Label>
                      <Input
                        placeholder="e.g., Lab-101"
                        value={lab.roomNumber}
                        onChange={(e) => handleLabChange(labIndex, "roomNumber", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Floor Plan</Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleLabChange(labIndex, "floorPlanFile", e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </div>
                  </div>

                  {/* Vision, Mission, PEO, PSO, PO (Prefilled) */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Vision, Mission, PEO, PSO, PO (Prefilled)</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <Textarea
                        placeholder="Vision"
                        value={lab.vision}
                        onChange={(e) => handleLabChange(labIndex, "vision", e.target.value)}
                        className="min-h-[60px] bg-gray-50"
                        readOnly
                      />
                      <Textarea
                        placeholder="Mission"
                        value={lab.mission}
                        onChange={(e) => handleLabChange(labIndex, "mission", e.target.value)}
                        className="min-h-[60px] bg-gray-50"
                        readOnly
                      />
                      <Textarea
                        placeholder="PEO"
                        value={lab.peo}
                        onChange={(e) => handleLabChange(labIndex, "peo", e.target.value)}
                        className="min-h-[60px] bg-gray-50"
                        readOnly
                      />
                      <Textarea
                        placeholder="PSO"
                        value={lab.pso}
                        onChange={(e) => handleLabChange(labIndex, "pso", e.target.value)}
                        className="min-h-[60px] bg-gray-50"
                        readOnly
                      />
                      <Textarea
                        placeholder="PO"
                        value={lab.po}
                        onChange={(e) => handleLabChange(labIndex, "po", e.target.value)}
                        className="min-h-[60px] bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Lab Personnel (Prefilled) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Lab Incharge Details (Prefilled)</Label>
                      <Input
                        value={lab.labIncharge}
                        onChange={(e) => handleLabChange(labIndex, "labIncharge", e.target.value)}
                        className="bg-gray-50"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Lab Instructor Details (Prefilled)</Label>
                      <Input
                        value={lab.labInstructor}
                        onChange={(e) => handleLabChange(labIndex, "labInstructor", e.target.value)}
                        className="bg-gray-50"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Do's and Don'ts Document</Label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) =>
                          handleLabChange(labIndex, "dosAndDontsFile", e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Inspirational Quotes Document</Label>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleLabChange(
                            labIndex,
                            "inspirationalQuotesFile",
                            e.target.files ? e.target.files[0] : null,
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Systems/Equipment */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">Systems/Equipment</h4>
                      <Button
                        onClick={() => addSystem(labIndex)}
                        size="sm"
                        variant="outline"
                        className="p-2 bg-transparent"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {lab.systems.map((system, systemIndex) => (
                      <div key={systemIndex} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-gray-700">System {systemIndex + 1}</h5>
                          {lab.systems.length > 1 && (
                            <Button
                              onClick={() => removeSystem(labIndex, systemIndex)}
                              size="sm"
                              variant="outline"
                              className="p-1"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>System Number</Label>
                            <Input
                              placeholder="e.g., SYS-001"
                              value={system.systemNumber}
                              onChange={(e) =>
                                handleSystemChange(labIndex, systemIndex, "systemNumber", e.target.value)
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>System Configuration</Label>
                            <Input
                              placeholder="e.g., Intel i7, 16GB RAM, 512GB SSD"
                              value={system.configuration}
                              onChange={(e) =>
                                handleSystemChange(labIndex, systemIndex, "configuration", e.target.value)
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Operating Procedures</Label>
                            <Textarea
                              placeholder="Enter operating procedures..."
                              value={system.operatingProcedures}
                              onChange={(e) =>
                                handleSystemChange(labIndex, systemIndex, "operatingProcedures", e.target.value)
                              }
                              className="min-h-[80px]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Service Records</Label>
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) =>
                                handleSystemChange(
                                  labIndex,
                                  systemIndex,
                                  "serviceRecordsFile",
                                  e.target.files ? e.target.files[0] : null,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center">
              <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg">
                Save Laboratory Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
