'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  visibleOffset?: number;
};

export function BackToTopBtn({ visibleOffset = 300 }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > visibleOffset) setIsVisible(true);
      else setIsVisible(false);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [visibleOffset]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={cn(
            'fixed right-5 bottom-5 z-40 cursor-pointer rounded-full p-3',
            'focus:ring-primary focus:ring-2 focus:ring-offset-1 focus:outline-none',
            'border shadow backdrop-blur-md',
            'bg-accent-foreground/20 border-gray-500/10 dark:border-gray-50/20',
            'transition hover:border-gray-500/50 hover:shadow-md hover:dark:border-gray-50/50',
          )}
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
