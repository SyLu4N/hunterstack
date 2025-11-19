'use client';

import { createContext, ReactNode, useEffect, useRef, useState } from 'react';

import { User } from '@/@types/User';
import { getAuth, setAuth, removeAuth } from '@/localStorage/auth';
import { api } from '@/services/api';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import securityShield from '/public/lottie/securityShield.json';

interface authProvider {
  children: ReactNode;
}

type AuthData = {
  user: User | null;
  isLoading: boolean;
  signOut: () => void;
};

type ResponseAuth = {
  token: string;
  user: User;
};

export const AuthContext = createContext({} as AuthData);

export function AuthProvider({ children }: authProvider) {
  const rout = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFetched = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function handleLogin() {
    const code = searchParams.get('code');
    if (!code) return;

    try {
      setIsLoading(true);

      const { data } = await api.get<ResponseAuth>(`/auth/github/${code}`);

      const { token, user } = data;

      setAuth(token);
      setUser(user);

      const params = new URLSearchParams(searchParams.toString());
      params.delete('code');

      const newUrl = `${pathname}?${params.toString()}`;
      rout.replace(newUrl, { scroll: false });
    } finally {
      setIsLoading(false);
    }
  }

  async function validTokenAndSetUser() {
    try {
      setIsLoading(true);

      const response = api.get('me');
      const { data } = await response;

      setUser(data.user);
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    removeAuth();
    setUser(null);

    (api.defaults.headers as any)['Authorization'] = null;
  }

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !hasFetched.current) {
      (hasFetched as any).current = true;
      handleLogin();
    }
  }, [searchParams, hasFetched]);

  useEffect(() => {
    const token = getAuth();
    if (token) validTokenAndSetUser();
  }, []);

  useEffect(() => {
    const handleLogoutBroadcast = (event: StorageEvent) => {
      if (event.key === 'logout-event') signOut();
    };

    window.addEventListener('storage', handleLogoutBroadcast);

    return () => {
      window.removeEventListener('storage', handleLogoutBroadcast);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signOut,
      }}
    >
      {isLoading && (
        <div className="absolute w-screen h-screen flex items-center justify-center">
          <div className="absolute z-40 top-0 left-0 w-full h-full bg-background-600 opacity-90" />

          <div className="z-50 flex flex-col items-center justify-center">
            <div className="w-20 h-20">
              <Lottie animationData={securityShield} />
            </div>

            <p className="text-letter-500 flex items-end">
              Autenticando
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="ml-[2px] mb-1.5 w-[3px] h-[3px] bg-letter-500 rounded-full"
                  animate={{ y: [0, -2, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    repeatDelay: 1,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </p>
          </div>
        </div>
      )}

      {children}
    </AuthContext.Provider>
  );
}
