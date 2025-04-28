
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
    refetch();
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
          <DialogContent className="sm:max-w-[700px] max-h-[85vh]">
            <DialogHeader>
              <DialogTitle>Create New Ministry</DialogTitle>
            </DialogHeader>
            <MinistryForm onSuccess={handleMinistryCreated} />
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
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info("Edit feature coming soon")}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
