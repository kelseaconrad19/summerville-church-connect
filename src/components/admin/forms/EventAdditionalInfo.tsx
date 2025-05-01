
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Calendar, Clock } from "lucide-react";
import { EventFormData } from "./types";

interface EventAdditionalInfoProps {
  control: Control<EventFormData>;
}

export function EventAdditionalInfo({ control }: EventAdditionalInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="image_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Image</FormLabel>
            <FormControl>
              <ImageUpload 
                value={field.value} 
                onChange={field.onChange}
                bucket="event_images"
              />
            </FormControl>
            <FormDescription>
              Upload an image for this event or provide an image URL.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="church_center_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Church Center URL</FormLabel>
            <FormControl>
              <Input placeholder="Enter Church Center URL" {...field} value={field.value || ''} />
            </FormControl>
            <FormDescription>
              Enter the link to this event in Church Center (used for the "Learn More" button)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="event_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Type</FormLabel>
            <FormControl>
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
                className="justify-start"
              >
                <ToggleGroupItem value="upcoming" aria-label="Mark as upcoming">
                  <Calendar className="mr-1" />
                  Upcoming
                </ToggleGroupItem>
                <ToggleGroupItem value="ended" aria-label="Mark as ended">
                  <Clock className="mr-1" />
                  Ended
                </ToggleGroupItem>
                <ToggleGroupItem value="recurring" aria-label="Mark as recurring">
                  <Calendar className="mr-1" />
                  Recurring
                </ToggleGroupItem>
              </ToggleGroup>
            </FormControl>
            <FormDescription>
              Choose the event type. Events will automatically be marked as ended after the end date passes.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="requires_registration"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Registration Required
              </FormLabel>
              <FormDescription>
                Enable if attendees need to register for this event.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
