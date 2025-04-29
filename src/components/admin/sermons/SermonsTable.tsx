
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SermonActions } from "./SermonActions";

interface SermonsTableProps {
  sermons: any[];
  onEdit: (sermon: any) => void;
  onDelete: (id: string) => void;
}

export const SermonsTable = ({ sermons, onEdit, onDelete }: SermonsTableProps) => {
  return (
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
                  <SermonActions 
                    sermon={sermon} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
