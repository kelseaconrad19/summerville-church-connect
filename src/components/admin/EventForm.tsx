
import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarPlus } from "lucide-react";
import AddressAutocomplete from "./AddressAutocomplete";

interface EventFormData {
  title: string;
  description: string;
  location: string;
  date_start: Date;
  date_end: Date;
  time_start: string;
  time_end: string;
  image_url: string;
  requires_registration: boolean;
}

interface EventFormProps {
  onSuccess: () => void;
}

export function EventForm({ onSuccess }: EventFormProps) {
  const { user } = useAuth();
  const form = useForm<EventFormData>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
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
      const { error } = await supabase.from("events").insert({
        title: data.title,
        description: data.description,
        location: data.location,
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter event description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <AddressAutocomplete
                value={field.value}
                onChange={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="date_start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full">
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Select date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time_start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className="w-full">
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Select date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time_end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requires_registration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Require Registration
                </FormLabel>
                <div className="text-sm text-muted-foreground">
                  Enable if attendees need to register for this event
                </div>
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

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Form>
  );
}
