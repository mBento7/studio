import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Added for Google profile pictures
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https'
        ,
        hostname: 'firebasestorage.googleapis.com', // Added for Firebase Storage
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Kept for any remaining instances or future use
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'd33wubrfki0l68.cloudfront.net', // Added for template images
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    "https://3003-firebase-studio-1747088894258.cluster-uf6urqn4lned4spwk4xorq6bpo.cloudworkstations.dev",
  ],
};

export default nextConfig;
