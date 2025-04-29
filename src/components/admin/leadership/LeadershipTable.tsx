
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeadershipMember } from "@/lib/types/leadership";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { DeleteLeadershipDialog } from "./DeleteLeadershipDialog";
import { useState } from "react";

interface LeadershipTableProps {
  leadershipMembers: LeadershipMember[];
  onEdit: (member: LeadershipMember) => void;
  onRefresh: () => void;
}

export function LeadershipTable({ leadershipMembers, onEdit, onRefresh }: LeadershipTableProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<LeadershipMember | null>(null);

  const handleDeleteClick = (member: LeadershipMember) => {
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setMemberToDelete(null);
  };

  const handleDeleted = () => {
    onRefresh();
    handleDeleteClose();
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Ministry</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Display Order</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadershipMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No leadership members found.
                </TableCell>
              </TableRow>
            ) : (
              leadershipMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.image_url || ''} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.ministry || '-'}</TableCell>
                  <TableCell>{member.email || '-'}</TableCell>
                  <TableCell>{member.display_order || '100'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onEdit(member)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleDeleteClick(member)}
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

      <DeleteLeadershipDialog
        open={deleteDialogOpen}
        member={memberToDelete}
        onClose={handleDeleteClose}
        onDeleted={handleDeleted}
      />
    </>
  );
}
