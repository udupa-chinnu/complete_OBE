"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  School,
  MessageSquare,
  LogOut,
} from "lucide-react"

import { Button } from "@/components/admin/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/admin/avatar"
import { logout } from "@/lib/auth"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger, // Added Trigger
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/admin/dropdown-menu"

const navItems = [
  {
    title: "Dashboard",
    href: "/academicSWO/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Faculty Feedback",
    href: "/academicSWO/faculty-feedback",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Institution Feedback",
    href: "/academicSWO/institution-feedback",
    icon: <School className="h-5 w-5" />,
  },
  {
    title: "Graduate Exit Survey",
    href: "/academicSWO/graduate-exit-survey",
    icon: <School className="h-5 w-5" />,
  },
  {
    title: "Feedback Reports",
    href: "/academicSWO/feedback-reports",
    icon: <FileText className="h-5 w-5" />,
  },
]

export default function AcademicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col w-full">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-white sticky top-0 z-10">
          {/* Mobile Menu Trigger */}
          <SidebarTrigger className="md:hidden mr-4" />
          
          <Link href="#" className="flex items-center gap-2 mr-4">
            <Image
              src="/images/sahyadri-logo.png"
              alt="Sahyadri College"
              width={200}
              height={48}
              priority
              className="w-[150px] md:w-[200px] h-auto" // Responsive Logo
            />
          </Link>
          <div className="flex items-center w-full gap-4 ml-auto justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg?height=32&width=32" alt="Academic" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsible="icon" className="hidden md:flex border-r">
            <SidebarHeader className="border-b p-4">
              <div className="flex items-center gap-2">
                <School className="h-6 w-6" />
                <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Academic Portal</span>
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
            <SidebarFooter className="border-t p-4 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Academic" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="overflow-hidden">
                  <p className="text-sm font-medium truncate">Academic Admin</p>
                  <p className="text-xs text-muted-foreground truncate">academic@college.edu</p>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}