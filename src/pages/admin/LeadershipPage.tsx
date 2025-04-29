
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/title";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { LeadershipTable } from "@/components/admin/leadership/LeadershipTable";
import { LeadershipFormDialog } from "@/components/admin/leadership/LeadershipFormDialog";
import { useState } from "react";
import { LeadershipMember } from "@/lib/types/leadership";
import { toast } from "sonner";

export default function AdminLeadershipPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<LeadershipMember | null>(null);

  const { data: leadershipMembers = [], refetch } = useQuery({
    queryKey: ["leadershipMembers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leadership")
        .select("*")
        .order("role", { ascending: true })
        .order("name", { ascending: true });

      if (error) {
        toast.error("Failed to fetch leadership members");
        throw error;
      }

      return data || [];
    }
  });

  const handleAddNew = () => {
    setSelectedMember(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (member: LeadershipMember) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedMember(null);
  };

  const handleSaved = () => {
    refetch();
    setIsDialogOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Title>Leadership Management</Title>
        <Button onClick={handleAddNew} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Add New</span>
        </Button>
      </div>
      
      <LeadershipTable 
        leadershipMembers={leadershipMembers} 
        onEdit={handleEdit} 
        onRefresh={refetch}
      />
      
      <LeadershipFormDialog 
        open={isDialogOpen} 
        member={selectedMember}
        onClose={handleDialogClose}
        onSaved={handleSaved}
      />
    </div>
  );
}
