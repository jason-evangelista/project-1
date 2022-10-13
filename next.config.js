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
  },
};

module.exports = nextConfig;
