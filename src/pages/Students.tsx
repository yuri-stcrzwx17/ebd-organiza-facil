import { useState } from "react";
import { Search, Phone, MapPin } from "lucide-react";
import { students } from "@/data/mockData";

const Students = () => {
  const [search, setSearch] = useState("");
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar aluno..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-2">
        {filtered.map((s, i) => (
          <div
            key={s.id}
            className="bg-card border rounded-xl p-4 animate-fade-in"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-sm text-foreground">{s.name}</h3>
              <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">{s.class}</span>
            </div>
            <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.phone}</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{s.address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
