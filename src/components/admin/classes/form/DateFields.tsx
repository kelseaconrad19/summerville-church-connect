
import { format } from "date-fns";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";
import { Calendar, Clock } from "lucide-react";

interface DateFieldsProps {
  control: Control<ClassFormValues>;
}

export function DateFields({ control }: DateFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date
              </FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  className="mt-2"
                  value={field.value ? format(field.value, 'yyyy-MM-dd') : ''} 
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null;
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormDescription className="mt-1">
                When does the class begin?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                End Date
              </FormLabel>
              <FormControl>
                <Input 
                  type="date"
                  className="mt-2"
                  value={field.value ? format(field.value, 'yyyy-MM-dd') : ''} 
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null;
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormDescription className="mt-1">
                When does the class end?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="time"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Class Time
            </FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Sundays at 9:30 AM" 
                className="mt-2"
                {...field} 
              />
            </FormControl>
            <FormDescription className="mt-1">
              Specify when the class meets (e.g., "Sundays at 9:30 AM")
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
