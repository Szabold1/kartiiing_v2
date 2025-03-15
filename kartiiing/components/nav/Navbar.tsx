"use client";

import { Button } from "@/components/ui/button";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ThemeBtn from "./ThemeBtn";
import HomeLink from "./HomeLink";

const Navbar = () => {
  return (
    <header className="border-b bg-background z-50">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 lg:px-8 max-w-[90rem] mx-auto border-x">
        <div className="flex items-center gap-10">
          <HomeLink />
          <DesktopNav />
        </div>

        <div className="flex items-center justify-end gap-4">
          <ThemeBtn />

          <Button size="lg" className="hidden md:flex">
            Login
          </Button>

          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
