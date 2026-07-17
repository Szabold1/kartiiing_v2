'use client';

import { cn } from '@/lib/utils';
import { HeroLink } from '@/components/hero/HeroLink';
import { Copyright } from '@/components/shared/Copyright';
import { BrandLogo } from '@/components/shared/BrandLogo';
import { useCurrentYear } from '@/providers/GlobalProvider';

type Props = {
  subtitle: string;
};

export function Hero({ subtitle }: Props) {
  const currentYear = useCurrentYear();

  // Shared content component
  function renderHeroContent(isMobile = false) {
    return (
      <div className="max-w-2xl text-center">
        <h1
          className={cn(
            'mb-4 leading-13 font-extrabold tracking-wide',
            isMobile ? 'mb-5 text-[2.5rem]' : 'text-[2.4rem]',
          )}
        >
          Welcome to <BrandLogo className="uppercase" />
        </h1>
        <p
          className={cn(
            'text-lg leading-relaxed md:text-xl',
            isMobile ? 'mb-13' : 'mb-7',
          )}
        >
          {subtitle}
        </p>
        <div
          className={cn(
            'flex flex-wrap justify-center gap-2',
            !isMobile && 'mb-13.5 sm:gap-3.5',
          )}
        >
          <HeroLink href="/circuits" variant="light">
            Explore Circuits
          </HeroLink>
          <HeroLink href={`/calendar/${currentYear}`} variant="green">
            View Calendar
          </HeroLink>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Large screens - with background image */}
      <div className="fixed inset-0 hidden h-[100dvh] w-full flex-col items-center justify-center bg-[url('/images/hero-mobile.jpg')] bg-cover bg-fixed bg-center sm:flex lg:bg-[url('/images/hero.jpg')]">
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(25,25,25,0.4)] to-[rgba(25,25,25,0.45)] dark:bg-gradient-to-b dark:from-[rgba(25,25,25,0.8)] dark:to-[rgba(25,25,25,0.7)]"
          aria-hidden="true"
        ></div>

        <div className="relative z-10 flex h-full w-full flex-col items-center px-3.5 pt-[16dvh] text-gray-50 md:pt-[21.5dvh] dark:text-gray-200/90">
          {renderHeroContent()}
          <Copyright
            className="absolute right-0 bottom-3 left-0 px-4"
            ariaHidden={true}
          />
        </div>
      </div>

      {/* Small screens - no background */}
      <div className="flex flex-col items-center justify-center px-3.5 pt-[13.5dvh] sm:hidden">
        {renderHeroContent(true)}
      </div>
    </>
  );
}
