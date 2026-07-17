import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  subsection?: boolean;
};

export function SideBarLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex h-8 items-center gap-2 overflow-hidden rounded-lg p-2 text-sm focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50"
    >
      {children}
    </Link>
  );
}
