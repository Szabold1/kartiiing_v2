interface Props {
  className?: string;
}

export default function BrandLogo({ className = "" }: Props) {
  return (
    <span className={className}>
      Kart
      <span className="text-red-600">i</span>
      <span className="text-blue-500">i</span>
      <span className="text-amber-400">i</span>
      <span className="text-green-500">n</span>
      <span className="text-orange-600">g</span>
    </span>
  );
}
