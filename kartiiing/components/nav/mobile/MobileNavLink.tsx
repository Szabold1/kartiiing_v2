import { cn, greenGlassHover, lightDarkGlassHover } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  href: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  match?: 'exact' | 'startsWith';
  matchPath?: string;
};

export function MobileNavLink({
  children,
  href,
  setOpen,
  match = 'exact',
  matchPath,
}: Props) {
  const pathname = usePathname();

  let isActive = false;
  if (match === 'startsWith' && matchPath) {
    isActive = pathname.startsWith(matchPath);
  } else {
    isActive = pathname === href;
  }

  return (
    <Link
      href={href}
      className={cn(
        'w-full rounded-xl p-3 text-center text-[0.93rem] font-medium tracking-wide uppercase',
        lightDarkGlassHover,
        isActive && greenGlassHover,
      )}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );
}
