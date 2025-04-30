
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Church } from "lucide-react";

interface MinistryFieldProps {
  control: Control<ClassFormValues>;
}

export function MinistryField({ control }: MinistryFieldProps) {
  // Fetch ministries for the dropdown
  const { data: ministries = [] } = useQuery({
    queryKey: ['ministries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ministries')
        .select('id, title')
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
        <FormItem className="space-y-3 mb-6">
          <FormLabel className="text-base">Related Ministry (Optional)</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || "none"}
          >
            <FormControl>
              <SelectTrigger className="flex items-center">
                <Church className="mr-2 h-4 w-4 opacity-70" />
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
          <FormDescription>
            Associate this class with a ministry
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
