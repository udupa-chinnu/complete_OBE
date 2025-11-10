"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  School,
  BookOpen,
  ClipboardList,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  {
    title: "Dashboard",
    href: "/academic/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Faculty Feedback",
    href: "/academic/faculty-feedback",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Institution Feedback",
    href: "/academic/institution-feedback",
    icon: <School className="h-5 w-5" />,
  },
  {
    title: "Feedback Reports",
    href: "/academic/feedback-reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Course Management",
    href: "/academic/course-management",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Faculty Management",
    href: "/academic/faculty-management",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Exam Management",
    href: "/academic/exam-management",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/academic/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export default function AcademicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // In a real application, you would handle logout logic here
    router.push("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-white">
          <Link href="#" className="flex items-center gap-2 mr-4">
            <Image
              src="/images/sahyadri-logo.png"
              alt="Sahyadri College of Engineering & Management"
              width={200}
              height={48}
              priority
            />
          </Link>
          <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full ml-auto">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Academic" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1">
          <Sidebar className="hidden md:flex">
            <SidebarHeader className="border-b p-4">
              <div className="flex items-center gap-2">
                <School className="h-6 w-6" />
                <span className="text-lg font-semibold">Academic Portal</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className="border-t p-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Academic" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Academic Admin</p>
                  <p className="text-xs text-muted-foreground">academic@college.edu</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 p-4 md:p-6 bg-gray-50">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
