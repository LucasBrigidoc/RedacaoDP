import { Essay } from "@shared/schema";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface RecentEssaysProps {
  essays: Essay[];
}

export function RecentEssays({ essays }: RecentEssaysProps) {
  if (!essays || essays.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-sm text-muted-foreground">
          Nenhuma redação corrigida ainda
        </p>
      </div>
    );
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 800) return "bg-chart-3 text-white";
    if (grade >= 600) return "bg-chart-4 text-white";
    return "bg-chart-5 text-white";
  };

  return (
    <div className="space-y-3" data-testid="recent-essays-list">
      {essays.map((essay) => (
        <div
          key={essay.id}
          className="p-4 rounded-lg border bg-card hover-elevate"
          data-testid={`essay-${essay.id}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate" data-testid={`essay-tema-${essay.id}`}>
                {essay.tema}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(parseISO(essay.data), "dd 'de' MMMM, yyyy", { locale: ptBR })}
              </p>
              <div className="flex gap-1 mt-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">C1: {essay.c1}</Badge>
                <Badge variant="secondary" className="text-xs">C2: {essay.c2}</Badge>
                <Badge variant="secondary" className="text-xs">C3: {essay.c3}</Badge>
                <Badge variant="secondary" className="text-xs">C4: {essay.c4}</Badge>
                <Badge variant="secondary" className="text-xs">C5: {essay.c5}</Badge>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-md font-mono font-bold text-sm ${getGradeColor(essay.notaTotal)}`} data-testid={`essay-nota-${essay.id}`}>
              {essay.notaTotal}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
