import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEssaySchema, insertAppointmentSchema, insertMaterialSchema, insertWeeklyThemeSchema } from "@shared/schema";
import "express-session";

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    isAuthenticated?: boolean;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Allow any login for now (database not configured yet)
      if (email && password) {
        req.session.isAuthenticated = true;
        req.session.userId = email;
        res.json({ success: true, message: "Login bem-sucedido" });
      } else {
        res.status(400).json({ success: false, message: "Email e senha são obrigatórios" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro no servidor" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    req.session.destroy((err: Error | null) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Erro ao fazer logout" });
      }
      res.clearCookie('connect.sid');
      res.json({ success: true, message: "Logout bem-sucedido" });
    });
  });

  app.get("/api/auth/check", async (req, res) => {
    if (req.session.isAuthenticated) {
      res.json({ authenticated: true });
    } else {
      res.status(401).json({ authenticated: false });
    }
  });

  // Middleware to protect routes
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isAuthenticated) {
      next();
    } else {
      res.status(401).json({ message: "Não autenticado" });
    }
  };

  // Apply authentication middleware to all protected routes (except auth routes)
  app.use("/api/essays", requireAuth);
  app.use("/api/appointments", requireAuth);
  app.use("/api/materials", requireAuth);
  app.use("/api/weekly-theme", requireAuth);
  app.use("/api/weekly-themes", requireAuth);
  app.use("/api/dieguito", requireAuth);

  app.get("/api/essays", async (_req, res) => {
    try {
      const essays = await storage.getAllEssays();
      res.json(essays);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar redações" });
    }
  });

  app.get("/api/essays/:id", async (req, res) => {
    try {
      const essay = await storage.getEssay(req.params.id);
      if (!essay) {
        return res.status(404).json({ message: "Redação não encontrada" });
      }
      res.json(essay);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar redação" });
    }
  });

  app.post("/api/essays", async (req, res) => {
    try {
      const validatedData = insertEssaySchema.parse(req.body);
      const essay = await storage.createEssay(validatedData);
      res.status(201).json(essay);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.get("/api/appointments", async (_req, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar agendamentos" });
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    try {
      const appointment = await storage.getAppointment(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Agendamento não encontrado" });
      }
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar agendamento" });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.get("/api/materials", async (_req, res) => {
    try {
      const allMaterials = await storage.getAllMaterials();
      res.json(allMaterials);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar materiais" });
    }
  });

  app.get("/api/materials/:id", async (req, res) => {
    try {
      const material = await storage.getMaterial(req.params.id);
      if (!material) {
        return res.status(404).json({ message: "Material não encontrado" });
      }
      res.json(material);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar material" });
    }
  });

  app.post("/api/materials", async (req, res) => {
    try {
      const validatedData = insertMaterialSchema.parse(req.body);
      const material = await storage.createMaterial(validatedData);
      res.status(201).json(material);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.get("/api/weekly-theme", async (_req, res) => {
    try {
      const theme = await storage.getCurrentWeeklyTheme();
      if (!theme) {
        return res.status(404).json({ message: "Nenhum tema ativo" });
      }
      res.json(theme);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar tema semanal" });
    }
  });

  app.get("/api/weekly-themes", async (_req, res) => {
    try {
      const themes = await storage.getAllWeeklyThemes();
      res.json(themes);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar temas" });
    }
  });

  app.post("/api/weekly-themes", async (req, res) => {
    try {
      const validatedData = insertWeeklyThemeSchema.parse(req.body);
      const theme = await storage.createWeeklyTheme(validatedData);
      res.status(201).json(theme);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.post("/api/dieguito/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Mensagem inválida" });
      }

      const lowerMessage = message.toLowerCase();
      let response = "";

      if (lowerMessage.includes("competência") || lowerMessage.includes("c1") || lowerMessage.includes("c2") || lowerMessage.includes("c3") || lowerMessage.includes("c4") || lowerMessage.includes("c5")) {
        response = "As 5 competências do ENEM são:\n\n" +
          "C1 - Norma Culta: Domínio da escrita formal da língua portuguesa (0-200 pontos)\n" +
          "C2 - Tema: Compreensão e desenvolvimento do tema proposto (0-200 pontos)\n" +
          "C3 - Argumentação: Defesa de ponto de vista com argumentos consistentes (0-200 pontos)\n" +
          "C4 - Coesão: Organização textual e uso de conectivos (0-200 pontos)\n" +
          "C5 - Proposta: Elaboração de proposta de intervenção (0-200 pontos)\n\n" +
          "A soma das 5 competências resulta na nota final de 0 a 1000 pontos.";
      } else if (lowerMessage.includes("introdução")) {
        response = "A introdução da redação do ENEM deve:\n\n" +
          "✓ Contextualizar o tema de forma clara\n" +
          "✓ Apresentar a tese (seu posicionamento)\n" +
          "✓ Ter aproximadamente 5-7 linhas\n" +
          "✓ Usar repertório sociocultural (citações, dados, fatos históricos)\n" +
          "✓ Evitar clichês e frases genéricas\n\n" +
          "Dica: Use o método 'funil' - comece com contexto amplo e afunile para sua tese específica.";
      } else if (lowerMessage.includes("conclusão") || lowerMessage.includes("proposta")) {
        response = "A conclusão (C5) deve conter uma proposta de intervenção completa com 5 elementos:\n\n" +
          "1. Agente: Quem vai executar a ação\n" +
          "2. Ação: O que deve ser feito\n" +
          "3. Modo/Meio: Como será feito\n" +
          "4. Finalidade: Para que/qual objetivo\n" +
          "5. Detalhamento: Explicação de um dos elementos\n\n" +
          "Exemplo: 'O Ministério da Educação (agente) deve promover campanhas educativas (ação) por meio de palestras nas escolas (modo) para conscientizar jovens sobre o tema (finalidade), com materiais didáticos específicos desenvolvidos por especialistas (detalhamento).'";
      } else if (lowerMessage.includes("desenvolvimento")) {
        response = "O desenvolvimento deve ter 2 parágrafos, cada um com:\n\n" +
          "✓ Tópico frasal (ideia central do parágrafo)\n" +
          "✓ Argumentação consistente\n" +
          "✓ Repertório sociocultural legitimado\n" +
          "✓ Exemplificação ou dados\n" +
          "✓ Conexão com a tese da introdução\n" +
          "✓ Uso adequado de conectivos\n\n" +
          "Cada parágrafo deve ter aproximadamente 7-9 linhas.";
      } else if (lowerMessage.includes("nota") || lowerMessage.includes("pontos") || lowerMessage.includes("1000")) {
        response = "Para alcançar nota 1000 no ENEM você precisa:\n\n" +
          "✓ 200 pontos em CADA competência (C1, C2, C3, C4, C5)\n" +
          "✓ Zero erros gramaticais\n" +
          "✓ Domínio completo do tema\n" +
          "✓ Argumentação impecável com repertório diversificado\n" +
          "✓ Coesão e coerência perfeitas\n" +
          "✓ Proposta de intervenção completa e detalhada\n\n" +
          "Dica: Pratique muito e busque feedback constante!";
      } else {
        response = "Olá! Sou o Dieguito, assistente do Curso de Redação Diego Pereira. Posso ajudar com dúvidas sobre:\n\n" +
          "📝 Estrutura da redação (introdução, desenvolvimento, conclusão)\n" +
          "📊 Competências do ENEM (C1 a C5)\n" +
          "💡 Proposta de intervenção\n" +
          "✍️ Argumentação e repertório\n" +
          "📚 Dicas para melhorar sua nota\n\n" +
          "Faça sua pergunta específica sobre redação que terei prazer em ajudar!";
      }

      res.json({ response });
    } catch (error) {
      console.error("Erro no chat Dieguito:", error);
      res.status(500).json({ message: "Erro ao processar mensagem" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
