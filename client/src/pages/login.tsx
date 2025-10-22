import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,181,115,0.05),transparent_50%)]" />
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            <img src={dpLogo} alt="DP Logo" className="h-24 w-24 relative z-10 drop-shadow-2xl" />
          </div>
        </div>

        <div className="bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl border border-primary/30 rounded-2xl p-8 shadow-2xl shadow-primary/10 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-3">
              Área Exclusiva
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300 text-sm font-medium">
                Seu email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-black/50 border-gray-700/50 text-white placeholder:text-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-lg"
                  required
                  data-testid="input-email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 text-sm font-medium">
                Sua senha
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-12 h-12 bg-black/50 border-gray-700/50 text-white placeholder:text-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-lg"
                  required
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  className="border-gray-600 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  data-testid="checkbox-remember"
                />
                <label htmlFor="remember" className="text-gray-400 cursor-pointer hover:text-gray-300 transition-colors">
                  Permanecer logado
                </label>
              </div>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors font-medium">
                Esqueceu a senha?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-black font-bold py-6 text-lg rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 mt-6"
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </div>

        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-6 animate-in fade-in duration-1000 delay-300">
          <Shield className="h-4 w-4" />
          <p>Seus dados estão protegidos</p>
        </div>
      </div>
    </div>
  );
}
