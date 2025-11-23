"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { achievementsApi, departmentsApi } from "@/lib/api"

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined)
  const [departmentFilter, setDepartmentFilter] = useState<string | undefined>(undefined)

  useEffect(() => {
    fetchAchievements()
    fetchDepartments()
  }, [])

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const filters: any = { includeInactive: 'true' } // Include inactive to show deactivated items
      if (categoryFilter && categoryFilter !== "all") filters.category = categoryFilter
      if (departmentFilter && departmentFilter !== "all" && departmentFilter !== "institution") {
        const dept = departments.find(d => d.name === departmentFilter)
        if (dept) filters.departmentId = dept.id
      }
      
      const response = await achievementsApi.getAll(filters)
      if (response.success && response.data && Array.isArray(response.data)) {
        setAchievements(response.data)
      } else {
        setAchievements([])
      }
    } catch (error) {
      console.error("Error fetching achievements:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await departmentsApi.getAll()
      if (response.success && response.data && Array.isArray(response.data)) {
        setDepartments(response.data)
      } else {
        setDepartments([])
      }
    } catch (error) {
      console.error("Error fetching departments:", error)
    }
  }

  useEffect(() => {
    fetchAchievements()
  }, [categoryFilter, departmentFilter, departments])

  // Filter achievements based on search term
  const filteredAchievements = achievements.filter((a) => {
    const matchesSearch =
      a.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.department_name?.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
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

  const handleDeleteAchievement = async (id: number) => {
    try {
      const achievement = achievements.find(a => a.id === id)
      if (achievement?.is_active) {
        const response = await achievementsApi.deactivate(id)
        if (response.success) {
          await fetchAchievements()
        } else {
          alert(response.message || "Failed to deactivate achievement")
        }
      } else {
        const response = await achievementsApi.reactivate(id)
        if (response.success) {
          await fetchAchievements()
        } else {
          alert(response.message || "Failed to activate achievement")
        }
      }
    } catch (error) {
      console.error("Error toggling achievement status:", error)
      alert("Failed to update achievement status. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading achievements...</p>
          </div>
        </div>
      </div>
    )
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
              <SelectItem value="all">All Categories</SelectItem>
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
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="institution">Institution Level</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.name}>
                  {dept.name}
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
                  <TableCell>{achievement.department_name || "Institution Level"}</TableCell>
                  <TableCell>{new Date(achievement.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          achievement.verified_status === "Verified"
                            ? "bg-green-100 text-green-800"
                            : achievement.verified_status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-white-800"
                        }`}
                      >
                        {"Verified"}
                      </span>
                      {!achievement.is_active && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                          Deactivated
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {achievement.supporting_document_path && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={`http://localhost:5000${achievement.supporting_document_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Eye className="mr-1 h-4 w-4" />
                            View Doc
                          </a>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/achievements/edit/${achievement.id}`}>Edit</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => handleDeleteAchievement(achievement.id)}
                      >
                        {achievement.is_active ? "Deactivate" : "Activate"}
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
