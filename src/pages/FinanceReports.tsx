import { DollarSign } from "lucide-react";
import { getFinanceSummary } from "@/data/mockData";

const FinanceReports = () => {
  const summary = getFinanceSummary();

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <p className="text-sm text-muted-foreground">Resumo financeiro do mês atual</p>

      <div className="grid gap-3">
        <div className="bg-card border rounded-xl p-5 text-center animate-fade-in">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total de Entradas</p>
          <p className="text-3xl font-bold text-success">R$ {summary.income.toFixed(2)}</p>
        </div>
        <div className="bg-card border rounded-xl p-5 text-center animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total de Saídas</p>
          <p className="text-3xl font-bold text-destructive">R$ {summary.expense.toFixed(2)}</p>
        </div>
        <div className="bg-card border rounded-xl p-5 text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Saldo</p>
          <p className={`text-3xl font-bold ${summary.balance >= 0 ? "text-success" : "text-destructive"}`}>
            R$ {summary.balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinanceReports;
