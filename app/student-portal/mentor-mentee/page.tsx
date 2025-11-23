"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp } from "lucide-react"

export default function MentorMenteePage() {
  const router = useRouter()
  const [selectedSection, setSelectedSection] = useState<string | null>(null)

  const sections = [
    { id: "progress", title: "Progress Report", description: "View CGPA and PO attainment graphs" },
    { id: "interaction", title: "Interaction Report", description: "Track mentor-mentee interactions" },
    { id: "placement", title: "Placement Details", description: "Placement and internship information" },
    { id: "extracurricular", title: "Extra Curricular Activities", description: "Participate in college activities" },
    { id: "aicte", title: "AICTE 100 Point Activity", description: "AICTE sanctioned activities" },
    { id: "swoc", title: "SWOC Analysis", description: "Strengths, Weaknesses, Opportunities, Challenges" },
    { id: "grievance", title: "Grievance", description: "Report and track grievances" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (selectedSection ? setSelectedSection(null) : router.back())}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mentor-Mentee Program</h1>
              <p className="text-sm text-gray-600">
                {selectedSection
                  ? sections.find((s) => s.id === selectedSection)?.title
                  : "Holistic development through mentoring"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedSection ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() =>
                  section.id === "progress"
                    ? router.push("/student-portal/mentor-mentee/progress-report")
                    : setSelectedSection(section.id)
                }
                className="group p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-600 transition-all hover:shadow-lg text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded group-hover:bg-blue-200 transition-colors">
                    {section.id === "progress" ? (
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800">{section.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{section.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <SectionContent sectionId={selectedSection} onClose={() => setSelectedSection(null)} />
        )}
      </div>
    </div>
  )
}

function SectionContent({ sectionId, onClose }: { sectionId: string; onClose: () => void }) {
  const sections: Record<string, { title: string; content: React.ReactNode }> = {
    swoc: {
      title: "SWOC Analysis",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Strengths, Weaknesses, Opportunities, Challenges</CardTitle>
            <CardDescription>Personal development analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              { title: "Strengths", items: ["Problem Solving", "Team Work", "Adaptability", "Communication"] },
              { title: "Weaknesses", items: ["Time Management", "Public Speaking", "Technical Skills"] },
              { title: "Opportunities", items: ["Internships", "Certifications", "Leadership Roles", "Workshops"] },
              {
                title: "Challenges",
                items: ["Academic Load", "Industry Competition", "Skill Gap", "Work-Life Balance"],
              },
            ].map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-gray-800">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <input type="checkbox" className="w-4 h-4" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ),
    },
    interaction: {
      title: "Interaction Report",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Mentor-Mentee Interactions</CardTitle>
            <CardDescription>Track all interactions with your mentor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Jan 10, 2025", topic: "Career Planning", duration: "45 mins" },
                { date: "Jan 5, 2025", topic: "Academic Performance", duration: "30 mins" },
                { date: "Dec 28, 2024", topic: "Skill Development", duration: "60 mins" },
              ].map((interaction, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{interaction.topic}</p>
                      <p className="text-sm text-gray-600">{interaction.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {interaction.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    extracurricular: {
      title: "Extra Curricular Activities",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Extra Curricular Activities</CardTitle>
            <CardDescription>Participate and track activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "Programming Club", role: "Coordinator", status: "Active" },
                { activity: "Hackathon 2025", role: "Participant", status: "Upcoming" },
                { activity: "Tech Talk Series", role: "Attendee", status: "Completed" },
              ].map((activity, idx) => (
                <div key={idx} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{activity.activity}</p>
                    <p className="text-sm text-gray-600">{activity.role}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activity.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : activity.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    aicte: {
      title: "AICTE 100 Point Activity",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>AICTE 100 Point Activity</CardTitle>
            <CardDescription>Track AICTE sanctioned activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { activity: "MOOCs Certification", points: 20, status: "Completed" },
                { activity: "Internship", points: 30, status: "In Progress" },
                { activity: "Project Competition", points: 15, status: "Registered" },
                { activity: "Research Paper", points: 20, status: "Pending" },
              ].map((activity, idx) => (
                <div key={idx} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{activity.activity}</p>
                    <p className="text-sm text-gray-600">{activity.status}</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                    {activity.points} pts
                  </span>
                </div>
              ))}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Total Points Earned:</strong> 65 / 100
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    grievance: {
      title: "Grievance",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Grievance Handling</CardTitle>
            <CardDescription>File and track grievances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">File New Grievance</Button>

            <div className="space-y-4">
              {[
                { issue: "Academic Concern", date: "Jan 8, 2025", status: "Resolved" },
                { issue: "Resource Request", date: "Dec 20, 2024", status: "In Review" },
              ].map((grievance, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{grievance.issue}</p>
                      <p className="text-sm text-gray-600">{grievance.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        grievance.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {grievance.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    placement: {
      title: "Placement Details",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Placement & Internship Information</CardTitle>
            <CardDescription>Track your placement and internship journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">85%</p>
                <p className="text-sm text-gray-600">Placement Rate</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">₹5.2L</p>
                <p className="text-sm text-gray-600">Average CTC</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-600">12+</p>
                <p className="text-sm text-gray-600">Companies</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800">Your Status</h3>
              {[
                { company: "TCS", position: "Software Engineer", status: "Offered" },
                { company: "Infosys", position: "Intern", status: "Interviewed" },
              ].map((job, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{job.company}</p>
                      <p className="text-sm text-gray-600">{job.position}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
  }

  return (
    <div className="space-y-6">
      {sections[sectionId]?.content}
      <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
        Back to Mentor-Mentee
      </Button>
    </div>
  )
}
