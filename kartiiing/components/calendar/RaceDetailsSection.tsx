import SectionTitle from "../SectionTitle";
import { lightDarkGlassBase } from "@/lib/classNames";

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
    <>
      <SectionTitle className="px-3 pb-0.5 !text-lg">{title}</SectionTitle>
      <div
        className={`flex flex-col p-3 rounded-xl ${lightDarkGlassBase} ${className}`}
      >
        {children}
      </div>
    </>
  );
}
