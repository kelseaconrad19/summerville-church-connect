
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import type { Event } from "@/lib/types/events";
import { format } from "date-fns";

export default function AdminEventsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: events, refetch } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date_start', { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        throw error;
      }

      return data as Event[];
    },
  });

  const toggleEventPublished = async (eventId: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_published: !currentStatus })
        .eq('id', eventId);

      if (error) throw error;
      await refetch();
    } catch (error) {
      console.error("Error toggling event status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-muted-foreground">Manage church events and activities</p>
        </div>
        <Button onClick={() => console.log("Add new event")}>
          <CalendarDays className="h-4 w-4 mr-2" />
          Add New Event
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>
                  {format(new Date(event.date_start), "PPP")}
                </TableCell>
                <TableCell>{event.location || "TBD"}</TableCell>
                <TableCell>
                  <Button
                    variant={event.is_published ? "default" : "secondary"}
                    size="sm"
                    onClick={() => toggleEventPublished(event.id, !!event.is_published)}
                    disabled={isLoading}
                  >
                    {event.is_published ? "Published" : "Draft"}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => console.log("Edit event:", event.id)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
