"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeaveRequestForm } from "@/components/leave-request-form"

export default function AddLeaveRequestPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // In a real application, you would submit the data to your backend
    console.log("Leave request data:", data)

    // Redirect to leave requests list page
    router.push("/admin/leave-requests")
  }

  const handleCancel = () => {
    router.push("/admin/leave-requests")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Leave Request</h1>
        <p className="text-muted-foreground">Submit a new leave request</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Request Form</CardTitle>
          <CardDescription>Please fill in all the required information for your leave request</CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveRequestForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
