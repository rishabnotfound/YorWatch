import {
  Movie,
  TVShow,
  MovieDetails,
  TVShowDetails,
  TMDBResponse,
  SearchResult,
  Genre,
} from '@/types/tmdb';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: API_KEY!,
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`);
  }

  return response.json();
}

export async function getTrending(
  mediaType: 'all' | 'movie' | 'tv' = 'all',
  timeWindow: 'day' | 'week' = 'day'
): Promise<TMDBResponse<Movie | TVShow>> {
  return fetchTMDB(`/trending/${mediaType}/${timeWindow}`);
}

export async function getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/movie/popular', { page: String(page) });
}

export async function getPopularTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/tv/popular', { page: String(page) });
}

export async function getTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/movie/top_rated', { page: String(page) });
}

export async function getTopRatedTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/tv/top_rated', { page: String(page) });
}

export async function getNowPlayingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/movie/now_playing', { page: String(page) });
}

export async function getUpcomingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/movie/upcoming', { page: String(page) });
}

export async function getAiringTodayTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/tv/airing_today', { page: String(page) });
}

export async function getOnTheAirTVShows(page: number = 1): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/tv/on_the_air', { page: String(page) });
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  return fetchTMDB(`/movie/${id}`, { append_to_response: 'credits,similar,recommendations' });
}

export async function getTVShowDetails(id: number): Promise<TVShowDetails> {
  return fetchTMDB(`/tv/${id}`, { append_to_response: 'credits,similar,recommendations' });
}

export async function searchMulti(
  query: string,
  page: number = 1
): Promise<TMDBResponse<SearchResult>> {
  return fetchTMDB('/search/multi', { query, page: String(page) });
}

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/search/movie', { query, page: String(page) });
}

export async function searchTVShows(
  query: string,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/search/tv', { query, page: String(page) });
}

export async function getMovieGenres(): Promise<{ genres: Genre[] }> {
  return fetchTMDB('/genre/movie/list');
}

export async function getTVGenres(): Promise<{ genres: Genre[] }> {
  return fetchTMDB('/genre/tv/list');
}

export async function discoverMovies(
  params: Record<string, string> = {},
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/discover/movie', { ...params, page: String(page) });
}

export async function discoverTVShows(
  params: Record<string, string> = {},
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/discover/tv', { ...params, page: String(page) });
}

export async function getPersonDetails(id: number): Promise<PersonDetails> {
  return fetchTMDB(`/person/${id}`, { append_to_response: 'combined_credits,images' });
}

export async function getMoviesByCompany(
  companyId: number,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/discover/movie', { with_companies: String(companyId), page: String(page) });
}

export async function getTVByNetwork(
  networkId: number,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/discover/tv', { with_networks: String(networkId), page: String(page) });
}

export async function getMoviesByGenre(
  genreId: number,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  return fetchTMDB('/discover/movie', { with_genres: String(genreId), page: String(page) });
}

export async function getTVByGenre(
  genreId: number,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  return fetchTMDB('/discover/tv', { with_genres: String(genreId), page: String(page) });
}

export function getImageUrl(path: string | null, size: string = 'w500'): string {
  if (!path) return '/placeholder.svg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string | null): string {
  return getImageUrl(path, 'original');
}

export interface PersonDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
  images?: {
    profiles: { file_path: string; aspect_ratio: number }[];
  };
  combined_credits?: {
    cast: Array<{
      id: number;
      title?: string;
      name?: string;
      poster_path: string | null;
      character: string;
      media_type: 'movie' | 'tv';
      vote_average: number;
      release_date?: string;
      first_air_date?: string;
    }>;
  };
}

export const MOVIE_STUDIOS = [
  { id: 420, name: 'Marvel Studios', logo: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png' },
  { id: 174, name: 'Warner Bros.', logo: '/zhD3hhtKB5qyv7ZeL4uLpNxgMVU.png' },
  { id: 33, name: 'Universal Pictures', logo: '/8lvHyhjr8oUKOOy2dKXoALWKdp0.png' },
  { id: 2, name: 'Walt Disney Pictures', logo: '/wdrCwmRnLFJhEoH8GSfymY85KHT.png' },
  { id: 4, name: 'Paramount', logo: '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png' },
  { id: 7, name: 'DreamWorks', logo: '/vru2SssLX3FPhnKZGtYw00pVIS9.png' },
  { id: 25, name: '20th Century Studios', logo: '/qZCc1lty5FzX30aOCVRBLzaVmcp.png' },
  { id: 34, name: 'Sony Pictures', logo: '/GagSvqWlyPdkFHMfQ3pNq6ix9P.png' },
];

export const TV_NETWORKS = [
  { id: 213, name: 'Netflix', logo: '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png' },
  { id: 2739, name: 'Disney+', logo: '/gJ8VX6JSu3ciXHuC2dDGAo2lvwM.png' },
  { id: 49, name: 'HBO', logo: '/tuomPhY2UtuPTqqFnKMVHvSb724.png' },
  { id: 1024, name: 'Amazon', logo: '/ifhbNuuVnlwYy5oXA5VIb2YR8AZ.png' },
  { id: 2552, name: 'Apple TV+', logo: '/4KAy34EHvRM25Ih8wb82AuGU7zJ.png' },
  { id: 67, name: 'Showtime', logo: '/Allse9kbjiP6ExaQrnSpIhkurEi.png' },
  { id: 16, name: 'CBS', logo: '/nm8d7P7MJNiBLdgIzUK0gkuEA4r.png' },
  { id: 6, name: 'NBC', logo: '/o3OedEP0f9mfZr33jz2BfXOUK5.png' },
];
