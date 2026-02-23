import Link from 'next/link';

const footerLinks = {
  browse: [
    { label: 'Movies', href: '/' },
    { label: 'TV Shows', href: '/tv' },
    { label: 'Trending', href: '/trending' },
    { label: 'Top Rated', href: '/?sort=top_rated' },
  ],
  genres: [
    { label: 'Action', href: '/genre/28' },
    { label: 'Comedy', href: '/genre/35' },
    { label: 'Drama', href: '/genre/18' },
    { label: 'Sci-Fi', href: '/genre/878' },
  ],
  info: [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface-light border-t border-white/5 mt-16">
      <div className="px-4 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">
                YorWatch
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Your destination for discovering movies and TV shows. Browse, search, and explore the world of entertainment.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2">
              {footerLinks.browse.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Genres</h3>
            <ul className="space-y-2">
              {footerLinks.genres.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} YorWatch. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-xs">Powered by</span>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
            >
              <svg className="h-4" viewBox="0 0 185 20" fill="currentColor">
                <path d="M17.4 3.3H3.3v13.4h14.1V3.3zM0 0v20h20.7V0H0zm30.5 7.7h-3.1v3.1h3.1v6h3.1V7.7h-3.1zm9.3 9.1h3.1V7.7h-3.1v9.1zm0-12.2h3.1V1.5h-3.1v3.1zm9.3 12.2h3.1V7.7h-3.1v9.1zm0-12.2h3.1V1.5h-3.1v3.1zm18.6 6.9c-.5-.5-1.1-.9-1.8-1.1.5-.2 1-.5 1.4-.9.6-.6.9-1.4.9-2.3 0-1.1-.4-2-1.1-2.6-.8-.7-1.9-1-3.3-1h-5.4v12.2h5.7c1.5 0 2.7-.4 3.5-1.1.8-.7 1.2-1.7 1.2-3 0-1-.3-1.7-.9-2.2zm-6.2-5.1h2c1.3 0 1.9.5 1.9 1.4 0 .5-.2.9-.5 1.1-.3.3-.8.4-1.5.4h-1.9V6.4zm2.2 8h-2.2v-3.1h2.2c.7 0 1.3.1 1.7.4.4.3.6.7.6 1.2 0 1-.8 1.5-2.3 1.5zm11.7-7.9v12.2h7.7v-2.9h-4.6V7.7h-3.1zm17.4 0h-5.4v12.2h5.4c1.7 0 3-.4 3.9-1.3 1-.9 1.5-2.2 1.5-3.9V9.5c0-1.1-.4-2-1.1-2.7-.7-.7-1.7-1.1-2.9-1.1h-1.4zm2.3 6.8c0 1-.2 1.7-.7 2.2-.4.5-1.1.7-1.9.7h-1.9V10h1.9c.8 0 1.5.2 1.9.7.5.5.7 1.2.7 2.2v1.6zm18.3-6.8h-3.1l-3 5.2-3-5.2h-3.5l5 8v4.2h3.1v-4.2l4.5-8zm6.2 12.2h3.1V7.7h-3.1v9.1zm0-12.2h3.1V1.5h-3.1v3.1zm18.4 3.1h-3.1v3.1h3.1v6h3.1V7.7h-3.1zm9.4 9.1h3.1V7.7h-3.1v9.1zm0-12.2h3.1V1.5h-3.1v3.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
