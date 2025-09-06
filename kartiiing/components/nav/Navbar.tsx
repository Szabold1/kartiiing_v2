"use client";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ThemeBtn from "./ThemeBtn";
import HomeLink from "./HomeLink";
import { lightDarkGlassBase } from "@/lib/classNames";
// import LoginBtn from "@/components/nav/LoginBtn";

const Navbar = () => {
  return (
    <header className="bg-transparent sticky top-0 z-50 flex justify-center">
      <div
        className={`flex items-center justify-between gap-6 w-full md:w-fit mt-2 mx-2 p-1.5 rounded-xl ${lightDarkGlassBase}`}
      >
        <HomeLink />
        <DesktopNav />
        <div className="flex items-center gap-1.5">
          <ThemeBtn />
          <MobileNav />
          {/* <LoginBtn className="hidden md:flex h-9.5" /> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
