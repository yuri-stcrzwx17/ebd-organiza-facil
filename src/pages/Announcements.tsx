import { useState } from "react";
import { Plus, Megaphone, X } from "lucide-react";
import { announcements as initialAnnouncements, Announcement } from "@/data/mockData";

const Announcements = () => {
  const [items, setItems] = useState<Announcement[]>(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addAnnouncement = () => {
    if (!title.trim() || !content.trim()) return;
    const newItem: Announcement = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString().split("T")[0],
      author: "Você",
    };
    setItems([newItem, ...items]);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Avisos e comunicados</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium active:scale-95 transition-transform"
        >
          {showForm ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showForm ? "Cancelar" : "Novo"}
        </button>
      </div>

      {showForm && (
        <div className="bg-card border rounded-xl p-4 space-y-3 animate-fade-in">
          <input
            type="text"
            placeholder="Título do recado"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            placeholder="Conteúdo do recado..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <button
            onClick={addAnnouncement}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            Publicar Recado
          </button>
        </div>
      )}

      <div className="space-y-3">
        {items.map((a, i) => (
          <div
            key={a.id}
            className="bg-card border rounded-xl p-4 animate-fade-in"
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                <Megaphone className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm text-foreground">{a.title}</h3>
                  <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                    {new Date(a.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{a.content}</p>
                <p className="text-[10px] text-muted-foreground mt-1.5">— {a.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
