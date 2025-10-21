import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, FileText, Target } from "lucide-react";
import { Essay } from "@shared/schema";
import { EssayChart } from "@/components/essay-chart";
import { CompetencyBreakdown } from "@/components/competency-breakdown";
import { RecentEssays } from "@/components/recent-essays";
import { MetricCard } from "@/components/metric-card";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Bem-vindo ao Portal do Aluno
        </h1>
        <p className="text-muted-foreground">
          Acompanhe seu desempenho e evolução no curso
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Evolução das Notas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EssayChart essays={essays || []} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Últimas Redações Corrigidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentEssays essays={essays?.slice(0, 5) || []} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Competências ENEM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CompetencyBreakdown essays={essays || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
