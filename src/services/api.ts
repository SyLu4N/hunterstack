import axios from 'axios';

export function apiServer() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
  });

  return api;
}
