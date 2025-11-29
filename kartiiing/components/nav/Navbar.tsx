"use client";

import { usePathname } from "next/navigation";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import ThemeBtn from "./ThemeBtn";
import HomeLink from "./HomeLink";
import { lightDarkGlassBase } from "@/lib/classNames";
// import LoginBtn from "@/components/nav/LoginBtn";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="bg-transparent sticky top-0 z-50 flex justify-center">
      <div
        className={`flex items-center justify-between gap-6 w-full md:w-fit mt-2 mx-2 p-1.5 rounded-xl ${lightDarkGlassBase} ${
          isHomePage ? " text-gray-200" : ""
        }`}
      >
        <HomeLink />
        <DesktopNav />
        <div className="flex items-center gap-1.5">
          <ThemeBtn />
          <MobileNav />
          {/* <LoginBtn className="hidden md:flex" /> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
