/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ninamassage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  trailingSlash: true,
  
  // Génération statique de toutes les routes
  generateStaticParams: true,
  
  // Configuration pour l'export statique
  distDir: 'out',
};

module.exports = nextConfig;