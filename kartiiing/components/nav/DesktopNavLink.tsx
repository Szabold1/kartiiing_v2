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
        className={isActive ? "text-red-600 dark:text-red-500" : ""}
      >
        <Link href={href}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default DesktopNavLink;
