"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, MapPin, Users } from "lucide-react"

export default function ActivitiesPage() {
  const router = useRouter()
  const [activities] = useState([
    {
      id: 1,
      title: "Annual Sports Festival 2024",
      description: "Inter-department sports competition with various events",
      date: "2024-12-20",
      time: "09:00 AM - 05:00 PM",
      location: "Sports Complex, Campus",
      category: "Sports",
      registeredStudents: 250,
      status: "Upcoming",
      image: "🏆",
    },
    {
      id: 2,
      title: "Technical Symposium - AI & ML",
      description: "Learn about latest trends in Artificial Intelligence and Machine Learning",
      date: "2024-12-15",
      time: "10:00 AM - 04:00 PM",
      location: "Auditorium Block A",
      category: "Academic",
      registeredStudents: 450,
      status: "Upcoming",
      image: "🤖",
    },
    {
      id: 3,
      title: "Cultural Fest 2024",
      description: "Celebrate diverse cultures through music, dance, and food",
      date: "2024-12-25",
      time: "06:00 PM - 10:00 PM",
      location: "Main Grounds",
      category: "Cultural",
      registeredStudents: 600,
      status: "Upcoming",
      image: "🎭",
    },
    {
      id: 4,
      title: "Coding Marathon",
      description: "24-hour coding competition with exciting prizes",
      date: "2024-12-10",
      time: "10:00 AM",
      location: "Computer Labs",
      category: "Competition",
      registeredStudents: 120,
      status: "Ongoing",
      image: "💻",
    },
    {
      id: 5,
      title: "Internship Fair 2024",
      description: "Meet with leading companies for internship opportunities",
      date: "2024-12-08",
      time: "09:00 AM - 01:00 PM",
      location: "Main Auditorium",
      category: "Career",
      registeredStudents: 350,
      status: "Completed",
      image: "💼",
    },
    {
      id: 6,
      title: "Environmental Awareness Drive",
      description: "Campus clean-up and environmental conservation initiatives",
      date: "2024-12-22",
      time: "08:00 AM - 11:00 AM",
      location: "Campus Grounds",
      category: "Social Service",
      registeredStudents: 200,
      status: "Upcoming",
      image: "🌱",
    },
  ])

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Sports: "bg-blue-100 text-blue-800",
      Academic: "bg-purple-100 text-purple-800",
      Cultural: "bg-pink-100 text-pink-800",
      Competition: "bg-green-100 text-green-800",
      Career: "bg-yellow-100 text-yellow-800",
      "Social Service": "bg-green-100 text-green-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-500"
      case "Ongoing":
        return "bg-orange-500"
      case "Completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-800">College Activities</h1>
              <p className="text-sm text-gray-600">Upcoming and ongoing events at our campus</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tags */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button variant="outline" className="whitespace-nowrap bg-transparent">
            All Events
          </Button>
          <Button variant="outline" className="whitespace-nowrap bg-transparent">
            Sports
          </Button>
          <Button variant="outline" className="whitespace-nowrap bg-transparent">
            Academic
          </Button>
          <Button variant="outline" className="whitespace-nowrap bg-transparent">
            Cultural
          </Button>
          <Button variant="outline" className="whitespace-nowrap bg-transparent">
            Career
          </Button>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">{activity.image}</span>
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{activity.description}</CardDescription>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(activity.status)}`}
                  >
                    {activity.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span>
                      {new Date(activity.date).toLocaleDateString()} at {activity.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <Users className="w-4 h-4 text-gray-600" />
                    <span>{activity.registeredStudents} students registered</span>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(activity.category)}`}
                  >
                    {activity.category}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
