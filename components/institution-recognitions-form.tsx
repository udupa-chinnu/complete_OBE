"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const recognitionsFormSchema = z.object({
  ugcRecognitionDate: z.string().min(1, "UGC recognition year is required"),
  aicteApprovalYear: z.string().min(1, "AICTE approval year is required"),
  nbaAccreditationDetails: z.string().optional(),
  naacAccreditationDetails: z.string().optional(),
  isoCertification: z.string().optional(),
  otherAwards: z.string().optional(),
})

type RecognitionsFormValues = z.infer<typeof recognitionsFormSchema>

interface InstitutionRecognitionsFormProps {
  data: any
  onSubmit: (data: RecognitionsFormValues) => void
  isEditing: boolean
}

export function InstitutionRecognitionsForm({ data, onSubmit, isEditing }: InstitutionRecognitionsFormProps) {
  const form = useForm<RecognitionsFormValues>({
    resolver: zodResolver(recognitionsFormSchema),
    defaultValues: {
      ugcRecognitionDate: data.ugcRecognitionDate || "",
      aicteApprovalYear: data.aicteApprovalYear || "",
      nbaAccreditationDetails: data.nbaAccreditationDetails || "",
      naacAccreditationDetails: data.naacAccreditationDetails || "",
      isoCertification: data.isoCertification || "",
      otherAwards: data.otherAwards || "",
    },
  })

  function handleSubmit(values: RecognitionsFormValues) {
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
                name="ugcRecognitionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UGC Approval Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" disabled={!isEditing}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aicteApprovalYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AICTE Approval Year</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nbaAccreditationDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NBA Accreditation Details</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={3} />
                    </FormControl>
                    <FormDescription>Include accreditation period and programs</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="naacAccreditationDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NAAC Accreditation Details</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={3} />
                    </FormControl>
                    <FormDescription>Include grade, CGPA, and validity period</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isoCertification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISO Certification</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherAwards"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Awards & Recognitions</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} rows={3} />
                    </FormControl>
                    <FormDescription>Include NIRF ranking, ARIIA, etc.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isEditing && (
              <Button type="submit" className="w-full">
                Save Recognitions Information
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
