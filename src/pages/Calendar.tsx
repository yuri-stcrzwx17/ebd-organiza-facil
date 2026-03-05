import { useState } from "react";
import { ChevronLeft, ChevronRight, Gift } from "lucide-react";
import { students, teachers } from "@/data/mockData";

const allPeople = [
  ...students.map((s) => ({ name: s.name, birthDate: s.birthDate })),
  ...teachers.map((t) => ({ name: t.name, birthDate: t.birthDate })),
];

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const Calendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const birthdaysInMonth = allPeople.filter((p) => {
    const d = new Date(p.birthDate);
    return d.getMonth() === month;
  });

  const getBirthdayNames = (day: number) =>
    birthdaysInMonth
      .filter((p) => new Date(p.birthDate).getDate() === day)
      .map((p) => p.name);

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <button onClick={prev} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h2 className="font-semibold text-foreground">{monthNames[month]} {year}</h2>
        <button onClick={next} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      <div className="bg-card border rounded-xl p-3 shadow-sm">
        <div className="grid grid-cols-7 text-center text-[10px] text-muted-foreground font-medium mb-2">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
            <div key={d} className="py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {days.map((day, i) => {
            if (!day) return <div key={`e-${i}`} />;
            const names = getBirthdayNames(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div
                key={i}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-colors ${
                  isToday ? "bg-primary text-primary-foreground font-bold" : "text-foreground hover:bg-secondary"
                } ${names.length > 0 ? "ring-2 ring-primary/30" : ""}`}
              >
                {day}
                {names.length > 0 && (
                  <Gift className="h-2.5 w-2.5 text-primary absolute bottom-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {birthdaysInMonth.length > 0 && (
        <div className="bg-card border rounded-xl p-4 shadow-sm animate-fade-in">
          <h3 className="font-semibold text-sm text-foreground mb-2 flex items-center gap-2">
            <Gift className="h-4 w-4 text-primary" /> Aniversariantes de {monthNames[month]}
          </h3>
          <ul className="space-y-1.5">
            {birthdaysInMonth.map((p, i) => (
              <li key={i} className="text-sm text-foreground flex justify-between">
                <span>{p.name}</span>
                <span className="text-xs text-muted-foreground">{new Date(p.birthDate).getDate().toString().padStart(2, "0")}/{(month + 1).toString().padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calendar;
