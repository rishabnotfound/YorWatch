import { Suspense } from 'react';
import { Metadata } from 'next';
import { MediaGridSkeleton } from '@/components/ui';
import { getTrending } from '@/lib/tmdb';
import { TrendingWrapper } from './trending-wrapper';

export const metadata: Metadata = {
  title: 'Trending',
};

interface TrendingPageProps {
  searchParams: { time?: string; type?: string };
}

async function TrendingContent({
  mediaType,
  timeWindow,
}: {
  mediaType: 'all' | 'movie' | 'tv';
  timeWindow: 'day' | 'week';
}) {
  const data = await getTrending(mediaType, timeWindow);

  return (
    <TrendingWrapper
      initialItems={data.results.map((item) => ({
        ...item,
        title: 'title' in item ? item.title : undefined,
        name: 'name' in item ? item.name : undefined,
        media_type: 'title' in item ? ('movie' as const) : ('tv' as const),
      }))}
      mediaType={mediaType}
      timeWindow={timeWindow}
    />
  );
}

export default function TrendingPage({ searchParams }: TrendingPageProps) {
  const timeWindow = (searchParams.time === 'week' ? 'week' : 'day') as 'day' | 'week';
  const mediaType = (['movie', 'tv'].includes(searchParams.type || '')
    ? searchParams.type
    : 'all') as 'all' | 'movie' | 'tv';

  const getTitle = () => {
    const typeLabel =
      mediaType === 'movie' ? 'Movies' : mediaType === 'tv' ? 'TV Shows' : 'All';
    const timeLabel = timeWindow === 'week' ? 'This Week' : 'Today';
    return `Trending ${typeLabel} ${timeLabel}`;
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-16">
      <div className="px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{getTitle()}</h1>

        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex gap-2">
            <a
              href={`/trending?time=${timeWindow}&type=all`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mediaType === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-surface-light text-white/70 hover:text-white'
              }`}
            >
              All
            </a>
            <a
              href={`/trending?time=${timeWindow}&type=movie`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mediaType === 'movie'
                  ? 'bg-primary text-white'
                  : 'bg-surface-light text-white/70 hover:text-white'
              }`}
            >
              Movies
            </a>
            <a
              href={`/trending?time=${timeWindow}&type=tv`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                mediaType === 'tv'
                  ? 'bg-primary text-white'
                  : 'bg-surface-light text-white/70 hover:text-white'
              }`}
            >
              TV Shows
            </a>
          </div>

          <div className="flex gap-2">
            <a
              href={`/trending?time=day&type=${mediaType}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeWindow === 'day'
                  ? 'bg-primary text-white'
                  : 'bg-surface-light text-white/70 hover:text-white'
              }`}
            >
              Today
            </a>
            <a
              href={`/trending?time=week&type=${mediaType}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeWindow === 'week'
                  ? 'bg-primary text-white'
                  : 'bg-surface-light text-white/70 hover:text-white'
              }`}
            >
              This Week
            </a>
          </div>
        </div>

        <Suspense key={`${mediaType}-${timeWindow}`} fallback={<MediaGridSkeleton />}>
          <TrendingContent mediaType={mediaType} timeWindow={timeWindow} />
        </Suspense>
      </div>
    </div>
  );
}
