
import { Database } from "@/integrations/supabase/types";

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type EventWithAttendees = Event & {
  events_attendees?: { count: number } | null;
  attendees_count?: number;
};
