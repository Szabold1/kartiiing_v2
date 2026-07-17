import Link from 'next/link';
import { BrandLogo } from '@/components/shared/BrandLogo';

export function HomeLink() {
  return (
    <Link
      href="/"
      className="cursor-pointer py-1 pl-2.5 text-[1.2rem] font-bold tracking-wider uppercase"
    >
      <BrandLogo />
    </Link>
  );
}
