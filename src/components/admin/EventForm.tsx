
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
import { EventMinistryField } from "./forms/EventMinistryField";
import { EventFormData, RecurrenceFrequency } from "./forms/types";
import { format, getDay } from "date-fns";
import type { Event } from "@/lib/types/events";
import { Card, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { CheckCircle } from "lucide-react";

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
      date_end: new Date(),
      time_start: "09:00",
      time_end: "17:00",
      image_url: "",
      requires_registration: false,
      church_center_url: "",
      event_type: "upcoming",
      location_type: "church",
      church_location: "",
      ministry_id: "none",
      is_published: false,
      recurrence_frequency: "weekly",
      recurring_day_of_week: getDay(new Date()),
    },
  });

  // Watch event_type to show/hide recurrence frequency field
  const eventType = form.watch("event_type");
  const startDate = form.watch("date_start");

  // Update recurring_day_of_week whenever date_start changes
  useEffect(() => {
    if (eventType === "recurring") {
      form.setValue("recurring_day_of_week", getDay(startDate));
    }
  }, [startDate, form, eventType]);

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
      const endDate = new Date(initialData.date_end);
      
      // Determine event type - now only "upcoming" or "recurring"
      const eventType: "upcoming" | "recurring" = initialData.is_recurring ? "recurring" : "upcoming";

      // Parse recurrence pattern for frequency
      let recurrenceFrequency: RecurrenceFrequency = "weekly";
      if (initialData.recurrence_pattern) {
        try {
          const pattern = initialData.recurrence_pattern.toLowerCase();
          if (pattern.includes("daily")) recurrenceFrequency = "daily";
          else if (pattern.includes("bi-weekly") || pattern.includes("biweekly")) recurrenceFrequency = "biweekly";
          else if (pattern.includes("monthly")) recurrenceFrequency = "monthly";
          else if (pattern.includes("custom")) recurrenceFrequency = "custom";
          else recurrenceFrequency = "weekly"; // Default to weekly
        } catch (e) {
          console.error("Error parsing recurrence pattern:", e);
        }
      }

      form.reset({
        title: initialData.title || '',
        description: initialData.description || '',
        location: location,
        date_start: startDate,
        date_end: endDate,
        time_start: format(startDate, 'HH:mm'),
        time_end: format(endDate, 'HH:mm'),
        image_url: initialData.image_url || '',
        requires_registration: initialData.requires_registration || false,
        church_center_url: initialData.church_center_url || '',
        event_type: eventType,
        location_type: isChurchLocation ? "church" : "other",
        church_location: churchLocation,
        ministry_id: initialData.ministry_id || 'none',
        is_published: initialData.is_published || false,
        recurrence_frequency: recurrenceFrequency,
        recurring_day_of_week: getDay(startDate),
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
      
      // Create recurrence pattern string based on frequency
      let recurrencePattern = null;
      if (isRecurring && data.recurrence_frequency) {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = getDay(data.date_start);
        const dayName = dayNames[dayOfWeek];
        
        switch (data.recurrence_frequency) {
          case "daily":
            recurrencePattern = "Occurs daily";
            break;
          case "weekly":
            recurrencePattern = `Occurs weekly on ${dayName}`;
            break;
          case "biweekly":
            recurrencePattern = `Occurs every two weeks on ${dayName}`;
            break;
          case "monthly":
            recurrencePattern = "Occurs monthly on the " + format(data.date_start, "do");
            break;
          case "custom":
            recurrencePattern = "Custom recurrence pattern";
            break;
          default:
            recurrencePattern = "Occurs regularly";
        }
      }
      
      const eventData = {
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
        church_center_url: data.church_center_url,
        is_recurring: isRecurring,
        recurrence_pattern: recurrencePattern,
        ministry_id: data.ministry_id === "none" ? null : data.ministry_id,
        is_published: data.is_published,
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
    <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Event Details</h3>
              <EventBasicInfo control={form.control} />
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Date & Time</h3>
              <EventDateTimeFields control={form.control} />
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Ministry Assignment</h3>
              <EventMinistryField control={form.control} />
            </CardContent>
          </Card>
          
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Additional Information</h3>
              <EventAdditionalInfo control={form.control} />
            </CardContent>
          </Card>

          <FormField
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-6">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Publish Event
                  </FormLabel>
                  <FormDescription>
                    Make this event visible to the public
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={onSuccess}>Cancel</Button>
            <Button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
