import { Essay } from "@shared/schema";

interface CompetencyBreakdownProps {
  essays: Essay[];
}

const competencies = [
  { key: "c1" as const, label: "Norma Culta", description: "Domínio da escrita formal" },
  { key: "c2" as const, label: "Tema", description: "Compreensão do tema" },
  { key: "c3" as const, label: "Argumentação", description: "Defesa de ponto de vista" },
  { key: "c4" as const, label: "Coesão", description: "Coesão e coerência" },
  { key: "c5" as const, label: "Proposta", description: "Proposta de intervenção" },
];

export function CompetencyBreakdown({ essays }: CompetencyBreakdownProps) {
  if (!essays || essays.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhuma redação disponível para análise de competências
      </div>
    );
  }

  const averages = competencies.map((comp) => {
    const avg = essays.reduce((acc, essay) => acc + essay[comp.key], 0) / essays.length;
    return {
      ...comp,
      average: Math.round(avg),
      percentage: (avg / 200) * 100,
    };
  });

  const getScoreColor = (score: number) => {
    if (score >= 160) return "text-chart-3"; // Green
    if (score >= 120) return "text-chart-4"; // Amber
    return "text-chart-5"; // Red
  };

  const getScoreColorBg = (score: number) => {
    if (score >= 160) return "bg-chart-3"; // Green
    if (score >= 120) return "bg-chart-4"; // Amber
    return "bg-chart-5"; // Red
  };

  return (
    <div className="space-y-6" data-testid="competency-breakdown">
      {averages.map((comp, index) => (
        <div key={comp.key} className="space-y-2" data-testid={`competency-${comp.key}`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="font-semibold text-sm">{comp.label}</p>
              <p className="text-xs text-muted-foreground">{comp.description}</p>
            </div>
            <p className={`text-2xl font-mono font-bold ${getScoreColor(comp.average)}`}>
              {comp.average}
              <span className="text-sm text-muted-foreground">/200</span>
            </p>
          </div>
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getScoreColorBg(comp.average)} transition-all duration-500`}
              style={{ width: `${comp.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
