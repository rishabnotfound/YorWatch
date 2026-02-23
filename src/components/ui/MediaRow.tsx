'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MediaCard, MediaCardSkeleton } from './MediaCard';
import Link from 'next/link';

interface MediaRowProps {
  title: string;
  items: Array<{
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path: string | null;
    backdrop_path?: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    media_type?: 'movie' | 'tv';
    genre_ids?: number[];
  }>;
  href?: string;
  variant?: 'poster' | 'backdrop';
}

export function MediaRow({ title, items, href, variant = 'poster' }: MediaRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative group/section">
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-12">
        <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
        <div className="flex items-center gap-3">
          {href && (
            <Link
              href={href}
              className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white opacity-0 group-hover/section:opacity-100 transition-opacity hidden md:flex items-center justify-center"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-12 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className={variant === 'backdrop' ? 'flex-shrink-0 w-72 md:w-80 lg:w-96' : 'flex-shrink-0 w-32 md:w-40 lg:w-44'}
            >
              <MediaCard item={item} variant={variant} priority={index < 5} showHoverCard={variant === 'poster'} />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white opacity-0 group-hover/section:opacity-100 transition-opacity hidden md:flex items-center justify-center"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export function MediaRowSkeleton({ count = 8, variant = 'poster' }: { count?: number; variant?: 'poster' | 'backdrop' }) {
  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-12">
        <div className="h-7 w-48 bg-surface rounded animate-pulse" />
      </div>
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 lg:px-12 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={variant === 'backdrop' ? 'flex-shrink-0 w-72 md:w-80 lg:w-96' : 'flex-shrink-0 w-32 md:w-40 lg:w-44'}
          >
            <MediaCardSkeleton variant={variant} />
          </div>
        ))}
      </div>
    </section>
  );
}
