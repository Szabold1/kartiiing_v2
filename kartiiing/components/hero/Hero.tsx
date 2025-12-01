"use client";

import HeroLink from "@/components/hero/HeroLink";
import Copyright from "@/components/Copyright";
import BrandLogo from "@/components/BrandLogo";
import { useCurrentYear } from "@/contexts/GlobalContext";

interface Props {
  subtitle: string;
}

export default function Hero({ subtitle }: Props) {
  const currentYear = useCurrentYear();

  // Shared content component
  function renderHeroContent(isMobile = false) {
    return (
      <div className="text-center max-w-2xl">
        <h1
          className={`font-extrabold mb-4 tracking-wide leading-13 ${
            isMobile ? "text-[2.5rem] mb-5" : "text-[2.4rem]"
          }`}
        >
          Welcome to <BrandLogo className="uppercase" />
        </h1>
        <p
          className={`text-lg md:text-xl leading-relaxed ${
            isMobile ? "mb-13" : "mb-7"
          }`}
        >
          {subtitle}
        </p>
        <div
          className={`flex justify-center flex-wrap gap-2 ${
            isMobile ? "" : "sm:gap-3.5 mb-13.5"
          }`}
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
      <div className="hidden sm:flex fixed inset-0 w-full h-[100dvh] flex-col justify-center items-center bg-cover bg-center bg-fixed bg-[url('/images/hero-mobile.jpg')] lg:bg-[url('/images/hero.jpg')]">
        <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-[rgba(25,25,25,0.8)] dark:to-[rgba(25,25,25,0.7)] bg-gradient-to-r from-[rgba(25,25,25,0.4)] to-[rgba(25,25,25,0.45)]"></div>

        <div className="relative z-10 flex flex-col items-center w-full h-full px-3.5 pt-[16dvh] md:pt-[21.5dvh] text-gray-200 dark:text-gray-200/90">
          {renderHeroContent()}
          <Copyright className="absolute bottom-3 left-0 right-0 px-4" />
        </div>
      </div>

      {/* Small screens - no background */}
      <div className="sm:hidden flex flex-col justify-center items-center px-3.5 pt-[13.5dvh]">
        {renderHeroContent(true)}
      </div>
    </>
  );
}
