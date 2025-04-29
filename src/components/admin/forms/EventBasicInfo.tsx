
import React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AddressAutocomplete from "../AddressAutocomplete";
import { EventFormData, Address, LocationType } from "./types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Church, MapPin } from "lucide-react";

interface EventBasicInfoProps {
  control: Control<EventFormData>;
}

export function EventBasicInfo({ control }: EventBasicInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
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
        control={control}
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

      {/* Location Type Selection */}
      <FormField
        control={control}
        name="location_type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Location</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="church" id="location-church" />
                  <Label htmlFor="location-church" className="flex items-center">
                    <Church className="mr-2 h-4 w-4" /> At the Church
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="location-other" />
                  <Label htmlFor="location-other" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" /> Other Location
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Conditional Location Fields */}
      <FormField
        control={control}
        name="location_type"
        render={({ field }) => (
          <FormItem>
            {field.value === "church" ? (
              <FormField
                control={control}
                name="church_location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where in the church?</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Main Sanctuary, Fellowship Hall, Room 101" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <AddressAutocomplete
                      value={field.value as Address}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </FormItem>
        )}
      />
    </div>
  );
}
