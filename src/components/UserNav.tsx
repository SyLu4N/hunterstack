'use client';

import { FaGithub } from 'react-icons/fa';
import { PiSignOutBold } from 'react-icons/pi';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';

export function UserNav() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, signOut } = useAuth();

  function handleLogin() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';

    const redirect_uri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI + pathname;

    const params = {
      response_type: 'code',
      scope: 'user',
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      redirect_uri,
    };
    const querysString = new URLSearchParams(params).toString();

    const githubAuthUrl = `${GITHUB_URL}?${querysString}`;

    router.push(githubAuthUrl);
  }

  if (user) {
    return (
      <div className="flex py-2 justify-around items-center bg-background-800 ">
        <div className="flex items-center gap-3 justify-center">
          <img
            className="w-7 h-7 rounded-full"
            src={user.avatar}
            alt={user.name}
          />

          <div>
            <h2 className="text-sm">{user.name}</h2>
            <p className="text-xs text-gray-400 mt-[-4px]">{user.email}</p>
          </div>
        </div>

        <div onClick={signOut} className="hover:text-letter-300 transition-all">
          <abbr title="Deslogar" className="cursor-pointer">
            <PiSignOutBold />
          </abbr>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleLogin}
      className="flex py-2 gap-3 cursor-pointer hover:opacity-80 transition-all items-center rounded-t-md bg-background-800 justify-center"
    >
      <FaGithub className="text-2xl text-orange-500" />
      <h2 className="text-sm">Login com o GitHub</h2>
    </div>
  );
}
