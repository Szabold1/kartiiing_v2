import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  subsection?: boolean;
}

const SideBarLink = ({ href, children }: Props) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 overflow-hidden rounded-md text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 p-2 h-8`}
    >
      {children}
    </Link>
  );
};

export default SideBarLink;
