import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMovieDetails, getBackdropUrl, getImageUrl } from '@/lib/tmdb';
import { formatDate, formatRuntime, formatRating } from '@/lib/utils';
import { BackButton, CastRow, MediaRow } from '@/components/ui';

interface MoviePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  try {
    const movie = await getMovieDetails(parseInt(params.id, 10));
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: movie.poster_path
          ? [`https://image.tmdb.org/t/p/w500${movie.poster_path}`]
          : [],
      },
    };
  } catch {
    return { title: 'Movie Not Found' };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  let movie;
  try {
    movie = await getMovieDetails(parseInt(params.id, 10));
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <Image
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
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
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={movie.title}
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
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg text-white/60 italic">{movie.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-white">{formatRating(movie.vote_average)}</span>
              </span>
              <span className="text-white/60">{formatDate(movie.release_date)}</span>
              {movie.runtime > 0 && (
                <span className="text-white/60">{formatRuntime(movie.runtime)}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}`}
                  className="px-3 py-1 bg-surface-light hover:bg-primary/20 rounded-full text-sm text-white/80 hover:text-white transition-all"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-white/70 leading-relaxed max-w-3xl">{movie.overview}</p>
            </div>

            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="flex flex-wrap items-center gap-3">
                {movie.production_companies.slice(0, 3).map((company) => (
                  <Link
                    key={company.id}
                    href={`/studio/${company.id}`}
                    className="px-3 py-1 bg-surface hover:bg-surface-light rounded-lg text-xs text-white/60 hover:text-white transition-all"
                  >
                    {company.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <div className="mt-12">
            <CastRow cast={movie.credits.cast} />
          </div>
        )}

        {movie.recommendations?.results && movie.recommendations.results.length > 0 && (
          <div className="mt-12 -mx-4 md:-mx-8 lg:-mx-12">
            <MediaRow
              title="Recommended"
              items={movie.recommendations.results.slice(0, 12).map((m) => ({
                ...m,
                media_type: 'movie' as const,
              }))}
            />
          </div>
        )}

        {movie.similar?.results && movie.similar.results.length > 0 && (
          <div className="mt-12 -mx-4 md:-mx-8 lg:-mx-12">
            <MediaRow
              title="Similar Movies"
              items={movie.similar.results.slice(0, 12).map((m) => ({
                ...m,
                media_type: 'movie' as const,
              }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}
