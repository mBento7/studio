/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar output standalone para Docker
  output: 'standalone',
  
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
  
  // Otimizações para produção
  swcMinify: true,
  
  // Configuração de headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;