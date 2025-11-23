import Link from "next/link"
import {
  Building2,
  GraduationCap,
  Users,
  ClipboardList,
  Upload,
  ArrowRight,
  Award,
  Building,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const dashboardCards = [
    {
      title: "Institutional Details",
      description: "Manage college information, contact details, and infrastructure",
      icon: <Building className="h-8 w-8" />,
      href: "/admin/institution",
      count: 1,
      label: "Institution",
    },
    {
      title: "Department Management",
      description: "Manage college departments, codes, and department heads",
      icon: <Building2 className="h-8 w-8" />,
      href: "/admin/departments",
      count: 8,
      label: "Departments",
    },
    {
      title: "Program Management",
      description: "Manage academic programs, codes, and accreditation status",
      icon: <GraduationCap className="h-8 w-8" />,
      href: "/admin/programs",
      count: 15,
      label: "Programs",
    },
    {
      title: "Faculty Management",
      description: "Manage faculty information, qualifications, and details",
      icon: <Users className="h-8 w-8" />,
      href: "/admin/faculty",
      count: 120,
      label: "Faculty Members",
    },
    {
      title: "Staff Management",
      description: "Manage non-teaching staff information and details",
      icon: <Users className="h-8 w-8" />,
      href: "/admin/staff",
      count: 85,
      label: "Staff Members",
    },
    {
      title: "Institutional Achievements",
      description: "Track and manage college achievements and recognitions",
      icon: <Award className="h-8 w-8" />,
      href: "/admin/achievements",
      count: 42,
      label: "Achievements",
    },
    {
      title: "Appraisal Structure",
      description: "Configure and manage faculty appraisal structures",
      icon: <ClipboardList className="h-8 w-8" />,
      href: "/admin/appraisals",
      count: 4,
      label: "Appraisal Types",
    },
    {
      title: "Mandatory Uploads",
      description: "Manage mandatory document uploads and reports",
      icon: <Upload className="h-8 w-8" />,
      href: "/admin/uploads",
      count: 25,
      label: "Documents",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the College Data Portal. Manage all college data from this dashboard.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
              <div className="rounded-full bg-primary/10 p-2 text-primary">{card.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.count}</div>
              <p className="text-xs text-muted-foreground">{card.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={card.href}>
                  Manage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your recent activities in the portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Added new faculty member</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Updated department details</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Uploaded accreditation report</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of portal statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm">Total Departments</p>
                <p className="font-medium">8</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Total Programs</p>
                <p className="font-medium">15</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Total Faculty</p>
                <p className="font-medium">120</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Total Staff</p>
                <p className="font-medium">85</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Pending Appraisals</p>
                <p className="font-medium">24</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Documents Uploaded</p>
                <p className="font-medium">25</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-500/10 p-2">
                  <ClipboardList className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Faculty Appraisal Review</p>
                  <p className="text-xs text-muted-foreground">Due in 2 days</p>
                </div>
                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-red-500/10 p-2">
                  <Upload className="h-4 w-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">NAAC Report Upload</p>
                  <p className="text-xs text-muted-foreground">Due tomorrow</p>
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-500/10 p-2">
                  <GraduationCap className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Program Review Meeting</p>
                  <p className="text-xs text-muted-foreground">Scheduled for next week</p>
                </div>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
