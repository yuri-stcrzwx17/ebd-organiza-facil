import { useState } from "react";
import {
  Search,
  Phone,
  MapPin,
  Plus,
  Users,
  BookOpen,
  GraduationCap,
  Baby,
  Pencil,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { students as initialStudents, Student, classes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";

const classConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Crianças: {
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: <Baby className="h-3 w-3" />,
  },
  Adolescentes: {
    color: "bg-sky-100 text-sky-800 border-sky-200",
    icon: <BookOpen className="h-3 w-3" />,
  },
  Jovens: {
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: <GraduationCap className="h-3 w-3" />,
  },
  Adultos: {
    color: "bg-violet-100 text-violet-800 border-violet-200",
    icon: <Users className="h-3 w-3" />,
  },
};

const Students = () => {
  const [search, setSearch] = useState("");
  const [studentList, setStudentList] = useState<Student[]>(initialStudents);
  const [open, setOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [birthDate, setBirthDate] = useState<Date>();
  const [phone, setPhone] = useState("");

  const filtered = studentList.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const resetForm = () => {
    setName("");
    setAddress("");
    setSelectedClass("");
    setBirthDate(undefined);
    setEditingStudent(null);
  };

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (s: Student) => {
    setEditingStudent(s);
    setName(s.name);
    setAddress(s.address);
    setSelectedClass(s.class);
    setBirthDate(new Date(s.birthDate));
    setOpen(true);
  };

  const handleSave = () => {
    if (!name || !address || !selectedClass || !birthDate) {
      toast.error("Preencha todos os campos.");
      return;
    }
    if (editingStudent) {
      setStudentList((prev) =>
        prev.map((s) =>
          s.id === editingStudent.id
            ? {
                ...s,
                name,
                address,
                class: selectedClass,
                birthDate: format(birthDate, "yyyy-MM-dd"),
              }
            : s,
        ),
      );
      toast.success("Aluno atualizado com sucesso!");
    } else {
      const newStudent: Student = {
        id: String(Date.now()),
        name,
        phone: "",
        class: selectedClass,
        birthDate: format(birthDate, "yyyy-MM-dd"),
        address,
      };
      setStudentList((prev) => [newStudent, ...prev]);
      toast.success("Aluno cadastrado com sucesso!");
    }
    resetForm();
    setOpen(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setStudentList((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    toast.success("Aluno removido com sucesso!");
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button
          size="icon"
          className="rounded-xl h-[42px] w-[42px] shrink-0"
          onClick={openCreate}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) resetForm();
          setOpen(v);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? "Editar Aluno" : "Novo Aluno"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Rua, número, bairro"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Turma</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a turma" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      <span className="flex items-center gap-2">
                        {classConfig[c.name]?.icon}
                        {c.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Data de Nascimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate
                      ? format(birthDate, "dd/MM/yyyy")
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Número de Telefone</Label>
              <Input
                type="tel"
                placeholder="(11) 91234-5678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11"
              />
            </div>

            <Button className="w-full mt-2" onClick={handleSave}>
              {editingStudent ? "Salvar Alterações" : "Cadastrar Aluno"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover aluno</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover{" "}
              <strong>{deleteTarget?.name}</strong>? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-2">
        {filtered.map((s, i) => {
          const config = classConfig[s.class];
          return (
            <div
              key={s.id}
              className={cn(
                "bg-card border rounded-xl p-4 animate-fade-in",
                config && "border-l-4",
              )}
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm text-foreground">
                  {s.name}
                </h3>
                <div className="flex items-center gap-1.5">
                  {config ? (
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1 border",
                        config.color,
                      )}
                    >
                      {config.icon}
                      {s.class}
                    </span>
                  ) : (
                    <span className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                      {s.class}
                    </span>
                  )}
                  <button
                    onClick={() => openEdit(s)}
                    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(s)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                {s.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {s.phone}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {s.address}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Students;
