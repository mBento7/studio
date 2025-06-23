import React from "react";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  icon: React.ElementType;
  title: string;
  description?: string;
  colorClass?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  icon: Icon,
  title,
  description,
  colorClass = "bg-primary text-primary-foreground",
  onClick,
  children,
  className = "",
}) => {
  return (
    <Card
      className={`p-6 bg-card rounded-xl shadow-xl shadow-black/20 border border-black/5 hover:shadow-2xl transition-shadow cursor-pointer ${className}`}
      onClick={onClick}
      tabIndex={0}
      role={onClick ? "button" : undefined}
      aria-label={title}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mb-4">{description}</p>}
          {children}
        </div>
      </div>
    </Card>
  );
}; 