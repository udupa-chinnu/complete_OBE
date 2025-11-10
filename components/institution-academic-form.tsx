"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const academicFormSchema = z.object({
  ugPrograms: z.string().min(1, "UG programs count is required"),
  pgPrograms: z.string().min(1, "PG programs count is required"),
  phdPrograms: z.string().min(1, "PhD programs count is required"),
  totalDepartments: z.string().min(1, "Total departments is required"),
  facultyStrength: z.string().min(1, "Faculty strength is required"),
  studentIntake: z.string().min(1, "Student intake is required"),
  academicCalendarAvailable: z.string().min(1, "This field is required"),
  examinationSystem: z.string().min(1, "Examination system is required"),
  mediumOfInstruction: z.string().min(1, "Medium of instruction is required"),
})

type AcademicFormValues = z.infer<typeof academicFormSchema>

interface InstitutionAcademicFormProps {
  data: any
  onSubmit: (data: AcademicFormValues) => void
  isEditing: boolean
}

export function InstitutionAcademicForm({ data, onSubmit, isEditing }: InstitutionAcademicFormProps) {
  const form = useForm<AcademicFormValues>({
    resolver: zodResolver(academicFormSchema),
    defaultValues: {
      ugPrograms: data.ugPrograms || "",
      pgPrograms: data.pgPrograms || "",
      phdPrograms: data.phdPrograms || "",
      totalDepartments: data.totalDepartments || "",
      facultyStrength: data.facultyStrength || "",
      studentIntake: data.studentIntake || "",
      academicCalendarAvailable: data.academicCalendarAvailable || "",
      examinationSystem: data.examinationSystem || "",
      mediumOfInstruction: data.mediumOfInstruction || "",
    },
  })

  function handleSubmit(values: AcademicFormValues) {
    onSubmit(values)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="ugPrograms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UG Programs</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pgPrograms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PG Programs</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phdPrograms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PhD Programs</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalDepartments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Departments</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="facultyStrength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faculty Strength</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="studentIntake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Intake</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="academicCalendarAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Calendar Available</FormLabel>
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
              <FormField
                control={form.control}
                name="examinationSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Examination System</FormLabel>
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
                        <SelectItem value="Semester">Semester</SelectItem>
                        <SelectItem value="Annual">Annual</SelectItem>
                        <SelectItem value="Trimester">Trimester</SelectItem>
                        <SelectItem value="Quarter">Quarter</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mediumOfInstruction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medium of Instruction</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isEditing && (
              <Button type="submit" className="w-full">
                Save Academic Information
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
