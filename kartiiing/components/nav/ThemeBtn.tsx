"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { lightDarkGlassHover } from "@/lib/classNames";

const ThemeBtn = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    if (!resolvedTheme) return;
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle Theme"
        className={`w-10.5 h-10.5 rounded-lg ${lightDarkGlassHover}`}
      >
        <Loader />
      </Button>
    );
  }

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
      ) : (
        <MoonIcon className="size-4.5" />
      )}
    </Button>
  );
};

export default ThemeBtn;
