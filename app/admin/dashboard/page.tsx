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
      count: 1,
      label: "Departments",
    },
    {
      title: "Program Management",
      description: "Manage academic programs, codes, and accreditation status",
      icon: <GraduationCap className="h-8 w-8" />,
      href: "/admin/programs",
      count: 1,
      label: "Programs",
    },
    {
      title: "Faculty Management",
      description: "Manage faculty information, qualifications, and details",
      icon: <Users className="h-8 w-8" />,
      href: "/admin/faculty",
      count: 3,
      label: "Faculty Members",
    },
    {
      title: "Staff Management",
      description: "Manage non-teaching staff information and details",
      icon: <Users className="h-8 w-8" />,
      href: "/admin/staff",
      count: 5,
      label: "Staff Members",
    },
    {
      title: "Institutional Achievements",
      description: "Track and manage college achievements and recognitions",
      icon: <Award className="h-8 w-8" />,
      href: "/admin/achievements",
      count: 1,
      label: "Achievements",
    },
    {
      title: "Appraisal Structure",
      description: "Configure and manage faculty appraisal structures",
      icon: <ClipboardList className="h-8 w-8" />,
      href: "/admin/appraisals",
      count: 2,
      label: "Appraisal Types",
    },
    {
      title: "Mandatory Uploads",
      description: "Manage mandatory document uploads and reports",
      icon: <Upload className="h-8 w-8" />,
      href: "/admin/uploads",
      count: 1,
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

    </div>
  )
}
