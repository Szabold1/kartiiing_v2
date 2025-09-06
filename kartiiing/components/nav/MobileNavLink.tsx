import { lightDarkGlassHover, redGlassHover } from "@/lib/classNames";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  href: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileNavLink = ({ children, href, setOpen }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`font-medium text-[0.93rem] rounded-lg p-3 w-full text-center uppercase tracking-wide ${lightDarkGlassHover}
        ${isActive ? `${redGlassHover}` : ""}`}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
