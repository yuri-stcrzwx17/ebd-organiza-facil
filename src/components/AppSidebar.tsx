import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  CalendarDays,
  Megaphone,
  TrendingUp,
  TrendingDown,
  FileBarChart,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Recados", url: "/recados", icon: Megaphone },
  { title: "Calendário", url: "/calendario", icon: CalendarDays },
];

const classItems = [
  { title: "Turmas", url: "/turmas", icon: BookOpen },
  { title: "Chamada", url: "/chamada", icon: ClipboardCheck },
  { title: "Alunos", url: "/alunos", icon: Users },
  { title: "Professores", url: "/professores", icon: GraduationCap },
];

const financeItems = [
  { title: "Entradas", url: "/financeiro/entradas", icon: TrendingUp },
  { title: "Saídas", url: "/financeiro/saidas", icon: TrendingDown },
  { title: "Relatórios", url: "/financeiro/relatorios", icon: FileBarChart },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const renderItems = (items: typeof mainItems) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end
            onClick={() => setOpenMobile(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="text-sm">{item.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));

  return (
    <Sidebar collapsible="offcanvas" className="border-r-0">
      <SidebarHeader className="p-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-sidebar-accent flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-sidebar-accent-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-sidebar-foreground leading-tight">EBD Gestão</h2>
            <p className="text-xs text-sidebar-foreground/60">Escola Bíblica Dominical</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[11px] uppercase tracking-wider px-3">Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(mainItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[11px] uppercase tracking-wider px-3">Classes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(classItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[11px] uppercase tracking-wider px-3">Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{renderItems(financeItems)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
