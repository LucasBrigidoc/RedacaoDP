import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  "data-testid"?: string;
}

export function MetricCard({ title, value, suffix, icon: Icon, trend, "data-testid": testId }: MetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-chart-3" : trend === "down" ? "text-chart-5" : "text-muted-foreground";

  return (
    <Card className="hover-elevate border-primary/30" data-testid={testId}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl sm:text-3xl font-mono font-bold text-primary">
            {value}
            {suffix && <span className="text-lg sm:text-xl text-muted-foreground">{suffix}</span>}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
              <TrendIcon className="h-3 w-3" />
              <span className="hidden sm:inline">
                {trend === "up" ? "Acima da média" : trend === "down" ? "Abaixo da média" : "Na média"}
              </span>
              <span className="sm:hidden">
                {trend === "up" ? "↑ Média" : trend === "down" ? "↓ Média" : "= Média"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
