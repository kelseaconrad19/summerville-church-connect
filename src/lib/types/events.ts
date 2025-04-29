
import { Database } from "@/integrations/supabase/types";

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type EventWithAttendees = Event & {
  events_attendees?: { count: number } | null;
  attendees_count?: number;
};

export type EventType = "upcoming" | "ended" | "recurring";

export function determineEventType(event: Event): EventType {
  if (event.is_recurring) {
    return "recurring";
  }
  
  const endDate = new Date(event.date_end);
  return new Date() > endDate ? "ended" : "upcoming";
}
