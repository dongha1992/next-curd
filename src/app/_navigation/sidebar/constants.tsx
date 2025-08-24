import {
  LucideBook,
  LucideBookCopy,
  LucideCircleUser,
  LucideLibrary,
} from 'lucide-react';
import {
  accountProfilePath,
  homePath,
  tradingsPath,
  tradingsByOrganizationPath,
} from '@/paths';
import { NavItem } from './types';

export const navItems: NavItem[] = [
  {
    title: '모든 매매',
    icon: <LucideLibrary />,
    href: homePath(),
  },
  {
    title: '우리의 매매',
    icon: <LucideBookCopy />,
    href: tradingsByOrganizationPath(),
  },
  {
    title: '내 매매',
    icon: <LucideBook />,
    href: tradingsPath(),
  },
  {
    separator: true,
    title: '계정',
    icon: <LucideCircleUser />,
    href: accountProfilePath(),
  },
];

export const closedClassName =
  'text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100';
