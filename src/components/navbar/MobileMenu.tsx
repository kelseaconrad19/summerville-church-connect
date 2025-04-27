
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LogIn, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { useAdmin } from "@/hooks/use-admin";
import { navItems } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function MobileMenu({ isOpen, onClose, onLogout }: MobileMenuProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin } = useAdmin();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "block px-3 py-2 rounded-md text-base font-medium",
              pathname === item.path
                ? "bg-church-light-blue text-church-blue"
                : "text-gray-700 hover:bg-gray-100"
            )}
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        {user ? (
          <>
            {isAdmin && (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate("/admin");
                  onClose();
                }}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Admin Dashboard
              </Button>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                navigate("/profile");
                onClose();
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => {
                onLogout();
                onClose();
              }}
            >
              Sign out
            </Button>
          </>
        ) : (
          <Button
            className="w-full mt-2"
            onClick={() => {
              navigate("/auth");
              onClose();
            }}
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign in
          </Button>
        )}
        <div className="mt-4 px-3">
          <Button asChild className="w-full bg-church-blue hover:bg-blue-500">
            <Link to="/about#visit" onClick={onClose}>
              Plan Your Visit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
