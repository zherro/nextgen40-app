/**
 * @type {import('next').NextConfig}
 */

 const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = withPWA(
  withBundleAnalyzer({
    reactStrictMode: false,
    images: {
      domains: ['dummyimage.com'],
    },
    env: {
      NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
    },
    // webpack(config) {
    //   config.resolve.fallback = {
    //     ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
    //       // by next.js will be dropped. Doesn't make much sense, but how it is
    //     fs: false, // the solution
    //   };
  
    //   return config;
    // },
  })
);

module.exports = nextConfig;
