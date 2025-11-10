"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function LibraryPage() {
  const router = useRouter()
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null)
  const [inchargeDetails, setInchargeDetails] = useState("")
  const [collections, setCollections] = useState({
    books: {
      textbooks: "",
      referenceBooks: "",
      generalBooks: "",
      total: "",
    },
    records: "",
    reports: "",
    journals: {
      national: "",
      international: "",
      total: "",
    },
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

  const handleCollectionChange = (section: string, field: string, value: string) => {
    if (section === "books") {
      setCollections({
        ...collections,
        books: { ...collections.books, [field]: value },
      })
    } else if (section === "journals") {
      setCollections({
        ...collections,
        journals: { ...collections.journals, [field]: value },
      })
    } else {
      setCollections({ ...collections, [field]: value })
    }
  }

  const handleSave = () => {
    alert("Library data saved successfully!")
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
            <CardTitle className="text-xl font-bold text-cyan-600">Library Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Floor Plan */}
            <div className="space-y-2">
              <Label htmlFor="floor-plan">Library Floor Plan</Label>
              <Input id="floor-plan" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFloorPlanFileChange} />
              {floorPlanFile && (
                <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-2">
                  <p className="text-sm text-cyan-600">Selected: {floorPlanFile.name}</p>
                </div>
              )}
            </div>

            {/* Incharge Details */}
            <div className="space-y-2">
              <Label htmlFor="incharge">Library Incharge Details</Label>
              <Textarea
                id="incharge"
                placeholder="Enter library incharge details (Name, Designation, Contact, etc.)"
                value={inchargeDetails}
                onChange={(e) => setInchargeDetails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Books Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Books Collection</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Text Books</Label>
                  <Input
                    type="number"
                    placeholder="Number of text books"
                    value={collections.books.textbooks}
                    onChange={(e) => handleCollectionChange("books", "textbooks", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Reference Books</Label>
                  <Input
                    type="number"
                    placeholder="Number of reference books"
                    value={collections.books.referenceBooks}
                    onChange={(e) => handleCollectionChange("books", "referenceBooks", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>General Books</Label>
                  <Input
                    type="number"
                    placeholder="Number of general books"
                    value={collections.books.generalBooks}
                    onChange={(e) => handleCollectionChange("books", "generalBooks", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total Books</Label>
                  <Input
                    type="number"
                    placeholder="Total number of books"
                    value={collections.books.total}
                    onChange={(e) => handleCollectionChange("books", "total", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Records and Reports */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Records</Label>
                <Input
                  type="number"
                  placeholder="Number of records"
                  value={collections.records}
                  onChange={(e) => handleCollectionChange("", "records", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Reports</Label>
                <Input
                  type="number"
                  placeholder="Number of reports"
                  value={collections.reports}
                  onChange={(e) => handleCollectionChange("", "reports", e.target.value)}
                />
              </div>
            </div>

            {/* Journals Section */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">Journals Collection</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>National Journals</Label>
                  <Input
                    type="number"
                    placeholder="Number of national journals"
                    value={collections.journals.national}
                    onChange={(e) => handleCollectionChange("journals", "national", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>International Journals</Label>
                  <Input
                    type="number"
                    placeholder="Number of international journals"
                    value={collections.journals.international}
                    onChange={(e) => handleCollectionChange("journals", "international", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total Journals</Label>
                  <Input
                    type="number"
                    placeholder="Total number of journals"
                    value={collections.journals.total}
                    onChange={(e) => handleCollectionChange("journals", "total", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 text-lg">
                Save Library Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
