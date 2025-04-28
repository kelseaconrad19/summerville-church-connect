
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EventForm } from "@/components/admin/EventForm";
import { supabase } from "@/integrations/supabase/client";
import type { Event } from "@/lib/types/events";
import { format } from "date-fns";
import { toast } from "sonner";

export default function AdminEventsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const { data: events, refetch } = useQuery({
    queryKey: ['admin-events'],
    queryFn: async () => {
      console.log("Fetching admin events");
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('date_start', { ascending: true });

        if (error) {
          console.error("Error fetching events:", error);
          toast.error("Failed to load events");
          throw error;
        }

        console.log("Events data:", data);
        return data as Event[];
      } catch (error) {
        console.error("Exception in events fetch:", error);
        return [];
      }
    },
  });

  const toggleEventPublished = async (eventId: string, currentStatus: boolean) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('events')
        .update({ is_published: !currentStatus })
        .eq('id', eventId);

      if (error) {
        console.error("Error toggling event status:", error);
        toast.error("Failed to update event status");
        throw error;
      }
      
      toast.success("Event status updated");
      await refetch();
    } catch (error) {
      console.error("Error toggling event status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventCreated = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
    refetch();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingEventId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingEventId) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', deletingEventId);

      if (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event");
        throw error;
      }
      
      toast.success("Event deleted successfully");
      await refetch();
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingEventId(null);
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
            </DialogHeader>
            <EventForm 
              onSuccess={handleEventCreated} 
              initialData={editingEvent}
            />
          </DialogContent>
        </Dialog>
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
            {!events || events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No events found
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
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
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(event.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
