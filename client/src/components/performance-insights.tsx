import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, AlertCircle, Target, Lightbulb } from "lucide-react";
import type { Essay } from "@shared/schema";

interface PerformanceInsightsProps {
  essays: Essay[];
}

export function PerformanceInsights({ essays }: PerformanceInsightsProps) {
  if (!essays || essays.length === 0) {
    return (
      <Card className="border-primary/30 dark:border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground dark:text-foreground">
            Sem dados suficientes
          </CardTitle>
          <CardDescription className="text-muted-foreground dark:text-muted-foreground">
            Continue escrevendo para ver suas análises
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Análise de tendência (últimas 3 vs 3 anteriores)
  const recentEssays = essays.slice(0, 3);
  const previousEssays = essays.slice(3, 6);
  
  const recentAvg = recentEssays.reduce((acc, e) => acc + e.notaTotal, 0) / recentEssays.length;
  const previousAvg = previousEssays.length > 0 
    ? previousEssays.reduce((acc, e) => acc + e.notaTotal, 0) / previousEssays.length 
    : recentAvg;
  
  const difference = recentAvg - previousAvg;
  const percentageChange = previousAvg > 0 ? ((difference / previousAvg) * 100) : 0;
  
  let trend: "up" | "down" | "stable" = "stable";
  let trendIcon = Minus;
  let trendColor = "text-muted-foreground dark:text-muted-foreground";
  let trendBg = "bg-muted/50 dark:bg-muted/30";
  let trendMessage = "Desempenho estável";
  
  if (difference > 20) {
    trend = "up";
    trendIcon = TrendingUp;
    trendColor = "text-green-600 dark:text-green-500";
    trendBg = "bg-green-500/10 dark:bg-green-500/20";
    trendMessage = "Excelente evolução!";
  } else if (difference < -20) {
    trend = "down";
    trendIcon = TrendingDown;
    trendColor = "text-red-600 dark:text-red-500";
    trendBg = "bg-red-500/10 dark:bg-red-500/20";
    trendMessage = "Atenção necessária";
  }

  // Análise de competências
  const competencyAverages = {
    c1: essays.reduce((acc, e) => acc + e.c1, 0) / essays.length,
    c2: essays.reduce((acc, e) => acc + e.c2, 0) / essays.length,
    c3: essays.reduce((acc, e) => acc + e.c3, 0) / essays.length,
    c4: essays.reduce((acc, e) => acc + e.c4, 0) / essays.length,
    c5: essays.reduce((acc, e) => acc + e.c5, 0) / essays.length,
  };

  const competencyNames = {
    c1: "Norma Culta",
    c2: "Compreensão do Tema",
    c3: "Argumentação",
    c4: "Coesão e Coerência",
    c5: "Proposta de Intervenção",
  };

  const competencyTips = {
    c1: "Revise gramática, ortografia e concordância. Pratique escrita formal diariamente.",
    c2: "Leia mais sobre temas atuais. Identifique palavras-chave no tema proposto.",
    c3: "Fortaleça seus argumentos com dados, exemplos e citações. Use repertório sociocultural.",
    c4: "Utilize conectivos adequados. Organize parágrafos com tópico frasal claro.",
    c5: "Detalhe sua solução: agente, ação, modo/meio, efeito e detalhamento.",
  };

  const sortedCompetencies = Object.entries(competencyAverages)
    .sort(([, a], [, b]) => a - b)
    .map(([key, avg]) => ({
      key: key as keyof typeof competencyNames,
      name: competencyNames[key as keyof typeof competencyNames],
      avg: Math.round(avg),
      tip: competencyTips[key as keyof typeof competencyTips],
      percentage: (avg / 200) * 100,
    }));

  const weakestCompetencies = sortedCompetencies.slice(0, 2);
  const strongestCompetencies = sortedCompetencies.slice(-2).reverse();

  // Distância da meta
  const targetGrade = 900;
  const currentAvg = Math.round(essays.reduce((acc, e) => acc + e.notaTotal, 0) / essays.length);
  const distanceToGoal = targetGrade - currentAvg;
  const needsImprovement = distanceToGoal > 0;

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Tendência Geral */}
      <Card className={`border-2 ${trend === "up" ? "border-green-500/30" : trend === "down" ? "border-red-500/30" : "border-primary/30"} dark:bg-card`} data-testid="card-performance-trend">
        <CardHeader className="pb-2 sm:pb-6">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground text-base sm:text-lg">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary dark:text-primary" />
                <span className="truncate">Análise de Tendência</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground hidden sm:block">
                Comparação das últimas 3 redações com as 3 anteriores
              </CardDescription>
            </div>
            <Badge className={`${trendBg} ${trendColor} border-0 text-xs whitespace-nowrap`} data-testid="badge-trend-status">
              {trendMessage}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4 sm:pb-6">
          <div className="flex items-center gap-2 sm:gap-6">
            <div className={`p-2 sm:p-4 rounded-full ${trendBg}`}>
              {(() => {
                const Icon = trendIcon;
                return <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${trendColor}`} />;
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-bold text-primary dark:text-primary" data-testid="text-trend-difference">
                  {difference > 0 ? "+" : ""}{Math.round(difference)}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">pontos</span>
                {percentageChange !== 0 && (
                  <span className={`text-xs sm:text-sm ${trendColor}`} data-testid="text-trend-percentage">
                    ({percentageChange > 0 ? "+" : ""}{percentageChange.toFixed(1)}%)
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground mt-1">
                Média atual: <span className="font-semibold text-foreground dark:text-foreground">{Math.round(recentAvg)}</span>
                {previousEssays.length > 0 && (
                  <> vs <span className="font-semibold text-foreground dark:text-foreground">{Math.round(previousAvg)}</span></>
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competências Mais Fracas */}
      <Card className="border-red-500/30 dark:bg-card dark:border-red-500/20" data-testid="card-weakest-competencies">
        <CardHeader className="pb-2 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground text-base sm:text-lg">
            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            Onde Você Pode Melhorar
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
            Competências que precisam de mais atenção
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-5">
          {weakestCompetencies.map((comp, index) => (
            <div key={comp.key} className="space-y-1.5 sm:space-y-2" data-testid={`weakness-${comp.key}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="destructive" className="bg-red-500/20 text-red-600 dark:bg-red-500/30 dark:text-red-400 text-xs whitespace-nowrap">
                    {index + 1}º mais fraca
                  </Badge>
                  <span className="font-semibold text-sm sm:text-base text-foreground dark:text-foreground">{comp.name}</span>
                </div>
                <span className="text-base sm:text-lg font-bold text-red-600 dark:text-red-500 whitespace-nowrap" data-testid={`text-avg-${comp.key}`}>
                  {comp.avg}/200
                </span>
              </div>
              <div className="bg-muted/50 dark:bg-muted/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-red-500 dark:bg-red-600 h-full rounded-full transition-all"
                  style={{ width: `${comp.percentage}%` }}
                />
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-3 bg-primary/5 dark:bg-primary/10 rounded-lg">
                <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary dark:text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-foreground/90 dark:text-foreground/80 leading-snug sm:leading-relaxed" data-testid={`text-tip-${comp.key}`}>
                  {comp.tip}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Competências Mais Fortes */}
      <Card className="border-green-500/30 dark:bg-card dark:border-green-500/20" data-testid="card-strongest-competencies">
        <CardHeader className="pb-2 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground text-base sm:text-lg">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            Seus Pontos Fortes
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
            Continue assim nessas competências!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-4">
          {strongestCompetencies.map((comp) => (
            <div key={comp.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3" data-testid={`strength-${comp.key}`}>
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-500" />
                </div>
                <span className="font-medium text-sm sm:text-base text-foreground dark:text-foreground truncate">{comp.name}</span>
              </div>
              <div className="text-left sm:text-right flex-shrink-0 pl-10 sm:pl-0">
                <div className="text-base sm:text-lg font-bold text-green-600 dark:text-green-500 whitespace-nowrap" data-testid={`text-strength-avg-${comp.key}`}>
                  {comp.avg}/200
                </div>
                <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                  {comp.percentage.toFixed(0)}% da meta
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Distância da Meta */}
      {needsImprovement && (
        <Card className="border-primary/30 dark:bg-card dark:border-primary/20" data-testid="card-goal-distance">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-foreground dark:text-foreground text-base sm:text-lg">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-primary dark:text-primary" />
              Foco na Meta ENEM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">Faltam</span>
                <span className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary" data-testid="text-points-to-goal">
                  {distanceToGoal}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">pontos para {targetGrade}</span>
              </div>
              <div className="bg-muted/50 dark:bg-muted/30 rounded-full h-2.5 sm:h-3 overflow-hidden">
                <div 
                  className="bg-primary dark:bg-primary h-full rounded-full transition-all"
                  style={{ width: `${(currentAvg / targetGrade) * 100}%` }}
                />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
                Você está a <span className="font-semibold text-foreground dark:text-foreground">{((currentAvg / targetGrade) * 100).toFixed(1)}%</span> da sua meta!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
