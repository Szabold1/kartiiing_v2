import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import DesktopNavLink from "./DesktopNavLink";

const DesktopNav = () => {
  return (
    <NavigationMenu className="mr-4">
      <NavigationMenuList className="hidden md:flex gap-2 mx-auto">
        <DesktopNavLink href="/calendar">Calendar</DesktopNavLink>
        <DesktopNavLink href="/results">Results</DesktopNavLink>
        <DesktopNavLink href="/circuits">Circuits</DesktopNavLink>
        <DesktopNavLink href="/wiki">Wiki</DesktopNavLink>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
