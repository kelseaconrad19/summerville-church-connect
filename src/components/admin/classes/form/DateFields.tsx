
import { format } from "date-fns";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";

interface DateFieldsProps {
  control: Control<ClassFormValues>;
}

export function DateFields({ control }: DateFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="start_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date (Optional)</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                value={field.value ? format(field.value, 'yyyy-MM-dd') : ''} 
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  field.onChange(date);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="end_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Date (Optional)</FormLabel>
            <FormControl>
              <Input 
                type="date" 
                value={field.value ? format(field.value, 'yyyy-MM-dd') : ''} 
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  field.onChange(date);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
