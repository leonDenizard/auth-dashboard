// components/login/Login.tsx
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { User, Lock, BadgeCheck, Mail, UserCheck } from "lucide-react";
import { createUser } from "@/api/user";
import { toast } from "sonner";

interface RegisterProp {
  onSwitch: () => void;
}

export default function Register({ onSwitch }: RegisterProp) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createUser({ name, username, email, password });

      console.log(response.message);

      onSwitch();
      toast.success("Conta criada com sucesso!");
    } catch (error: any) {
      console.log("Erro ao criar usuário", error.message);
    } finally {
      setLoading(false);
    }
    // console.log({
    //     name,
    //     username,
    //     email,
    //     password,
    // })
  };

  return (
    <div className="w-full max-w-md px-4 z-10">
      {/* Card de Login */}
      <div className="backdrop-blur-2xl bg-black/40 rounded p-8 shadow-xl">
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300">
              Nome
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="email"
                type="text"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-zinc-300">
              Usuário
            </Label>
            <div className="relative">
              <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="name"
                type="text"
                placeholder="Crie um username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">
              Senha
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-zinc-700"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 font-medium"
            disabled={loading}
            onClick={handleRegister}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Cadastrando usuário...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Registrar conta
              </span>
            )}
          </Button>
        </form>

        {/* Footer Links */}
        <div className="mt-6 pt-6 border-t-2 border-white/10">
          <div className="flex items-center justify-center text-sm gap-2">
            <a
              onClick={onSwitch}
              href="#"
              className="text-zinc-400 hover:text-white transition-colors py-1 px-5"
            >
              ← Voltar para o login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
