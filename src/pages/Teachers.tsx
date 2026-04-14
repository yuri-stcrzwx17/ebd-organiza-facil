import { Phone, BookOpen } from "lucide-react";
import { teachers } from "@/data/mockData";

const Teachers = () => (
  <div className="space-y-4 max-w-2xl mx-auto">
    <p className="text-sm text-muted-foreground">Professores da EBD</p>
    <div className="space-y-2">
      {teachers.map((t, i) => (
        <div
          key={t.id}
          className="bg-card border rounded-xl p-4 flex items-center gap-4 animate-fade-in"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
            {t.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground">{t.name}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground mt-0.5">
              <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{t.class}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{t.phone}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Teachers;
