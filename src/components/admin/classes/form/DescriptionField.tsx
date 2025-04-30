
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
        <FormItem className="p-4 border rounded-md bg-card shadow-sm">
          <FormLabel className="flex items-center gap-2 text-base font-medium mb-2">
            <FileText className="h-4 w-4" />
            Description
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Describe the class content, goals, and what students will learn..." 
              className="min-h-[180px] resize-none" 
              {...field} 
            />
          </FormControl>
          <FormDescription className="mt-2 text-sm text-muted-foreground">
            Provide a detailed description that helps potential attendees understand what the class covers
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
