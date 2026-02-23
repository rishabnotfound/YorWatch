'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getBackdropUrl } from '@/lib/tmdb';
import { formatRating, getTitle, getDate, formatYear, truncateText, getMediaType } from '@/lib/utils';

interface HeroProps {
  item: {
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
  };
}

export function Hero({ item }: HeroProps) {
  const title = getTitle(item);
  const date = getDate(item);
  const year = formatYear(date);
  const mediaType = getMediaType(item);

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={getBackdropUrl(item.backdrop_path)}
          alt={title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      <div className="relative h-full flex items-end pb-16 md:pb-24">
        <div className="px-4 md:px-8 lg:px-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-4">
              {mediaType === 'movie' ? 'Movie' : 'TV Series'}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-4 mb-4 text-white/80">
              <span className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{formatRating(item.vote_average)}</span>
              </span>
              <span>{year}</span>
            </div>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-xl">
              {truncateText(item.overview, 200)}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={`/${mediaType}/${item.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Now
              </Link>
              <Link
                href={`/${mediaType}/${item.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors backdrop-blur-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More Info
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="relative h-full flex items-end pb-32 md:pb-40">
        <div className="px-4 md:px-8 lg:px-12 max-w-3xl space-y-4">
          <div className="h-6 w-24 bg-surface-lighter rounded-full animate-pulse" />
          <div className="h-16 w-96 max-w-full bg-surface-lighter rounded animate-pulse" />
          <div className="h-6 w-48 bg-surface-lighter rounded animate-pulse" />
          <div className="h-20 w-full max-w-xl bg-surface-lighter rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="h-12 w-36 bg-surface-lighter rounded-lg animate-pulse" />
            <div className="h-12 w-36 bg-surface-lighter rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-4 md:right-8 lg:right-12 flex gap-2 items-end">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-lg bg-surface-lighter animate-pulse ${
              i === 0 ? 'w-20 h-28 md:w-24 md:h-32' : 'w-14 h-20 md:w-16 md:h-24'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
