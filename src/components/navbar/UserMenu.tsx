
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useAdmin } from "@/hooks/use-admin";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, User, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

export function UserMenu() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <Button asChild className="flex items-center gap-2">
        <Link to="/auth">
          <LogIn className="h-4 w-4" />
          Sign in
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {isAdmin && (
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => navigate("/admin")}
        >
          <LayoutDashboard className="h-4 w-4" />
          Admin
        </Button>
      )}
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => navigate("/profile")}
      >
        <User className="h-4 w-4" />
        Profile
      </Button>
      <Button variant="outline" onClick={handleLogout}>
        Sign out
      </Button>
    </div>
  );
}
