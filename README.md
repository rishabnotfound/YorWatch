<p align="center">
  <img src="./public/logo.png" width="150" height="150" alt="YorWatch Logo" />
</p>

<h1 align="center">YorWatch</h1>

<p align="center">
  A beautiful movie and TV show discovery app powered by TMDB.
  <br />
  <a href="https://yorwatch.vercel.app">View Demo</a>
</p>

## Preview 

<img width="2928" height="1678" alt="image" src="https://github.com/user-attachments/assets/bbea4465-2cf6-47bd-84f2-7ef36743f881" />

## What is YorWatch?

YorWatch is a sleek, modern web app for browsing movies and TV shows. Think of it as your personal entertainment guide — discover trending content, explore by genres, check out what your favorite studios are making, and keep track of what you want to watch.

Built with Next.js and styled with Tailwind CSS, it's fast, responsive, and looks great on any device.

## Features

- **Browse Movies & TV Shows** — Explore trending, popular, top-rated, and upcoming content
- **Smart Search** — Find anything with instant search suggestions and history
- **Detailed Info Pages** — Cast, crew, ratings, trailers, and recommendations
- **Studio & Network Pages** — See what Marvel, Netflix, HBO, and others are producing
- **Genre Discovery** — Filter content by your favorite genres
- **TMDB Authentication** — Sign in to manage your watchlist, favorites, and ratings
- **Continue Watching** — Pick up where you left off
- **Beautiful UI** — Smooth animations, hover cards, and a clean dark theme

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Tabler Icons
- **Video Player:** Plyr
- **API:** TMDB (The Movie Database)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A TMDB account and API key ([get one here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/rishabnotfound/YorWatch.git
   cd YorWatch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) and start exploring!

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── contexts/     # React context providers
├── lib/          # Utilities and API helpers
└── types/        # TypeScript type definitions
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TMDB_API_KEY` | Your TMDB API key (required) |

## Contributing

Feel free to open issues or submit pull requests. All contributions are welcome!

## Credits

- Movie and TV data provided by [TMDB](https://www.themoviedb.org/)
- This product uses the TMDB API but is not endorsed or certified by TMDB

## License

[MIT](LICENSE) License — do whatever you want with it, i wonder i may stumble upon a working fork of my project with working streams one day 🥀

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/rishabnotfound">R</a>
</p>
