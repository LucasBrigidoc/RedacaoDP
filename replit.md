# Portal do Aluno - Curso de Redação Diego Pereira

## Visão Geral
Portal institucional para alunos do Curso de Redação Diego Pereira acompanharem seu desempenho e evolução no curso. O sistema permite visualizar notas de redações do ENEM por competência, gráficos de evolução e agendar horários no laboratório de redação.

## Identidade Visual
- **Logo**: DP (Diego Pereira) em cor dourada (#D4AF77)
- **Tema**: Escuro por padrão com destaque dourado intenso
- **Paleta de Cores**: 
  - Dourado primário (45 40% 70%) - Títulos, valores, ícones, bordas
  - Azul marinho escuro profundo (220 30% 12%) - Background principal
  - Cinza ardósia escuro (220 25% 16%) - Cards e superfícies secundárias
  - Bordas douradas (primary/30) em todos os cards principais
  - Ícones com fundo dourado/transparente nos metric cards

## Funcionalidades Principais

### 1. Dashboard
- **Cards de Métricas**: Média geral, total de redações, última nota, meta ENEM
- **Gráfico de Evolução**: Visualização temporal das notas ao longo do tempo
- **Últimas Redações**: Lista das 5 redações mais recentes corrigidas
- **Competências ENEM**: Visualização detalhada das 5 competências (C1-C5):
  - C1: Norma Culta (domínio da escrita formal)
  - C2: Tema (compreensão do tema)
  - C3: Argumentação (defesa de ponto de vista)
  - C4: Coesão (coesão e coerência)
  - C5: Proposta (proposta de intervenção)

### 2. Agendamentos
- Calendário interativo para seleção de data
- Horários disponíveis de 8h às 18h
- Lista de próximos agendamentos confirmados
- Sistema de reserva para o laboratório de redação

## Estrutura de Dados

### Essays (Redações)
```typescript
{
  id: string
  tema: string           // Tema da redação
  data: date            // Data da correção
  notaTotal: number     // Nota total (0-1000)
  c1: number           // Norma Culta (0-200)
  c2: number           // Tema (0-200)
  c3: number           // Argumentação (0-200)
  c4: number           // Coesão (0-200)
  c5: number           // Proposta (0-200)
}
```

### Appointments (Agendamentos)
```typescript
{
  id: string
  data: date           // Data do agendamento
  horario: string      // Horário (ex: "14:00")
  status: string       // "agendado", "concluído", "cancelado"
}
```

## Stack Tecnológica

### Frontend
- React com TypeScript
- Wouter (routing)
- TanStack Query (data fetching)
- Shadcn UI (componentes)
- Tailwind CSS (estilização)
- Recharts (gráficos)
- date-fns (manipulação de datas)

### Backend
- Express.js
- In-memory storage (MemStorage)
- Zod (validação)

## Arquitetura

### Componentes Principais
- `AppSidebar`: Navegação lateral com logo DP
- `Dashboard`: Página principal com métricas e visualizações
- `Agendamentos`: Sistema de agendamento de horários
- `MetricCard`: Card reutilizável para exibir métricas
- `EssayChart`: Gráfico de evolução das notas
- `CompetencyBreakdown`: Visualização das competências ENEM
- `RecentEssays`: Lista de redações recentes

### API Endpoints
- `GET /api/essays` - Lista todas as redações
- `POST /api/essays` - Cria nova redação
- `GET /api/appointments` - Lista agendamentos
- `POST /api/appointments` - Cria novo agendamento

## Fluxo do Usuário

1. **Visualização de Desempenho**
   - Acessa dashboard
   - Visualiza métricas gerais e gráfico de evolução
   - Analisa competências individuais
   - Consulta histórico de redações

2. **Agendamento de Correção**
   - Navega para página de agendamentos
   - Seleciona data no calendário
   - Escolhe horário disponível
   - Confirma agendamento
   - Visualiza agendamentos futuros

## Notas de Desenvolvimento
- Utiliza sistema de cores baseado em HSL para suporte a modo escuro
- Design responsivo para mobile, tablet e desktop
- Componentes seguem padrões do Shadcn UI
- Validação de formulários com Zod
- Estados de loading e erro tratados em todas as operações
- Paleta dourada (#D4AF77 / 45 35% 65%) aplicada consistentemente em --primary, --chart-1, --sidebar-primary e --ring
- Dados demo realistas: 8 redações (notas 720-880), 2 agendamentos pré-criados
- Cache invalidation automática após mutações (TanStack Query)
- Test IDs adicionados para todos os elementos interativos

## Status do Projeto
✅ **MVP Completo e Testado** (21 de outubro de 2025)
- Todos os testes end-to-end passaram com sucesso
- Dashboard totalmente funcional com métricas, gráficos e competências ENEM
- Sistema de agendamento completo com detecção de conflitos
- **Tema escuro ativado por padrão com elementos dourados em destaque**
- Identidade visual DP aplicada intensamente (bordas douradas, títulos, valores, ícones)
- SEO implementado (meta tags, Open Graph)
- Aprovado pelo architect para entrega

## Melhorias Futuras Sugeridas
- Adicionar estados de erro explícitos nas queries (retry buttons)
- Incluir og:image e favicon para branding completo
- Implementar ThemeToggle para alternância light/dark manual
- Fine-tuning de espaçamento em telas pequenas (<375px)
