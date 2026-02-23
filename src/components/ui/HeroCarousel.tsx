'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getBackdropUrl, getImageUrl } from '@/lib/tmdb';
import { formatRating, getTitle, getDate, formatYear, truncateText, getMediaType } from '@/lib/utils';

interface HeroItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  media_type?: 'movie' | 'tv';
}

interface HeroCarouselProps {
  items: HeroItem[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ items, autoPlayInterval = 6000 }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displayItems = items.slice(0, 8);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % displayItems.length);
  }, [displayItems.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  }, [displayItems.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, goToNext, autoPlayInterval]);

  const currentItem = displayItems[currentIndex];
  if (!currentItem) return null;

  const title = getTitle(currentItem);
  const date = getDate(currentItem);
  const year = formatYear(date);
  const mediaType = getMediaType(currentItem);

  return (
    <section
      className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={getBackdropUrl(currentItem.backdrop_path)}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex flex-col justify-end pb-32 md:pb-40">
        <div className="px-4 md:px-8 lg:px-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
                {mediaType === 'movie' ? 'Movie' : 'TV Series'}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {title}
              </h1>
              <div className="flex items-center gap-4 mb-4 text-white/80">
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{formatRating(currentItem.vote_average)}</span>
                </span>
                <span>{year}</span>
              </div>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
                {truncateText(currentItem.overview, 180)}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href={`/${mediaType}/${currentItem.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Watch Now
                </Link>
                <Link
                  href={`/${mediaType}/${currentItem.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  More Info
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2">
          <button
            onClick={goToPrev}
            className="p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="p-3 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-8 right-4 md:right-8 lg:right-12 flex gap-2 items-end">
          {displayItems.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => goToSlide(index)}
                className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'w-20 h-28 md:w-24 md:h-32 ring-2 ring-primary'
                    : 'w-14 h-20 md:w-16 md:h-24 opacity-50 hover:opacity-80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                <Image
                  src={getImageUrl(item.poster_path, 'w185')}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                    style={{ transformOrigin: 'left' }}
                    key={`progress-${currentIndex}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
