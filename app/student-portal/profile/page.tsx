"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, User, FileText, BookOpen } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [profileData] = useState({
    // Personal Details
    studentId: "4SF22CS001",
    name: "John",
    fathersName: "Robert Smith",
    mothersName: "Emma Smith",
    dob: "2005-06-15",
    gender: "Male",
    bloodGroup: "O+",
    email: "john.smith@student.edu",
    phone: "+91 9876543210",
    address: "123 Main Street, Springfield, State - 560001",
    city: "Springfield",
    state: "State",
    pincode: "560001",
    aadhar: "1234 5678 9012",

    // Academic Details
    program: "B.Tech Computer Science",
    currentSemester: "7",
    cgpa: "8.3",
    enrollmentYear: "2022",
    batch: "2022-2026",
    rollNumber: "34",

    // Educational Background
    board10: "ICSE",
    schoolName10: "Springfield High School",
    year10: "2019",
    marks10: "92%",

    board12: "ISC",
    schoolName12: "Springfield Senior School",
    year12: "2021",
    marks12: "88%",

    parentPhone: "+91 9876543211",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Profile</h1>
              <p className="text-sm text-gray-600">View your personal and academic information</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-5xl font-bold">J</span>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800">{profileData.name}</h2>
                <p className="text-lg text-gray-600 mb-4">ID: {profileData.studentId}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Program</p>
                    <p className="font-semibold text-gray-800">{profileData.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Semester</p>
                    <p className="font-semibold text-gray-800">{profileData.currentSemester}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CGPA</p>
                    <p className="font-semibold text-green-600">{profileData.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Batch</p>
                    <p className="font-semibold text-gray-800">{profileData.batch}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Father's Name</p>
                  <p className="font-semibold text-gray-800">{profileData.fathersName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mother's Name</p>
                  <p className="font-semibold text-gray-800">{profileData.mothersName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-semibold text-gray-800">{new Date(profileData.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold text-gray-800">{profileData.gender}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Blood Group</p>
                  <p className="font-semibold text-gray-800">{profileData.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Aadhar Number</p>
                  <p className="font-semibold text-gray-800">{profileData.aadhar}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{profileData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-800">{profileData.phone}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Full Address</p>
                <p className="font-semibold text-gray-800">{profileData.address}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-semibold text-gray-800">{profileData.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">State</p>
                  <p className="font-semibold text-gray-800">{profileData.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pin Code</p>
                  <p className="font-semibold text-gray-800">{profileData.pincode}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Academic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Roll Number</p>
                  <p className="font-semibold text-gray-800">{profileData.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Enrollment Year</p>
                  <p className="font-semibold text-gray-800">{profileData.enrollmentYear}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Program Duration</p>
                  <p className="font-semibold text-gray-800">{profileData.batch}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current CGPA</p>
                  <p className="font-semibold text-green-600 text-lg">{profileData.cgpa}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Educational Background */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Educational Background</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 10th Grade */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Class 10th</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Board</p>
                    <p className="font-semibold text-gray-800">{profileData.board10}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">School Name</p>
                    <p className="font-semibold text-gray-800">{profileData.schoolName10}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Year</p>
                    <p className="font-semibold text-gray-800">{profileData.year10}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Marks Percentage</p>
                    <p className="font-semibold text-green-600">{profileData.marks10}</p>
                  </div>
                </div>
              </div>

              {/* 12th Grade */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-800 mb-3">Class 12th</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">Board</p>
                    <p className="font-semibold text-gray-800">{profileData.board12}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">School Name</p>
                    <p className="font-semibold text-gray-800">{profileData.schoolName12}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Year</p>
                    <p className="font-semibold text-gray-800">{profileData.year12}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Marks Percentage</p>
                    <p className="font-semibold text-green-600">{profileData.marks12}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
