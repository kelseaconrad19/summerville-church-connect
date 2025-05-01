
import React from "react";
import { format } from "date-fns";
import { Control } from "react-hook-form";
import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { EventFormData, RecurrenceFrequency } from "./types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventDateTimeFieldsProps {
  control: Control<EventFormData>;
}

export function EventDateTimeFields({ control }: EventDateTimeFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={control}
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
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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
          control={control}
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
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
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

      {/* Recurrence Frequency Field - only shows when event_type is "recurring" */}
      <FormField
        control={control}
        name="event_type"
        render={({ field }) => (
          field.value === "recurring" && (
            <FormField
              control={control}
              name="recurrence_frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurrence Frequency</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange as (value: string) => void}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select how often this event repeats" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How often does this event repeat?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
        )}
      />
    </div>
  );
}
