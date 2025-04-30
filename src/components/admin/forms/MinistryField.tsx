
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
import { EventFormData } from "./types";

interface MinistryFieldProps {
  control: Control<EventFormData>;
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
          <FormLabel>Related Ministry</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value || ""}
          >
            <FormControl>
              <SelectTrigger className="flex items-center">
                <Church className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select a ministry" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {ministries.map((ministry) => (
                <SelectItem key={ministry.id} value={ministry.id}>
                  {ministry.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Associate this event with a ministry (optional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
