"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { GoogleIcon } from "@/components/icons/google-icon"; 
import { siteConfig } from "@/config/site";

export default function AuthPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, signInWithGoogle, signUpWithEmail, signInWithEmail, sendPasswordResetEmail, loading: authLoading } = useAuth();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);


  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);


  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingEmail(true);
    try {
      await signInWithEmail(loginEmail, loginPassword);
      // Success will be handled by useEffect redirecting to dashboard
    } catch (error: any) {
      toast({ title: "Falha no Login", description: error.message || "Por favor, verifique suas credenciais.", variant: "destructive" });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      toast({ title: "Erro de Cadastro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    setIsSubmittingEmail(true);
    try {
      await signUpWithEmail(registerEmail, registerPassword, registerName);
       // Success will be handled by useEffect redirecting to dashboard
    } catch (error: any) {
      toast({ title: "Falha no Cadastro", description: error.message || "Não foi possível criar sua conta.", variant: "destructive" });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleForgotPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingEmail(true);
    try {
      await sendPasswordResetEmail(forgotEmail);
      toast({ title: "Link Enviado", description: "Se seu email existir em nossa base, você receberá um link para redefinir a senha." });
    } catch (error: any) {
       toast({ title: "Erro ao Redefinir Senha", description: error.message || "Não foi possível enviar o email de redefinição.", variant: "destructive" });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // No need to set setIsSubmittingEmail here as authLoading handles Google sign-in state
    await signInWithGoogle();
  };

  const isLoading = authLoading || isSubmittingEmail;

  if (authLoading && !isSubmittingEmail) { // Show full page loader only for initial auth check
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (user && !isLoading) { 
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecionando para o painel...</p>
      </div>
    );
  }


  return (
    <Card className="w-full max-w-md shadow-xl">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Cadastrar</TabsTrigger>
          <TabsTrigger value="forgot-password">Esqueci Senha</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <CardHeader>
            <CardTitle>Bem-vindo de Volta!</CardTitle>
            <CardDescription>Entre para acessar seu painel {siteConfig.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="voce@exemplo.com" 
                    required 
                    className="pl-10" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="••••••••" 
                    required 
                    className="pl-10" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                 {isSubmittingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Entrar"}
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                {authLoading && !isSubmittingEmail ? ( // Show loader for Google only if it's the one loading
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon className="mr-2 h-5 w-5" />
                )}
                Entrar com Google
              </Button>
            </form>
          </CardContent>
        </TabsContent>

        <TabsContent value="register">
          <CardHeader>
            <CardTitle>Crie seu {siteConfig.name}</CardTitle>
            <CardDescription>Junte-se à nossa comunidade e crie sua identidade digital.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="register-name" 
                    type="text" 
                    placeholder="João Silva" 
                    required 
                    className="pl-10" 
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="voce@exemplo.com" 
                    required 
                    className="pl-10" 
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="Escolha uma senha forte" 
                    required 
                    className="pl-10" 
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="register-confirm-password" 
                    type="password" 
                    placeholder="Repita sua senha" 
                    required 
                    className="pl-10" 
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isSubmittingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Cadastrar"}
              </Button>
                 <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou cadastre-se com
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                 {authLoading && !isSubmittingEmail ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <GoogleIcon className="mr-2 h-5 w-5" />
                )}
                Cadastrar com Google
              </Button>
            </form>
          </CardContent>
        </TabsContent>

        <TabsContent value="forgot-password">
          <CardHeader>
            <CardTitle>Redefinir Senha</CardTitle>
            <CardDescription>Digite seu email para receber um link de redefinição de senha.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="forgot-email" 
                    type="email" 
                    placeholder="voce@exemplo.com" 
                    required 
                    className="pl-10" 
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isSubmittingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Enviar Link"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Lembrou sua senha?{" "}
              <TabsList className="inline p-0 bg-transparent">
                <TabsTrigger value="login" className="text-primary hover:underline p-0 h-auto">Entre aqui</TabsTrigger>
              </TabsList>
            </p>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

