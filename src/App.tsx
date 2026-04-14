import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Attendance from "./pages/Attendance";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import FinanceIncome from "./pages/FinanceIncome";
import FinanceExpense from "./pages/FinanceExpense";
import FinanceReports from "./pages/FinanceReports";
import Calendar from "./pages/Calendar";
import Announcements from "./pages/Announcements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/turmas" element={<Classes />} />
            <Route path="/chamada" element={<Attendance />} />
            <Route path="/alunos" element={<Students />} />
            <Route path="/professores" element={<Teachers />} />
            <Route path="/financeiro/entradas" element={<FinanceIncome />} />
            <Route path="/financeiro/saidas" element={<FinanceExpense />} />
            <Route path="/financeiro/relatorios" element={<FinanceReports />} />
            <Route path="/calendario" element={<Calendar />} />
            <Route path="/recados" element={<Announcements />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
