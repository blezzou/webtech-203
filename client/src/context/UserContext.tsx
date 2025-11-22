'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

type UserContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signup: (fullName: string, email: string, password: string)  => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  loading: true,
  signup: async () => ({ success: false }),
  login: async () => ({ success: false }),
  logout: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fonction d'inscription
  const signup = async (fullName: string, email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Créer le profil utilisateur après l'inscription
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              role: 'user',
              completed_runs: [],
              upcoming_runs: [],
            },
          ]);

        if (profileError) {
          console.error('Erreur création profil:', profileError);
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }
  };

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erreur lors de la connexion' };
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session || null);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signup, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);