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
      className={`bg-red-600 text-white dark:bg-red-700 p-2 rounded-lg border border-dashed hover:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
