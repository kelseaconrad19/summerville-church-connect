
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { LeadershipMember } from "@/lib/types/leadership";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface DeleteLeadershipDialogProps {
  open: boolean;
  member: LeadershipMember | null;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeleteLeadershipDialog({
  open,
  member,
  onClose,
  onDeleted
}: DeleteLeadershipDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!member) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("leadership")
        .delete()
        .eq("id", member.id);

      if (error) {
        throw error;
      }

      // If there was an image, delete it from storage
      if (member.image_url) {
        // Extract the file name from the URL
        const urlParts = member.image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        await supabase.storage
          .from("leadership_images")
          .remove([fileName]);
      }

      toast.success("Leadership member deleted successfully");
      onDeleted();
    } catch (error) {
      console.error("Error deleting leadership member:", error);
      toast.error("Failed to delete leadership member");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Leadership Member</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {member?.name}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
