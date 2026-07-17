import Link from 'next/link';
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { cn, navLinkActive } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  href: string;
  match?: 'exact' | 'startsWith';
  matchPath?: string;
};

export function DesktopNavLink({
  children,
  href,
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
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={cn('tracking-wide', isActive && navLinkActive)}
      >
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
