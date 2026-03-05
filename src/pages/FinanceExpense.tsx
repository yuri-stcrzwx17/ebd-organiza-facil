import { TrendingDown } from "lucide-react";
import { finances } from "@/data/mockData";

const FinanceExpense = () => {
  const expenses = finances.filter((f) => f.type === "expense").sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <p className="text-sm text-muted-foreground">Despesas registradas</p>
      <div className="space-y-2">
        {expenses.map((f, i) => (
          <div
            key={f.id}
            className="bg-card border rounded-xl p-4 flex items-center justify-between animate-fade-in"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <div>
              <h3 className="font-medium text-sm text-foreground">{f.description}</h3>
              <p className="text-xs text-muted-foreground">{new Date(f.date).toLocaleDateString("pt-BR")} · {f.category}</p>
            </div>
            <span className="text-sm font-bold text-destructive flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5" />
              R$ {f.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceExpense;
