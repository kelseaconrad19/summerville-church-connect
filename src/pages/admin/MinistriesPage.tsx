
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MinistryForm } from '@/components/admin/MinistryForm';
import { supabase } from '@/integrations/supabase/client';
import type { Ministry } from '@/lib/types/ministries';
import { toast } from 'sonner';

export default function AdminMinistriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState<Ministry | null>(null);
  const [deletingMinistryId, setDeletingMinistryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: ministries, refetch } = useQuery({
    queryKey: ['admin-ministries'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('ministries')
          .select('*')
          .order('title', { ascending: true });

        if (error) {
          console.error('Error fetching ministries:', error);
          toast.error('Failed to load ministries');
          throw error;
        }

        return data as Ministry[];
      } catch (error) {
        console.error('Exception in ministries fetch:', error);
        return [];
      }
    },
  });

  const handleMinistryCreated = () => {
    setIsDialogOpen(false);
    setEditingMinistry(null);
    refetch();
  };

  const handleEdit = (ministry: Ministry) => {
    setEditingMinistry(ministry);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletingMinistryId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingMinistryId) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('ministries')
        .delete()
        .eq('id', deletingMinistryId);

      if (error) {
        console.error("Error deleting ministry:", error);
        toast.error("Failed to delete ministry");
        throw error;
      }
      
      toast.success("Ministry deleted successfully");
      await refetch();
    } catch (error) {
      console.error("Error deleting ministry:", error);
    } finally {
      setIsDeleteDialogOpen(false);
      setDeletingMinistryId(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Ministries Management</h1>
          <p className="text-muted-foreground">Manage church ministries and their information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Ministry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{editingMinistry ? 'Edit Ministry' : 'Create New Ministry'}</DialogTitle>
            </DialogHeader>
            <MinistryForm 
              onSuccess={handleMinistryCreated}
              initialData={editingMinistry}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!ministries || ministries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                  No ministries found
                </TableCell>
              </TableRow>
            ) : (
              ministries.map((ministry) => (
                <TableRow key={ministry.id}>
                  <TableCell className="font-medium">{ministry.title}</TableCell>
                  <TableCell>
                    {ministry.contact_first_name} {ministry.contact_last_name}
                  </TableCell>
                  <TableCell>{ministry.contact_email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(ministry)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(ministry.id)}
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
            <AlertDialogTitle>Delete Ministry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this ministry? This action cannot be undone.
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
