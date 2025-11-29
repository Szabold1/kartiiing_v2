import Link from "next/link";

const HomeLink = () => {
  return (
    <h1 className="cursor-pointer text-[1.2rem] font-bold uppercase tracking-wider">
      <Link href="/" className="pl-2.5">
        Kart
        <span className="text-red-600">i</span>
        <span className="text-blue-500">i</span>
        <span className="text-amber-400">i</span>
        <span className="text-green-500">n</span>
        <span className="text-orange-600">g</span>
      </Link>
    </h1>
  );
};

export default HomeLink;
