import React from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface ContentBlockProps {
  title: React.ReactNode;
  description: string;
  isLocked?: boolean;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline" | null | undefined;
  lockMessage?: string;
  showOverlay?: boolean;
  children?: React.ReactNode;
}

export function ContentBlock({
  title,
  description,
  isLocked,
  badgeText,
  badgeVariant = "default",
  lockMessage,
  showOverlay = true,
  children
}: ContentBlockProps) {
  return (
    <div className={`relative rounded-lg border p-5 bg-background shadow-sm transition-all ${isLocked ? "opacity-60" : ""} ${isLocked ? "pointer-events-none" : ""}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        {badgeText && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant={badgeVariant} className="ml-2 cursor-help">{badgeText}</Badge>
              </TooltipTrigger>
              {isLocked && lockMessage && (
                <TooltipContent side="top">{lockMessage}</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div>{children}</div>
      {isLocked && showOverlay && (
        <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 flex items-center justify-center z-10 rounded-lg pointer-events-auto cursor-not-allowed">
          {lockMessage && (
            <span className="text-sm text-muted-foreground text-center">{lockMessage}</span>
          )}
        </div>
      )}
    </div>
  );
} 