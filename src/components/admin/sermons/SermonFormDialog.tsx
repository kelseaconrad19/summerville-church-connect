
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SermonForm } from "@/components/admin/SermonForm";
import { SermonFormData } from "@/components/admin/forms/types";

interface SermonFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingSermon: SermonFormData | null;
  onSuccess: () => void;
}

export const SermonFormDialog = ({ 
  open, 
  onOpenChange, 
  editingSermon, 
  onSuccess 
}: SermonFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[750px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-4">{editingSermon ? 'Edit Sermon' : 'Add New Sermon'}</DialogTitle>
        </DialogHeader>
        <SermonForm 
          onSuccess={onSuccess} 
          initialData={editingSermon}
        />
      </DialogContent>
    </Dialog>
  );
};
