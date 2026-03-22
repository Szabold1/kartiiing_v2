import Link from "next/link";
import BrandLogo from "@/components/shared/BrandLogo";

const HomeLink = () => {
  return (
    <Link
      href="/"
      className="pl-2.5 py-1 cursor-pointer text-[1.2rem] font-bold uppercase tracking-wider"
    >
      <BrandLogo />
    </Link>
  );
};

export default HomeLink;
