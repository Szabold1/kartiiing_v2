"use client";

import { Button } from "@/components/ui/button";
import { greenGlassHover } from "@/lib/classNames";

interface Props {
  className?: string;
}

const LoginBtn = ({ className }: Props) => {
  return (
    <Button
      size="lg"
      className={`flex font-medium text-center uppercase tracking-wide ${greenGlassHover} ${className}`}
    >
      Login
    </Button>
  );
};

export default LoginBtn;
