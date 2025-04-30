
import { Control } from "react-hook-form";
import { EventFormData } from "./types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { MinistryField } from "./MinistryField";

interface EventAdditionalInfoProps {
  control: Control<EventFormData>;
}

export function EventAdditionalInfo({ control }: EventAdditionalInfoProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Additional Information</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MinistryField control={control} />
      </div>

      <FormField
        control={control}
        name="requires_registration"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Requires Registration
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

      <FormField
        control={control}
        name="church_center_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Church Center Registration URL</FormLabel>
            <FormControl>
              <Input placeholder="https://churchcenter.com/event/123" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
