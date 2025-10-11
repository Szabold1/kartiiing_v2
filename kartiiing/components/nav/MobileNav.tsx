import { useState } from "react";
import {
  Sheet,
  SheetContentHamburgerMenu,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MobileNavLink from "./MobileNavLink";
import { lightDarkGlassBase, lightDarkGlassHover } from "@/lib/classNames";
import { NavLink } from "@/lib/types/NavTypes";
// import LoginBtn from "@/components/nav/LoginBtn";

const navLinks: NavLink[] = [
  { label: "Home", href: "/", match: "exact" },
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

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen} modal={false}>
        <SheetTitle className="hidden">Menu</SheetTitle>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close Menu" : "Open Menu"}
            className={`w-9 h-9 ${lightDarkGlassHover}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </SheetTrigger>
        <SheetContentHamburgerMenu
          side="right"
          className={`h-fit w-44 mt-17 mx-2 rounded-xl ${lightDarkGlassBase}`}
        >
          <nav className="flex flex-col gap-1.5 p-1.5">
            {/* <LoginBtn className="mb-2 h-12" /> */}
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.label}
                href={link.href}
                setOpen={setOpen}
                match={link.match}
                matchPath={link.matchPath}
              >
                {link.label}
              </MobileNavLink>
            ))}
          </nav>
        </SheetContentHamburgerMenu>
      </Sheet>
    </div>
  );
};

export default MobileNav;
