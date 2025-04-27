
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Sermons", path: "/sermons" },
  { name: "Events", path: "/events" },
  { name: "Ministries", path: "/ministries" },
  { name: "Prayer Requests", path: "/prayer-request" },
  { name: "Contact", path: "/contact" },
];

export function NavLinks() {
  const { pathname } = useLocation();
  
  return (
    <>
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
    </>
  );
}
