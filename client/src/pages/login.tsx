import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import dpLogo from "@assets/imagem_2025-10-21_000635546_1761015995551.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao Portal do Aluno",
      });
    } catch (error: any) {
      toast({
        title: "Erro no login",
        description: error.message || "Verifique suas credenciais e tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex justify-center mb-8">
          <img src={dpLogo} alt="DP Logo" className="h-20 w-20" />
        </div>

        <div className="bg-black/60 backdrop-blur-md border border-primary/20 rounded-lg p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-center mb-2 text-white">
            Área Exclusiva
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Seu email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary"
                  required
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Sua senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-black/40 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary"
                  required
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  data-testid="checkbox-remember"
                />
                <label htmlFor="remember" className="text-gray-300 cursor-pointer">
                  Permanecer logado
                </label>
              </div>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-6 text-lg"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Seus dados estão protegidos
        </p>
      </div>
    </div>
  );
}
