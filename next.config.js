/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.lutongpinoyrecipe.com",
      "scm-assets.constant.co",
      "www.kawalingpinoy.com",
      "images.summitmedia-digital.com",
      "d1vnxpj2ayvwak.cloudfront.net",
      "www.simpol.ph",
    ],
  },
};

module.exports = nextConfig;
