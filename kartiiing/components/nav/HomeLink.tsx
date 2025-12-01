import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

const HomeLink = () => {
  return (
    <h1 className="cursor-pointer text-[1.2rem] font-bold uppercase tracking-wider">
      <Link href="/" className="pl-2.5">
        <BrandLogo />
      </Link>
    </h1>
  );
};

export default HomeLink;
