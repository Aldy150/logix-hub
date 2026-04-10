import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
  className?: string;
}

export function KPICard({ title, value, change, icon, className = "" }: KPICardProps) {
  const isPositive = change >= 0;

  return (
    <div className={`rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold mt-1 tabular-nums tracking-tight">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        {isPositive ? (
          <TrendingUp className="h-3.5 w-3.5 text-success" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
        )}
        <span className={`text-xs font-medium tabular-nums ${isPositive ? "text-success" : "text-destructive"}`}>
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-muted-foreground">vs mois dernier</span>
      </div>
    </div>
  );
}
