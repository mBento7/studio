import React from "react";
import { Badge } from "@/components/ui/badge";

interface ContentBlockProps {
  title: string;
  description: string;
  isLocked?: boolean;
  badgeText?: string;
  children?: React.ReactNode;
}

export function ContentBlock({ title, description, isLocked, badgeText, children }: ContentBlockProps) {
  return (
    <div className={`relative rounded-lg border p-5 bg-background shadow-sm transition-all ${isLocked ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        {isLocked && badgeText && (
          <Badge variant="default" className="ml-2">{badgeText}</Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div>{children}</div>
    </div>
  );
} 