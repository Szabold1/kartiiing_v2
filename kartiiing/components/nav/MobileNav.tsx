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
// import LoginBtn from "@/components/nav/LoginBtn";

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
            className={`w-9.5 h-9.5 ${lightDarkGlassHover}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </SheetTrigger>
        <SheetContentHamburgerMenu
          side="right"
          className={`h-fit w-44 mt-17 mx-2 rounded-xl ${lightDarkGlassBase}`}
        >
          <nav className="flex flex-col gap-1.5 p-1.5">
            {/* <LoginBtn className="mb-2 h-10.5" /> */}
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
