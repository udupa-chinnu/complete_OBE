"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, FileText, Printer } from "lucide-react"

export default function FeeReceiptPage() {
  const router = useRouter()
  const [receipts] = useState([
    {
      id: 1,
      receiptNo: "REC/2024/001",
      amount: 50000,
      date: "2024-06-15",
      semester: "Semester 3",
      type: "Tuition Fee",
      status: "Downloaded",
      paymentMethod: "Online Transfer",
    },
    {
      id: 2,
      receiptNo: "REC/2024/002",
      amount: 25000,
      date: "2024-07-10",
      semester: "Semester 3",
      type: "Development Fee",
      status: "Available",
      paymentMethod: "Online Transfer",
    },
    {
      id: 3,
      receiptNo: "REC/2024/003",
      amount: 25000,
      date: "2024-08-05",
      semester: "Semester 3",
      type: "Library & Lab Fee",
      status: "Available",
      paymentMethod: "Card Payment",
    },
  ])

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
              <h1 className="text-2xl font-bold text-gray-800">Fee Receipts</h1>
              <p className="text-sm text-gray-600">Download your fee payment receipts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {receipts.map((receipt) => (
            <Card key={receipt.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <p className="font-bold text-gray-800">{receipt.receiptNo}</p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            receipt.status === "Downloaded"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {receipt.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {receipt.type} - {receipt.semester}
                      </p>
                      <p className="text-xs text-gray-500">Date: {new Date(receipt.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right mr-4">
                    <p className="font-bold text-lg text-gray-800">₹{receipt.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{receipt.paymentMethod}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
