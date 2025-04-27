
import { supabase } from "@/integrations/supabase/client";
import { Event, EventWithAttendees } from "@/lib/types/events";

export async function fetchEvents(type: "upcoming" | "recurring" = "upcoming") {
  const today = new Date();
  
  const query = supabase
    .from("events")
    .select(`
      *,
      events_attendees(count)
    `, { count: "exact" });

  if (type === "upcoming") {
    query.eq("is_recurring", false)
      .gte("date_start", today.toISOString())
      .order("date_start", { ascending: true });
  } else {
    query.eq("is_recurring", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching events:", error);
    throw error;
  }

  return data;
}

export async function registerForEvent(eventId: string) {
  // Get current user from supabase
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from("events_attendees")
    .insert([{ 
      event_id: eventId,
      user_id: user.id 
    }])
    .select()
    .single();

  if (error) {
    console.error("Error registering for event:", error);
    throw error;
  }

  return data;
}
