
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import type { Event } from "@/lib/types/events";

export function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>();

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

  // Filter events for the selected date
  const selectedDateEvents = events?.filter(event => {
    if (!selectedDate) return false;
    
    const eventDate = new Date(event.date_start);
    return format(eventDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
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
      const parts = [];
      if (location.address1) parts.push(location.address1);
      if (location.city) parts.push(location.city);
      if (location.state) parts.push(location.state);
      if (location.postalCode) parts.push(location.postalCode);
      
      return parts.length > 0 ? parts.join(', ') : "Location TBD";
    }
    
    return "Location TBD";
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Card className="flex-1">
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border p-3 pointer-events-auto"
            modifiers={{
              booked: (date) => {
                return events?.some(
                  (event) => {
                    const eventDate = new Date(event.date_start);
                    return format(eventDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
                  }
                ) ?? false;
              },
            }}
            modifiersStyles={{
              booked: { 
                fontWeight: 'normal',
                backgroundColor: 'white',
                color: 'black',
                border: '2px solid #33C3F0'
              }
            }}
          />
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <h3 className="font-medium">
                {selectedDate 
                  ? format(selectedDate, 'MMMM d, yyyy') 
                  : "Select a date to view events"}
              </h3>
            </div>
            
            {isLoading ? (
              <p className="text-muted-foreground">Loading events...</p>
            ) : selectedDate && (
              <div className="space-y-4">
                {selectedDateEvents?.length === 0 ? (
                  <p className="text-muted-foreground">
                    No events scheduled for this date
                  </p>
                ) : (
                  selectedDateEvents?.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {event.time_start && `${event.time_start} • `}
                        {formatLocation(event.location)}
                      </p>
                      {event.description && (
                        <p className="mt-2 text-sm">{event.description}</p>
                      )}
                      {event.requires_registration && (
                        <Button className="mt-4" size="sm">
                          Register
                        </Button>
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
