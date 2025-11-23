"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" // Import regular Label
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"

const formSchema = z.object({
  highestQualification: z.string({
    required_error: "Please select highest qualification.",
  }),
  specialization: z.string().min(2, {
    message: "Specialization must be at least 2 characters.",
  }),
  university: z.string().min(2, {
    message: "University must be at least 2 characters.",
  }),
  yearOfCompletion: z.string().min(4, {
    message: "Year of completion must be valid.",
  }),
  otherQualifications: z.string().optional(),
  researchInterests: z.string().min(5, {
    message: "Research interests must be at least 5 characters.",
  }),
  publications: z
    .array(
      z.object({
        title: z.string().min(2, { message: "Title is required" }),
        journal: z.string().min(2, { message: "Journal name is required" }),
        year: z.string().min(4, { message: "Year is required" }),
        doi: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
  researchProjects: z
    .array(
      z.object({
        title: z.string().min(2, { message: "Title is required" }),
        fundingAgency: z.string().min(2, { message: "Funding agency is required" }),
        amount: z.string().min(1, { message: "Amount is required" }),
        duration: z.string().min(1, { message: "Duration is required" }),
        status: z.string().min(1, { message: "Status is required" }),
      }),
    )
    .optional()
    .default([]),
  certifications: z
    .array(
      z.object({
        name: z.string().min(2, { message: "Name is required" }),
        issuingOrganization: z.string().min(2, { message: "Issuing organization is required" }),
        issueDate: z.string().min(4, { message: "Issue date is required" }),
        expiryDate: z.string().optional(),
      }),
    )
    .optional()
    .default([]),
})

export function FacultyQualificationForm({ onSubmit, initialData }: { onSubmit: (data: any) => void, initialData?: any }) {
  const [publications, setPublications] = useState<any[]>([{ title: "", journal: "", year: "", doi: "" }])
  const [researchProjects, setResearchProjects] = useState<any[]>([
    { title: "", fundingAgency: "", amount: "", duration: "", status: "" },
  ])
  const [certifications, setCertifications] = useState<any[]>([
    { name: "", issuingOrganization: "", issueDate: "", expiryDate: "" },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      highestQualification: initialData?.highestQualification || "",
      specialization: initialData?.specialization || "",
      university: initialData?.university || "",
      yearOfCompletion: initialData?.yearOfCompletion || "",
      otherQualifications: initialData?.otherQualifications || "",
      researchInterests: initialData?.researchInterests || "",
      publications: initialData?.publications || [{ title: "", journal: "", year: "", doi: "" }],
      researchProjects: initialData?.researchProjects || [{ title: "", fundingAgency: "", amount: "", duration: "", status: "" }],
      certifications: initialData?.certifications || [{ name: "", issuingOrganization: "", issueDate: "", expiryDate: "" }],
    },
  })

  useEffect(() => {
    if (initialData) {
      // Update form values when initialData changes
      if (initialData.highestQualification) {
        form.setValue('highestQualification', initialData.highestQualification)
      }
      if (initialData.specialization) {
        form.setValue('specialization', initialData.specialization)
      }
      if (initialData.university) {
        form.setValue('university', initialData.university)
      }
      if (initialData.yearOfCompletion) {
        form.setValue('yearOfCompletion', initialData.yearOfCompletion)
      }
      if (initialData.researchInterests) {
        form.setValue('researchInterests', initialData.researchInterests)
      }
      if (initialData.publications && Array.isArray(initialData.publications) && initialData.publications.length > 0) {
        setPublications(initialData.publications)
      }
      if (initialData.researchProjects && Array.isArray(initialData.researchProjects) && initialData.researchProjects.length > 0) {
        setResearchProjects(initialData.researchProjects)
      }
      if (initialData.certifications && Array.isArray(initialData.certifications) && initialData.certifications.length > 0) {
        setCertifications(initialData.certifications)
      }
    }
  }, [initialData])

  const addPublication = () => {
    setPublications([...publications, { title: "", journal: "", year: "", doi: "" }])
  }

  const removePublication = (index: number) => {
    const updatedPublications = [...publications]
    updatedPublications.splice(index, 1)
    setPublications(updatedPublications)
  }

  const updatePublication = (index: number, field: string, value: string) => {
    const updatedPublications = [...publications]
    updatedPublications[index][field] = value
    setPublications(updatedPublications)
  }

  const addResearchProject = () => {
    setResearchProjects([...researchProjects, { title: "", fundingAgency: "", amount: "", duration: "", status: "" }])
  }

  const removeResearchProject = (index: number) => {
    const updatedProjects = [...researchProjects]
    updatedProjects.splice(index, 1)
    setResearchProjects(updatedProjects)
  }

  const updateResearchProject = (index: number, field: string, value: string) => {
    const updatedProjects = [...researchProjects]
    updatedProjects[index][field] = value
    setResearchProjects(updatedProjects)
  }

  const addCertification = () => {
    setCertifications([...certifications, { name: "", issuingOrganization: "", issueDate: "", expiryDate: "" }])
  }

  const removeCertification = (index: number) => {
    const updatedCertifications = [...certifications]
    updatedCertifications.splice(index, 1)
    setCertifications(updatedCertifications)
  }

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index][field] = value
    setCertifications(updatedCertifications)
  }

  function handleSubmit(values: z.infer<typeof formSchema>) {
    // Add the dynamic arrays to the form data
    const completeData = {
      ...values,
      publications,
      researchProjects,
      certifications,
    }
    onSubmit(completeData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="highestQualification"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highest Qualification</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="post-doctoral">Post Doctoral</SelectItem>
                    <SelectItem value="phd">Ph.D</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                    <SelectItem value="bachelors">Bachelors</SelectItem>
                    <SelectItem value="diploma">10+2</SelectItem>
                    <SelectItem value="sslc">SSLC</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="specialization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University/Institution</FormLabel>
                <FormControl>
                  <Input placeholder="MIT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearOfCompletion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Completion</FormLabel>
                <FormControl>
                  <Input placeholder="2020" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="researchInterests"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Research Interests</FormLabel>
                <FormControl>
                  <Textarea placeholder="Machine Learning, Artificial Intelligence, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <div className="flex justify-end">
          <Button type="submit">Save & Continue</Button>
        </div>
      </form>
    </Form>
  )
}
