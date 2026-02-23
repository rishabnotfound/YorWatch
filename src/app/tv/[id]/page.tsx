import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTVShowDetails, getBackdropUrl, getImageUrl } from '@/lib/tmdb';
import { formatDate, formatRating } from '@/lib/utils';
import { BackButton, CastRow, MediaRow } from '@/components/ui';

interface TVShowPageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: TVShowPageProps): Promise<Metadata> {
  try {
    const show = await getTVShowDetails(parseInt(params.id, 10));
    return {
      title: show.name,
      description: show.overview,
      openGraph: {
        title: show.name,
        description: show.overview,
        images: show.poster_path
          ? [`https://image.tmdb.org/t/p/w500${show.poster_path}`]
          : [],
      },
    };
  } catch {
    return { title: 'TV Show Not Found' };
  }
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  let show;
  try {
    show = await getTVShowDetails(parseInt(params.id, 10));
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={getBackdropUrl(show.backdrop_path)}
          alt={show.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute top-20 left-4 md:left-8 lg:left-12">
          <BackButton />
        </div>
      </div>

      <div className="relative z-10 -mt-32 px-4 md:px-8 lg:px-12 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-48 md:w-64 mx-auto md:mx-0">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={getImageUrl(show.poster_path, 'w500')}
                alt={show.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {show.name}
              </h1>
              {show.tagline && (
                <p className="text-lg text-white/60 italic">{show.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-white">{formatRating(show.vote_average)}</span>
              </span>
              <span className="text-white/60">{formatDate(show.first_air_date)}</span>
              <span className="text-white/60">
                {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}
              </span>
              <span className="text-white/60">
                {show.number_of_episodes} Episode{show.number_of_episodes !== 1 ? 's' : ''}
              </span>
              <span className="px-2 py-0.5 bg-surface-light rounded text-xs text-white/60">
                {show.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/tv/genre/${genre.id}`}
                  className="px-3 py-1 bg-surface-light hover:bg-primary/20 rounded-full text-sm text-white/80 hover:text-white transition-all"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-white/70 leading-relaxed max-w-3xl">{show.overview}</p>
            </div>

            {show.networks && show.networks.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {show.networks.map((network) => (
                  <Link
                    key={network.id}
                    href={`/network/${network.id}`}
                    className="px-3 py-1 bg-surface hover:bg-surface-light rounded-lg text-xs text-white/60 hover:text-white transition-all"
                  >
                    {network.name}
                  </Link>
                ))}
              </div>
            )}

            {show.created_by && show.created_by.length > 0 && (
              <div>
                <span className="text-white/50 text-sm">Created by: </span>
                <span className="text-white/80 text-sm">
                  {show.created_by.map((c) => c.name).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>

        {show.credits?.cast && show.credits.cast.length > 0 && (
          <div className="mt-12">
            <CastRow cast={show.credits.cast} />
          </div>
        )}

        {show.recommendations?.results && show.recommendations.results.length > 0 && (
          <div className="mt-12 -mx-4 md:-mx-8 lg:-mx-12">
            <MediaRow
              title="Recommended"
              items={show.recommendations.results.slice(0, 12).map((s) => ({
                ...s,
                media_type: 'tv' as const,
              }))}
            />
          </div>
        )}

        {show.similar?.results && show.similar.results.length > 0 && (
          <div className="mt-12 -mx-4 md:-mx-8 lg:-mx-12">
            <MediaRow
              title="Similar TV Shows"
              items={show.similar.results.slice(0, 12).map((s) => ({
                ...s,
                media_type: 'tv' as const,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
