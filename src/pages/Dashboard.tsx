import { Users, GraduationCap, DollarSign, Gift, Megaphone, BookOpen, UserCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { students, teachers, classes, announcements, getUpcomingBirthdays, getFinanceSummary } from "@/data/mockData";

const classBadgeColors: Record<string, string> = {
  "Crianças": "bg-amber-100 text-amber-700 border-amber-200",
  "Adolescentes": "bg-blue-100 text-blue-700 border-blue-200",
  "Jovens": "bg-green-100 text-green-700 border-green-200",
  "Adultos": "bg-violet-100 text-violet-700 border-violet-200",
};

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

      {/* Students */}
      <div className="bg-card rounded-xl border p-4 shadow-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-sm text-foreground">Alunos Cadastrados</h2>
          </div>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {students.length} total
          </span>
        </div>
        <ul className="space-y-2 max-h-64 overflow-auto">
          {students.map((s) => (
            <li key={s.id} className="flex items-center justify-between text-sm py-1.5 border-b last:border-0 gap-2">
              <span className="text-foreground truncate">{s.name}</span>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${classBadgeColors[s.class] ?? "bg-secondary text-muted-foreground"}`}>
                {s.class}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Classes */}
      <div className="bg-card rounded-xl border p-4 shadow-sm animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-sm text-foreground">Salas Cadastradas</h2>
          </div>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {classes.length} turmas
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {classes.map((c) => (
            <div key={c.id} className="p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-sm text-foreground">{c.name}</h3>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${classBadgeColors[c.name] ?? "bg-secondary text-muted-foreground"}`}>
                  {c.studentCount} alunos
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prof. {c.teacher}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {c.ageStart}–{c.ageEnd} anos
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
