/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  env: {
    MOVIE_SERVICE:
      "https://6348274f0b382d796c6acab2.mockapi.io/nosaj-movie/movies",
    SUPABASE_URL: "https://vwxurkamlskzzefdzuln.supabase.co",
    SUPABASE_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3eHVya2FtbHNrenplZmR6dWxuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NTg5OTY5NCwiZXhwIjoxOTgxNDc1Njk0fQ.1f1tDTNBx-dKUWw0To4HHJOLFj9S0ZQkRy3yeJWXu4A",
  },
};

module.exports = nextConfig;
