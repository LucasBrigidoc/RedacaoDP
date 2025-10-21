import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "@/pages/dashboard";
import Agendamentos from "@/pages/agendamentos";
import Materiais from "@/pages/materiais";
import Dieguito from "@/pages/dieguito";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import dpLogo from "@assets/imagem_2025-10-21_000635546_1761015995551.png";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/agendamentos" component={Agendamentos} />
      <Route path="/materiais" component={Materiais} />
      <Route path="/dieguito" component={Dieguito} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b border-primary/20 bg-background sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="text-lg text-primary font-medium">
                    Portal do Aluno
                  </div>
                </div>
                <img src={dpLogo} alt="Logo DP" className="h-12 w-12 object-contain" />
              </header>
              <main className="flex-1 overflow-auto p-6">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
