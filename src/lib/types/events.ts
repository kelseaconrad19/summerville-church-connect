
import { Database } from "@/integrations/supabase/types";

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type EventWithAttendees = Event & {
  attendees_count?: number;
};
