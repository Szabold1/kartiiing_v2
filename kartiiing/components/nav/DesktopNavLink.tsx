import Link from "next/link";
import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  href: string;
}

const DesktopNavLink = ({ children, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={isActive ? "text-emerald-500 dark:text-emerald-300" : ""}
      >
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default DesktopNavLink;
