import { redGlassHover } from "@/lib/classNames";

type Props = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

export default function LiveActionButton({
  onClick,
  className = "",
  children = "Live Action",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${redGlassHover} ${className}`}
    >
      {children}
    </button>
  );
}
