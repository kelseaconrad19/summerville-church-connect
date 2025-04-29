
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";

export const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about", children: [
    { name: "Ministries", path: "/ministries" },
    { name: "Current Classes", path: "/classes" },
  ]},
  { name: "Events", path: "/events" },
  { name: "Sermons", path: "/sermons" },
];

export function NavLinks() {
  const { pathname } = useLocation();
  
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((item) => {
          if (item.children) {
            return (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger>
                  <Link
                    to={item.path}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition",
                      pathname === item.path
                        ? "text-church-blue font-semibold"
                        : "text-gray-600"
                    )}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    {item.children.map((child) => (
                      <li key={child.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={child.path}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              pathname === child.path
                                ? "bg-accent text-church-blue font-semibold"
                                : "text-gray-600"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">
                              {child.name}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }
          
          return (
            <NavigationMenuItem key={item.name}>
              <Link
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
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
