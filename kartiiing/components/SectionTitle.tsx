type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className = "" }: Props) {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );
}
