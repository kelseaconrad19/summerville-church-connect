
import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, LogOut, Church, FileText } from "lucide-react";
import { useAdmin } from "@/hooks/use-admin";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

export function AdminLayout() {
  const { isAdmin, isLoading: isAdminLoading } = useAdmin();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  useEffect(() => {
    // Only do redirects after initial loading is done
    if (isInitialCheck && (isAdminLoading || user === null)) {
      return;
    }
    
    setIsInitialCheck(false);
    
    if (!user) {
      console.log("No user found, redirecting to login");
      toast.error("Please log in to access the admin area");
      navigate("/auth");
      return;
    }

    console.log("Admin check - User ID:", user.id);
    console.log("Admin status:", isAdmin);
    console.log("Admin loading:", isAdminLoading);

    if (!isAdminLoading && isAdmin === false) {
      console.log("User is not an admin, access denied");
      toast.error("You don't have permission to access this area", {
        description: "Administrative privileges are required."
      });
      navigate("/");
    }
  }, [isAdmin, isAdminLoading, user, navigate, isInitialCheck]);

  // Show a loading state while checking admin status
  if (isAdminLoading || isInitialCheck) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Checking permissions...</div>
      </div>
    );
  }

  if (!user || (!isAdminLoading && !isAdmin)) {
    return null; // Will be redirected by useEffect
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b px-4 py-2">
            <h2 className="text-lg font-semibold">Admin Dashboard</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin" className="w-full">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/events" className="w-full">
                    <CalendarDays className="h-4 w-4" />
                    <span>Events</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/ministries" className="w-full">
                    <Church className="h-4 w-4" />
                    <span>Ministries</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/sermons" className="w-full">
                    <FileText className="h-4 w-4" />
                    <span>Sermons</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/admin/users" className="w-full">
                    <Users className="h-4 w-4" />
                    <span>Users</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/auth");
  }
}
