'use client';

import { usePathname } from 'next/navigation';
import { DesktopNav } from '@/components/nav/desktop/DesktopNav';
import { MobileNav } from '@/components/nav/mobile/MobileNav';
import { ThemeBtn } from '@/components/nav/ThemeBtn';
import { HomeLink } from '@/components/nav/HomeLink';
import { cn, lightDarkGlassBase } from '@/lib/utils';
// import LoginBtn from "@/components/nav/LoginBtn";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="sticky top-0 z-50 flex justify-center bg-transparent">
      <div
        className={cn(
          'm-1.5 mb-0 flex w-full items-center justify-between gap-6 rounded-2xl p-1.5 md:w-fit',
          lightDarkGlassBase,
          isHomePage && 'sm:text-gray-50',
        )}
      >
        <HomeLink />
        <DesktopNav />
        <div className="flex items-center gap-1.5">
          <ThemeBtn />
          <MobileNav />
          {/* <LoginBtn className="hidden md:flex" /> */}
        </div>
      </div>
    </header>
  );
}
