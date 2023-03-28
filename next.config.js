const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    fetcherBaseUrl: process.env.SERVER_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http2.mlstatic.com",
      },
    ],
  },
  outputFileTracing: true,
  i18n,
};

module.exports = nextConfig;
