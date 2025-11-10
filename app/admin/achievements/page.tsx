"use client"

import { useState } from "react"
import { Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Sample data for achievements
const initialAchievements = [
  {
    id: 1,
    title: "NAAC A+ Accreditation",
    category: "Academic",
    date: "2022-05-15",
    academicYear: "2021-2022",
    description: "The college received NAAC A+ accreditation with a CGPA of 3.51.",
    department: "Institution Level",
    level: "National",
    uploadedBy: "Admin",
    verifiedStatus: "Verified",
    supportingDocument: "naac-certificate.pdf",
    media: "naac-ceremony.jpg",
  },
  {
    id: 2,
    title: "First Prize in Smart India Hackathon",
    category: "Innovation",
    date: "2023-02-10",
    academicYear: "2022-2023",
    description: "Students from CSE department won first prize in Smart India Hackathon 2023.",
    department: "Computer Science Engineering",
    level: "National",
    uploadedBy: "HOD-CSE",
    verifiedStatus: "Verified",
    supportingDocument: "sih-certificate.pdf",
    media: "sih-team-photo.jpg",
  },
  {
    id: 3,
    title: "Research Grant of ₹50 Lakhs",
    category: "Research",
    date: "2023-04-20",
    academicYear: "2022-2023",
    description: "Dr. Rajesh Kumar received a research grant of ₹50 lakhs from DST for AI research.",
    department: "Computer Science Engineering",
    level: "National",
    uploadedBy: "Faculty-CSE",
    verifiedStatus: "Verified",
    supportingDocument: "dst-grant-letter.pdf",
    media: null,
  },
  {
    id: 4,
    title: "Inter-College Basketball Championship",
    category: "Sports",
    date: "2023-01-15",
    academicYear: "2022-2023",
    description: "College basketball team won the inter-college championship.",
    department: "Sports Department",
    level: "State",
    uploadedBy: "Sports-Director",
    verifiedStatus: "Pending",
    supportingDocument: "basketball-certificate.pdf",
    media: "basketball-team.jpg",
  },
  {
    id: 5,
    title: "MoU with Microsoft",
    category: "Outreach",
    date: "2022-11-30",
    academicYear: "2022-2023",
    description: "College signed MoU with Microsoft for student training and certification.",
    department: "Institution Level",
    level: "International",
    uploadedBy: "Principal",
    verifiedStatus: "Verified",
    supportingDocument: "microsoft-mou.pdf",
    media: "mou-signing-ceremony.jpg",
  },
]

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState(initialAchievements)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined)
  const [departmentFilter, setDepartmentFilter] = useState<string | undefined>(undefined)

  // Filter achievements based on search term and filters
  const filteredAchievements = achievements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter ? a.category === categoryFilter : true
    const matchesDepartment = departmentFilter ? a.department === departmentFilter : true

    return matchesSearch && matchesCategory && matchesDepartment
  })

  const categories = [
    "Academic",
    "Research",
    "Sports",
    "Outreach",
    "Innovation",
    "Placement",
    "Rankings",
    "Awards",
    "Cultural",
    "Others",
  ]

  const departments = [
    "Institution Level",
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Sports Department",
  ]

  const handleDeleteAchievement = (id: number) => {
    setAchievements(achievements.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Institutional Achievements</h1>
          <p className="text-muted-foreground">Track and manage college achievements and recognitions</p>
        </div>
        <Button asChild>
          <Link href="/admin/achievements/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search achievements..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-departments">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setCategoryFilter(undefined)
              setDepartmentFilter(undefined)
              setSearchTerm("")
            }}
            title="Clear filters"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAchievements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No achievements found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAchievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell className="font-medium">{achievement.title}</TableCell>
                  <TableCell>{achievement.category}</TableCell>
                  <TableCell>{achievement.department}</TableCell>
                  <TableCell>{achievement.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        achievement.verifiedStatus === "Verified"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {achievement.verifiedStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteAchievement(achievement.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
