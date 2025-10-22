import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Appointment, InsertAppointment } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const availableTimeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function Agendamentos() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      return apiRequest("POST", "/api/appointments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/appointments"] });
      toast({
        title: "Agendamento realizado!",
        description: "Seu horário foi reservado com sucesso.",
      });
      setSelectedTime(null);
    },
    onError: () => {
      toast({
        title: "Erro ao agendar",
        description: "Não foi possível realizar o agendamento. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return;

    const appointment: InsertAppointment = {
      data: format(selectedDate, "yyyy-MM-dd"),
      horario: selectedTime,
    };

    createAppointmentMutation.mutate(appointment);
  };

  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate || !appointments) return false;
    
    return appointments.some(
      (apt) =>
        isSameDay(parseISO(apt.data), selectedDate) &&
        apt.horario === time &&
        apt.status === "agendado"
    );
  };

  const upcomingAppointments = appointments?.filter(
    (apt) => apt.status === "agendado" && new Date(apt.data) >= new Date()
  ).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando agendamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-primary pl-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          Laboratório de Redação
        </h1>
        <p className="text-muted-foreground">
          Reserve seu horário para correção presencial
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <CalendarIcon className="h-5 w-5" />
              Selecione uma Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
                  className="rounded-md border border-primary/20"
                  data-testid="calendar-agendamento"
                />
              </div>

              {selectedDate && (
                <div className="flex-1">
                  <h3 className="font-semibold mb-4 text-sm text-primary">
                    Horários Disponíveis - {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {availableTimeSlots.map((time) => {
                      const isBooked = isTimeSlotBooked(time);
                      const isSelected = selectedTime === time;

                      return (
                        <Button
                          key={time}
                          variant={isSelected ? "default" : "outline"}
                          disabled={isBooked}
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                          data-testid={`button-time-${time}`}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </Button>
                      );
                    })}
                  </div>

                  {selectedTime && (
                    <Button
                      className="w-full mt-6"
                      size="lg"
                      onClick={handleSchedule}
                      disabled={createAppointmentMutation.isPending}
                      data-testid="button-confirmar-agendamento"
                    >
                      {createAppointmentMutation.isPending ? "Agendando..." : "Confirmar Agendamento"}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              Próximos Agendamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments && upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-lg border border-primary/30 bg-card hover-elevate"
                    data-testid={`appointment-${apt.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {format(parseISO(apt.data), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                        </p>
                        <p className="text-2xl font-mono font-semibold text-primary mt-1">
                          {apt.horario}
                        </p>
                      </div>
                      <Badge className="text-xs bg-primary/20 text-primary border-primary/30">
                        Agendado
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">
                  Nenhum agendamento futuro
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
