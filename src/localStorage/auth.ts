import { AUTH_KEY } from './localStorageConfig';

export function getAuth(): string | undefined {
  const response = localStorage.getItem(AUTH_KEY);
  if (!response) return undefined;

  const user = JSON?.parse(response || '');
  if (!user) return undefined;

  return user;
}

export function setAuth(token: string) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(token));
}

export function removeAuth() {
  localStorage.removeItem(AUTH_KEY);
}
