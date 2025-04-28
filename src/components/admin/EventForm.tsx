
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EventBasicInfo } from "./forms/EventBasicInfo";
import { EventDateTimeFields } from "./forms/EventDateTimeFields";
import { EventAdditionalInfo } from "./forms/EventAdditionalInfo";
import { EventFormData } from "./forms/types";
import { format } from "date-fns";

interface EventFormProps {
  onSuccess: () => void;
}

export function EventForm({ onSuccess }: EventFormProps) {
  const { user } = useAuth();
  const form = useForm<EventFormData>({
    defaultValues: {
      title: "",
      description: "",
      location: {
        address1: "",
      },
      date_start: new Date(),
      date_end: new Date(),
      time_start: "09:00",
      time_end: "17:00",
      image_url: "",
      requires_registration: false,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      // Convert Address object to JSON string for storage
      const locationString = JSON.stringify(data.location);
      
      const { error } = await supabase.from("events").insert({
        title: data.title,
        description: data.description,
        location: locationString,
        date_start: new Date(
          `${format(data.date_start, "yyyy-MM-dd")}T${data.time_start}`
        ).toISOString(),
        date_end: new Date(
          `${format(data.date_end, "yyyy-MM-dd")}T${data.time_end}`
        ).toISOString(),
        time_start: data.time_start,
        time_end: data.time_end,
        image_url: data.image_url,
        requires_registration: data.requires_registration,
        created_by: user?.id,
      });

      if (error) throw error;

      toast.success("Event created successfully");
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <EventBasicInfo control={form.control} />
          <EventDateTimeFields control={form.control} />
          <EventAdditionalInfo control={form.control} />
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
