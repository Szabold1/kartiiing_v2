import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { DesktopNavLink } from '@/components/nav/desktop/DesktopNavLink';
import { NavLink } from '@/lib/types/NavTypes';

const navLinks: NavLink[] = [
  {
    label: 'Calendar',
    href: `/calendar/${new Date().getFullYear()}`,
    match: 'startsWith',
    matchPath: '/calendar/',
  },
  { label: 'Circuits', href: '/circuits', match: 'exact' },
  { label: 'Wiki', href: '/wiki', match: 'exact' },
];

export function DesktopNav() {
  return (
    <NavigationMenu className="mr-1.5">
      <NavigationMenuList className="mx-auto hidden gap-2 font-semibold md:flex">
        {navLinks.map((link) => (
          <DesktopNavLink
            key={link.label}
            href={link.href}
            match={link.match}
            matchPath={link.matchPath}
          >
            {link.label}
          </DesktopNavLink>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
