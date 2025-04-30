
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Church } from "lucide-react";
import { ClassFormData } from "./types";

interface MinistryFieldProps {
  control: Control<ClassFormData>;
}

export function MinistryField({ control }: MinistryFieldProps) {
  // Fetch ministries for the dropdown
  const { data: ministries = [] } = useQuery({
    queryKey: ['ministries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ministries')
        .select('id, title')
        .eq('is_published', true) // Only show published ministries
        .order('title');
      
      if (error) {
        console.error('Error fetching ministries:', error);
        return [];
      }
      
      return data || [];
    }
  });

  return (
    <FormField
      control={control}
      name="ministry_id"
      render={({ field }) => (
        <FormItem className="p-4 border rounded-md bg-card shadow-sm">
          <FormLabel className="text-lg font-medium mb-2">Related Ministry</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || "none"}
          >
            <FormControl>
              <SelectTrigger className="flex items-center mt-2">
                <Church className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select a ministry" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {ministries.map((ministry) => (
                <SelectItem key={ministry.id} value={ministry.id}>
                  {ministry.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription className="mt-2">
            Associate this class with a ministry (optional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
