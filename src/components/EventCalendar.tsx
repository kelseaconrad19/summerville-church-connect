
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format, isSameDay, addDays, isAfter, isBefore, getDay } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import type { Event } from "@/lib/types/events";

export function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: events, isLoading } = useQuery({
    queryKey: ['events-calendar'],
    queryFn: async () => {
      console.log("Fetching events for calendar");
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_published', true)
        .order('date_start', { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        throw error;
      }

      console.log("Calendar events fetched:", data);
      return data as Event[];
    },
  });

  // Process recurring events and filter events for the selected date
  const selectedDateEvents = events?.filter(event => {
    if (!selectedDate) return false;
    
    const eventDate = new Date(event.date_start);
    const eventEndDate = new Date(event.date_end);
    
    // Handle one-time events
    if (!event.is_recurring) {
      return isSameDay(eventDate, selectedDate);
    }
    
    // Handle recurring events
    if (event.is_recurring && event.recurrence_pattern) {
      // Check if the selected date is after the start date
      if (isBefore(selectedDate, eventDate)) {
        return false;
      }
      
      // Check if there's an end date and the selected date is after it
      if (event.date_end && isAfter(selectedDate, eventEndDate)) {
        return false;
      }
      
      // Handle different recurrence patterns
      const pattern = event.recurrence_pattern.toLowerCase();
      const dayOfWeek = getDay(selectedDate); // 0 = Sunday, 1 = Monday, etc.
      const startDayOfWeek = getDay(eventDate);
      
      if (pattern.includes("daily")) {
        return true;
      } else if (pattern.includes("weekly")) {
        return dayOfWeek === startDayOfWeek;
      } else if (pattern.includes("bi-weekly") || pattern.includes("biweekly")) {
        // Check if the number of weeks between the start date and selected date is even
        const diffTime = Math.abs(selectedDate.getTime() - eventDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        return dayOfWeek === startDayOfWeek && diffWeeks % 2 === 0;
      } else if (pattern.includes("monthly")) {
        // Check if it's the same day of the month
        return selectedDate.getDate() === eventDate.getDate();
      }
    }
    
    return false;
  });

  // Function to format the location string from location object
  const formatLocation = (location: string | any): string => {
    if (!location) return "Location TBD";
    
    // If location is a string but not JSON, return it directly
    if (typeof location === 'string') {
      try {
        // Try to parse as JSON
        const parsedLocation = JSON.parse(location);
        
        // If parsing succeeds, format the object
        const parts = [];
        if (parsedLocation.isChurchLocation && parsedLocation.churchLocation) {
          return `${parsedLocation.churchLocation} - Church Campus`;
        }
        
        if (parsedLocation.address1) parts.push(parsedLocation.address1);
        if (parsedLocation.city) parts.push(parsedLocation.city);
        if (parsedLocation.state) parts.push(parsedLocation.state);
        if (parsedLocation.postalCode) parts.push(parsedLocation.postalCode);
        
        return parts.length > 0 ? parts.join(', ') : "Location TBD";
      } catch (e) {
        // If parsing fails, it's not JSON, so return the original string
        return location;
      }
    }
    
    // If location is already an object
    if (typeof location === 'object' && location !== null) {
      if (location.isChurchLocation && location.churchLocation) {
        return `${location.churchLocation} - Church Campus`;
      }
      
      const parts = [];
      if (location.address1) parts.push(location.address1);
      if (location.city) parts.push(location.city);
      if (location.state) parts.push(location.state);
      if (location.postalCode) parts.push(location.postalCode);
      
      return parts.length > 0 ? parts.join(', ') : "Location TBD";
    }
    
    return "Location TBD";
  };

  // Check if date has any events (both recurring and upcoming)
  const hasEvents = (date: Date): boolean => {
    return events?.some(
      (event) => {
        // Check for one-time events
        if (!event.is_recurring) {
          const eventDate = new Date(event.date_start);
          return isSameDay(eventDate, date);
        }
        
        // Check for recurring events
        if (event.is_recurring && event.recurrence_pattern) {
          const startDate = new Date(event.date_start);
          const endDate = event.date_end ? new Date(event.date_end) : null;
          
          // Check if date is within the valid range
          if (isBefore(date, startDate)) return false;
          if (endDate && isAfter(date, endDate)) return false;
          
          const pattern = event.recurrence_pattern.toLowerCase();
          const dateDayOfWeek = getDay(date); // 0 = Sunday, 1 = Monday, etc.
          const startDayOfWeek = getDay(startDate);
          
          if (pattern.includes("daily")) {
            return true;
          } else if (pattern.includes("weekly")) {
            return dateDayOfWeek === startDayOfWeek;
          } else if (pattern.includes("bi-weekly") || pattern.includes("biweekly")) {
            const diffTime = Math.abs(date.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const diffWeeks = Math.floor(diffDays / 7);
            return dateDayOfWeek === startDayOfWeek && diffWeeks % 2 === 0;
          } else if (pattern.includes("monthly")) {
            return date.getDate() === startDate.getDate();
          }
        }
        
        return false;
      }
    ) ?? false;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="md:w-1/3">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-5 w-5 text-church-blue" />
            <h3 className="font-medium text-lg">Choose a Date</h3>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border p-3 pointer-events-auto"
            modifiers={{
              hasEvents: hasEvents,
              selected: (date) => selectedDate ? isSameDay(date, selectedDate) : false
            }}
            modifiersStyles={{
              hasEvents: { 
                fontWeight: 'normal',
                backgroundColor: 'white',
                color: 'black',
                border: '2px solid #33C3F0'
              },
              selected: {
                backgroundColor: '#33C3F0',
                color: 'white',
                fontWeight: 'bold'
              }
            }}
          />
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block h-3 w-3 border-2 border-solid border-church-blue rounded-sm"></span>
              <span className="text-gray-600">Event</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:w-2/3">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <CalendarDays className="h-5 w-5 text-church-blue" />
              <h3 className="font-medium text-lg">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
            </div>
            
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateEvents?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <CalendarDays className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-muted-foreground">
                      No events scheduled for this date
                    </p>
                    <p className="text-sm text-gray-500 mt-2 max-w-md">
                      Select a different date or check back later for updated events
                    </p>
                  </div>
                ) : (
                  selectedDateEvents?.map((event) => (
                    <div key={event.id} className={`border rounded-lg p-4 ${event.is_recurring ? 'border-dashed' : 'border-solid'}`}>
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-lg">{event.title}</h4>
                        {event.is_recurring && (
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                            Recurring
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1 w-full sm:w-auto sm:mr-4">
                          <Clock className="h-4 w-4" />
                          <span>{event.time_start} - {event.time_end}</span>
                        </div>
                        <div className="flex items-center gap-1 w-full sm:w-auto">
                          <MapPin className="h-4 w-4" />
                          <span>{formatLocation(event.location)}</span>
                        </div>
                      </div>
                      {event.is_recurring && event.recurrence_pattern && (
                        <div className="mt-2 text-sm text-blue-700">
                          {event.recurrence_pattern}
                        </div>
                      )}
                      {event.description && (
                        <p className="mt-3 text-sm text-gray-700 line-clamp-3">{event.description}</p>
                      )}
                      {event.requires_registration && (
                        <div className="mt-4">
                          <Button className="bg-church-blue hover:bg-blue-500" size="sm">
                            Register
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
