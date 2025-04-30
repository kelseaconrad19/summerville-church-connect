
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";
import { FileText } from "lucide-react";

interface DescriptionFieldProps {
  control: Control<ClassFormValues>;
}

export function DescriptionField({ control }: DescriptionFieldProps) {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" />
            Description
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Describe the class..." 
              className="min-h-[150px] resize-none" 
              {...field} 
            />
          </FormControl>
          <FormDescription className="mt-2">
            Provide a detailed description of the class content and goals
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
