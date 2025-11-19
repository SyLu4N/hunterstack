import { getAuth } from '@/localStorage/auth';
import axios from 'axios';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const silent = error.config.silent || false;
    const status = error?.response?.status;

    console.log(error);

    if (!silent && status !== 401) {
      let message = 'Algo deu errado, tente novamente mais tarde';

      if (error?.response?.data?.message && status !== 500) {
        message = error.response.data.message;

        if (status === 401) {
          localStorage.setItem('logout-event', String(Date.now()));
          message = 'Sua sessão expirou, faça login novamente';
        }
      }

      toast.error(message, {
        position: 'top-right',

        style: {
          background: 'var(--toast-bg)',
          borderColor: 'var(--toast-border)',
          color: 'var(--toast-error)',
        },

        duration: 5000,
      });

      return Promise.reject(error);
    }
  },
);

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = getAuth();
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);
