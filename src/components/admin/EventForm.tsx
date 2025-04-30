
import React, { useEffect } from "react";
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
import type { Event } from "@/lib/types/events";

interface EventFormProps {
  onSuccess: () => void;
  initialData?: Event | null;
}

export function EventForm({ onSuccess, initialData }: EventFormProps) {
  const { user } = useAuth();
  const isEditing = !!initialData;
  
  const form = useForm<EventFormData>({
    defaultValues: {
      title: "",
      description: "",
      location: {
        address1: "",
      },
      date_start: new Date(),
      date_end: null,
      time_start: "09:00",
      time_end: "17:00",
      image_url: "",
      requires_registration: false,
      church_center_url: "",
      event_type: "upcoming",
      location_type: "church",
      church_location: "",
      ministry_id: null,
    },
  });

  // Load initial data when editing
  useEffect(() => {
    if (initialData) {
      // Parse the location JSON if it's a string
      const location = typeof initialData.location === 'string'
        ? JSON.parse(initialData.location)
        : initialData.location || { address1: '' };
        
      // Determine if this is a church location
      const isChurchLocation = location.isChurchLocation === true;
      const churchLocation = isChurchLocation ? location.churchLocation || "" : "";
      
      // Format dates and times
      const startDate = new Date(initialData.date_start);
      const endDate = initialData.date_end ? new Date(initialData.date_end) : null;
      
      // Determine event type
      let eventType: "upcoming" | "ended" | "recurring" = "upcoming";
      if (initialData.is_recurring) {
        eventType = "recurring";
      } else if (endDate && new Date() > endDate) {
        eventType = "ended";
      }

      form.reset({
        title: initialData.title || '',
        description: initialData.description || '',
        location: location,
        date_start: startDate,
        date_end: endDate,
        time_start: initialData.time_start || format(startDate, 'HH:mm'),
        time_end: initialData.time_end || (endDate ? format(endDate, 'HH:mm') : '17:00'),
        image_url: initialData.image_url || '',
        requires_registration: initialData.requires_registration || false,
        church_center_url: initialData.church_center_url || '',
        event_type: eventType,
        location_type: isChurchLocation ? "church" : "other",
        church_location: churchLocation,
        ministry_id: initialData.ministry_id || null,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: EventFormData) => {
    try {
      // Prepare location data based on location type
      let locationData;
      if (data.location_type === "church") {
        locationData = {
          isChurchLocation: true,
          churchLocation: data.church_location || "Main Sanctuary",
          address1: "413 Old Trolley Rd.", // Using the church address from the events data
          city: "Summerville",
          state: "SC",
          postalCode: "29485",
          country: "United States"
        };
      } else {
        locationData = {
          ...data.location,
          isChurchLocation: false
        };
      }
      
      // Convert location object to JSON string for storage
      const locationString = JSON.stringify(locationData);
      
      // Determine is_recurring based on event_type
      const isRecurring = data.event_type === "recurring";

      // If end date is not provided, use start date
      const endDate = data.date_end || data.date_start;
      
      const eventData = {
        title: data.title,
        description: data.description,
        location: locationString,
        date_start: new Date(
          `${format(data.date_start, "yyyy-MM-dd")}T${data.time_start}`
        ).toISOString(),
        date_end: new Date(
          `${format(endDate, "yyyy-MM-dd")}T${data.time_end}`
        ).toISOString(),
        time_start: data.time_start,
        time_end: data.time_end,
        image_url: data.image_url,
        requires_registration: data.requires_registration,
        church_center_url: data.church_center_url,
        is_recurring: isRecurring,
        ministry_id: data.ministry_id || null,
      };

      let response;
      
      if (isEditing && initialData) {
        // Update existing event
        response = await supabase
          .from("events")
          .update(eventData)
          .eq("id", initialData.id);
          
        if (response.error) throw response.error;
        toast.success("Event updated successfully");
      } else {
        // Create new event
        response = await supabase
          .from("events")
          .insert({
            ...eventData,
            created_by: user?.id,
          });
          
        if (response.error) throw response.error;
        toast.success("Event created successfully");
      }

      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error("Failed to save event");
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
            <Button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
