
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
                fontWeight: 'bold',
                backgroundColor: 'var(--church-blue)',
                color: 'white'
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
                        {event.location || "Location TBD"}
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
