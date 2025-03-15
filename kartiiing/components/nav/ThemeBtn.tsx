"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    >
      {resolvedTheme === "dark" ? (
        <SunIcon className="size-4" />
      ) : resolvedTheme === "light" ? (
        <MoonIcon className="size-4" />
      ) : (
        <LoaderIcon className="size-4 animate-spin" />
      )}
    </Button>
  );
};

export default ThemeBtn;
