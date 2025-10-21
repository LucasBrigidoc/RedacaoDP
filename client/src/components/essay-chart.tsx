import { Essay } from "@shared/schema";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface EssayChartProps {
  essays: Essay[];
}

export function EssayChart({ essays }: EssayChartProps) {
  const chartData = [...essays]
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
    .map((essay) => ({
      data: format(parseISO(essay.data), "dd/MM", { locale: ptBR }),
      nota: essay.notaTotal,
      tema: essay.tema,
    }));

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        Nenhuma redação disponível para exibir o gráfico
      </div>
    );
  }

  return (
    <div className="h-[300px]" data-testid="chart-evolucao">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="data"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            domain={[0, 1000]}
            ticks={[0, 200, 400, 600, 800, 1000]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Line
            type="monotone"
            dataKey="nota"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-1))", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
