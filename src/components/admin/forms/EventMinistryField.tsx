
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EventFormData } from "./types";

interface EventMinistryFieldProps {
  control: Control<EventFormData>;
}

export function EventMinistryField({ control }: EventMinistryFieldProps) {
  const { data: ministries } = useQuery({
    queryKey: ["ministries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ministries")
        .select("id, title")
        .eq("is_published", true)
        .order("title");

      if (error) throw error;
      return data;
    },
  });

  return (
    <FormField
      control={control}
      name="ministry_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ministry</FormLabel>
          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a ministry" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">-- None --</SelectItem>
              {ministries?.map((ministry) => (
                <SelectItem key={ministry.id} value={ministry.id}>
                  {ministry.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Associate this event with a specific ministry (optional)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
