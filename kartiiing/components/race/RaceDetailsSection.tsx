import SectionTitle from "../SectionTitle";
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
    <section className="break-inside-avoid">
      <SectionTitle className="px-4 pb-1 !text-lg uppercase tracking-wide">
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
