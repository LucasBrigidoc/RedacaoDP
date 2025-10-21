import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEssaySchema, insertAppointmentSchema, insertMaterialSchema, insertWeeklyThemeSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
