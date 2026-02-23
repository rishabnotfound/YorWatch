'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getImageUrl } from '@/lib/tmdb';

interface Studio {
  id: number;
  name: string;
  logo: string;
}

interface StudioRowProps {
  title: string;
  studios: Studio[];
  type: 'movie' | 'tv';
}

export function StudioRow({ title, studios, type }: StudioRowProps) {
  const baseUrl = type === 'movie' ? '/studio' : '/network';

  return (
    <section className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-white px-4 md:px-8 lg:px-12">
        {title}
      </h2>
      <div
        className="flex gap-4 overflow-x-auto px-4 md:px-8 lg:px-12 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {studios.map((studio, index) => (
          <motion.div
            key={studio.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              href={`${baseUrl}/${studio.id}`}
              className="flex-shrink-0 group"
            >
              <div className="w-32 h-20 md:w-40 md:h-24 rounded-xl bg-surface-light flex items-center justify-center p-4 transition-all group-hover:bg-surface-lighter group-hover:ring-2 ring-primary/50">
                <div className="relative w-full h-full">
                  <Image
                    src={getImageUrl(studio.logo, 'w185')}
                    alt={studio.name}
                    fill
                    className="object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                    sizes="160px"
                  />
                </div>
              </div>
              <p className="mt-2 text-xs text-white/50 text-center group-hover:text-white/70 transition-colors">
                {studio.name}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
