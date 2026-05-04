export interface Student {
  id: string;
  name: string;
  phone: string;
  class: string;
  birthDate: string;
  address: string;
}

export interface Teacher {
  id: string;
  name: string;
  phone: string;
  class: string;
  birthDate: string;
}

export interface EBDClass {
  id: string;
  name: string;
  teacher: string;
  ageStart: number;
  ageEnd: number;
  studentCount: number;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: "present" | "absent" | "visitor" | "enrolled";
}

export interface FinanceEntry {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

export const students: Student[] = [
  {
    id: "1",
    name: "Maria Silva",
    phone: "(11) 99999-1234",
    class: "Jovens",
    birthDate: "1998-03-15",
    address: "Rua das Flores, 123",
  },
  {
    id: "2",
    name: "João Santos",
    phone: "(11) 99999-5678",
    class: "Adultos",
    birthDate: "1985-03-08",
    address: "Av. Brasil, 456",
  },
  {
    id: "3",
    name: "Ana Oliveira",
    phone: "(11) 99999-9012",
    class: "Jovens",
    birthDate: "2000-07-22",
    address: "Rua Esperança, 789",
  },
  {
    id: "4",
    name: "Pedro Costa",
    phone: "(11) 99999-3456",
    class: "Adolescentes",
    birthDate: "2007-04-10",
    address: "Rua da Paz, 321",
  },
  {
    id: "5",
    name: "Lucia Ferreira",
    phone: "(11) 99999-7890",
    class: "Adultos",
    birthDate: "1975-12-01",
    address: "Rua Santa Cruz, 654",
  },
  {
    id: "6",
    name: "Carlos Mendes",
    phone: "(11) 99888-1111",
    class: "Jovens",
    birthDate: "1999-03-12",
    address: "Rua Alegria, 100",
  },
  {
    id: "7",
    name: "Fernanda Lima",
    phone: "(11) 99888-2222",
    class: "Crianças",
    birthDate: "2015-06-25",
    address: "Rua do Sol, 200",
  },
  {
    id: "8",
    name: "Roberto Alves",
    phone: "(11) 99888-3333",
    class: "Adultos",
    birthDate: "1980-09-18",
    address: "Av. Liberdade, 300",
  },
  {
    id: "9",
    name: "Beatriz Souza",
    phone: "(11) 99888-4444",
    class: "Adolescentes",
    birthDate: "2008-11-05",
    address: "Rua Harmonia, 400",
  },
  {
    id: "10",
    name: "Gabriel Rocha",
    phone: "(11) 99888-5555",
    class: "Jovens",
    birthDate: "1997-01-30",
    address: "Rua Fé, 500",
  },
];

export const teachers: Teacher[] = [
  {
    id: "1",
    name: "Pastor José Almeida",
    phone: "(11) 98888-1234",
    class: "Adultos",
    birthDate: "1970-05-20",
  },
  {
    id: "2",
    name: "Diácono Paulo Ribeiro",
    phone: "(11) 98888-5678",
    class: "Jovens",
    birthDate: "1982-08-14",
  },
  {
    id: "3",
    name: "Irmã Marta Souza",
    phone: "(11) 98888-9012",
    class: "Crianças",
    birthDate: "1990-03-28",
  },
  {
    id: "4",
    name: "Irmão Lucas Pereira",
    phone: "(11) 98888-3456",
    class: "Adolescentes",
    birthDate: "1988-11-03",
  },
];

export const classes: EBDClass[] = [
  {
    id: "1",
    name: "Adultos",
    teacher: "Pastor José Almeida",
    ageStart: 30,
    ageEnd: 100,
    studentCount: 3,
  },
  {
    id: "2",
    name: "Jovens",
    teacher: "Diácono Paulo Ribeiro",
    ageStart: 18,
    ageEnd: 29,
    studentCount: 4,
  },
  {
    id: "3",
    name: "Adolescentes",
    teacher: "Irmão Lucas Pereira",
    ageStart: 12,
    ageEnd: 17,
    studentCount: 2,
  },
  {
    id: "4",
    name: "Crianças",
    teacher: "Irmã Marta Souza",
    ageStart: 4,
    ageEnd: 11,
    studentCount: 1,
  },
];

export const finances: FinanceEntry[] = [
  {
    id: "1",
    date: "2026-03-01",
    description: "Oferta dominical",
    amount: 450.0,
    type: "income",
    category: "Oferta",
  },
  {
    id: "2",
    date: "2026-03-01",
    description: "Material didático",
    amount: 120.0,
    type: "expense",
    category: "Material",
  },
  {
    id: "3",
    date: "2026-03-08",
    description: "Oferta dominical",
    amount: 380.0,
    type: "income",
    category: "Oferta",
  },
  {
    id: "4",
    date: "2026-03-08",
    description: "Lanche para crianças",
    amount: 85.5,
    type: "expense",
    category: "Alimentação",
  },
  {
    id: "5",
    date: "2026-02-22",
    description: "Dízimo especial EBD",
    amount: 200.0,
    type: "income",
    category: "Dízimo",
  },
  {
    id: "6",
    date: "2026-02-15",
    description: "Oferta dominical",
    amount: 520.0,
    type: "income",
    category: "Oferta",
  },
  {
    id: "7",
    date: "2026-02-15",
    description: "Impressão de apostilas",
    amount: 95.0,
    type: "expense",
    category: "Material",
  },
  {
    id: "8",
    date: "2026-03-02",
    description: "Doação especial",
    amount: 300.0,
    type: "income",
    category: "Doação",
  },
];

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Conferência de Ensino",
    content:
      "No próximo sábado teremos uma conferência especial sobre métodos de ensino bíblico. Todos os professores estão convidados.",
    date: "2026-03-05",
    author: "Pastor José",
  },
  {
    id: "2",
    title: "Matrículas Abertas",
    content:
      "As matrículas para o segundo trimestre estão abertas! Tragam seus familiares e amigos.",
    date: "2026-03-03",
    author: "Secretaria",
  },
  {
    id: "3",
    title: "Lembrete: Material Didático",
    content:
      "O novo material trimestral já está disponível. Professores, retirem na secretaria.",
    date: "2026-03-01",
    author: "Secretaria",
  },
];

export function getUpcomingBirthdays(): {
  name: string;
  date: string;
  daysUntil: number;
}[] {
  const today = new Date();
  const allPeople = [
    ...students.map((s) => ({ name: s.name, birthDate: s.birthDate })),
    ...teachers.map((t) => ({ name: t.name, birthDate: t.birthDate })),
  ];

  return allPeople
    .map((p) => {
      const bd = new Date(p.birthDate);
      const next = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
      if (next < today) next.setFullYear(next.getFullYear() + 1);
      const diff = Math.ceil(
        (next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
      return {
        name: p.name,
        date: `${bd.getDate().toString().padStart(2, "0")}/${(bd.getMonth() + 1).toString().padStart(2, "0")}`,
        daysUntil: diff,
      };
    })
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5);
}

export function getFinanceSummary() {
  const now = new Date();
  const monthEntries = finances.filter((f) => {
    const d = new Date(f.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const income = monthEntries
    .filter((f) => f.type === "income")
    .reduce((s, f) => s + f.amount, 0);
  const expense = monthEntries
    .filter((f) => f.type === "expense")
    .reduce((s, f) => s + f.amount, 0);
  return { income, expense, balance: income - expense };
}
