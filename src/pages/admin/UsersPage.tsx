
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AdminUsersPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { data: users, refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      try {
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
          console.error("Error fetching users:", authError);
          toast.error("Failed to load users");
          throw authError;
        }

        // Get profile data for each user
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');
          
        if (profilesError) {
          console.error("Error fetching profiles:", profilesError);
        }

        // Combine auth users with profile data
        const enrichedUsers = authUsers.users.map(user => {
          const profile = profiles?.find(p => p.id === user.id) || {};
          return {
            ...user,
            profile
          };
        });

        return enrichedUsers;
      } catch (error) {
        console.error("Exception in users fetch:", error);
        return [];
      }
    },
  });

  const promoteToAdmin = async (userId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.rpc('promote_to_admin', { target_user_id: userId });

      if (error) {
        console.error("Error promoting user:", error);
        toast.error("Failed to promote user to admin");
        throw error;
      }
      
      toast.success("User promoted to admin successfully");
      refetch();
    } catch (error) {
      console.error("Error promoting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Users Management</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!users || users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.profile?.first_name && user.profile?.last_name
                      ? `${user.profile.first_name} ${user.profile.last_name}`
                      : "No name provided"}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={user.profile?.role === 'admin' ? 'text-green-600 font-medium' : ''}>
                      {user.profile?.role || 'user'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {user.created_at && format(new Date(user.created_at), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {user.profile?.role !== 'admin' && (
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => promoteToAdmin(user.id)}
                        disabled={isLoading}
                      >
                        Promote to Admin
                      </Button>
                    )}
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
