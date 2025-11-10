"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const miscellaneousFormSchema = z.object({
  vision: z.string().min(1, "Vision statement is required"),
  mission: z.string().min(1, "Mission statement is required"),
  coreValues: z.string().min(1, "Core values are required"),
  collegeAnthem: z.string().optional(),
  notableAlumni: z.string().optional(),
  socialMediaLinks: z.string().optional(),
})

type MiscellaneousFormValues = z.infer<typeof miscellaneousFormSchema>

interface InstitutionMiscellaneousFormProps {
  data: any
  onSubmit: (data: MiscellaneousFormValues) => void
  isEditing: boolean
}

export function InstitutionMiscellaneousForm({ data, onSubmit, isEditing }: InstitutionMiscellaneousFormProps) {
  const form = useForm<MiscellaneousFormValues>({
    resolver: zodResolver(miscellaneousFormSchema),
    defaultValues: {
      vision: data.vision || "",
      mission: data.mission || "",
      coreValues: data.coreValues || "",
      collegeAnthem: data.collegeAnthem || "",
      notableAlumni: data.notableAlumni || "",
      socialMediaLinks: data.socialMediaLinks || "",
    },
  })

  function handleSubmit(values: MiscellaneousFormValues) {
    onSubmit(values)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="vision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vision</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mission</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="coreValues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Core Values</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={2} />
                    </FormControl>
                    <FormDescription>Separate values with commas</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="collegeAnthem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>College Anthem</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notableAlumni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notable Alumni</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={3} />
                    </FormControl>
                    <FormDescription>List notable alumni with their achievements</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialMediaLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Links</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={2} />
                    </FormControl>
                    <FormDescription>Format: Platform: URL, Platform: URL</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isEditing && (
              <Button type="submit" className="w-full">
                Save Miscellaneous Information
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
