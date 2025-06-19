"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { UserProfile } from '@/lib/types';
import { createClient } from '@/lib/supabase/client'; // Nosso novo cliente Supabase!

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
  const supabase = createClient();
  const router = useRouter();
  const { toast } = useToast();
  
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar o perfil do usuário no banco de dados real
    const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
      setLoading(true);
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*, profile_snapshot')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error("Erro ao buscar perfil do usuário:", error.message);
      }

      // Monta o objeto UserProfile igual ao profile.service.ts
      const userProfile: UserProfile | null = profile ? {
        id: profile.id,
        username: profile.username,
        name: profile.full_name || 'Nome não definido',
        email: profile.email,
        phone: profile.phone,
        whatsappNumber: profile.whatsapp_number,
        bio: profile.bio || '',
        profilePictureUrl: profile.profile_picture_url || '',
        coverPhotoUrl: profile.cover_photo_url || '',
        category: profile.category || 'Categoria não definida',
        plan: profile.plan || 'free',
        layoutTemplateId: profile.layout_template_id,
        isAvailable: profile.is_available,
        location: profile.location || { city: '', country: '' },
        skills: profile.skills || [],
        premiumBanner: profile.premium_banner || undefined,
        socialLinks: (profile.profile_snapshot?.social_links || []),
        services: (profile.profile_snapshot?.services || []),
        portfolio: (profile.profile_snapshot?.portfolio || []),
        experience: (profile.profile_snapshot?.experience || []),
        education: (profile.profile_snapshot?.education || []),
        reviews: (profile.profile_snapshot?.reviews || []),
      } : null;

      setCurrentUserProfile(userProfile);
      setLoading(false);
    };

    // Listener de autenticação do Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const supabaseUser = session?.user || null;
      setUser(supabaseUser);

      if (event === 'SIGNED_IN' && supabaseUser) {
        toast({ title: 'Login bem-sucedido!', description: `Bem-vindo(a) de volta!` });
        fetchUserProfile(supabaseUser);
        router.push('/dashboard');
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
    console.error(`Erro em ${context}:`, error.message);
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
        redirectTo: `${window.location.origin}/auth/callback`,
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
      toast({ title: 'Cadastro bem-sucedido!', description: 'Enviamos um email de confirmação para sua caixa de entrada.' });
    }
    setLoading(false);
  };

  const signInWithEmail = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) handleAuthError(error, "Login com Email");
    // O onAuthStateChange cuidará do resto
  };

  const sendPasswordResetEmail = async (email: string) => {
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      handleAuthError(error, "Redefinição de Senha");
    } else {
      toast({ title: "Email de Redefinição Enviado", description: "Verifique sua caixa de entrada para o link." });
    }
    setLoading(false);
  };

  const signOutUser = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) handleAuthError(error, "Logout");
    else toast({ title: 'Logout bem-sucedido' });
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
