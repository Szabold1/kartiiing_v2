type Props = {
  year: number;
};

export function Footer({ year }: Props) {
  return (
    <footer className="border-t border-dashed">
      <div className="mx-auto w-full max-w-[90rem] border-x border-dashed p-4 text-center text-sm lg:px-8">
        © {year} Boldizsar Szabo
      </div>
    </footer>
  );
}
