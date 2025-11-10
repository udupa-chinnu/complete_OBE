"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  GraduationCap,
  Users,
  ClipboardList,
  Upload,
  Award,
  Building,
  DoorClosed,
  LayoutDashboard,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Institutional Details",
    href: "/admin/institution",
    icon: <Building className="h-5 w-5" />,
  },
  {
    title: "Department Management",
    href: "/admin/departments",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "Program Management",
    href: "/admin/programs",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "Faculty Management",
    href: "/admin/faculty",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Staff Management",
    href: "/admin/staff",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Institutional Achievements",
    href: "/admin/achievements",
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: "Leave Management",
    href: "/admin/leave-requests",
    icon: <DoorClosed className="h-5 w-5" />,
  },
  {
    title: "Appraisal Structure",
    href: "/admin/appraisals",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Mandatory Uploads",
    href: "/admin/uploads",
    icon: <Upload className="h-5 w-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <Building2 className="h-6 w-6" />
            <span>College Data Portal</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === item.href && "bg-muted text-primary",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <Link
            href="/login"
            className="flex w-full items-center gap-3 rounded-lg bg-muted px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-primary"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}
