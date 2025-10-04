"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { lightDarkGlassHover } from "@/lib/classNames";

const ThemeBtn = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = () => {
    if (!resolvedTheme) return;
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeToggle}
      aria-label="Toggle Theme"
      id="theme-btn"
      className={`w-9 h-9 ${lightDarkGlassHover}`}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="size-4" />
      ) : resolvedTheme === "light" ? (
        <MoonIcon className="size-4" />
      ) : (
        <Loader />
      )}
    </Button>
  );
};

export default ThemeBtn;
