
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SermonsTable } from "@/components/admin/sermons/SermonsTable";
import { DeleteSermonDialog } from "@/components/admin/sermons/DeleteSermonDialog";
import { SermonFormDialog } from "@/components/admin/sermons/SermonFormDialog";
import { SermonFormData } from "@/components/admin/forms/types";
import { Sermon } from "@/lib/types/sermons";

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

        return data as Sermon[] || [];
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

  const handleEdit = (sermon: Sermon) => {
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
        <SermonFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingSermon={editingSermon}
          onSuccess={handleSermonCreated}
        />
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Sermon
        </Button>
      </div>

      <SermonsTable 
        sermons={sermons} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteSermonDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
