import { Users, GraduationCap, DollarSign, Gift, Megaphone } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { students, teachers, announcements, getUpcomingBirthdays, getFinanceSummary } from "@/data/mockData";

const Dashboard = () => {
  const birthdays = getUpcomingBirthdays();
  const finance = getFinanceSummary();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Alunos" value={students.length} subtitle="Matriculados" icon={Users} />
        <StatCard title="Professores" value={teachers.length} subtitle="Ativos" icon={GraduationCap} />
        <StatCard
          title="Entradas"
          value={`R$ ${finance.income.toFixed(2)}`}
          subtitle="Este mês"
          icon={DollarSign}
        />
        <StatCard
          title="Saídas"
          value={`R$ ${finance.expense.toFixed(2)}`}
          subtitle="Este mês"
          icon={DollarSign}
        />
      </div>

      {/* Birthdays */}
      <div className="bg-card rounded-xl border p-4 shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-2 mb-3">
          <Gift className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-sm text-foreground">Próximos Aniversariantes</h2>
        </div>
        <ul className="space-y-2">
          {birthdays.map((b, i) => (
            <li key={i} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0">
              <span className="text-foreground">{b.name}</span>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                {b.daysUntil === 0 ? "Hoje! 🎉" : `${b.date} (${b.daysUntil}d)`}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Announcements */}
      <div className="bg-card rounded-xl border p-4 shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-2 mb-3">
          <Megaphone className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-sm text-foreground">Recados Recentes</h2>
        </div>
        <div className="space-y-3">
          {announcements.map((a) => (
            <div key={a.id} className="p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm text-foreground">{a.title}</h3>
                <span className="text-[10px] text-muted-foreground">{new Date(a.date).toLocaleDateString('pt-BR')}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{a.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
