
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SermonActions } from "./SermonActions";
import { Sermon } from "@/lib/types/sermons";
import { Badge } from "@/components/ui/badge";

interface SermonsTableProps {
  sermons: Sermon[];
  onEdit: (sermon: Sermon) => void;
  onDelete: (id: string) => void;
}

export function SermonsTable({ sermons, onEdit, onDelete }: SermonsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Title</TableHead>
            <TableHead>Speaker</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Series</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sermons.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No sermons found.
              </TableCell>
            </TableRow>
          ) : (
            sermons.map((sermon) => (
              <TableRow key={sermon.id}>
                <TableCell className="font-medium">{sermon.title}</TableCell>
                <TableCell>{sermon.speaker}</TableCell>
                <TableCell>{format(new Date(sermon.date), "MMM d, yyyy")}</TableCell>
                <TableCell>{sermon.series || "—"}</TableCell>
                <TableCell>
                  <Badge variant={sermon.is_published ? "default" : "secondary"}>
                    {sermon.is_published ? "Published" : "Draft"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <SermonActions 
                    sermon={sermon}
                    onEdit={() => onEdit(sermon)}
                    onDelete={() => onDelete(sermon.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
