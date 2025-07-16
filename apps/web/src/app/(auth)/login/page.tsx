"use client";

export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { logger } from '@/lib/logger';
import { Mail, Lock, User, Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { GoogleIcon } from "@/components/icons/google-icon"; 
import { siteConfig } from "@/config/site";
import AuthLayout from "@/app/(auth)/AuthLayout";

// Imagem de fundo otimizada
const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

export default function AuthPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { user, signInWithGoogle, signUpWithEmail, signInWithEmail, sendPasswordResetEmail, loading: authLoading } = useAuth();

  // Estados do formulário
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [activeTab, setActiveTab] = useState("register");

  // Redirecionamento automático
  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard/feed");
    }
  }, [user, authLoading, router]);

  // Lógica de autenticação (mantida)
  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingEmail(true);
    
    // Validações básicas
    if (!loginEmail.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira seu email.",
        variant: "destructive",
      });
      setIsSubmittingEmail(false);
      return;
    }
    
    if (!loginPassword.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira sua senha.",
        variant: "destructive",
      });
      setIsSubmittingEmail(false);
      return;
    }
    
    logger.auth('Tentando fazer login', { email: loginEmail });
    
    try {
      await signInWithEmail(loginEmail, loginPassword);
      logger.auth('Login bem-sucedido');
      // O redirecionamento será feito pelo useEffect
    } catch (error: any) {
      console.error('[Login] Erro no login:', error);
      
      let errorMessage = "Não foi possível fazer login. Verifique suas credenciais.";
      
      if (error?.message?.includes('Invalid login credentials')) {
        errorMessage = "Email ou senha incorretos. Verifique suas credenciais e tente novamente.";
      } else if (error?.message?.includes('Email not confirmed')) {
        errorMessage = "Seu email ainda não foi confirmado. Verifique sua caixa de entrada e clique no link de confirmação.";
      } else if (error?.message?.includes('Too many requests')) {
        errorMessage = "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.";
      }
      
      toast({
        title: "Erro ao fazer login",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };
  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingEmail(true);
    
    // Validações básicas
    if (!registerName.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira seu nome completo.",
        variant: "destructive",
      });
      setIsSubmittingEmail(false);
      return;
    }
    
    if (!registerEmail.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      setIsSubmittingEmail(false);
      return;
    }
    
    if (registerPassword.length < 6) {
      toast({
        title: "Erro de validação",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      setIsSubmittingEmail(false);
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      setIsSubmittingEmail(false);
      return;
    }
    
    try {
       await signUpWithEmail(registerEmail, registerPassword, registerName);
      
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao WhosDo! Você será redirecionado em instantes.",
        variant: "default",
      });
      
      // O redirecionamento será feito pelo useEffect quando user for atualizado
    } catch (error: any) {
      console.error('Erro no registro:', error);
      toast({
        title: "Erro ao criar conta",
        description: error?.message || "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };
  
  const handleForgotPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingEmail(true);
    
    if (!forgotEmail.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, insira seu email.",
        variant: "destructive",
      });
      setIsSubmittingEmail(false);
      return;
    }
    
    try {
      await sendPasswordResetEmail(forgotEmail);
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
        variant: "default",
      });
      setActiveTab("login");
    } catch (error: any) {
      toast({
        title: "Erro ao enviar email",
        description: error?.message || "Não foi possível enviar o email de recuperação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setIsSubmittingEmail(true);
    try {
      await signInWithGoogle();
      // O redirecionamento será feito pelo useEffect
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login com Google",
        description: error?.message || "Não foi possível fazer login com Google.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const isLoading = authLoading || isSubmittingEmail;

  if (authLoading && !isSubmittingEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  if (user && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecionando para o feed...</p>
      </div>
    );
  }

  return (
    <AuthLayout>
      {/* Links de autenticação */}
      <div className="flex md:hidden justify-end w-full mb-6 text-sm">
        <span className="text-black dark:text-white font-light">Já tem conta?</span>
        <button
          type="button"
          className="text-[#20DC49] dark:text-[#4ADE80] font-medium hover:underline ml-2 bg-transparent border-0 p-0 cursor-pointer"
          onClick={() => setActiveTab("login")}
          disabled={activeTab === "login"}
        >
          Sign in!
        </button>
      </div>

      {/* Card do formulário */}
      <div className="w-full max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex mb-6 gap-2 justify-center">
            <TabsTrigger value="register" className="flex-1">Criar conta</TabsTrigger>
            <TabsTrigger value="login" className="flex-1">Entrar</TabsTrigger>
          </TabsList>
          {/* Aba de Registro */}
          <TabsContent value="register" className="block">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
                Get Started With WhosDo
              </h2>
              <p className="text-base text-[#7E7E7E] dark:text-gray-400">
                Getting started is easy
              </p>
            </div>

            {/* Botões sociais */}
            <div className="flex gap-4 mb-8">
              <button 
                type="button" 
                className="flex-1 flex items-center justify-center gap-2 
                         border border-[#20DC49] dark:border-[#4ADE80] 
                         rounded-lg py-3.5 bg-white dark:bg-gray-700 
                         hover:bg-[#f6fff9] dark:hover:bg-gray-600 
                         transition-colors disabled:opacity-60"
                onClick={handleGoogleSignIn} 
                disabled={isLoading}
              >
                <GoogleIcon className="h-5 w-5" />
                <span className="font-medium text-black dark:text-white text-sm">
                  Google
                </span>
              </button>
            </div>

            {/* Divisor "Ou continue com" */}
            <div className="flex items-center mb-8">
              <div className="flex-grow border-t border-[#DBDBDB] dark:border-gray-600" />
              <span className="mx-4 text-[#000] dark:text-white text-sm font-light">
                Or continue with
              </span>
              <div className="flex-grow border-t border-[#DBDBDB] dark:border-gray-600" />
            </div>

            {/* Formulário de Registro */}
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Nome */}
              <div className="space-y-1.5">
                <Label htmlFor="register-name" className="text-xs font-medium text-[#5A5A5A] dark:text-gray-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B8B8B8] dark:text-gray-500" />
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10 bg-white dark:bg-gray-700 border border-[#D9D9D9] dark:border-gray-600 
                             focus:ring-2 focus:ring-[#20DC49] dark:focus:ring-[#4ADE80] 
                             text-base text-[#000842] dark:text-white placeholder:text-[#B8B8B8] dark:placeholder:text-gray-400"
                    value={registerName}
                    onChange={e => setRegisterName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="register-email" className="text-xs font-medium text-[#5A5A5A] dark:text-gray-300">
                  Enter Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B8B8B8] dark:text-gray-500" />
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Seu email"
                    className="pl-10 bg-white dark:bg-gray-700 border border-[#D9D9D9] dark:border-gray-600 
                             focus:ring-2 focus:ring-[#20DC49] dark:focus:ring-[#4ADE80] 
                             text-base text-[#000842] dark:text-white placeholder:text-[#B8B8B8] dark:placeholder:text-gray-400"
                    value={registerEmail}
                    onChange={e => setRegisterEmail(e.target.value)}
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-1.5">
                <Label htmlFor="register-password" className="text-xs font-medium text-[#5A5A5A] dark:text-gray-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B8B8B8] dark:text-gray-500" />
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Senha"
                    className="pl-10 bg-white dark:bg-gray-700 border border-[#D9D9D9] dark:border-gray-600 
                             focus:ring-2 focus:ring-[#20DC49] dark:focus:ring-[#4ADE80] 
                             text-base text-[#000842] dark:text-white placeholder:text-[#B8B8B8] dark:placeholder:text-gray-400"
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-1.5">
                <Label htmlFor="register-confirm-password" className="text-xs font-medium text-[#5A5A5A] dark:text-gray-300">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B8B8B8] dark:text-gray-500" />
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="Confirme sua senha"
                    className="pl-10 bg-white dark:bg-gray-700 border border-[#D9D9D9] dark:border-gray-600 
                             focus:ring-2 focus:ring-[#20DC49] dark:focus:ring-[#4ADE80] 
                             text-base text-[#000842] dark:text-white placeholder:text-[#B8B8B8] dark:placeholder:text-gray-400"
                    value={registerConfirmPassword}
                    onChange={e => setRegisterConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              {/* Botão de Registro */}
              <Button 
                type="submit" 
                className="w-full bg-[#20DC49] dark:bg-[#4ADE80] 
                         hover:bg-[#18b93b] dark:hover:bg-[#22c55e] 
                         text-black dark:text-gray-900 
                         font-medium text-lg py-4 rounded-xl 
                         shadow-lg transition-colors 
                         disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isSubmittingEmail ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                ) : (
                  <LogIn className="mr-2 h-5 w-5" />
                )}
                Create Account
              </Button>
            </form>
          </TabsContent>
          {/* Aba de Login */}
          <TabsContent value="login" className="block">
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
                Login no WhosDo
              </h2>
              <p className="text-base text-[#7E7E7E] dark:text-gray-400">
                Acesse sua conta
              </p>
            </div>
            {/* Botões sociais */}
            <div className="flex gap-4 mb-8">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 border border-[#20DC49] dark:border-[#4ADE80] rounded-lg py-3.5 bg-white dark:bg-gray-700 hover:bg-[#f6fff9] dark:hover:bg-gray-600 transition-colors disabled:opacity-60"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <GoogleIcon className="h-5 w-5" />
                <span className="font-medium text-black dark:text-white text-sm">Google</span>
              </button>
            </div>
            {/* Divisor "Ou continue com" */}
            <div className="flex items-center mb-8">
              <div className="flex-grow border-t border-[#DBDBDB] dark:border-gray-600" />
              <span className="mx-4 text-[#000] dark:text-white text-sm font-light">Ou continue com</span>
              <div className="flex-grow border-t border-[#DBDBDB] dark:border-gray-600" />
            </div>
            {/* Formulário de Login */}
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-xs font-medium text-[#5A5A5A] dark:text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B8B8B8] dark:text-gray-500" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Seu email"
                    className="pl-10 bg-white dark:bg-gray-700 border border-[#D9D9D9] dark:border-gray-600 focus:ring-2 focus:ring-[#20DC49] dark:focus:ring-[#4ADE80] text-base text-[#000842] dark:text-white placeholder:text-[#B8B8B8] dark:placeholder:text-gray-400"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    disabled={isLoading}
                    autoComplete="username"
                  />
                </div>
              </div>
              {/* Senha */}
              <div className="space-y-1.5">
                <Label htmlFor="login-password" className="text-xs font-medium text-[#5A5A5A] dark:text-gray-300">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#B8B8B8] dark:text-gray-500" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Sua senha"
                    className="pl-10 bg-white dark:bg-gray-700 border border-[#D9D9D9] dark:border-gray-600 focus:ring-2 focus:ring-[#20DC49] dark:focus:ring-[#4ADE80] text-base text-[#000842] dark:text-white placeholder:text-[#B8B8B8] dark:placeholder:text-gray-400"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                </div>
              </div>
              {/* Botão de Login */}
              <Button
                type="submit"
                className="w-full bg-[#20DC49] dark:bg-[#4ADE80] hover:bg-[#18b93b] dark:hover:bg-[#22c55e] text-black dark:text-gray-900 font-medium text-lg py-4 rounded-xl shadow-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isSubmittingEmail ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                ) : (
                  <LogIn className="mr-2 h-5 w-5" />
                )}
                Entrar
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        {/* Termos de uso */}
        <p className="mt-8 text-xs text-[#5A5A5A] dark:text-gray-400 text-center font-light max-w-md">
          Ao continuar você indica que leu e concorda com os{" "}
          <a 
            href="#" 
            className="underline hover:text-[#20DC49] dark:hover:text-[#4ADE80] transition-colors"
          >
            Termos de Uso
          </a>.
        </p>
      </div>
    </AuthLayout>
  );
}