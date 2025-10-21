import { type User, type InsertUser, type Essay, type InsertEssay, type Appointment, type InsertAppointment } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllEssays(): Promise<Essay[]>;
  getEssay(id: string): Promise<Essay | undefined>;
  createEssay(essay: InsertEssay): Promise<Essay>;
  
  getAllAppointments(): Promise<Appointment[]>;
  getAppointment(id: string): Promise<Appointment | undefined>;
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private essays: Map<string, Essay>;
  private appointments: Map<string, Appointment>;

  constructor() {
    this.users = new Map();
    this.essays = new Map();
    this.appointments = new Map();
    this.seedData();
  }

  private seedData() {
    const demoEssays: Essay[] = [
      {
        id: randomUUID(),
        tema: "A importância da educação financeira nas escolas brasileiras",
        data: "2025-10-15",
        notaTotal: 880,
        c1: 180,
        c2: 180,
        c3: 180,
        c4: 160,
        c5: 180,
      },
      {
        id: randomUUID(),
        tema: "Desafios da mobilidade urbana no Brasil contemporâneo",
        data: "2025-10-08",
        notaTotal: 840,
        c1: 180,
        c2: 160,
        c3: 180,
        c4: 160,
        c5: 160,
      },
      {
        id: randomUUID(),
        tema: "O papel da tecnologia na democratização do ensino",
        data: "2025-10-01",
        notaTotal: 800,
        c1: 160,
        c2: 160,
        c3: 160,
        c4: 160,
        c5: 160,
      },
      {
        id: randomUUID(),
        tema: "Combate ao desperdício de alimentos no Brasil",
        data: "2025-09-24",
        notaTotal: 760,
        c1: 160,
        c2: 140,
        c3: 160,
        c4: 140,
        c5: 160,
      },
      {
        id: randomUUID(),
        tema: "A preservação da Amazônia e o desenvolvimento sustentável",
        data: "2025-09-17",
        notaTotal: 820,
        c1: 160,
        c2: 180,
        c3: 160,
        c4: 160,
        c5: 160,
      },
      {
        id: randomUUID(),
        tema: "Saúde mental dos jovens brasileiros",
        data: "2025-09-10",
        notaTotal: 780,
        c1: 160,
        c2: 160,
        c3: 140,
        c4: 160,
        c5: 160,
      },
      {
        id: randomUUID(),
        tema: "Desafios da inclusão digital no Brasil",
        data: "2025-09-03",
        notaTotal: 740,
        c1: 140,
        c2: 160,
        c3: 140,
        c4: 140,
        c5: 160,
      },
      {
        id: randomUUID(),
        tema: "A valorização do trabalho doméstico no Brasil",
        data: "2025-08-27",
        notaTotal: 720,
        c1: 140,
        c2: 140,
        c3: 160,
        c4: 140,
        c5: 140,
      },
    ];

    demoEssays.forEach(essay => this.essays.set(essay.id, essay));

    const demoAppointments: Appointment[] = [
      {
        id: randomUUID(),
        data: "2025-10-23",
        horario: "14:00",
        status: "agendado",
      },
      {
        id: randomUUID(),
        data: "2025-10-25",
        horario: "10:00",
        status: "agendado",
      },
    ];

    demoAppointments.forEach(apt => this.appointments.set(apt.id, apt));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllEssays(): Promise<Essay[]> {
    return Array.from(this.essays.values()).sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );
  }

  async getEssay(id: string): Promise<Essay | undefined> {
    return this.essays.get(id);
  }

  async createEssay(insertEssay: InsertEssay): Promise<Essay> {
    const id = randomUUID();
    const essay: Essay = { ...insertEssay, id };
    this.essays.set(id, essay);
    return essay;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );
  }

  async getAppointment(id: string): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = randomUUID();
    const appointment: Appointment = { ...insertAppointment, id, status: "agendado" };
    this.appointments.set(id, appointment);
    return appointment;
  }
}

export const storage = new MemStorage();
