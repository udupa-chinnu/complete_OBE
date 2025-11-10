"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const infrastructureFormSchema = z.object({
  campusArea: z.string().min(1, "Campus area is required"),
  builtUpArea: z.string().min(1, "Built-up area is required"),
  classrooms: z.string().min(1, "Number of classrooms is required"),
  labs: z.string().min(1, "Number of labs is required"),
  libraryAvailable: z.string().min(1, "This field is required"),
  internetBandwidth: z.string().min(1, "Internet bandwidth is required"),
  wifiEnabled: z.string().min(1, "This field is required"),
  hostelAvailable: z.string().min(1, "This field is required"),
  transportAvailable: z.string().min(1, "This field is required"),
  busesCount: z.string().optional(),
})

type InfrastructureFormValues = z.infer<typeof infrastructureFormSchema>

interface InstitutionInfrastructureFormProps {
  data: any
  onSubmit: (data: InfrastructureFormValues) => void
  isEditing: boolean
}

export function InstitutionInfrastructureForm({ data, onSubmit, isEditing }: InstitutionInfrastructureFormProps) {
  const form = useForm<InfrastructureFormValues>({
    resolver: zodResolver(infrastructureFormSchema),
    defaultValues: {
      campusArea: data.campusArea || "",
      builtUpArea: data.builtUpArea || "",
      classrooms: data.classrooms || "",
      labs: data.labs || "",
      libraryAvailable: data.libraryAvailable || "",
      internetBandwidth: data.internetBandwidth || "",
      wifiEnabled: data.wifiEnabled || "",
      hostelAvailable: data.hostelAvailable || "",
      transportAvailable: data.transportAvailable || "",
      busesCount: data.busesCount || "",
    },
  })

  function handleSubmit(values: InfrastructureFormValues) {
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
                name="campusArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campus Area (in acres)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="builtUpArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Built-up Area (in sq. meters)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Classrooms</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Labs</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="libraryAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Library Available</FormLabel>
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
                name="internetBandwidth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Internet Bandwidth (in Mbps)</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wifiEnabled"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WiFi Enabled</FormLabel>
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
                name="hostelAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hostel Available</FormLabel>
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
                name="transportAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Available</FormLabel>
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
                name="busesCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Buses</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormDescription>Required if transport is available</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {isEditing && (
              <Button type="submit" className="w-full">
                Save Infrastructure Information
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
