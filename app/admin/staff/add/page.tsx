"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StaffForm } from "@/components/staff-form"

export default function AddStaffPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // In a real application, you would submit the data to your backend
    console.log("Complete staff data:", data)

    // Redirect to staff list page
    router.push("/admin/staff")
  }

  const handleCancel = () => {
    router.push("/admin/staff")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Staff</h1>
        <p className="text-muted-foreground">Add a new staff member to the system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Information</CardTitle>
          <CardDescription>Please fill in all the required information about the staff member</CardDescription>
        </CardHeader>
        <CardContent>
          <StaffForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
