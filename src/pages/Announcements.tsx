import { useState } from "react";
import { Plus, Megaphone, X, Pencil, Trash2 } from "lucide-react";
import { announcements as initialAnnouncements, Announcement } from "@/data/mockData";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Announcements = () => {
  const [items, setItems] = useState<Announcement[]>(initialAnnouncements);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setEditingItem(null);
    setShowForm(false);
  };

  const openEdit = (a: Announcement) => {
    setEditingItem(a);
    setTitle(a.title);
    setContent(a.content);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    if (editingItem) {
      setItems((prev) =>
        prev.map((a) =>
          a.id === editingItem.id ? { ...a, title, content } : a
        )
      );
    } else {
      const newItem: Announcement = {
        id: Date.now().toString(),
        title,
        content,
        date: new Date().toISOString().split("T")[0],
        author: "Você",
      };
      setItems([newItem, ...items]);
    }
    resetForm();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setItems((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Avisos e comunicados</p>
        <button
          onClick={() => { if (showForm) resetForm(); else setShowForm(true); }}
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
            onClick={handleSave}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98] transition-transform"
          >
            {editingItem ? "Salvar Alterações" : "Publicar Recado"}
          </button>
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(v) => !v && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover recado</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover "<strong>{deleteTarget?.title}</strong>"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(a.date).toLocaleDateString("pt-BR")}
                    </span>
                    <button onClick={() => openEdit(a)} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                      <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button onClick={() => setDeleteTarget(a)} className="p-1 rounded-lg hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </button>
                  </div>
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
