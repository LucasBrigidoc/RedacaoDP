import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Essays (Redações) table
export const essays = pgTable("essays", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tema: text("tema").notNull(),
  data: date("data").notNull(),
  notaTotal: integer("nota_total").notNull(), // 0-1000
  c1: integer("c1").notNull(), // Norma Culta (0-200)
  c2: integer("c2").notNull(), // Tema (0-200)
  c3: integer("c3").notNull(), // Argumentação (0-200)
  c4: integer("c4").notNull(), // Coesão (0-200)
  c5: integer("c5").notNull(), // Proposta (0-200)
});

export const insertEssaySchema = createInsertSchema(essays).omit({
  id: true,
});

export type InsertEssay = z.infer<typeof insertEssaySchema>;
export type Essay = typeof essays.$inferSelect;

// Appointments (Agendamentos) table
export const appointments = pgTable("appointments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  data: date("data").notNull(),
  horario: text("horario").notNull(), // e.g., "14:00", "15:00"
  status: text("status").notNull().default("agendado"), // "agendado", "concluído", "cancelado"
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  status: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// Users table (keeping existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Materials (Materiais) table - slides and PDFs
export const materials = pgTable("materials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titulo: text("titulo").notNull(),
  descricao: text("descricao"),
  tipo: text("tipo").notNull(), // "slide" ou "pdf"
  arquivo: text("arquivo").notNull(), // URL or file path
  dataUpload: date("data_upload").notNull().default(sql`CURRENT_DATE`),
});

export const insertMaterialSchema = createInsertSchema(materials).omit({
  id: true,
  dataUpload: true,
});

export type InsertMaterial = z.infer<typeof insertMaterialSchema>;
export type Material = typeof materials.$inferSelect;

// Weekly Themes (Temas Semanais) table
export const weeklyThemes = pgTable("weekly_themes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tema: text("tema").notNull(),
  descricao: text("descricao"),
  semana: date("semana").notNull(), // Data de início da semana
  ativo: integer("ativo").notNull().default(1), // 1 = tema atual, 0 = tema passado
});

export const insertWeeklyThemeSchema = createInsertSchema(weeklyThemes).omit({
  id: true,
  ativo: true,
});

export type InsertWeeklyTheme = z.infer<typeof insertWeeklyThemeSchema>;
export type WeeklyTheme = typeof weeklyThemes.$inferSelect;
