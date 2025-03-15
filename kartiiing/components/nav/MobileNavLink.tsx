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
      className={`text-lg font-medium mx-auto border-2 rounded-xl p-3 w-70 text-center transition-colors duration-200
        ${
          isActive
            ? "border-emerald-300 bg-accent"
            : "border-accent hover:bg-accent"
        }`}
      onClick={() => setOpen(false)}
    >
      {children}
    </Link>
  );
};

export default MobileNavLink;
