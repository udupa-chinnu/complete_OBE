"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const governanceFormSchema = z.object({
  headOfInstitution: z.string().min(1, "Head of institution is required"),
  headDesignation: z.string().min(1, "Designation is required"),
  headEmail: z.string().email("Invalid email address"),
  headPhone: z.string().min(1, "Phone number is required"),
  governingBodyExists: z.string().min(1, "This field is required"),
  governingBodyMembers: z.string().optional(),
  trustName: z.string().min(1, "Trust name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  trustRegistrationDate: z.string().min(1, "Registration date is required"),
})

type GovernanceFormValues = z.infer<typeof governanceFormSchema>

interface InstitutionGovernanceFormProps {
  data: any
  onSubmit: (data: GovernanceFormValues) => void
  isEditing: boolean
}

export function InstitutionGovernanceForm({ data, onSubmit, isEditing }: InstitutionGovernanceFormProps) {
  const form = useForm<GovernanceFormValues>({
    resolver: zodResolver(governanceFormSchema),
    defaultValues: {
      headOfInstitution: data.headOfInstitution || "",
      headDesignation: data.headDesignation || "",
      headEmail: data.headEmail || "",
      headPhone: data.headPhone || "",
      governingBodyExists: data.governingBodyExists || "",
      governingBodyMembers: data.governingBodyMembers || "",
      trustName: data.trustName || "",
      registrationNumber: data.registrationNumber || "",
      trustRegistrationDate: data.trustRegistrationDate || "",
    },
  })

  function handleSubmit(values: GovernanceFormValues) {
    onSubmit(values)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="headOfInstitution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head of Institution</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headDesignation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head Designation</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head Phone</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="governingBodyExists"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Governing Body Exists</FormLabel>
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
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="governingBodyMembers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Governing Body Members</FormLabel>
                      <FormControl>
                        <Textarea {...field} disabled={!isEditing} rows={3} />
                      </FormControl>
                      <FormDescription>List the names and designations of governing body members</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="trustName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trust Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trustRegistrationDate"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                      03/04/2007
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isEditing && (
              <Button type="submit" className="w-full">
                Save Governance Information
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
