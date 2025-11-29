"use client";

import HeroLink from "@/components/hero/HeroLink";
import Copyright from "@/components/Copyright";

interface Props {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: Props) {
  return (
    <div className="fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-cover bg-center bg-fixed bg-[url('/images/hero-mobile.jpg')] lg:bg-[url('/images/hero.jpg')]">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 
      dark:bg-gradient-to-b dark:from-[rgba(25,25,25,0.8)] dark:to-[rgba(25,25,25,0.7)]
      bg-gradient-to-r from-[rgba(25,25,25,0.3)] to-[rgba(25,25,25,0.35)]"
      ></div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center w-full h-full px-3.5 pt-[21.5vh] text-gray-200 dark:text-gray-200/90">
        <div className="text-center max-w-2xl">
          <h1 className="text-[2rem] sm:text-[2.2rem] md:text-[2.6rem] lg:text-[2.6rem] font-bold mb-5">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-7 leading-relaxed">{subtitle}</p>
        </div>

        {/* Buttons */}
        <div
          className={`flex gap-2 sm:gap-3.5 justify-center flex-wrap mt-auto md:mt-2 mb-13.5`}
        >
          <HeroLink href="/circuits" variant="light">
            Explore Circuits
          </HeroLink>
          <HeroLink
            href={`/calendar/${new Date().getFullYear()}`}
            variant="green"
          >
            View Calendar
          </HeroLink>
        </div>

        {/* Copyright text at bottom */}
        <Copyright className="absolute bottom-3 left-0 right-0 px-4" />
      </div>
    </div>
  );
}
