"use client";

import { Button } from "@/components/ui/button";
import { cn, greenGlassHover } from "@/lib/utils";

type Props = {
  className?: string;
};

const LoginBtn = ({ className }: Props) => {
  return (
    <Button
      size="lg"
      className={cn(
        "flex h-9 font-medium text-center uppercase tracking-wide",
        greenGlassHover,
        className,
      )}
    >
      Login
    </Button>
  );
};

export default LoginBtn;
