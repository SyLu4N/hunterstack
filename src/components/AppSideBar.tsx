import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import Link from 'next/link';

import { SidebarGroupCategories } from './SidebarGroupCategories';
import { SidebarGroupFavorites } from './SidebarGroupFavorites';
import { UserNav } from './UserNav';

export const LIST_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  exit: { opacity: 0 },
};

export const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function AppSidebar() {
  return (
    <Sidebar className="border-background-400">
      <SidebarHeader className="bg-background-700 flex items-center">
        <Link
          href="/"
          className="flex items-center justify-center py-2 text-4xl font-extrabold tracking-wide"
        >
          <span className=" text-letter-500">LOGO</span>
          <span className="text-primary-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            TIPO
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="bg-background-700">
        <SidebarGroupCategories />

        <SidebarGroupFavorites />

        <SidebarFooter className="mt-auto p-0">
          <SidebarMenu>
            <UserNav />
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
