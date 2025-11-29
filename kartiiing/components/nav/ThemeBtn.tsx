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
      className={`w-10.5 h-10.5 rounded-lg ${lightDarkGlassHover}`}
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="size-4.5" />
      ) : resolvedTheme === "light" ? (
        <MoonIcon className="size-4.5" />
      ) : (
        <Loader />
      )}
    </Button>
  );
};

export default ThemeBtn;
