
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ClassFormDialog } from "@/components/admin/classes/ClassFormDialog";
import { ClassesTable } from "@/components/admin/classes/ClassesTable";
import { DeleteClassDialog } from "@/components/admin/classes/DeleteClassDialog";
import { ClassWithMinistry, Class } from "@/lib/types/classes";
import { ClassFormData } from "@/components/admin/forms/types";

export default function AdminClassesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassFormData | null>(null);
  const [deletingClassId, setDeletingClassId] = useState<string | null>(null);

  const { data: classes = [], refetch } = useQuery({
    queryKey: ['admin-classes'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('classes')
          .select(`
            *,
            ministry:ministries(id, title)
          `)
          .order('title');

        if (error) {
          console.error('Error fetching classes:', error);
          toast.error('Failed to load classes');
          throw error;
        }

        return data as ClassWithMinistry[] || [];
      } catch (error) {
        console.error('Exception in classes fetch:', error);
        return [];
      }
    },
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingClass(null);
  };

  const handleClassCreated = () => {
    handleDialogClose();
    refetch();
  };

  const handleEdit = (classItem: ClassWithMinistry) => {
    const formData: ClassFormData = {
      ...classItem,
      start_date: classItem.start_date ? new Date(classItem.start_date) : null,
      end_date: classItem.end_date ? new Date(classItem.end_date) : null,
    };
    
    setEditingClass(formData);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingClassId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingClassId) return;

    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', deletingClassId);

      if (error) throw error;
      
      toast.success('Class deleted successfully');
      refetch();
    } catch (error: any) {
      console.error('Error deleting class:', error);
      toast.error(`Failed to delete class: ${error.message}`);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingClassId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Classes Management</h1>
          <p className="text-muted-foreground">Add and manage church classes</p>
        </div>
        <ClassFormDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingClass={editingClass}
          onSuccess={handleClassCreated}
        />
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Class
        </Button>
      </div>

      <ClassesTable 
        classes={classes} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteClassDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
