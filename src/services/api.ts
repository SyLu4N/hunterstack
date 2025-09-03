import axios from 'axios';
import { parseCookies } from 'nookies';

export function apiServer(ctx: any = undefined) {
  const { NEXTAUTH_TOKEN } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND,
    headers: { Authorization: `Bearer ${NEXTAUTH_TOKEN}` },
  });

  return api;
}
