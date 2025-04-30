
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ClassFormValues } from "./ClassFormSchema";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
        <FormItem>
          <FormLabel>Related Ministry (Optional)</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || "none"}
          >
            <FormControl>
              <SelectTrigger>
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
