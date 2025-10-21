import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, FileText, Target } from "lucide-react";
import { Essay } from "@shared/schema";
import { EssayChart } from "@/components/essay-chart";
import { RecentEssays } from "@/components/recent-essays";
import { MetricCard } from "@/components/metric-card";
import { PerformanceInsights } from "@/components/performance-insights";
import { CompetencyStats } from "@/components/competency-stats";

export default function Dashboard() {
  const { data: essays, isLoading } = useQuery<Essay[]>({
    queryKey: ["/api/essays"],
  });

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
  const averageGrade = essays?.length
    ? Math.round(essays.reduce((acc, e) => acc + e.notaTotal, 0) / essays.length)
    : 0;
  const latestGrade = essays?.[0]?.notaTotal || 0;
  const targetGrade = 900;

  return (
    <div className="space-y-3 sm:space-y-6 pb-4 sm:pb-6">
      <div className="border-l-4 border-primary pl-3 sm:pl-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-1 sm:mb-2">
          Bem-vindo ao Portal do Aluno
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Acompanhe seu desempenho e evolução no curso
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Média Geral"
          value={averageGrade}
          suffix="/1000"
          icon={TrendingUp}
          trend={averageGrade >= 700 ? "up" : averageGrade >= 500 ? "stable" : "down"}
          data-testid="card-media-geral"
        />
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
