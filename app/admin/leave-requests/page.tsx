import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"

// Mock data for leave requests
const leaveRequests = [
  {
    id: "1",
    name: "John Doe",
    employeeId: "EMP001",
    department: "Computer Science Engineering",
    leaveType: "Casual Leave",
    fromDate: "2023-05-10",
    toDate: "2023-05-12",
    totalDays: "3",
    status: "Approved",
    submissionDate: "2023-05-05",
  },
  {
    id: "2",
    name: "Jane Smith",
    employeeId: "EMP002",
    department: "Electronics & Communication",
    leaveType: "Sick Leave",
    fromDate: "2023-05-15",
    toDate: "2023-05-16",
    totalDays: "2",
    status: "Pending",
    submissionDate: "2023-05-12",
  },
  {
    id: "3",
    name: "Robert Johnson",
    employeeId: "EMP003",
    department: "Mechanical Engineering",
    leaveType: "Earned Leave",
    fromDate: "2023-06-01",
    toDate: "2023-06-10",
    totalDays: "10",
    status: "Rejected",
    submissionDate: "2023-05-20",
  },
  {
    id: "4",
    name: "Emily Davis",
    employeeId: "EMP004",
    department: "Information Science Engineering",
    leaveType: "Maternity Leave",
    fromDate: "2023-07-01",
    toDate: "2023-10-01",
    totalDays: "92",
    status: "Approved",
    submissionDate: "2023-06-15",
  },
  {
    id: "5",
    name: "Michael Wilson",
    employeeId: "EMP005",
    department: "Civil Engineering",
    leaveType: "Duty Leave",
    fromDate: "2023-05-25",
    toDate: "2023-05-26",
    totalDays: "2",
    status: "Approved",
    submissionDate: "2023-05-22",
  },
]

export default function LeaveRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests for faculty and staff</p>
        </div>
        <Button asChild>
          <Link href="/admin/leave-requests/add">
            <Plus className="mr-2 h-4 w-4" />
            New Leave Request
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>View and manage all leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={leaveRequests} />
        </CardContent>
      </Card>
    </div>
  )
}
