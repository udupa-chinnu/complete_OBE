"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LeavementForm } from "@/components/leavement-form"

export default function AddLeavementPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // In a real application, you would submit the data to your backend
    console.log("Complete leavement data:", data)

    // Redirect to leavements list page
    router.push("/admin/leavements")
  }

  const handleCancel = () => {
    router.push("/admin/leavements")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Leave Record</h1>
        <p className="text-muted-foreground">Record a new staff exit, resignation, or retirement</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Record Information</CardTitle>
          <CardDescription>Please fill in all the required information about the staff exit</CardDescription>
        </CardHeader>
        <CardContent>
          <LeavementForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
