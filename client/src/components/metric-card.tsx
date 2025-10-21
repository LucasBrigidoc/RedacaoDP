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
    <Card className="hover-elevate" data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-mono font-bold text-foreground">
            {value}
            {suffix && <span className="text-xl text-muted-foreground">{suffix}</span>}
          </p>
          {trend && (
            <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
              <TrendIcon className="h-3 w-3" />
              <span>
                {trend === "up" ? "Acima da média" : trend === "down" ? "Abaixo da média" : "Na média"}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
