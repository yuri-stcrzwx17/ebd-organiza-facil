import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/turmas": "Turmas",
  "/chamada": "Chamada",
  "/alunos": "Alunos",
  "/professores": "Professores",
  "/financeiro/entradas": "Entradas",
  "/financeiro/saidas": "Saídas",
  "/financeiro/relatorios": "Relatórios",
  "/calendario": "Calendário",
  "/recados": "Recados",
};

export function AppLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "EBD Gestão";

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 flex items-center gap-3 border-b bg-card px-4 shadow-sm">
            <SidebarTrigger className="text-primary" />
            <h1 className="font-semibold text-base text-foreground truncate">{title}</h1>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
