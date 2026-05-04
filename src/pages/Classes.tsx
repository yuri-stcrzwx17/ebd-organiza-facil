import { BookOpen, Users, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { classes as initialClasses } from "@/data/mockData";
import type { EBDClass } from "@/data/mockData";
import { Plus } from "lucide-react";

const Classes = () => {
  const [classes, setClasses] = useState<EBDClass[]>(initialClasses);
  const [editingClass, setEditingClass] = useState<EBDClass | null>(null);

  const handleDelete = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEditSave = () => {
    if (!editingClass) return;

    if (editingClass.ageStart > editingClass.ageEnd) {
      alert("Idade inicial não pode ser maior que a final");
      return;
    }

    setClasses((prev) =>
      prev.map((c) => (c.id === editingClass.id ? editingClass : c)),
    );

    setEditingClass(null);
  };

  const [newClass, setNewClass] = useState<
    Omit<EBDClass, "id" | "studentCount">
  >({
    name: "",
    teacher: "",
    ageStart: 1,
    ageEnd: 18,
  });

  const handleCreateClass = () => {
    if (!newClass.name || !newClass.teacher) {
      alert("Preencha todos os campos");
      return;
    }

    if (newClass.ageStart > newClass.ageEnd) {
      alert("Idade inicial não pode ser maior que a final");
      return;
    }

    const newItem: EBDClass = {
      id: Date.now().toString(),
      ...newClass,
      studentCount: 0,
    };

    setClasses((prev) => [...prev, newItem]);

    setNewClass({
      name: "",
      teacher: "",
      ageStart: 1,
      ageEnd: 18,
    });
  };

  const [isCreating, setIsCreating] = useState(false);
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Turmas cadastradas na EBD
        </p>

        <button
          onClick={() => setIsCreating(true)}
          className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-white hover:opacity-90"
        >
          +
        </button>
      </div>

      {/* LISTA */}
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
              <p className="text-xs text-muted-foreground">
                {c.teacher} ·{" "}
                {c.ageEnd >= 100
                  ? `${c.ageStart}+ anos`
                  : `${c.ageStart}-${c.ageEnd} anos`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">{c.studentCount}</span>
              </div>

              <button
                onClick={() => setEditingClass(c)}
                className="p-2 rounded-lg hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleDelete(c.id)}
                className="p-2 rounded-lg hover:bg-destructive/10 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {editingClass && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-card p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Editar Turma</h2>

            <input
              type="text"
              value={editingClass.name}
              onChange={(e) =>
                setEditingClass({ ...editingClass, name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Nome da turma"
            />

            <input
              type="text"
              value={editingClass.teacher}
              onChange={(e) =>
                setEditingClass({ ...editingClass, teacher: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Professor responsável"
            />

            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                max={100}
                value={editingClass.ageStart}
                onChange={(e) =>
                  setEditingClass({
                    ...editingClass,
                    ageStart: Math.max(
                      1,
                      Math.min(100, Number(e.target.value)),
                    ),
                  })
                }
                className="w-1/2 border rounded-lg px-3 py-2"
              />

              <input
                type="number"
                min={1}
                max={100}
                value={editingClass.ageEnd}
                onChange={(e) =>
                  setEditingClass({
                    ...editingClass,
                    ageEnd: Math.max(1, Math.min(100, Number(e.target.value))),
                  })
                }
                className="w-1/2 border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditingClass(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancelar
              </button>

              <button
                onClick={handleEditSave}
                className="px-4 py-2 rounded-lg bg-primary text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CRIAÇÃO */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-card p-6 rounded-xl w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold">Criar nova turma</h2>

            <input
              type="text"
              value={newClass.name}
              onChange={(e) =>
                setNewClass({ ...newClass, name: e.target.value })
              }
              placeholder="Nome da turma"
              className="w-full border rounded-lg px-3 py-2"
            />

            <input
              type="text"
              value={newClass.teacher}
              onChange={(e) =>
                setNewClass({ ...newClass, teacher: e.target.value })
              }
              placeholder="Professor responsável"
              className="w-full border rounded-lg px-3 py-2"
            />

            <div className="flex gap-2">
              <input
                type="number"
                min={1}
                max={100}
                value={newClass.ageStart}
                onChange={(e) =>
                  setNewClass({
                    ...newClass,
                    ageStart: Math.max(
                      1,
                      Math.min(100, Number(e.target.value)),
                    ),
                  })
                }
                className="w-1/2 border rounded-lg px-3 py-2"
                placeholder="Idade inicial"
              />

              <input
                type="number"
                min={1}
                max={100}
                value={newClass.ageEnd}
                onChange={(e) =>
                  setNewClass({
                    ...newClass,
                    ageEnd: Math.max(1, Math.min(100, Number(e.target.value))),
                  })
                }
                className="w-1/2 border rounded-lg px-3 py-2"
                placeholder="Idade final"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancelar
              </button>

              <button
                onClick={() => {
                  handleCreateClass();
                  setIsCreating(false);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-white"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
