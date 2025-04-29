
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  isEditing: boolean;
}

export function FormActions({ isSubmitting, onCancel, isEditing }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        variant="outline" 
        onClick={onCancel}
        type="button"
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEditing ? "Update Class" : "Create Class"}
      </Button>
    </div>
  );
}
