'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { deleteCookieByKey, getCookieByKey } from '@/actions/cookies';
import { toast } from 'sonner';

const RedirectToast = () => {
  const pathname = usePathname();
  useEffect(() => {
    const showCookieToast = async () => {
      const message = await getCookieByKey('toast');
      if (message) {
        toast.success(message);
        await deleteCookieByKey('toast');
      }
    };
    showCookieToast();
  }, [pathname]);

  return null;
};
export { RedirectToast };
