
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { LogIn, User } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Sermons", path: "/sermons" },
    { name: "Events", path: "/events" },
    { name: "Ministries", path: "/ministries" },
    { name: "Prayer Requests", path: "/prayer-request" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-heading font-bold text-church-blue">
                Summerville
              </span>
              <span className="text-xl font-heading ml-2 text-gray-700">
                Church of Christ
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition",
                  pathname === item.path
                    ? "text-church-blue font-semibold"
                    : "text-gray-600"
                )}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <Button asChild className="flex items-center gap-2">
                <Link to="/auth">
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Link>
              </Button>
            )}
            <Button asChild className="ml-4 bg-church-blue hover:bg-blue-500">
              <Link to="/about#visit">Plan Your Visit</Link>
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-church-blue hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {menuOpen && (
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
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    navigate("/profile");
                    closeMenu();
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
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
                  closeMenu();
                }}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign in
              </Button>
            )}
            <div className="mt-4 px-3">
              <Button
                asChild
                className="w-full bg-church-blue hover:bg-blue-500"
              >
                <Link to="/about#visit" onClick={closeMenu}>
                  Plan Your Visit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
