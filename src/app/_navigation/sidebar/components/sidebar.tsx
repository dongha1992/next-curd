'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { navItems } from '../constants';
import { SidebarItem } from './sidebar-item';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathName = usePathname();

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const activeIndex = 0;
  return (
    <nav
      className={cn(
        'animate-sidebar-from-left',
        'h-screen border-r pt-24',
        isTransition && 'duration-200',
        isOpen ? 'md:w-60 w-[78px]' : 'w-[78px]',
      )}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem, index) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              isActive={activeIndex === index}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
};

export { Sidebar };
