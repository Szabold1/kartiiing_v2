interface Props {
  children?: React.ReactNode;
  position: "left" | "right";
  visibilityFrom: "lg" | "xl";
  className?: string;
}

const Aside = ({
  children,
  position,
  visibilityFrom,
  className = "",
}: Props) => {
  const borderClass = position === "left" ? "border-r" : "border-l";
  const visibilityClass = visibilityFrom === "lg" ? "lg:block" : "xl:block";

  return (
    <aside
      className={`w-3xs hidden ${visibilityClass} py-3 z-30 shrink-0 border-dashed ${borderClass} ${className}`}
    >
      {children}
    </aside>
  );
};

export default Aside;
