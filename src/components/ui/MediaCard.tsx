'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getImageUrl, getBackdropUrl } from '@/lib/tmdb';
import { formatRating, getTitle, getDate, formatYear, getMediaType } from '@/lib/utils';
import { HoverCard } from './HoverCard';

interface MediaCardProps {
  item: {
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
  };
  variant?: 'poster' | 'backdrop';
  priority?: boolean;
  showHoverCard?: boolean;
}

export function MediaCard({ item, variant = 'poster', priority = false, showHoverCard = true }: MediaCardProps) {
  const title = getTitle(item);
  const date = getDate(item);
  const year = formatYear(date);
  const mediaType = getMediaType(item);
  const href = `/${mediaType}/${item.id}`;

  const CardContent = (
    <Link href={href} className="group block">
      <motion.div
        whileHover={{ y: variant === 'poster' ? -8 : 0, scale: variant === 'backdrop' ? 1.02 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative"
      >
        {variant === 'backdrop' ? (
          <div className="relative aspect-video rounded-lg overflow-hidden bg-surface">
            <Image
              src={getBackdropUrl(item.backdrop_path || item.poster_path)}
              alt={title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg line-clamp-1">{title}</h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-white/70">
                <span>{year}</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {formatRating(item.vote_average)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-surface">
              <Image
                src={getImageUrl(item.poster_path)}
                alt={title}
                fill
                priority={priority}
                className="object-cover transition-all duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur-sm flex items-center gap-1">
                <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-medium text-white">
                  {formatRating(item.vote_average)}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <h3 className="text-white font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-white/50 text-xs">{year}</p>
            </div>
          </>
        )}
      </motion.div>
    </Link>
  );

  if (showHoverCard && variant === 'poster') {
    return <HoverCard item={item}>{CardContent}</HoverCard>;
  }

  return CardContent;
}

export function MediaCardSkeleton({ variant = 'poster' }: { variant?: 'poster' | 'backdrop' }) {
  if (variant === 'backdrop') {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-surface animate-pulse">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <div className="h-5 w-3/4 bg-surface-lighter rounded" />
          <div className="h-4 w-1/2 bg-surface-lighter rounded" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-[2/3] rounded-lg bg-surface animate-pulse" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 bg-surface rounded" />
        <div className="h-3 w-1/2 bg-surface rounded" />
      </div>
    </div>
  );
}
