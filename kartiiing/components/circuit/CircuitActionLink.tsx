import { cn, grayGlassHover } from "@/lib/utils";

type Props = {
  href?: string | null;
  title: string;
  icon: React.ReactNode;
};

export default function CircuitActionLink({ href, title, icon }: Props) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        grayGlassHover,
        "flex w-10 h-10 items-center justify-center rounded-lg",
      )}
      title={title}
      onClick={(e) => e.stopPropagation()}
    >
      {icon}
    </a>
  );
}
