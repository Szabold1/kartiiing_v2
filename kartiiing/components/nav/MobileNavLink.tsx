import { greenGlassHover, lightDarkGlassHover } from "@/lib/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  href: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  match?: "exact" | "startsWith";
  matchPath?: string;
}

const MobileNavLink = ({ children, href, setOpen, match = "exact", matchPath }: Props) => {
  const pathname = usePathname();

  let isActive = false;
  if (match === "startsWith" && matchPath) {
    isActive = pathname.startsWith(matchPath);
  } else {
    isActive = pathname === href;
  }

  return (
    <Link
      href={href}
      className={`font-medium text-[0.93rem] rounded-lg p-3 w-full text-center uppercase tracking-wide ${lightDarkGlassHover}
        ${isActive ? `${greenGlassHover}` : ""}`}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
