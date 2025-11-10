"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function ModuleSetupPage() {
  const router = useRouter()
  const [moduleCount, setModuleCount] = useState("")
  const [modules, setModules] = useState<any[]>([])
  const [currentModule, setCurrentModule] = useState({
    name: "",
    coordinator: "",
    program: "",
  })

  const facultyList = ["Dr. John Smith", "Prof. Sarah Johnson", "Dr. Mike Wilson", "Prof. Emily Davis"]

  const handleAddModule = () => {
    if (currentModule.name && currentModule.coordinator && currentModule.program) {
      setModules([
        ...modules,
        {
          id: Date.now(),
          ...currentModule,
        },
      ])
      setCurrentModule({ name: "", coordinator: "", program: "" })
    }
  }

  const handleDeleteModule = (id: number) => {
    setModules(modules.filter((mod) => mod.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Module Setup</h1>
              <p className="text-sm text-gray-600">Configure modules and assign coordinators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Module Count */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Step 1: Enter Number of Modules</CardTitle>
            <CardDescription>Specify how many modules your department has</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="moduleCount">Number of Modules</Label>
                <Input
                  id="moduleCount"
                  type="number"
                  placeholder="e.g., 5"
                  value={moduleCount}
                  onChange={(e) => setModuleCount(e.target.value)}
                  className="mt-1"
                  min="1"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Confirm</Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Add Modules */}
        {moduleCount && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Step 2: Add Module Details</CardTitle>
              <CardDescription>
                Add details for each of the {moduleCount} modules (Total: {modules.length}/{moduleCount})
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form */}
              <div className="space-y-4 p-4 border rounded bg-gray-50">
                <div>
                  <Label htmlFor="moduleName">Module Name</Label>
                  <Input
                    id="moduleName"
                    placeholder="e.g., Module A"
                    value={currentModule.name}
                    onChange={(e) => setCurrentModule({ ...currentModule, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="coordinator">Select Coordinator</Label>
                  <Select
                    value={currentModule.coordinator}
                    onValueChange={(value) => setCurrentModule({ ...currentModule, coordinator: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a faculty member" />
                    </SelectTrigger>
                    <SelectContent>
                      {facultyList.map((faculty) => (
                        <SelectItem key={faculty} value={faculty}>
                          {faculty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Program</Label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="program"
                        value="UG"
                        checked={currentModule.program === "UG"}
                        onChange={(e) => setCurrentModule({ ...currentModule, program: e.target.value })}
                      />
                      <span className="text-gray-700">UG (Under Graduate)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="program"
                        value="PG"
                        checked={currentModule.program === "PG"}
                        onChange={(e) => setCurrentModule({ ...currentModule, program: e.target.value })}
                      />
                      <span className="text-gray-700">PG (Post Graduate)</span>
                    </label>
                  </div>
                </div>
                <Button
                  onClick={handleAddModule}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={modules.length >= Number.parseInt(moduleCount || "0")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>

              {/* Module List */}
              <div className="space-y-2">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-3 border rounded bg-white hover:bg-gray-50"
                  >
                    <div>
                      <h4 className="font-semibold text-gray-800">{module.name}</h4>
                      <p className="text-sm text-gray-600">
                        Coordinator: {module.coordinator} | Program: {module.program}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteModule(module.id)}
                      className="hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!moduleCount || modules.length !== Number.parseInt(moduleCount || "0")}
            onClick={() => router.push("/hod-dashboard/academic-info")}
          >
            Save & Next
          </Button>
        </div>
      </div>
    </div>
  )
}
