import { BookOpen, Users } from "lucide-react";
import { classes } from "@/data/mockData";

const Classes = () => (
  <div className="space-y-4 max-w-2xl mx-auto">
    <p className="text-sm text-muted-foreground">Turmas cadastradas na EBD</p>
    <div className="space-y-3">
      {classes.map((c, i) => (
        <div
          key={c.id}
          className="bg-card border rounded-xl p-4 shadow-sm animate-fade-in flex items-center gap-4"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">{c.name}</h3>
            <p className="text-xs text-muted-foreground">{c.teacher} · {c.ageRange} anos</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">{c.studentCount}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Classes;
