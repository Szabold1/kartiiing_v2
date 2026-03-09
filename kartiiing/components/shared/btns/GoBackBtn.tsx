"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function GoBackBtn({ className }: Props) {
  const router = useRouter();

  const handleNavigation = () => {
    router.back();
  };

  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={handleNavigation}
      className={cn("w-10.5 h-10.5 rounded-lg p-2 cursor-pointer", className)}
    >
      <ArrowLeft className="w-full h-full" />
    </button>
  );
}
