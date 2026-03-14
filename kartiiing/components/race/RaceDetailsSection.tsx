import SectionTitle from "@/components/shared/SectionTitle";
import { lightDarkGlassBase } from "@/lib/classNames";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function RaceDetailsSection({
  title,
  children,
  className = "",
}: Props) {
  return (
    <section>
      <SectionTitle className="px-4 pb-2.5 text-lg font-semibold uppercase tracking-wider">
        {title}
      </SectionTitle>
      <div
        className={cn(
          "flex flex-col p-3 rounded-2xl",
          lightDarkGlassBase,
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
