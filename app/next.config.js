const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    host: process.env.VERCEL_URL ?? process.env.APP_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http2.mlstatic.com",
      },
    ],
  },
  i18n,
};

module.exports = nextConfig;
