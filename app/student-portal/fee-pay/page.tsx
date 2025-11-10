"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CreditCard, CheckCircle, Clock, AlertCircle, Download } from "lucide-react"

export default function FeePayPage() {
  const router = useRouter()
  const [feeData] = useState({
    totalFee: 150000,
    paidAmount: 100000,
    remainingAmount: 50000,
    dueDate: "2024-12-31",
  })

  const [feeHistory] = useState([
    {
      id: 1,
      amount: 50000,
      date: "2024-06-15",
      semester: "Semester 3",
      status: "Paid",
      type: "Tuition Fee",
      receiptNo: "REC/2024/001",
    },
    {
      id: 2,
      amount: 25000,
      date: "2024-07-10",
      semester: "Semester 3",
      status: "Paid",
      type: "Development Fee",
      receiptNo: "REC/2024/002",
    },
    {
      id: 3,
      amount: 25000,
      date: "2024-08-05",
      semester: "Semester 3",
      status: "Paid",
      type: "Library & Lab Fee",
      receiptNo: "REC/2024/003",
    },
    {
      id: 4,
      amount: 25000,
      date: "2024-09-01",
      semester: "Semester 3",
      status: "Pending",
      type: "Sports Fee",
      receiptNo: null,
    },
    {
      id: 5,
      amount: 25000,
      date: null,
      semester: "Semester 3",
      status: "Pending",
      type: "Examination Fee",
      receiptNo: null,
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Pending":
        return <Clock className="w-5 h-5 text-orange-600" />
      case "Overdue":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-orange-100 text-orange-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Fee Payment</h1>
              <p className="text-sm text-gray-600">Manage your fee payments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Fee Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Total Fee</p>
                <p className="text-3xl font-bold text-gray-800">₹{feeData.totalFee.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Amount Paid</p>
                <p className="text-3xl font-bold text-green-600">₹{feeData.paidAmount.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Remaining</p>
                <p className="text-3xl font-bold text-red-600">₹{feeData.remainingAmount.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Payment Progress</p>
                <p className="text-3xl font-bold text-blue-600">
                  {((feeData.paidAmount / feeData.totalFee) * 100).toFixed(0)}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Progress Bar */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">Overall Payment Progress</span>
                <span className="text-sm text-gray-600">
                  Due Date: {new Date(feeData.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-600 h-4 rounded-full transition-all"
                  style={{ width: `${(feeData.paidAmount / feeData.totalFee) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {feeData.remainingAmount > 0 && `₹${feeData.remainingAmount.toLocaleString()} remaining to be paid`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Pay Now
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Fee Statement
          </Button>
        </div>

        {/* Fee History */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Payment History</CardTitle>
            <CardDescription>All fee transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {feeHistory.map((fee) => (
                <div
                  key={fee.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-shrink-0">{getStatusIcon(fee.status)}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{fee.type}</p>
                      <p className="text-sm text-gray-600">{fee.semester}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{fee.amount.toLocaleString()}</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(fee.status)}`}
                    >
                      {fee.status}
                    </span>
                  </div>
                  {fee.receiptNo && (
                    <Button variant="ghost" size="sm" className="ml-4">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
