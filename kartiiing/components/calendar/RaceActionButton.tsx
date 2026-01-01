type Props = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
};

export default function RaceActionButton({
  onClick,
  className = "",
  children = "Live Action",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer w-10.5 h-10.5 flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}
