type Props = {
  year: number;
};

export function Footer({ year }: Props) {
  return (
    <footer className="border-t border-dashed">
      <div className="border-x border-dashed p-4 lg:px-8 max-w-[90rem] mx-auto text-center w-full text-sm">
        © {year} Boldizsar Szabo
      </div>
    </footer>
  );
}
