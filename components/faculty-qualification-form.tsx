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
import { useState } from "react"

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

export function FacultyQualificationForm({ onSubmit }: { onSubmit: (data: any) => void }) {
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
      highestQualification: "",
      specialization: "",
      university: "",
      yearOfCompletion: "",
      otherQualifications: "",
      researchInterests: "",
      publications: [{ title: "", journal: "", year: "", doi: "" }],
      researchProjects: [{ title: "", fundingAgency: "", amount: "", duration: "", status: "" }],
      certifications: [{ name: "", issuingOrganization: "", issueDate: "", expiryDate: "" }],
    },
  })

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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="phd">Ph.D</SelectItem>
                    <SelectItem value="masters">Masters</SelectItem>
                    <SelectItem value="bachelors">Bachelors</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
            name="otherQualifications"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Other Qualifications</FormLabel>
                <FormControl>
                  <Textarea placeholder="List any other qualifications" {...field} />
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

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Publications</h3>
            <Button type="button" variant="outline" onClick={addPublication}>
              Add Publication
            </Button>
          </div>

          {publications.map((pub, index) => (
            <div key={index} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Publication {index + 1}</h4>
                {publications.length > 1 && (
                  <Button type="button" variant="destructive" size="sm" onClick={() => removePublication(index)}>
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={pub.title}
                    onChange={(e) => updatePublication(index, "title", e.target.value)}
                    placeholder="Publication title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Journal/Conference</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={pub.journal}
                    onChange={(e) => updatePublication(index, "journal", e.target.value)}
                    placeholder="Journal or conference name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Year</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={pub.year}
                    onChange={(e) => updatePublication(index, "year", e.target.value)}
                    placeholder="Publication year"
                  />
                </div>
                <div className="space-y-2">
                  <Label>DOI (optional)</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={pub.doi}
                    onChange={(e) => updatePublication(index, "doi", e.target.value)}
                    placeholder="DOI reference"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Research Projects</h3>
            <Button type="button" variant="outline" onClick={addResearchProject}>
              Add Project
            </Button>
          </div>

          {researchProjects.map((project, index) => (
            <div key={index} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Research Project {index + 1}</h4>
                {researchProjects.length > 1 && (
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeResearchProject(index)}>
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={project.title}
                    onChange={(e) => updateResearchProject(index, "title", e.target.value)}
                    placeholder="Project title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Funding Agency</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={project.fundingAgency}
                    onChange={(e) => updateResearchProject(index, "fundingAgency", e.target.value)}
                    placeholder="Funding agency name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={project.amount}
                    onChange={(e) => updateResearchProject(index, "amount", e.target.value)}
                    placeholder="Funding amount"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={project.duration}
                    onChange={(e) => updateResearchProject(index, "duration", e.target.value)}
                    placeholder="Project duration"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label> {/* Use Label instead of FormLabel */}
                  <Select
                    value={project.status}
                    onValueChange={(value) => updateResearchProject(index, "status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Certifications</h3>
            <Button type="button" variant="outline" onClick={addCertification}>
              Add Certification
            </Button>
          </div>

          {certifications.map((cert, index) => (
            <div key={index} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Certification {index + 1}</h4>
                {certifications.length > 1 && (
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeCertification(index)}>
                    Remove
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={cert.name}
                    onChange={(e) => updateCertification(index, "name", e.target.value)}
                    placeholder="Certification name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issuing Organization</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={cert.issuingOrganization}
                    onChange={(e) => updateCertification(index, "issuingOrganization", e.target.value)}
                    placeholder="Organization name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issue Date</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={cert.issueDate}
                    onChange={(e) => updateCertification(index, "issueDate", e.target.value)}
                    placeholder="Date of issue"
                    type="date"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date (if applicable)</Label> {/* Use Label instead of FormLabel */}
                  <Input
                    value={cert.expiryDate}
                    onChange={(e) => updateCertification(index, "expiryDate", e.target.value)}
                    placeholder="Date of expiry"
                    type="date"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit">Save & Continue</Button>
      </form>
    </Form>
  )
}
