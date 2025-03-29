"use client";

import { Button } from "@/components/ui/button";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ThemeBtn from "./ThemeBtn";
import HomeLink from "./HomeLink";

const Navbar = () => {
  return (
    <header className="border-b border-dashed bg-background sticky top-0 z-50">
      <div className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 lg:px-8 max-w-[90rem] mx-auto border-x border-dashed">
        <div className="flex items-center gap-10">
          <HomeLink />
          <DesktopNav />
        </div>

        <div className="flex items-center justify-end gap-4">
          <ThemeBtn />

          <Button
            size="lg"
            className="hidden md:flex border-1 bg-red-600 hover:bg-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:text-red-50"
          >
            Login
          </Button>

          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
