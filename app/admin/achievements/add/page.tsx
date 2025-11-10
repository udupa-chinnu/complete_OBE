"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

const achievementFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  category: z.string({ required_error: "Please select a category" }),
  date: z.string({ required_error: "Please select a date" }),
  academicYear: z.string({ required_error: "Please select an academic year" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  department: z.string({ required_error: "Please select a department" }),
  level: z.string({ required_error: "Please select a level" }),
  verifiedStatus: z.string().optional(),
})

type AchievementFormValues = z.infer<typeof achievementFormSchema>

export default function AddAchievementPage() {
  const router = useRouter()
  const [supportingDoc, setSupportingDoc] = useState<File | null>(null)
  const [mediaFile, setMediaFile] = useState<File | null>(null)

  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementFormSchema),
    defaultValues: {
      title: "",
      description: "",
      verifiedStatus: "Pending",
    },
  })

  function onSubmit(data: AchievementFormValues) {
    console.log("Form submitted:", data)
    console.log("Supporting document:", supportingDoc)
    console.log("Media file:", mediaFile)

    // In a real application, you would send this data to your backend
    // For now, we'll just redirect back to the achievements page
    router.push("/admin/achievements")
  }

  const categories = [
    "Academic",
    "Research",
    "Sports",
    "Outreach",
    "Innovation",
    "Placement",
    "Rankings",
    "Awards",
    "Cultural",
    "Others",
  ]

  const departments = [
    "Institution Level",
    "Computer Science Engineering",
    "Information Science Engineering",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Sports Department",
  ]

  const levels = ["International", "National", "State", "University", "District", "College"]

  const academicYears = ["2023-2024", "2022-2023", "2021-2022", "2020-2021", "2019-2020", "2018-2019"]

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/admin/achievements">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Achievement</h1>
          <p className="text-muted-foreground">Record a new institutional achievement or recognition</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievement Details</CardTitle>
          <CardDescription>
            Enter the details of the achievement. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter achievement title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Achievement *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="academicYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Year *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select academic year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {academicYears.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept} value={dept}>
                              {dept}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed description of the achievement"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label htmlFor="supportingDoc">Supporting Document</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="supportingDoc"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                        </div>
                        <input
                          id="supportingDoc"
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSupportingDoc(e.target.files[0])
                            }
                          }}
                        />
                      </label>
                    </div>
                    {supportingDoc && <p className="mt-2 text-sm text-gray-500">Selected file: {supportingDoc.name}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="mediaFile">Media (Photos/Videos)</Label>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="mediaFile"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">JPG, PNG, MP4 (MAX. 20MB)</p>
                        </div>
                        <input
                          id="mediaFile"
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.mp4"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setMediaFile(e.target.files[0])
                            }
                          }}
                        />
                      </label>
                    </div>
                    {mediaFile && <p className="mt-2 text-sm text-gray-500">Selected file: {mediaFile.name}</p>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" asChild>
                  <Link href="/admin/achievements">Cancel</Link>
                </Button>
                <Button type="submit">Save Achievement</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
