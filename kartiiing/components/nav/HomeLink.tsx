import Link from "next/link";

const HomeLink = () => {
  return (
    <h1 className="cursor-pointer text-xl font-bold uppercase tracking-wider">
      <Link href="/">
        Kart
        <span className="text-red-600">i</span>
        <span className="text-blue-500">i</span>
        <span className="text-amber-400">i</span>
        <span className="text-green-500">n</span>
        <span className="text-orange-500">g</span>
      </Link>
    </h1>
  );
};

export default HomeLink;
