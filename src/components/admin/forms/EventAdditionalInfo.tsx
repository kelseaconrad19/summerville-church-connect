
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
