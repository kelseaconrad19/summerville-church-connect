
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SermonActionsProps {
  sermon: any;
  onEdit: (sermon: any) => void;
  onDelete: (id: string) => void;
}

export const SermonActions = ({ sermon, onEdit, onDelete }: SermonActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(sermon)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={() => onDelete(sermon.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
