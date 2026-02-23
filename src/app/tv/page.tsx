import { Suspense } from 'react';
import {
  HeroCarousel,
  HeroSkeleton,
  MediaRow,
  MediaRowSkeleton,
  StudioRow,
} from '@/components/ui';
import {
  getTrending,
  getPopularTVShows,
  getTopRatedTVShows,
  getAiringTodayTVShows,
  getOnTheAirTVShows,
  discoverTVShows,
  TV_NETWORKS,
} from '@/lib/tmdb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TV Shows',
};

async function HeroSection() {
  const trending = await getTrending('tv', 'day');
  return (
    <HeroCarousel
      items={trending.results.slice(0, 8).map((item) => ({
        ...item,
        title: 'title' in item ? item.title : undefined,
        name: 'name' in item ? item.name : undefined,
        media_type: 'tv',
      }))}
    />
  );
}

async function TrendingSection() {
  const trending = await getTrending('tv', 'day');
  return (
    <MediaRow
      title="Trending TV Shows"
      items={trending.results.map((item) => ({
        ...item,
        title: 'title' in item ? item.title : undefined,
        name: 'name' in item ? item.name : undefined,
        media_type: 'tv',
      }))}
      href="/trending?type=tv"
    />
  );
}

async function AiringTodaySection() {
  const shows = await getAiringTodayTVShows();
  return (
    <MediaRow
      title="Airing Today"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv?sort=airing_today"
    />
  );
}

async function OnTheAirSection() {
  const shows = await getOnTheAirTVShows();
  return (
    <MediaRow
      title="On The Air"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv?sort=on_the_air"
    />
  );
}

async function PopularTVSection() {
  const shows = await getPopularTVShows();
  return (
    <MediaRow
      title="Popular TV Shows"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv?sort=popular"
    />
  );
}

async function TopRatedSection() {
  const shows = await getTopRatedTVShows();
  return (
    <MediaRow
      title="Top Rated TV Shows"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv?sort=top_rated"
    />
  );
}

async function DramaSection() {
  const shows = await discoverTVShows({ with_genres: '18' });
  return (
    <MediaRow
      title="Drama Series"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv/genre/18"
      variant="backdrop"
    />
  );
}

async function ComedySection() {
  const shows = await discoverTVShows({ with_genres: '35' });
  return (
    <MediaRow
      title="Comedy Series"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv/genre/35"
    />
  );
}

async function CrimeSection() {
  const shows = await discoverTVShows({ with_genres: '80' });
  return (
    <MediaRow
      title="Crime Series"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv/genre/80"
    />
  );
}

async function SciFiFantasySection() {
  const shows = await discoverTVShows({ with_genres: '10765' });
  return (
    <MediaRow
      title="Sci-Fi & Fantasy"
      items={shows.results.map((show) => ({
        ...show,
        media_type: 'tv' as const,
      }))}
      href="/tv/genre/10765"
      variant="backdrop"
    />
  );
}

export default function TVShowsPage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection />
      </Suspense>

      <div className="relative z-10 -mt-24 space-y-12 pb-8">
        <Suspense fallback={<MediaRowSkeleton />}>
          <TrendingSection />
        </Suspense>

        <Suspense fallback={<MediaRowSkeleton />}>
          <AiringTodaySection />
        </Suspense>

        <StudioRow title="Networks" studios={TV_NETWORKS} type="tv" />

        <Suspense fallback={<MediaRowSkeleton variant="backdrop" />}>
          <DramaSection />
        </Suspense>

        <Suspense fallback={<MediaRowSkeleton />}>
          <PopularTVSection />
        </Suspense>

        <Suspense fallback={<MediaRowSkeleton />}>
          <OnTheAirSection />
        </Suspense>

        <Suspense fallback={<MediaRowSkeleton variant="backdrop" />}>
          <SciFiFantasySection />
        </Suspense>

        <Suspense fallback={<MediaRowSkeleton />}>
          <TopRatedSection />
        </Suspense>

        <Suspense fallback={<MediaRowSkeleton />}>
          <ComedySection />
        </Suspense>

        <Suspense fallback={<MediaRowSkeleton />}>
          <CrimeSection />
        </Suspense>
      </div>
    </div>
  );
}
