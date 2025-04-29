
import { cn } from "@/lib/utils";
import React from "react";

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

export function Title({ className, children }: TitleProps) {
  return (
    <h1 className={cn("text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h1>
  );
}
