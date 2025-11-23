"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const basicFormSchema = z.object({
  name: z.string().min(1, "Institution name is required"),
  code: z.string().min(1, "Institution code is required"),
  establishmentYear: z.string().min(1, "Establishment year is required"),
  instituteType: z.string().min(1, "Institute type is required"),
  affiliationType: z.string().min(1, "Affiliation type is required"),
  affiliatedUniversity: z.string().min(1, "Affiliated university is required"),
  instituteCategory: z.string().min(1, "Institute category is required"),
  accreditationStatus: z.string().min(1, "Accreditation status is required"),
  naacGrade: z.string().optional(),
  nbaAccreditedPrograms: z.string().optional(),
})

type BasicFormValues = z.infer<typeof basicFormSchema>

interface InstitutionBasicFormProps {
  data: any
  onSubmit: (data: any) => void
  isEditing: boolean
}

export function InstitutionBasicForm({ data, onSubmit, isEditing }: InstitutionBasicFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [currentLogo, setCurrentLogo] = useState(data.logo || "")

  const form = useForm<BasicFormValues>({
    resolver: zodResolver(basicFormSchema),
    defaultValues: {
      name: data.name || "",
      code: data.code || "",
      establishmentYear: data.establishmentYear || "",
      instituteType: data.instituteType || "",
      affiliationType: data.affiliationType || "",
      affiliatedUniversity: data.affiliatedUniversity || "",
      instituteCategory: data.instituteCategory || "",
      accreditationStatus: data.accreditationStatus || "",
      naacGrade: data.naacGrade || "",
      nbaAccreditedPrograms: data.nbaAccreditedPrograms || "",
    },
  })

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0])
      setCurrentLogo(e.target.files[0].name)
    }
  }

  function handleSubmit(values: BasicFormValues) {
    // Combine form values with logo file
    const formData = {
      ...values,
      logo: logoFile ? currentLogo : data.logo,
    }
    onSubmit(formData)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="establishmentYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Establishment Year</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instituteType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Type</FormLabel>
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Government">Government</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="Deemed">Deemed</SelectItem>
                        <SelectItem value="Autonomous">Autonomous</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliation Type</FormLabel>
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Affiliated">Affiliated</SelectItem>
                        <SelectItem value="Constituent">Constituent</SelectItem>
                        <SelectItem value="Autonomous">Autonomous</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affiliatedUniversity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliated University</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instituteCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Category</FormLabel>
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Medical">Medical</SelectItem>
                        <SelectItem value="Arts & Science">Arts & Science</SelectItem>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Law">Law</SelectItem>
                        <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accreditationStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accreditation Status</FormLabel>
                    <Select
                      disabled={!isEditing}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="NAAC">NAAC</SelectItem>
                        <SelectItem value="NBA">NBA</SelectItem>
                        <SelectItem value="Both">Both NAAC & NBA</SelectItem>
                        <SelectItem value="None">None</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="naacGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NAAC Grade</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="nbaAccreditedPrograms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NBA Accredited Programs</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormDescription>Comma-separated list of NBA accredited programs</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="logo">Institution Logo</Label>
                  {currentLogo && (
                    <div className="flex items-center space-x-2">
                      <div className="h-16 w-16 rounded border bg-muted flex items-center justify-center">
                        <img
                          src={logoFile ? URL.createObjectURL(logoFile) : (currentLogo && currentLogo.startsWith('/uploads') ? `http://localhost:5000${currentLogo}` : `/images/sahyadri-logo.png?height=64&width=64`)}
                          alt="Institution Logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{currentLogo}</span>
                    </div>
                  )}
                  {isEditing && (
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>
            {isEditing && (
              <Button type="submit" className="w-full">
                Save Basic Information
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
