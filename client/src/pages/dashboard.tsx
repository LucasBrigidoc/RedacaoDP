import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, FileText, Target, Calendar } from "lucide-react";
import { Essay } from "@shared/schema";
import { EssayChart } from "@/components/essay-chart";
import { RecentEssays } from "@/components/recent-essays";
import { MetricCard } from "@/components/metric-card";
import { PerformanceInsights } from "@/components/performance-insights";
import { CompetencyStats } from "@/components/competency-stats";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subDays, subMonths, isAfter, parseISO } from "date-fns";

type PeriodFilter = "7days" | "15days" | "1month" | "3months" | "all";

export default function Dashboard() {
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>("all");
  
  const { data: essays, isLoading } = useQuery<Essay[]>({
    queryKey: ["/api/essays"],
  });

  const filteredEssays = useMemo(() => {
    if (!essays || periodFilter === "all") return essays || [];

    const now = new Date();
    let cutoffDate: Date;

    switch (periodFilter) {
      case "7days":
        cutoffDate = subDays(now, 7);
        break;
      case "15days":
        cutoffDate = subDays(now, 15);
        break;
      case "1month":
        cutoffDate = subMonths(now, 1);
        break;
      case "3months":
        cutoffDate = subMonths(now, 3);
        break;
      default:
        return essays;
    }

    return essays.filter((essay) => {
      const essayDate = parseISO(essay.data);
      return isAfter(essayDate, cutoffDate);
    });
  }, [essays, periodFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const totalEssays = essays?.length || 0;
  const filteredCount = filteredEssays.length;
  const averageGrade = filteredEssays.length
    ? Math.round(filteredEssays.reduce((acc, e) => acc + e.notaTotal, 0) / filteredEssays.length)
    : 0;
  const latestGrade = essays?.[0]?.notaTotal || 0;
  const targetGrade = 900;

  const getPeriodLabel = () => {
    switch (periodFilter) {
      case "7days":
        return "Últimos 7 dias";
      case "15days":
        return "Últimos 15 dias";
      case "1month":
        return "Último mês";
      case "3months":
        return "Últimos 3 meses";
      case "all":
        return "Todas as redações";
      default:
        return "Todas";
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6 pb-4 sm:pb-6">
      <div className="border-l-4 border-primary pl-3 sm:pl-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
          Bem-vindo ao Portal do Aluno
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Acompanhe seu desempenho e evolução no curso
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover-elevate border-primary/30 sm:col-span-2 lg:col-span-1" data-testid="card-media-geral">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">Média Geral</p>
              <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 border border-primary/20">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-2xl sm:text-3xl font-mono font-bold text-primary">
                {averageGrade}
                <span className="text-lg sm:text-xl text-muted-foreground">/1000</span>
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value as PeriodFilter)}>
                    <SelectTrigger className="h-8 text-xs border-primary/30 bg-background/50" data-testid="select-period-filter">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Últimos 7 dias</SelectItem>
                      <SelectItem value="15days">Últimos 15 dias</SelectItem>
                      <SelectItem value="1month">Último mês</SelectItem>
                      <SelectItem value="3months">Últimos 3 meses</SelectItem>
                      <SelectItem value="all">Todas as redações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {filteredCount} {filteredCount === 1 ? "redação" : "redações"} • {getPeriodLabel()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <MetricCard
          title="Total de Redações"
          value={totalEssays}
          icon={FileText}
          data-testid="card-total-redacoes"
        />
        <MetricCard
          title="Última Nota"
          value={latestGrade}
          suffix="/1000"
          icon={BookOpen}
          data-testid="card-ultima-nota"
        />
        <MetricCard
          title="Meta ENEM"
          value={targetGrade}
          suffix="/1000"
          icon={Target}
          data-testid="card-meta-enem"
        />
      </div>

      <Card className="border-primary/30 overflow-hidden">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-primary text-base sm:text-xl">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            Evolução das Notas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6 pt-0">
          <EssayChart essays={essays || []} />
        </CardContent>
      </Card>

      <CompetencyStats essays={essays || []} />
      
      <PerformanceInsights essays={essays || []} />

      <Card className="border-primary/30 dark:border-primary/20">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-primary dark:text-primary text-base sm:text-xl">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            Últimas Redações Corrigidas
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pt-0">
          <RecentEssays essays={essays?.slice(0, 5) || []} />
        </CardContent>
      </Card>
    </div>
  );
}
