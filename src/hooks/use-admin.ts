
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdmin() {
  const { user } = useAuth();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ['isAdmin', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log("No user found in useAdmin");
        return false;
      }
      
      console.log("Checking admin status for user:", user.id);
      
      try {
        const { data, error } = await supabase.rpc('is_admin', { user_id: user.id });
        
        if (error) {
          console.error("Admin check error:", error);
          toast.error("Error checking admin status");
          throw error;
        }
        
        console.log("Admin check result:", data);
        return data;
      } catch (error) {
        console.error("Failed to check admin status:", error);
        return false;
      }
    },
    enabled: !!user,
    staleTime: 60000, // Cache the admin status for 1 minute
    retry: 1, // Only retry once on failure
  });

  return { isAdmin: !!isAdmin, isLoading };
}
