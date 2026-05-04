import { useState } from "react";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

const congregacoes = [
  "Sub Sede",

  "Suburbano",

  "Jd Julieta",

  "Jd Ruth",

  "Vila dos Mineiros",

  "Amador Bueno",
];

const cargos = ["Pastor", "Presbítero", "Dirigente da EBD Local"];

const Login = () => {
  // Alterado para true para iniciar na tela de login

  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [congregacao, setCongregacao] = useState("");

  const [cargo, setCargo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha email e senha.");

      return;
    }

    // Se não for login (ou seja, for cadastro), valida campos extras

    if (!isLogin && (!name || !congregacao || !cargo)) {
      toast.error("Preencha todos os campos.");

      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      toast.success(isLogin ? "Login realizado!" : "Cadastro realizado!");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card rounded-2xl border shadow-lg p-6 sm:p-8 animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary tracking-tight">
            Gestão EBD
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            {isLogin ? "Acesso ao sistema" : "Crie sua conta"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Só mostra o nome se NÃO for login (Cadastro) */}

          {!isLogin && (
            <div className="space-y-1.5">
              <Label htmlFor="login-name">Nome completo</Label>

              <Input
                id="login-name"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl h-11"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="login-email">Email</Label>

            <Input
              id="login-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-11"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="login-password">Senha</Label>

            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl h-11"
            />
          </div>

          {/* Só mostra congregação e cargo se NÃO for login (Cadastro) */}

          {!isLogin && (
            <>
              <div className="space-y-1.5">
                <Label>Congregação</Label>

                <Select value={congregacao} onValueChange={setCongregacao}>
                  <SelectTrigger className="rounded-xl h-11 w-full">
                    <SelectValue placeholder="Selecione a congregação" />
                  </SelectTrigger>

                  <SelectContent>
                    {congregacoes.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Cargo</Label>

                <Select value={cargo} onValueChange={setCargo}>
                  <SelectTrigger className="rounded-xl h-11 w-full">
                    <SelectValue placeholder="Selecione o cargo" />
                  </SelectTrigger>

                  <SelectContent>
                    {cargos.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl text-base font-semibold mt-2"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isLogin ? (
              "Entrar no sistema"
            ) : (
              "Criar conta"
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground mt-5">
          {isLogin ? "Não possui conta? " : "Já possui conta? "}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary font-medium hover:underline"
          >
            {isLogin ? "Cadastrar" : "Fazer Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
