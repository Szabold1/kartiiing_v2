import Link from "next/link";

const HomeLink = () => {
  return (
    <h1 className="cursor-pointer text-lg font-bold uppercase tracking-wider pl-1.5">
      <Link href="/">
        Kart
        <span className="text-red-600">i</span>
        <span className="text-blue-500">i</span>
        <span className="text-amber-400">i</span>
        <span className="text-green-500">n</span>
        <span className="text-red-600">g</span>
      </Link>
    </h1>
  );
};

export default HomeLink;
