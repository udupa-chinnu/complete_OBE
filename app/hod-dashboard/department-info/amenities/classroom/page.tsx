"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ClassroomPage() {
  const router = useRouter()
  const [numberOfRooms, setNumberOfRooms] = useState(1)
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: "",
      floorPlanFile: null as File | null,
      doors: "",
      windows: "",
      benches: {
        twoSeater: "",
        threeSeater: "",
        fourSeater: "",
      },
      blackboardSize: "",
      projectorDetails: "",
      grievances: "",
    },
  ])

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  const handleNumberOfRoomsChange = (value: string) => {
    const num = Number.parseInt(value) || 1
    setNumberOfRooms(num)

    // Adjust rooms array
    if (num > rooms.length) {
      const newRooms = [...rooms]
      for (let i = rooms.length; i < num; i++) {
        newRooms.push({
          id: i + 1,
          roomNumber: "",
          floorPlanFile: null,
          doors: "",
          windows: "",
          benches: {
            twoSeater: "",
            threeSeater: "",
            fourSeater: "",
          },
          blackboardSize: "",
          projectorDetails: "",
          grievances: "",
        })
      }
      setRooms(newRooms)
    } else if (num < rooms.length) {
      setRooms(rooms.slice(0, num))
    }
  }

  const handleRoomChange = (roomIndex: number, field: string, value: string | File | null) => {
    const newRooms = [...rooms]
    if (field.startsWith("benches.")) {
      const benchField = field.split(".")[1]
      newRooms[roomIndex].benches = { ...newRooms[roomIndex].benches, [benchField]: value as string }
    } else {
      newRooms[roomIndex] = { ...newRooms[roomIndex], [field]: value }
    }
    setRooms(newRooms)
  }

  const handleSave = () => {
    alert("Classroom data saved successfully!")
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
            <CardTitle className="text-xl font-bold text-green-600">Classroom Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Number of Rooms */}
            <div className="space-y-2">
              <Label htmlFor="number-of-rooms">Number of Classrooms</Label>
              <Input
                id="number-of-rooms"
                type="number"
                min="1"
                value={numberOfRooms}
                onChange={(e) => handleNumberOfRoomsChange(e.target.value)}
                className="w-32"
              />
            </div>

            {/* Room Details */}
            {rooms.map((room, roomIndex) => (
              <Card key={room.id} className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Classroom {roomIndex + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Room Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Room Number</Label>
                      <Input
                        placeholder="e.g., Room-201"
                        value={room.roomNumber}
                        onChange={(e) => handleRoomChange(roomIndex, "roomNumber", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Floor Plan</Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleRoomChange(roomIndex, "floorPlanFile", e.target.files ? e.target.files[0] : null)
                        }
                      />
                    </div>
                  </div>

                  {/* Doors and Windows */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Number of Doors</Label>
                      <Input
                        type="number"
                        placeholder="Enter number of doors"
                        value={room.doors}
                        onChange={(e) => handleRoomChange(roomIndex, "doors", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Number of Windows</Label>
                      <Input
                        type="number"
                        placeholder="Enter number of windows"
                        value={room.windows}
                        onChange={(e) => handleRoomChange(roomIndex, "windows", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Benches Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Number of Benches (Breakdown)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>2-Seater Benches</Label>
                        <Input
                          type="number"
                          placeholder="Enter number"
                          value={room.benches.twoSeater}
                          onChange={(e) => handleRoomChange(roomIndex, "benches.twoSeater", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>3-Seater Benches</Label>
                        <Input
                          type="number"
                          placeholder="Enter number"
                          value={room.benches.threeSeater}
                          onChange={(e) => handleRoomChange(roomIndex, "benches.threeSeater", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>4-Seater Benches</Label>
                        <Input
                          type="number"
                          placeholder="Enter number"
                          value={room.benches.fourSeater}
                          onChange={(e) => handleRoomChange(roomIndex, "benches.fourSeater", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Blackboard and Projector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Blackboard Size</Label>
                      <Input
                        placeholder="e.g., 8ft x 4ft"
                        value={room.blackboardSize}
                        onChange={(e) => handleRoomChange(roomIndex, "blackboardSize", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Projector Details</Label>
                      <Input
                        placeholder="e.g., Epson EB-X41, 3600 lumens"
                        value={room.projectorDetails}
                        onChange={(e) => handleRoomChange(roomIndex, "projectorDetails", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Grievances */}
                  <div className="space-y-2">
                    <Label>Grievances Raised (if any)</Label>
                    <Textarea
                      placeholder="Enter any grievances or issues raised..."
                      value={room.grievances}
                      onChange={(e) => handleRoomChange(roomIndex, "grievances", e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 px-8 py-3 text-lg">
                Save Classroom Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
