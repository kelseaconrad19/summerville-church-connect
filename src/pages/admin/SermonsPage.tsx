import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Edit, Trash2 } from "lucide-react";
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
import { format } from "date-fns";
import { toast } from "sonner";
import { SermonForm } from "@/components/admin/SermonForm";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { SermonFormData } from "@/components/admin/forms/types";

export default function AdminSermonsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<SermonFormData | null>(null);
  const [deletingSermonId, setDeletingSermonId] = useState<string | null>(null);

  const { data: sermons = [], refetch } = useQuery({
    queryKey: ['admin-sermons'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('sermons')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          console.error('Error fetching sermons:', error);
          toast.error('Failed to load sermons');
          throw error;
        }

        return data || [];
      } catch (error) {
        console.error('Exception in sermons fetch:', error);
        return [];
      }
    },
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingSermon(null);
  };

  const handleSermonCreated = () => {
    handleDialogClose();
    refetch();
  };

  const handleEdit = (sermon: any) => {
    setEditingSermon({
      ...sermon,
      date: new Date(sermon.date),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingSermonId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingSermonId) return;

    try {
      const { error } = await supabase
        .from('sermons')
        .delete()
        .eq('id', deletingSermonId);

      if (error) throw error;
      
      toast.success('Sermon deleted successfully');
      refetch();
    } catch (error: any) {
      console.error('Error deleting sermon:', error);
      toast.error(`Failed to delete sermon: ${error.message}`);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingSermonId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Sermons Management</h1>
          <p className="text-muted-foreground">Add and manage church sermons</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Sermon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{editingSermon ? 'Edit Sermon' : 'Add New Sermon'}</DialogTitle>
            </DialogHeader>
            <SermonForm 
              onSuccess={handleSermonCreated} 
              initialData={editingSermon}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Speaker</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Series</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sermons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No sermons found
                </TableCell>
              </TableRow>
            ) : (
              sermons.map((sermon: any) => (
                <TableRow key={sermon.id}>
                  <TableCell className="font-medium">{sermon.title}</TableCell>
                  <TableCell>{sermon.speaker}</TableCell>
                  <TableCell>{format(new Date(sermon.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>{sermon.series || "—"}</TableCell>
                  <TableCell>
                    {sermon.is_published ? (
                      <Badge className="bg-green-500">Published</Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(sermon)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(sermon.id)}
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
            <AlertDialogTitle>Delete Sermon</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this sermon? This action cannot be undone.
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
