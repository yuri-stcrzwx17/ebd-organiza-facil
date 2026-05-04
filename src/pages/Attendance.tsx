import { useState } from "react";
import { Check, X, UserPlus, Minus } from "lucide-react";
import { classes, students } from "@/data/mockData";

type Status = "present" | "absent" | "enrolled";

const statusConfig: Record<
  Status,
  { label: string; icon: typeof Check; color: string }
> = {
  enrolled: {
    label: "Mat.",
    icon: Minus,
    color: "bg-muted text-muted-foreground",
  },
  present: {
    label: "Pres.",
    icon: Check,
    color: "bg-success text-success-foreground",
  },
  absent: {
    label: "Aus.",
    icon: X,
    color: "bg-destructive text-destructive-foreground",
  },
};

const statusOrder: Status[] = ["enrolled", "present", "absent"];

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0]?.id || "");
  const classStudents = students.filter(
    (s) => s.class === classes.find((c) => c.id === selectedClass)?.name,
  );

  const [attendance, setAttendance] = useState<Record<string, Status>>({});

  const cycleStatus = (studentId: string) => {
    const current = attendance[studentId] || "enrolled";
    const next =
      statusOrder[(statusOrder.indexOf(current) + 1) % statusOrder.length];
    setAttendance((prev) => ({ ...prev, [studentId]: next }));
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {classes.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClass(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedClass === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Toque no status para alternar: Matriculado → Presente → Ausente
      </p>

      <div className="space-y-2">
        {classStudents.length === 0 && (
          <p className="text-center text-muted-foreground py-8 text-sm">
            Nenhum aluno nesta turma
          </p>
        )}
        {classStudents.map((s, i) => {
          const status = attendance[s.id] || "enrolled";
          const cfg = statusConfig[status];
          const Icon = cfg.icon;
          return (
            <div
              key={s.id}
              className="bg-card border rounded-xl p-3 flex items-center justify-between animate-fade-in"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <span className="text-sm font-medium text-foreground">
                {s.name}
              </span>
              <button
                onClick={() => cycleStatus(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${cfg.color}`}
              >
                <Icon className="h-3.5 w-3.5" />
                {cfg.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Attendance;
