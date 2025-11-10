"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function StaffRoomPage() {
  const router = useRouter()
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null)
  const [facilities, setFacilities] = useState({
    fans: "",
    acs: "",
    lights: "",
    telephones: "",
    internetBandwidth: "",
    racks: "",
    chairs: "",
    desks: "",
    others: "",
  })

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleFloorPlanFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFloorPlanFile(e.target.files[0])
    }
  }

  const handleFacilityChange = (field: string, value: string) => {
    setFacilities({ ...facilities, [field]: value })
  }

  const handleSave = () => {
    alert("Staff Room data saved successfully!")
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button onClick={handleBack} variant="outline" size="sm">
            ← Back to Amenities
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-600">Staff Room Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Floor Plan Upload */}
            <div className="space-y-2">
              <Label htmlFor="floor-plan">Staff Room Floor Plan</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <div className="text-center">
                  <Label htmlFor="floor-plan-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-gray-700">Click to upload floor plan</span>
                  </Label>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                </div>
                <Input
                  id="floor-plan-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFloorPlanFileChange}
                  className="hidden"
                />
              </div>
              {floorPlanFile && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <p className="text-sm text-blue-600">Selected: {floorPlanFile.name}</p>
                </div>
              )}
            </div>

            {/* Facilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fans">Number of Fans</Label>
                <Input
                  id="fans"
                  type="number"
                  placeholder="Enter number of fans"
                  value={facilities.fans}
                  onChange={(e) => handleFacilityChange("fans", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="acs">Number of ACs</Label>
                <Input
                  id="acs"
                  type="number"
                  placeholder="Enter number of ACs"
                  value={facilities.acs}
                  onChange={(e) => handleFacilityChange("acs", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lights">Number of Lights</Label>
                <Input
                  id="lights"
                  type="number"
                  placeholder="Enter number of lights"
                  value={facilities.lights}
                  onChange={(e) => handleFacilityChange("lights", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephones">Number of Telephones</Label>
                <Input
                  id="telephones"
                  type="number"
                  placeholder="Enter number of telephones"
                  value={facilities.telephones}
                  onChange={(e) => handleFacilityChange("telephones", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="internet">Internet Bandwidth Details</Label>
                <Input
                  id="internet"
                  type="text"
                  placeholder="e.g., 100 Mbps"
                  value={facilities.internetBandwidth}
                  onChange={(e) => handleFacilityChange("internetBandwidth", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="racks">Number of Racks</Label>
                <Input
                  id="racks"
                  type="number"
                  placeholder="Enter number of racks"
                  value={facilities.racks}
                  onChange={(e) => handleFacilityChange("racks", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chairs">Number of Chairs</Label>
                <Input
                  id="chairs"
                  type="number"
                  placeholder="Enter number of chairs"
                  value={facilities.chairs}
                  onChange={(e) => handleFacilityChange("chairs", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="desks">Number of Desks</Label>
                <Input
                  id="desks"
                  type="number"
                  placeholder="Enter number of desks"
                  value={facilities.desks}
                  onChange={(e) => handleFacilityChange("desks", e.target.value)}
                />
              </div>
            </div>

            {/* Any Others */}
            <div className="space-y-2">
              <Label htmlFor="others">Any Others</Label>
              <Textarea
                id="others"
                placeholder="Enter any other facilities or details..."
                value={facilities.others}
                onChange={(e) => handleFacilityChange("others", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-center">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                Save Staff Room Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
