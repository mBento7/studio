"use client";

import { logger } from '@/lib/logger';

// Mock do cliente Supabase para desenvolvimento local
interface MockUser {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
  };
  created_at: string;
}

interface MockSession {
  user: MockUser;
  access_token: string;
}

interface MockAuthResponse {
  data: {
    user: MockUser | null;
    session: MockSession | null;
  };
  error: Error | null;
}

class MockSupabaseClient {
  private currentUser: MockUser | null = null;
  private listeners: Array<(event: string, session: MockSession | null) => void> = [];

  // Usuários mock para teste
  private mockUsers = [
    {
      id: '1',
      email: 'test@example.com',
      password: '123456',
      user_metadata: { full_name: 'Usuário Teste' },
      created_at: new Date().toISOString()
    },
    {
      id: '2', 
      email: 'admin@whosfy.com',
      password: 'admin123',
      user_metadata: { full_name: 'Admin Whosfy' },
      created_at: new Date().toISOString()
    }
  ];

  auth = {
    signInWithPassword: async ({ email, password }: { email: string; password: string }): Promise<MockAuthResponse> => {
      logger.auth('Tentando login mock', { email });
      logger.debug('Usuários mock disponíveis', { count: this.mockUsers.length });
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUser = this.mockUsers.find(u => u.email === email && u.password === password);
      
      if (!mockUser) {
        logger.auth('Credenciais inválidas - usuário não encontrado', { email });
        return {
          data: { user: null, session: null },
          error: new Error('Invalid login credentials')
        };
      }
      
      const user: MockUser = {
        id: mockUser.id,
        email: mockUser.email,
        user_metadata: mockUser.user_metadata,
        created_at: mockUser.created_at
      };
      
      const session: MockSession = {
        user,
        access_token: 'mock-access-token'
      };
      
      this.currentUser = user;
      
      // Notificar listeners
      setTimeout(() => {
        this.listeners.forEach(listener => listener('SIGNED_IN', session));
      }, 100);
      
      logger.auth('Login mock bem-sucedido', { email: user.email });
      
      return {
        data: { user, session },
        error: null
      };
    },

    signUp: async ({ email, password, options }: { email: string; password: string; options?: any }): Promise<MockAuthResponse> => {
      logger.auth('Tentando cadastro mock', { email });
      
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verificar se usuário já existe
      const existingUser = this.mockUsers.find(u => u.email === email);
      if (existingUser) {
        return {
          data: { user: null, session: null },
          error: new Error('User already registered')
        };
      }
      
      // Criar novo usuário mock
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        user_metadata: { full_name: options?.data?.full_name || 'Novo Usuário' },
        created_at: new Date().toISOString()
      };
      
      this.mockUsers.push(newUser);
      
      const user: MockUser = {
        id: newUser.id,
        email: newUser.email,
        user_metadata: newUser.user_metadata,
        created_at: newUser.created_at
      };
      
      const session: MockSession = {
        user,
        access_token: 'mock-access-token'
      };
      
      this.currentUser = user;
      
      // Notificar listeners
      setTimeout(() => {
        this.listeners.forEach(listener => listener('SIGNED_IN', session));
      }, 100);
      
      logger.auth('Cadastro mock bem-sucedido', { email: user.email });
      
      return {
        data: { user, session },
        error: null
      };
    },

    signInWithOAuth: async ({ provider }: { provider: string }) => {
      logger.warn('OAuth não implementado no modo mock');
      return {
        data: { user: null, session: null },
        error: new Error('OAuth not available in mock mode')
      };
    },

    resetPasswordForEmail: async (email: string) => {
      logger.auth('Reset de senha mock', { email });
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return { error: null };
    },

    signOut: async () => {
      logger.auth('Fazendo logout mock');
      this.currentUser = null;
      
      // Notificar listeners
      setTimeout(() => {
        this.listeners.forEach(listener => listener('SIGNED_OUT', null));
      }, 100);
      
      return { error: null };
    },

    onAuthStateChange: (callback: (event: string, session: MockSession | null) => void) => {
      this.listeners.push(callback);
      
      // Simular sessão inicial
      setTimeout(() => {
        callback('INITIAL_SESSION', this.currentUser ? {
          user: this.currentUser,
          access_token: 'mock-access-token'
        } : null);
      }, 100);
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              const index = this.listeners.indexOf(callback);
              if (index > -1) {
                this.listeners.splice(index, 1);
              }
            }
          }
        }
      };
    }
  };

  // Mock para outras funcionalidades do Supabase
  from = (table: string) => {
    if (table === 'profiles') {
      return {
        select: (fields: string) => ({
          eq: (column: string, value: string) => ({
            single: async () => {
              // Simular busca de perfil por ID
              if (column === 'id') {
                const mockUser = this.mockUsers.find(u => u.id === value);
                if (mockUser) {
                  return {
                    data: {
                      id: mockUser.id,
                      full_name: mockUser.user_metadata.full_name,
                      name: mockUser.user_metadata.full_name,
                      email: mockUser.email,
                      username: mockUser.email.split('@')[0],
                      bio: 'Usuário de teste no modo mock',
                      profile_picture_url: null,
                      cover_photo_url: null,
                      isAvailable: true,
                      is_available: true,
                      whatsappNumber: null,
                      sociallinks: [],
                      services: [],
                      portfolio: [],
                      skills: [],
                      plan: 'free',
                      created_at: mockUser.created_at,
                      updated_at: mockUser.created_at,
                      profile_snapshot: null
                    },
                    error: null
                  };
                }
              }
              return {
                data: null,
                error: new Error('Profile not found in mock mode')
              };
            }
          })
        })
      };
    }
    
    return {
      select: () => ({
        eq: () => ({
          single: async () => ({
            data: null,
            error: new Error('Database operations not available in mock mode')
          })
        })
      })
    };
  };
}

export const mockSupabase = new MockSupabaseClient();