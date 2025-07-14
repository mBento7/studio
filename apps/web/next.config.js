/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enable ESLint during builds
    ignoreDuringBuilds: false,
    // Lint all directories
    dirs: ['src', 'pages', 'components', 'lib', 'utils'],
  },
  typescript: {
    // Enable TypeScript checking during builds
    ignoreBuildErrors: false,
  },
  experimental: {
    // Enable strict mode for better development experience
    strictNextHead: true,
  },
  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Ensure proper handling of imports
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
};

module.exports = nextConfig;