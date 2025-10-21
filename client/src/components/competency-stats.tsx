import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Essay } from "@shared/schema";

interface CompetencyStatsProps {
  essays: Essay[];
}

export function CompetencyStats({ essays }: CompetencyStatsProps) {
  if (!essays || essays.length === 0) {
    return null;
  }

  const competencyData = [
    { key: "c1", name: "C1: Norma Culta", description: "Domínio da modalidade escrita formal" },
    { key: "c2", name: "C2: Tema", description: "Compreensão da proposta" },
    { key: "c3", name: "C3: Argumentação", description: "Seleção e organização de argumentos" },
    { key: "c4", name: "C4: Coesão", description: "Mecanismos linguísticos" },
    { key: "c5", name: "C5: Proposta", description: "Elaboração de proposta de intervenção" },
  ];

  const stats = competencyData.map(({ key, name, description }) => {
    const competencyKey = key as keyof Pick<Essay, "c1" | "c2" | "c3" | "c4" | "c5">;
    const values = essays.map((e) => e[competencyKey]);
    const avg = Math.round(values.reduce((acc, val) => acc + val, 0) / values.length);
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    // Tendência (últimas 3 vs 3 anteriores)
    const recent = essays.slice(0, 3).map((e) => e[competencyKey]);
    const previous = essays.slice(3, 6).map((e) => e[competencyKey]);
    
    const recentAvg = recent.reduce((acc, val) => acc + val, 0) / recent.length;
    const previousAvg = previous.length > 0 
      ? previous.reduce((acc, val) => acc + val, 0) / previous.length 
      : recentAvg;
    
    const trend = recentAvg > previousAvg + 5 ? "up" : recentAvg < previousAvg - 5 ? "down" : "stable";
    
    return {
      key,
      name,
      description,
      avg,
      max,
      min,
      trend,
      percentage: (avg / 200) * 100,
    };
  });

  return (
    <Card className="border-primary/30 dark:bg-card dark:border-primary/20" data-testid="card-competency-stats">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground">
          <BarChart3 className="h-5 w-5 text-primary dark:text-primary" />
          Estatísticas Detalhadas por Competência
        </CardTitle>
        <CardDescription className="text-muted-foreground dark:text-muted-foreground">
          Análise completa do seu desempenho em cada competência
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.map((stat) => (
          <div key={stat.key} className="space-y-3" data-testid={`stat-${stat.key}`}>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground dark:text-foreground">{stat.name}</h4>
                  {stat.trend === "up" && (
                    <Badge className="bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400 border-0" data-testid={`badge-trend-${stat.key}`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Subindo
                    </Badge>
                  )}
                  {stat.trend === "down" && (
                    <Badge className="bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-400 border-0" data-testid={`badge-trend-${stat.key}`}>
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Caindo
                    </Badge>
                  )}
                  {stat.trend === "stable" && (
                    <Badge className="bg-muted/50 text-muted-foreground dark:bg-muted/30 border-0" data-testid={`badge-trend-${stat.key}`}>
                      <Minus className="h-3 w-3 mr-1" />
                      Estável
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground">{stat.description}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary dark:text-primary" data-testid={`text-avg-${stat.key}`}>
                  {stat.avg}
                </div>
                <div className="text-xs text-muted-foreground dark:text-muted-foreground">/200</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground dark:text-muted-foreground">Progresso</span>
                <span className="font-medium text-foreground dark:text-foreground">{stat.percentage.toFixed(0)}%</span>
              </div>
              <div className="bg-muted/50 dark:bg-muted/30 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-primary dark:bg-primary h-full rounded-full transition-all"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t border-border dark:border-border">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-muted-foreground dark:text-muted-foreground">Mínima: </span>
                  <span className="font-semibold text-foreground dark:text-foreground" data-testid={`text-min-${stat.key}`}>{stat.min}</span>
                </div>
                <div>
                  <span className="text-muted-foreground dark:text-muted-foreground">Máxima: </span>
                  <span className="font-semibold text-foreground dark:text-foreground" data-testid={`text-max-${stat.key}`}>{stat.max}</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground dark:text-muted-foreground">Média: </span>
                <span className="font-semibold text-primary dark:text-primary">{stat.avg}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
