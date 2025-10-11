import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import DesktopNavLink from "./DesktopNavLink";
import { NavLink } from "@/lib/types/NavTypes";

const navLinks: NavLink[] = [
  {
    label: "Calendar",
    href: `/calendar/${new Date().getFullYear()}`,
    match: "startsWith",
    matchPath: "/calendar/",
  },
  { label: "Results", href: "/results", match: "exact" },
  { label: "Circuits", href: "/circuits", match: "exact" },
  { label: "Wiki", href: "/wiki", match: "exact" },
];

const DesktopNav = () => {
  return (
    <NavigationMenu className="mr-1.5">
      <NavigationMenuList className="hidden md:flex gap-2 mx-auto font-medium">
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
};

export default DesktopNav;
