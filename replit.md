# Portal do Aluno - Curso de Redação Diego Pereira

## Visão Geral
Portal institucional para alunos do Curso de Redação Diego Pereira acompanharem seu desempenho e evolução no curso. O sistema permite visualizar notas de redações do ENEM por competência, gráficos de evolução e agendar horários no laboratório de redação.

## Identidade Visual
- **Logo**: DP (Diego Pereira) em cor dourada (#D4AF77)
- **Tema**: Dark mode ultra escuro (preto puro) com destaque dourado intenso
- **Paleta de Cores (Dark Mode)**: 
  - Dourado primário (45 40% 70%) - Títulos, valores, ícones, bordas
  - Preto puro (0 0% 3%) - Background principal
  - Cinza ultra escuro (0 0% 5%) - Cards e superfícies secundárias
  - Texto claro (0 0% 98%) - Texto principal com alto contraste
  - Bordas douradas (primary/20) em todos os cards principais
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

### 3. Materiais de Estudo
- **Tema Semanal**: Card destacado mostrando o tema de redação da semana atual com descrição
- **Biblioteca de Materiais**: Grade de materiais disponíveis para download
  - Slides de aulas (ícone de apresentação)
  - PDFs de conteúdo (ícone de documento)
  - Descrição de cada material
  - Botão de download para acesso direto
- **Organização**: Materiais ordenados por data de upload (mais recentes primeiro)

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

### Materials (Materiais)
```typescript
{
  id: string
  titulo: string       // Título do material
  descricao: string    // Descrição do conteúdo
  tipo: string         // "slide" ou "pdf"
  arquivo: string      // URL ou caminho do arquivo
  dataUpload: date     // Data de upload
}
```

### WeeklyThemes (Temas Semanais)
```typescript
{
  id: string
  tema: string         // Tema da redação semanal
  descricao: string    // Descrição/orientações
  semana: date         // Data de início da semana
  ativo: number        // 1 = tema atual, 0 = tema passado
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
- PostgreSQL (Neon serverless) com Drizzle ORM
- Zod (validação)
- Neon Database para persistência de dados

## Arquitetura

### Componentes Principais
- `AppSidebar`: Navegação lateral com logo DP e menu principal
- `Dashboard`: Página principal com métricas e visualizações
- `Agendamentos`: Sistema de agendamento de horários
- `Materiais`: Página de materiais de estudo e tema semanal
- `MetricCard`: Card reutilizável para exibir métricas
- `EssayChart`: Gráfico de evolução das notas
- `CompetencyBreakdown`: Visualização das competências ENEM
- `RecentEssays`: Lista de redações recentes

### API Endpoints
- `GET /api/essays` - Lista todas as redações
- `POST /api/essays` - Cria nova redação
- `GET /api/appointments` - Lista agendamentos
- `POST /api/appointments` - Cria novo agendamento
- `GET /api/materials` - Lista todos os materiais
- `POST /api/materials` - Adiciona novo material
- `GET /api/weekly-theme` - Retorna tema semanal ativo
- `GET /api/weekly-themes` - Lista todos os temas semanais
- `POST /api/weekly-themes` - Cria novo tema semanal

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

3. **Acesso a Materiais**
   - Navega para página de materiais
   - Visualiza tema semanal de redação
   - Consulta biblioteca de materiais disponíveis
   - Faz download de slides e PDFs
   - Estuda conteúdo para aprimorar redações

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
✅ **Versão 2.0 Completa** (21 de outubro de 2025)
- Dashboard totalmente funcional com métricas, gráficos e competências ENEM
- Sistema de agendamento completo com detecção de conflitos
- **Nova página de Materiais de Estudo implementada**
  - Tema semanal de redação destacado
  - Biblioteca de materiais (slides e PDFs) com download
  - 6 materiais demo pré-carregados
- **Dark mode melhorado: tema ultra escuro (preto puro) com alto contraste**
- **Migração para PostgreSQL (Neon) completa**
  - Banco de dados persistente com Drizzle ORM
  - Tabelas: essays, appointments, materials, weekly_themes
  - Dados demo já populados
- Identidade visual DP aplicada intensamente (bordas douradas, títulos, valores, ícones)
- SEO implementado (meta tags, Open Graph)
- Sem erros LSP, aplicação 100% funcional

## Melhorias Futuras Sugeridas
- Adicionar estados de erro explícitos nas queries (retry buttons)
- Incluir og:image e favicon para branding completo
- Implementar ThemeToggle para alternância light/dark manual
- Fine-tuning de espaçamento em telas pequenas (<375px)
