import { Home, Calendar, FileText, BookOpen, Bot, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";
import headerImageUrl from "@assets/image_1761079021229.png";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Agendamentos",
    url: "/agendamentos",
    icon: Calendar,
  },
  {
    title: "Materiais",
    url: "/materiais",
    icon: BookOpen,
  },
  {
    title: "Dieguito",
    url: "/dieguito",
    icon: Bot,
  },
];

export function AppSidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      });
    } catch (error) {
      toast({
        title: "Erro ao sair",
        description: "Tente novamente",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <img 
          src={headerImageUrl} 
          alt="Curso de Redação - Prof. Diego Pereira" 
          className="w-full brightness-125 contrast-110"
          style={{ filter: 'brightness(1.3) contrast(1.15)' }}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} data-testid={`link-${item.title.toLowerCase()}`}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-destructive hover:text-destructive hover:bg-destructive/10" data-testid="button-logout">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
