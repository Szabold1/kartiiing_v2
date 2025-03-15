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
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </SheetTrigger>
        <SheetContentHamburgerMenu side="top">
          <nav className="flex flex-col gap-2 px-4 py-12">
            <MobileNavLink href="/" setOpen={setOpen}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/calendar" setOpen={setOpen}>
              Calendar
            </MobileNavLink>
            <MobileNavLink href="/results" setOpen={setOpen}>
              Results
            </MobileNavLink>
            <MobileNavLink href="/circuits" setOpen={setOpen}>
              Circuits
            </MobileNavLink>
            <MobileNavLink href="/wiki" setOpen={setOpen}>
              Wiki
            </MobileNavLink>
          </nav>
        </SheetContentHamburgerMenu>
      </Sheet>
    </div>
  );
};

export default MobileNav;
