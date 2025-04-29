
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { User, LayoutDashboard } from "lucide-react";
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
        {navItems.map((item) => {
          if (item.children) {
            return (
              <div key={item.name} className="space-y-1">
                <Link
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
                <div className="pl-4 border-l-2 border-gray-200 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm font-medium",
                        pathname === child.path
                          ? "bg-church-light-blue text-church-blue"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={onClose}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          
          return (
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
          );
        })}
        
        <Link
          to="/prayer-request"
          className={cn(
            "block px-3 py-2 rounded-md text-base font-medium",
            pathname === "/prayer-request"
              ? "bg-church-light-blue text-church-blue"
              : "text-church-blue hover:bg-church-light-blue"
          )}
          onClick={onClose}
        >
          Prayer Request
        </Link>
        
        <Link
          to="/contact"
          className={cn(
            "block px-3 py-2 rounded-md text-base font-medium",
            pathname === "/contact"
              ? "bg-church-light-blue text-church-blue"
              : "text-church-blue hover:bg-church-light-blue"
          )}
          onClick={onClose}
        >
          Contact
        </Link>
        
        {/* User menu options */}
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
        ) : isAdmin && (
          <Button
            className="w-full mt-2"
            onClick={() => {
              navigate("/auth");
              onClose();
            }}
          >
            Admin Login
          </Button>
        )}
      </div>
    </div>
  );
}
