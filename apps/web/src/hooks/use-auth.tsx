"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { UserProfile } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';
import { getUserProfileById } from '@/services/profile.service';
import { logger } from '@/lib/logger';

interface AuthContextType {
  user: SupabaseUser | null;
  currentUserProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (profile: UserProfile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();
  
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar o perfil do usuário no banco de dados real
    const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
      setLoading(true);
      logger.auth('Buscando perfil do usuário', { userId: supabaseUser.id });
      try {
        const userProfile = await getUserProfileById(supabaseUser.id);
        setCurrentUserProfile(userProfile);
        setLoading(false);
        if (!userProfile) {
          toast({
            title: 'Perfil não encontrado',
            description: 'Não foi possível carregar seu perfil. Faça login novamente ou entre em contato com o suporte.',
            variant: 'destructive',
            duration: 4000
          });
          router.push('/home');
          await signOutUser();
          return;
        }
        logger.auth('Perfil carregado com sucesso', { username: userProfile?.username });
      } catch (err) {
        setLoading(false);
        toast({ title: 'Erro ao carregar perfil', description: String(err), variant: 'destructive' });
        logger.error('Erro ao carregar perfil', { error: err });
      }
    };

    // Listener de autenticação do Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const supabaseUser = session?.user || null;
      setUser(supabaseUser);

      if (event === 'SIGNED_IN' && supabaseUser) {
        toast({ title: 'Login bem-sucedido!', description: `Bem-vindo(a) de volta!`, variant: 'success', duration: 2000 });
        fetchUserProfile(supabaseUser);
        router.push('/dashboard/feed');
      } else if (event === 'SIGNED_OUT') {
        setCurrentUserProfile(null);
        router.push('/login');
      }
      
      // Para o estado inicial, também precisamos verificar se há um usuário
      if (event === 'INITIAL_SESSION' && supabaseUser) {
        fetchUserProfile(supabaseUser);
      } else if (event === 'INITIAL_SESSION' && !supabaseUser) {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router, toast]);

  const handleAuthError = (error: Error, context: string) => {
    logger.error(`Erro em ${context}`, { error: error.message });
    toast({
      title: `Falha em ${context}`,
      description: error.message || `Ocorreu um erro durante a operação.`,
      variant: 'destructive',
    });
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
      },
    });
    if (error) handleAuthError(error, "Login com Google");
    // O onAuthStateChange cuidará do resto
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Passamos dados que podem ser usados por um DB trigger para criar o perfil
        data: {
          full_name: fullName,
          // Você pode adicionar um username gerado aqui, se desejar
        }
      }
    });
    if (error) {
      handleAuthError(error, "Cadastro com Email");
    } else {
      toast({ title: 'Cadastro bem-sucedido!', description: 'Enviamos um email de confirmação para sua caixa de entrada.', variant: 'success', duration: 2000 });
    }
    setLoading(false);
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      logger.auth('Iniciando login', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      logger.auth('Resposta do login', { hasData: !!data, hasError: !!error });

      if (error) {
        logger.error('Erro do Supabase no login', { error });
        handleAuthError(error, "Login com Email");
        throw error;
      }

      logger.auth('Login bem-sucedido', { email: data.user?.email });
      return data;
    } catch (error) {
      logger.error('Erro capturado no login', { error });
      handleAuthError(error as Error, "Login com Email");
      throw error;
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`,
    });

    if (error) {
      handleAuthError(error, "Redefinição de Senha");
    } else {
      toast({ title: "Email de Redefinição Enviado", description: "Verifique sua caixa de entrada para o link.", variant: 'success', duration: 2000 });
    }
    setLoading(false);
  };

  const signOutUser = async () => {
    setLoading(true);
    logger.auth('Iniciando logout');
    const { error } = await supabase.auth.signOut();
    if (error) handleAuthError(error, "Logout");
    else {
      toast({ title: 'Logout bem-sucedido', variant: 'success', duration: 2000 });
      logger.auth('Logout bem-sucedido');
    }
    setLoading(false);
  };

  // Adiciona a função para permitir atualização externa do perfil
  const updateUserProfile = (profile: UserProfile) => {
    setCurrentUserProfile(profile);
  };

  return (
    <AuthContext.Provider value={{
        user,
        currentUserProfile,
        loading,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        sendPasswordResetEmail,
        signOutUser,
        updateUserProfile, // Expõe a nova função
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
