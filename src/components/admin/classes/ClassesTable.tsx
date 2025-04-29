
import { ClassWithMinistry } from "@/lib/types/classes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClassActions } from "@/components/admin/classes/ClassActions";
import { format } from "date-fns";

interface ClassesTableProps {
  classes: ClassWithMinistry[];
  onEdit: (classItem: ClassWithMinistry) => void;
  onDelete: (id: string) => void;
}

export function ClassesTable({ classes, onEdit, onDelete }: ClassesTableProps) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Teacher</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Ministry</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No classes found. Add your first class!
              </TableCell>
            </TableRow>
          ) : (
            classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell className="font-medium">{classItem.title}</TableCell>
                <TableCell>{classItem.teacher}</TableCell>
                <TableCell>{classItem.location}</TableCell>
                <TableCell>
                  {classItem.start_date 
                    ? format(new Date(classItem.start_date), 'MMM d, yyyy') 
                    : 'Not specified'}
                </TableCell>
                <TableCell>
                  {classItem.ministry?.title || 'None'}
                </TableCell>
                <TableCell className="text-right">
                  <ClassActions 
                    classItem={classItem} 
                    onEdit={() => onEdit(classItem)}
                    onDelete={() => onDelete(classItem.id)}
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
